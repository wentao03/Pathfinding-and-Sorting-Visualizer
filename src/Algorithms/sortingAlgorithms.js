export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            } else {
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }

        }
    }
}

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

function heapSortHelper(array, animations) {
    const n = array.length;
    // how many layers, half of the nodes will be leaf
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, array[i]]);
        animations.push([i, array[0]]);
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapify(array, i, 0, animations);
    }
}

function heapify(array, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, array[largest]]);
        animations.push([largest, array[i]]);
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;

        heapify(array, n, largest, animations);
    }
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length < 2) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(array, startIndex, endIndex, auxiliaryArray, animations) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxiliaryArray, startIndex, middleIndex, array, animations);
    mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, array, animations);
    merge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

function merge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations) {
    let x = startIndex;
    let y = startIndex;
    let z = middleIndex + 1;

    while (y <= middleIndex && z <= endIndex) {
        animations.push([y, z]);
        animations.push([y, z]);

        if (auxiliaryArray[z] < auxiliaryArray[y]) {
            animations.push([x, auxiliaryArray[z]]);
            array[x++] = auxiliaryArray[z++];
        } else {
            animations.push([x, auxiliaryArray[y]]);
            array[x++] = auxiliaryArray[y++];
        }
    }
    
    while (y <= middleIndex) {
        animations.push([y, y]);
        animations.push([y, y]);
        animations.push([x, auxiliaryArray[y]]);
        array[x++] = auxiliaryArray[y++];
    }

    while (z <= endIndex) {
        animations.push([z, z]);
        animations.push([z, z]);
        animations.push([x, auxiliaryArray[z]]);
        array[x++] = auxiliaryArray[z++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIndex, endIndex, animations) {
    if (startIndex < endIndex) {
        const pivotIdx = partition(array, startIndex, endIndex, animations);
        quickSortHelper(array, startIndex, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, endIndex, animations);
    }
}

function partition(array, startIndex, endIndex, animations) {
    const pivotValue = array[endIndex];
    let pivotIndex = startIndex;
    for (let i = startIndex; i < endIndex; i++) {
        animations.push([i, endIndex]);
        animations.push([i, endIndex]);
        if (array[i] <= pivotValue) {
            animations.push([i, array[pivotIndex]]);
            animations.push([pivotIndex, array[i]]);
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        } else {
            animations.push([i, array[i]]);
            animations.push([i, array[i]]);
        }
    }
    animations.push([pivotIndex, endIndex]);
    animations.push([pivotIndex, endIndex]);
    animations.push([pivotIndex, array[endIndex]]);
    animations.push([endIndex, array[pivotIndex]]);
    [array[pivotIndex], array[endIndex]] = [array[endIndex], array[pivotIndex]];
    return pivotIndex;
}