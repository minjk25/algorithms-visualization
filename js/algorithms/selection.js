async function* selectionSort(arr) {
    const a = [...arr];
    const n = a.length;
    const sorted = new Set();

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        yield {
            arr: [...a],
            pivot: minIdx,
            sorted: new Set(sorted),
            msg: `Round ${i + 1}: selecting minimum from the starting index = ${i}`
        };
        for (let j = i + 1; j < n; j++) {
            yield {
                arr: [...a],
                comparing: [j, minIdx],
                pivot: minIdx,
                sorted: new Set(sorted),
                msg: `Comparing ${a[j]} with current min ${a[minIdx]}`
            };
            if (a[j] < a[minIdx]) {
                minIdx = j;
                yield {
                    arr: [...a],
                    pivot: minIdx,
                    sorted: new Set(sorted),
                    msg: `New minimum found: ${a[minIdx]} at index ${minIdx}`
                };
            }
        }
        if (minIdx !== i) {
            [a[i], a[minIdx]] = [a[minIdx], a[i]];
            yield {
                arr: [...a],
                swapping: [i, minIdx],
                sorted: new Set(sorted),
                msg: `Swapping ${a[i]} to index ${i}`
            };
        }
        sorted.add(i);
    }

    yield {
        arr: [...a],
        sorted: new Set(Array.from({ length: n }, (_, i) => { return i })),
        msg: 'Done! Array is sorted.'
    };
}
