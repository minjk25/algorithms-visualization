// State
let selected = [];

// Helper functions
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

// Algorithm selection
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
    });
});

// Sliders - Array size
document.getElementById('sizeSlider').addEventListener('input', function () {
    document.getElementById('sizeOut').textContent = this.value;
});

// Sliders - Speed
document.getElementById('speedSlider').addEventListener('input', function () {
    document.getElementById('speedOut').textContent = this.value;
});

// Mode toggle
document.getElementById('modeAuto').addEventListener('click', () => {
    mode = 'auto';
    document.getElementById('modeAuto').classList.add('active');
    document.getElementById('modeStep').classList.remove('active');
    document.getElementById('action-bar').style.display = 'flex';
    document.getElementById('step-nav').style.display = 'none';

});
document.getElementById('modeStep').addEventListener('click', () => {
    mode = 'step';
    document.getElementById('modeStep').classList.add('active');
    document.getElementById('modeAuto').classList.remove('active');
    document.getElementById('action-bar').style.display = 'none';
    document.getElementById('step-nav').style.display = 'flex';

});