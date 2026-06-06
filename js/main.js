const ALGOS = {
    bubble: { fn: bubbleSort },
    insertion: { fn: insertionSort },
    selection: { fn: selectionSort },
    merge: { fn: mergeSort },
    quick: { fn: quickSort },
};

// State
let selected = [];
let origArr = [];
let mode = 'auto';
let paused = false;
let stopFlag = false;
let sorting = false;
let allSteps = [];
let stepIndex = 0;

// Functions -----------------------
function updateSelectionHint() {
    const hint = document.getElementById('selection-hint');
    if (selected.length === 0) {
        hint.textContent = 'You can select up to 2 algorithms';
    } else if (selected.length === 1) {
        hint.textContent = '1 selected — add one more to compare, or press Run';
    } else {
        hint.textContent = '2 selected — press Run to compare';
    }
}

function genArray(n) {
    return Array.from({ length: n }, () => {
        return Math.floor(Math.random() * 85) + 10
    });
}

function getDelay() {
    return Math.round(600 / parseInt(document.getElementById('speedSlider').value));
}

function sleep(ms) {
    return new Promise((r) => {
        setTimeout(r, ms);
    });
}

function waitIfPaused() {
    return new Promise((r) => {
        if (!paused) {
            return r();
        }
        const t = setInterval(() => {
            if (!paused) {
                clearInterval(t);
                r();
            }
        }, 30);
    });
}

function rebuildPanels() {
    if (!origArr.length) {
        origArr = genArray(parseInt(document.getElementById('sizeSlider').value));
    }
    if (mode === 'step' && selected.length > 0) {
        buildStepsAsync();
    } else {
        clearPanels();
        selected.forEach((key, i) => {
            createPanel(key, `panel-${i}`);
            renderBars(`panel-${i}`, { arr: origArr });
        });
        document.getElementById('stepCounter').textContent = 'Step 0 / 0';
        document.getElementById('stepBack').disabled = true;
        document.getElementById('stepFwd').disabled = true;
    }
}

function setRunning(isRunning) {
    document.getElementById('runBtn').disabled = isRunning || selected.length === 0;
    document.getElementById('pauseBtn').disabled = !isRunning;
    document.getElementById('genBtn').disabled = isRunning;
    document.getElementById('sizeSlider').disabled = isRunning;
    document.getElementById('modeStep').disabled = isRunning;
    document.getElementById('modeAuto').disabled = isRunning;
}

function updateAlgoButtons() {
    document.querySelectorAll('.algo-btn').forEach(btn => {
        const isSelected = btn.classList.contains('selected');
        if ((selected.length === 2 && !isSelected) || (sorting)) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

// Algorithm selection -----------------------
document.querySelectorAll('.algo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.algo;
        if (btn.classList.contains('selected')) {
            selected = selected.filter((k) => { return k !== key });
            btn.classList.remove('selected');
        } else if (selected.length < 2) {
            selected.push(key);
            btn.classList.add('selected');
        }
        updateSelectionHint();
        document.getElementById('runBtn').disabled = selected.length === 0;
        updateAlgoButtons()
        rebuildPanels();
    });
});

// Sliders - Array size -----------------------
document.getElementById('sizeSlider').addEventListener('input', function () {
    document.getElementById('sizeOut').textContent = this.value;
    origArr = genArray(parseInt(this.value));
    rebuildPanels();
});

// Sliders - Speed -----------------------
document.getElementById('speedSlider').addEventListener('input', function () {
    document.getElementById('speedOut').textContent = this.value;
});

// New array -----------------------
document.getElementById('genBtn').addEventListener('click', () => {
    origArr = genArray(parseInt(document.getElementById('sizeSlider').value));
    rebuildPanels();
});

// Pause -----------------------
document.getElementById('pauseBtn').addEventListener('click', () => {
    paused = !paused;
    document.getElementById('pauseBtn').textContent = paused ? '▶ Resume' : '⏸ Pause';
});

// Reset -----------------------
document.getElementById('resetBtn').addEventListener('click', () => {
    stopFlag = true;
    paused = false;
    sorting = false;
    document.getElementById('pauseBtn').textContent = '⏸ Pause';
    const safeDelay = getDelay() + 50
    setTimeout(() => {
        stopFlag = false;
        sorting = false;
        setRunning(false);
        rebuildPanels();
        updateAlgoButtons();
    }, safeDelay);
});

