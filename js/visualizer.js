const ALGO_META = {
    bubble: {
        name: 'Bubble Sort',
        complexity: 'O(n²)',
        codeJS: [
            'function bubbleSort(nums) {',
            '   let swapped = true;',
            '   let end = nums.length;',
            '   while (swapped) {',
            '       swapped = false;',
            '       for (let i = 1; i < end; i++) {',
            '           if (nums[i - 1] > nums[i]) {',
            '               [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];',
            '               swapped = true;',
            '           }',
            '       }',
            '       end--;',
            '   }',
            '   return nums;',
            '}',
        ],
        codePy: [
            'def bubble_sort(nums):',
            '   swapped = True',
            '   end = len(nums)',
            '   while swapped:',
            '       swapped = False',
            '       for i in range(1, end):',
            '           if nums[i - 1] > nums[i]:',
            '               nums[i - 1], nums[i] = nums[i], nums[i - 1]',
            '               swapped = True',
            '       end -= 1',
            '   return nums',
        ]
    },
    insertion: {
        name: 'Insertion Sort',
        complexity: 'O(n²)',
        codeJS: [
            'function insertionSort(nums) {',
            '    const end = nums.length;',
            '    for (let i = 1; i < end; i++) {',
            '        let j = i;',
            '        while (j > 0 && nums[j - 1] > nums[j]) {',
            '            [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];',
            '            j--;',
            '        }',
            '    }',
            '    return nums;',
            '}',
        ],
        codePy: [
            'def insertion_sort(nums):',
            '    for i in range(len(nums)):',
            '        j = i',
            '        while j > 0 and nums[j - 1] > nums[j]:',
            '            nums[j], nums[j - 1] = nums[j - 1], nums[j]',
            '            j -= 1',
            '    return nums',
        ]
    },
    selection: {
        name: 'Selection Sort',
        complexity: 'O(n²)',
        codeJS: [
            'function selectionSort(nums) {',
            '    const end = nums.length;',
            '    for (let i = 0; i < end - 1; i++) {',
            '        let smallestIdx = i;',
            '        for (let j = i + 1; j < end; j++) {',
            '            if (nums[j] < nums[smallestIdx]) {',
            '                smallestIdx = j;',
            '            }',
            '        }',
            '        if (smallestIdx !== i) {',
            '            [nums[i], nums[smallestIdx]] = [nums[smallestIdx], nums[i]];',
            '        }',
            '    }',
            '    return nums;',
            '}',
        ],
        codePy: [
            'def selection_sort(nums):',
            '    for i in range(len(nums) - 1):',
            '        smallest_idx = i',
            '        for j in range(i + 1, len(nums)):',
            '            if nums[j] < nums[smallest_idx]:',
            '                smallest_idx = j',
            '        if smallest_idx != i:',
            '            nums[i], nums[smallest_idx] = nums[smallest_idx], nums[i]',
            '    return nums',
        ]
    },
    merge: {
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        codeJS: [
            'function mergeSort(nums) {',
            '    const n = nums.length;',
            '    if (n < 2) {',
            '        return nums;',
            '    }',
            '    const first = mergeSort(nums.slice(0, Math.floor(n / 2)));',
            '    const second = mergeSort(nums.slice(Math.floor(n / 2)));',
            '    return merge(first, second);',
            '}',
            '',
            'function merge(first, second) {',
            '    const final = [];',
            '    let i = 0;',
            '    let j = 0;',
            '    while (i < first.length && j < second.length) {',
            '        if (first[i] <= second[j]) {',
            '            final.push(first[i]);',
            '            i++;',
            '        } else {',
            '            final.push(second[j]);',
            '            j++',
            '        }',
            '    }',
            '    while (i < first.length) {',
            '        final.push(first[i]);',
            '        i++;',
            '    }',
            '    while (j < second.length) {',
            '        final.push(second[j]);',
            '        j++;',
            '    }',
            '    return final;',
            '}',
        ],
        codePy: [
            'def merge_sort(nums):',
            '    if len(nums) < 2:',
            '        return nums',
            '    first = merge_sort(nums[: len(nums) // 2])',
            '    second = merge_sort(nums[len(nums) // 2 :])',
            '    return merge(first, second)',
            '',
            'def merge(first, second):',
            '    final = []',
            '    i = 0',
            '    j = 0',
            '    while i < len(first) and j < len(second):',
            '        if first[i] <= second[j]:',
            '            final.append(first[i])',
            '            i += 1',
            '        else:',
            '            final.append(second[j])',
            '            j += 1',
            '    while i < len(first):',
            '        final.append(first[i])',
            '        i += 1',
            '    while j < len(second):',
            '        final.append(second[j])',
            '        j += 1',
            '    return final',
        ]
    },
    quick: {
        name: 'Quick Sort',
        complexity: 'O(n log n)',
        codeJS: [
            '// Note: nums = array of numbers, low = the first index of nums, high = the last index of nums',
            '// To use: quickSort(nums, 0, nums.length - 1)',
            '',
            'function quickSort(nums, low, high) {',
            '    if (low < high) {',
            '        const p = partition(nums, low, high)',
            '        quickSort(nums, low, p - 1);',
            '        quickSort(nums, p + 1, high);',
            '    }',
            '}',
            '',
            'function partition(nums, low, high) {',
            '    const pivot = nums[high];',
            '    let i = low;',
            '    for (let j = low; j < high; j++) {',
            '        if (nums[j] < pivot) {',
            '            [nums[i], nums[j]] = [nums[j], nums[i]];',
            '            i++;',
            '        }',
            '    }',
            '    [nums[i], nums[high]] = [nums[high], nums[i]];',
            '    return i;',
            '}',
        ],
        codePy: [
            '# Note: nums = list of numbers, low = the first index of nums, high = the last index of nums',
            '# To use: quickSort(nums, 0, len(nums) - 1)',
            '',
            'def quick_sort(nums, low, high):',
            '    if low < high:',
            '        p = partition(nums, low, high)',
            '        quick_sort(nums, low, p - 1)',
            '        quick_sort(nums, p + 1, high)',
            '',
            'def partition(nums, low, high):',
            '    pivot = nums[high]',
            '    i = low',
            '    for j in range(low, high):',
            '        if nums[j] < pivot:',
            '            nums[i], nums[j] = nums[j], nums[i]',
            '            i += 1',
            '    nums[i], nums[high] = nums[high], nums[i]',
            '    return i',
        ]
    },
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

    const linesHtmlJS = meta.codeJS.map((line, i) => {
        return `<div class="code-line" id="${panelId}-line-${i + 1}">`
            + `<span class="line-num">${i + 1}</span>`
            + `<span class="line-text">${line}</span>`
            + `</div>`;
    }).join('');

    const linesHtmlPy = meta.codePy.map((line, i) => {
        return `<div class="code-line" id="${panelId}-line-${i + 1}">`
            + `<span class="line-num">${i + 1}</span>`
            + `<span class="line-text">${line}</span>`
            + `</div>`;
    }).join('');

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
    <div class="panel-msg" id="${panelId}-msg">Ready.</div>
    <div class="code-area">
        <details class="code-toggle">
            <summary>Show Code</summary>
            <div class="code-btn-area">
                <button class="code-btn active" id="codeJS-${panelId}">JavaScript</button>
                <button class="code-btn" id="codePy-${panelId}">Python</button>
            </div>
            <div class="code-display">
                <div id="code-display-JS-${panelId}">${linesHtmlJS}</div>
                <div id="code-display-Py-${panelId}" style="display:none">${linesHtmlPy}</div>
            </div>
        </details>
    </div>`;

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