async function* insertionSort(arr) {
    const a = [...arr];
    const n = a.length;

    for (let i = 1; i < n; i++) {
        let j = i;
        yield {
            arr: [...a],
            comparing: [j],
            msg: `Inserting ${a[j]} into sorted portion`
        };
        if (!(a[j - 1] > a[j])) {
            yield {
                arr: [...a],
                comparing: [j, j - 1],
                msg: `Comparing ${a[j - 1]} and ${a[j]}`
            };
            continue;
        }
        while (j > 0 && a[j - 1] > a[j]) {
            yield {
                arr: [...a],
                comparing: [j, j - 1],
                msg: `Comparing ${a[j - 1]} and ${a[j]}`
            };
            [a[j], a[j - 1]] = [a[j - 1], a[j]];
            j--;
            yield {
                arr: [...a],
                swapping: [j, j + 1],
                msg: `Swapped → ${a[j]} and ${a[j + 1]}`
            };
        }
        if (j > 0) {
            yield {
                arr: [...a],
                comparing: [j, j - 1],
                msg: `Comparing ${a[j - 1]} and ${a[j]}`
            };
        }
    }
    const allSorted = new Set(Array.from({ length: n }, (_, i) => { return i }));
    yield { arr: [...a], sorted: allSorted, msg: 'Done! Array is sorted.' };
}