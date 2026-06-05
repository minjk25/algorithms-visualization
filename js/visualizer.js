const ALGO_META = {
    bubble: { name: 'Bubble Sort', complexity: 'O(n²)' },
    insertion: { name: 'Insertion Sort', complexity: 'O(n²)' },
    selection: { name: 'Selection Sort', complexity: 'O(n²)' },
    merge: { name: 'Merge Sort', complexity: 'O(n log n)' },
    quick: { name: 'Quick Sort', complexity: 'O(n log n)' },
};

function clearPanels() {
    document.getElementById('visualizer-area').innerHTML = '';
}

function createPanel(algoKey, panelId) {
    const meta = ALGO_META[algoKey];
    const area = document.getElementById('visualizer-area');
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = panelId;
    panel.innerHTML = `
    <div class="panel-header">
        <span class="panel-title">${meta.name}</span>
        <span class="winner-badge" id="${panelId}-winner">🏆 Winner</span>
        <span class="panel-complexity">${meta.complexity}</span>
    </div>
    <div class="bar-wrap" id="${panelId}-bars"></div>
    <div class="stats">
        <div class="stat">
            <div class="stat-label">CMP</div>
            <div class="stat-val" id="${panelId}-cmp">0</div>
        </div>
        <div class="stat">
            <div class="stat-label">SWAP</div>
            <div class="stat-val" id="${panelId}-swp">0</div>
        </div>
        <div class="stat">
            <div class="stat-label">OPS</div>
            <div class="stat-val" id="${panelId}-ops">0</div>
        </div>
    </div>
    <div class="panel-msg" id="${panelId}-msg">Ready.</div>`;

    area.appendChild(panel);
}

function renderBars(panelId, state) {
    const wrap = document.getElementById(`${panelId}-bars`);
    if (!wrap) {
        return;
    }

    wrap.innerHTML = '';
    const max = Math.max(...state.arr, 1);
    const showLabels = state.arr.length <= 24;

    state.arr.forEach((v, i) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${Math.round((v / max) * 175)}px`;

        if (state.sorted?.has(i)) {
            bar.classList.add('bar-sorted');
        } else if (state.pivot === i) {
            bar.classList.add('bar-pivot');
        } else if (state.swapping?.includes(i)) {
            bar.classList.add('bar-swap');
        } else if (state.comparing?.includes(i)) {
            bar.classList.add('bar-compare');
        } else if (state.mergeRange?.has(i)) {
            bar.classList.add('bar-merge');
        }

        if (showLabels) {
            const lbl = document.createElement('div');
            lbl.className = 'bar-lbl';
            lbl.textContent = v;
            bar.appendChild(lbl);
        }

        wrap.appendChild(bar);
    });

    const msgEl = document.getElementById(`${panelId}-msg`);
    if (msgEl && state.msg) {
        msgEl.textContent = state.msg;
    }
}

function updateStats(panelId, cmp, swp) {
    const cmpEl = document.getElementById(`${panelId}-cmp`);
    const swpEl = document.getElementById(`${panelId}-swp`);
    const opsEl = document.getElementById(`${panelId}-ops`);
    if (cmpEl) {
        cmpEl.textContent = cmp;
    }
    if (swpEl) {
        swpEl.textContent = swp;
    }
    if (opsEl) {
        opsEl.textContent = cmp + swp;
    }
}

function showWinner(panelId) {
    const badge = document.getElementById(`${panelId}-winner`);
    if (badge) {
        badge.style.display = 'inline';
    }
}