// Auto mode: Run -----------------------
document.getElementById('runBtn').addEventListener('click', async () => {
    if (selected.length === 0) {
        return;
    }
    stopFlag = false;
    paused = false;
    sorting = true;
    setRunning(true);
    updateAlgoButtons();
    selected.forEach((_, i) => {
        const badge = document.getElementById(`panel-${i}-winner`);
        if (badge) {
            badge.style.display = 'none';
        }
    });

    let finishedCount = 0;
    const total = selected.length;

    await Promise.all(selected.map(async (key, i) => {
        const panelId = `panel-${i}`;
        const gen = ALGOS[key].fn([...origArr]);
        let cmp = 0, swp = 0;
        for await (const state of gen) {
            if (stopFlag) {
                return;
            }
            await waitIfPaused();
            if (state.comparing) {
                cmp++;
            }
            if (state.swapping) {
                swp++;
            }
            renderBars(panelId, state);
            updateStats(panelId, cmp, swp);
            await sleep(getDelay());
        }
        finishedCount++;
        if (finishedCount === 1 && total > 1) {
            showWinner(panelId);
        }
    }));

    if (!stopFlag) {
        sorting = false;
        setRunning(false);
        updateAlgoButtons();
    }
});

// Mode toggle -----------------------
document.getElementById('modeAuto').addEventListener('click', () => {
    mode = 'auto';
    document.getElementById('modeAuto').classList.add('active');
    document.getElementById('modeStep').classList.remove('active');
    document.getElementById('action-bar').style.display = 'flex';
    document.getElementById('step-nav').style.display = 'none';
    rebuildPanels();
});
document.getElementById('modeStep').addEventListener('click', () => {
    mode = 'step';
    document.getElementById('modeStep').classList.add('active');
    document.getElementById('modeAuto').classList.remove('active');
    document.getElementById('action-bar').style.display = 'none';
    document.getElementById('step-nav').style.display = 'flex';
    rebuildPanels();
});

// Step mode -----------------------
async function buildStepsAsync() {
    clearPanels();
    if (!origArr.length) {
        origArr = genArray(parseInt(document.getElementById('sizeSlider').value));
    }

    selected.forEach((key, i) => {
        createPanel(key, `panel-${i}`);
        renderBars(`panel-${i}`, { arr: origArr });
    });

    const perAlgoSteps = await Promise.all(selected.map(async (key) => {
        const steps = [];
        for await (const state of ALGOS[key].fn([...origArr])) {
            steps.push(state);
        }
        return steps;
    }));

    const maxLen = Math.max(...perAlgoSteps.map(s => s.length), 1);
    allSteps = [];

    const accuStats = selected.map(() => {
        return { cmp: 0, swp: 0 };
    });
    const statsPerStep = [];

    for (let i = 0; i < maxLen; i++) {
        const row = perAlgoSteps.map((steps) => {
            return steps[Math.min(i, steps.length - 1)];
        });
        const statsRow = row.map((state, pi) => {
            if (state.comparing) {
                accuStats[pi].cmp++;
            }
            if (state.swapping) {
                accuStats[pi].swp++;
            }
            return { cmp: accuStats[pi].cmp, swp: accuStats[pi].swp };
        });
        allSteps.push(row);
        statsPerStep.push(statsRow);
    }
    allSteps._stats = statsPerStep;

    stepIndex = 0;
    applyStep(0);
    document.getElementById('stepCounter').textContent = `Step 1 / ${allSteps.length}`;
    document.getElementById('stepBack').disabled = true;
    document.getElementById('stepFwd').disabled = allSteps.length <= 1;
}

function applyStep(idx) {
    if (!allSteps.length) {
        return;
    }
    const row = allSteps[idx];
    const statsRow = allSteps._stats ? allSteps._stats[idx] : null;
    row.forEach((state, pi) => {
        renderBars(`panel-${pi}`, state);
        if (statsRow) {
            updateStats(`panel-${pi}`, statsRow[pi].cmp, statsRow[pi].swp);
        }
    });
    document.getElementById('stepCounter').textContent = `Step ${idx + 1} / ${allSteps.length}`;
    document.getElementById('stepBack').disabled = idx === 0;
    document.getElementById('stepFwd').disabled = idx >= allSteps.length - 1;
}

document.getElementById('stepFwd').addEventListener('click', () => {
    if (stepIndex < allSteps.length - 1) {
        stepIndex++;
        applyStep(stepIndex);
    }
});
document.getElementById('stepBack').addEventListener('click', () => {
    if (stepIndex > 0) {
        stepIndex--;
        applyStep(stepIndex);
    }
});