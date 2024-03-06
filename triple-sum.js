'use strict';
// Complete the triplets function below.
function triplets(a, b, c) {
    const setA = new Set(a);
    const setB = new Set(b);
    const setC = new Set(c);

    const arrayA = Array.from(setA).sort(function(a, b){return a - b});
    const arrayB = Array.from(setB).sort(function(a, b){return a - b});
    const arrayC = Array.from(setC).sort(function(a, b){return a - b});

    let numTriplets = 0;

    // this part is O(n), but sorting earlier was nlogn
    let p = 0, r = 0;
    for (let q = 0; q < arrayB.length; q++) {
        while (p < arrayA.length && arrayA[p] <= arrayB[q]) {
            p++;
        }
        while (r < arrayC.length && arrayC[r] <= arrayB[q]) {
            r++;
        }
        numTriplets+=p*r;
        console.log(p,q,r)
    }

    // only two cases are too slow
    // n^2
    /*
    for (let q = 0; q < arrayB.length; q++) {
        let validPs = 0;
        for (let p = 0; p < arrayA.length; p++) {
            if (arrayA[p] <= arrayB[q]) {
                validPs++;
            }
        }
        let validRs = 0;
        for (let r = 0; r < arrayC.length; r++) {
            if (arrayB[q] >= arrayC[r]) {
                validRs++;
            }
        }
        numTriplets+=validPs*validRs;
    }
    */

    /*
    // five cases time out
    // first attempt, n^3
    for (let p = 0; p < arrayA.length; p++) {
        for (let q = 0; q < arrayB.length; q++) {
            if (arrayA[p] <= arrayB[q]) {
                for (let r = 0; r < arrayC.length; r++) {
                    if (arrayB[q] >= arrayC[r]) {
                        numTriplets++;
                    }
                }
            }
        }
    }
    */

    return numTriplets;
}

console.log(triplets([1,3,5],[2,3],[1,2,3]));
