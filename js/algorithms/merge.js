async function* mergeSort(arr) {
    const a = [...arr];
    const n = a.length;
    const steps = [];

    function merge(arr, l, m, r) {
        const left = arr.slice(l, m + 1);
        const right = arr.slice(m + 1, r + 1);
        const sub = new Set();

        for (let x = l; x <= r; x++) {
            sub.add(x);
        }
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            const snap = [...arr];
            let pos = k;
            for (let x = i; x < left.length; x++) {
                snap[pos] = left[x];
                pos++;
            }
            for (let x = j; x < right.length; x++) {
                snap[pos] = right[x];
                pos++;
            }

            const leftPos = k;
            const rightPos = k + (left.length - i);
            steps.push({
                arr: snap,
                mergeRange: new Set(sub),
                comparing: [leftPos, rightPos],
                msg: `Merging between index [${l}..${r}]: comparing ${left[i]} vs ${right[j]}`
            });

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                k++;
                i++;
            } else {
                arr[k] = right[j];
                k++;
                j++;
            }
        }
        while (i < left.length) {
            arr[k] = left[i];
            k++;
            i++;
        }
        while (j < right.length) {
            arr[k] = right[j];
            k++;
            j++;
        }
        steps.push({
            arr: [...arr],
            mergeRange: new Set(sub),
            msg: `Sorting between index [${l}..${r}]`
        });
    }

    function merge_sort(arr, l, r) {
        if (l >= r) {
            return;
        }
        const m = Math.floor((l + r) / 2);
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge(arr, l, m, r);
        steps.push({
            arr: [...arr],
            mergeRange: new Set(),
            msg: `Merged subarray [${l}..${r}]`
        });
    }

    merge_sort(a, 0, n - 1);
    steps.push({
        arr: [...a],
        sorted: new Set(Array.from({ length: n }, (_, i) => { return i })),
        msg: 'Done! Array is sorted.'
    });

    for (const step of steps) {
        yield step;
    }
}