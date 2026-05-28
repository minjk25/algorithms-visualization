// State
let selected = [];

// Helper
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