async function* bubbleSort(arr) {
    const a = [...arr];
    let n = a.length;
    const sorted = new Set();
    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 1; i < n; i++) {
            yield {
                arr: [...a],
                comparing: [i, i - 1],
                sorted: new Set(sorted),
                msg: `Comparing ${a[i - 1]} and ${a[i]}`
            };
            if (a[i - 1] > a[i]) {
                [a[i - 1], a[i]] = [a[i], a[i - 1]];
                swapped = true;
                yield {
                    arr: [...a],
                    swapping: [i, i - 1],
                    sorted: new Set(sorted),
                    msg: `Swapped → ${a[i]} and ${a[i - 1]}`
                };
            }
        }
        n--;
        sorted.add(n);
    }
    const allSorted = new Set(Array.from({ length: a.length }, (_, i) => { return i }));
    yield { arr: [...a], sorted: allSorted, msg: 'Done! Array is sorted.' };
}