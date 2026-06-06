async function* quickSort(arr) {
    const a = [...arr];
    const n = a.length;
    const sorted = new Set();
    const steps = [];

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low;
        for (let j = low; j < high; j++) {
            steps.push({
                arr: [...arr],
                comparing: [j, high],
                pivot: high,
                sorted: new Set(sorted),
                msg: `Comparing ${arr[j]} (index ${j}) with pivot = ${pivot}, i = ${i}`
            });
            if (arr[j] <= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                if (i !== j) {
                    steps.push({
                        arr: [...arr],
                        swapping: [i, j],
                        pivot: high,
                        sorted: new Set(sorted),
                        msg: `Swapped ${arr[i]} and ${arr[j]}`
                    });
                }
                i++;
            }
        }
        [arr[i], arr[high]] = [arr[high], arr[i]];
        steps.push({
            arr: [...arr],
            swapping: [i, high],
            sorted: new Set(sorted),
            msg: `Pivot ${pivot} placed at index ${i}`
        });
        return i;
    }

    function qs(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            sorted.add(pi);
            qs(arr, low, pi - 1);
            qs(arr, pi + 1, high);
        } else if (low === high) {
            sorted.add(low);
        }
    }

    qs(a, 0, n - 1);
    steps.push({
        arr: [...a],
        sorted: new Set(Array.from({ length: n }, (_, i) => { return i })),
        msg: 'Done! Array is sorted.'
    });

    for (const step of steps) {
        yield step;
    }
}
