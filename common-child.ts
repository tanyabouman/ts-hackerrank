/*
 * Complete the 'commonChild' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */
// https://en.wikipedia.org/wiki/Longest_common_subsequence#Computing_the_length_of_the_LCS
function commonChild(s1: string, s2: string): number {
    // declare the array
    let commons = new Array(s1.length+1)
    for (let i=0; i<=s1.length; i++) {
        commons[i] = new Array(s2.length)
    }
    // fill the first row and first column with zeros,
    // to represent the prefix with the empty string
    for (let i=0; i<=s1.length;i++) {
        commons[i][0] = 0;
    }
    for (let i=0; i<=s2.length;i++) {
        commons[0][i] = 0;
    }
    for (let i=0; i<s1.length; i++) {
        for (let j=0; j<s2.length; j++) {
            if (s1.at(i) === s2.at(j)) {
                commons[i+1][j+1] = commons[i][j] + 1
            } else {
                commons[i+1][j+1] = Math.max(commons[i+1][j],commons[i][j+1])
            }
        }
    }
    return commons[s1.length][s2.length]
}

let testCases = [
    ["harry","sally"],
    ["SHINCHAN","NOHARAAA"],
    ["ABCDEF","FBDAMN"]
]

for (const t of testCases) {
    console.log(commonChild(t[0],t[1]))
}
