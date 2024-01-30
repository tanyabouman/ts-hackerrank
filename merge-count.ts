function countInversions(arr: number[]): number {
    let count = 0;
    // if the array is empty or one element, count is 0 anyways.
    if (arr.length == 2) {
        if (arr[0] > arr[1]) {
            count = 1
        }
    // copy algorithm from https://www.baeldung.com/cs/merge-sort-top-down-vs-bottom-up
    } else if (arr.length > 2) {
        for (let i = 1; i < arr.length; i=i+i) {
            for ( let j = 0; j < arr.length-i; j += i+i) {
                if (arr.length < j+i+i) {
                    count = merge(arr,j,j+i,arr.length,count)
                } else {
                    count = merge(arr,j,j+i,j+i+i,count)
                }
            }
        }
    }

    return count;
}

// merge two sections of the array arr from low to high.
// low is the first element, and high-1 is the last element
function merge(arr: number[], low: number, mid: number, high: number,count: number): number {
    let merged = new Array(high-low);

    let i = low
    let j = mid
    while (i < mid && j < high) {
        if (arr[i] > arr[j]) {
            merged[i+j-mid] = arr[j];
            count+=mid-i;
            j++;
        } else {
            merged[i+j-mid] = arr[i];
            i++;
        }
    }
    // finish the leftover parts of the array
    while (i < mid) {
        merged[i+j-mid] = arr[i];
        i++;
    }
    while (j < high) {
        merged[i+j-mid] = arr[j];
        j++;
    }

    //copy to the original array
    for (let i = low; i < high; i++) {
        arr[i] = merged[i];
    }
    return count;
}

function mergeCopy(a: number[], b: number[],count): [number[],number] {
    // output array details
    let cLength = a.length + b.length;
    let c = new Array(cLength);
    // indices for the inputs
    let ai = 0;
    let bi = 0;
    // go back and make it a while that depends
    // on the input arrays
    while (ai < a.length && bi < b.length) {
        if (b[bi] < a[ai]) {
            c[ai+bi] = b[bi];
            count += a.length-ai
            bi++;
        } else {
            c[ai+bi] = a[ai];
            ai++;
        }
    }
    // finish the leftover parts of the array
    while (ai < a.length) {
        c[bi+ai] = a[ai]
        ai++;
    }
    while (bi < b.length) {
        c[ai+bi] = b[bi];
        bi++;
    }
    // in the case that the two arrays are done
    // already, do nothing.  No else statement here.
    return [c,count];
}

console.log(mergeCopy([],[],0));
console.log(merge([],0,0,0,0));
console.log(mergeCopy([1],[2],0));
console.log(merge([1,2],0,1,2,0));
console.log(mergeCopy([2],[1],0));
console.log(merge([2,1],0,1,2,0));
console.log(mergeCopy([2,3,4],[1],0));
console.log(merge([2,3,4,1],0,3,4,0));
console.log(mergeCopy([3,4,5],[1,2],0));
console.log(merge([3,4,5,1,2],0,3,5,0));
console.log(mergeCopy([3,5],[1,2,4],0));
console.log(merge([3,5,1,2,4],0,2,5,0));
let a = [1,1,3,5,1,2,4]
console.log(merge(a,2,4,7,0));
console.log(a)

let x = 3;

let testCases = [
    [],
    [1],
    [1,2],
    [2,1],
    [2,1,4],
    [2,4,1],
    [1,1,1,2,2],
    [2,1,3,1,2],
]
for (const t of testCases) {
    console.log(t)
    console.log(countInversions(t))
}
