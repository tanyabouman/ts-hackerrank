'use strict';


/*
* Complete the 'reverseShuffleMerge' function below.
*
* The function is expected to return a STRING.
* The function accepts STRING s as parameter.
*/
function reverseShuffleMerge(s: string): string {
    // https://www.hackerrank.com/challenges/reverse-shuffle-merge/forum/comments/498596
    let char_freq = new Map();
    for (const c of s) {
        if (char_freq.get(c)) {
            char_freq.set(c, char_freq.get(c)+1);
        } else {
            char_freq.set(c,1)
        }
    }
    let remain_chars = new Map(char_freq);
    let used_chars = new Map(char_freq);
    for (const [k,v] of used_chars) {
        used_chars.set(k,0)
    }
    let res = []

    function can_use(c: string): boolean {
        return (char_freq.get(c) / 2 - used_chars.get(c)) > 0;
    }
    function can_pop(c: string): boolean {
        return used_chars.get(c) + remain_chars.get(c) > (char_freq.get(c) / 2);
    }

    let sArray = Array.from(s).reverse()
    for (const c of sArray) {
        if (can_use(c)) {
            while (res && res[res.length-1] > c && can_pop(res[res.length-1])) {
                let removed_char = res.pop()
                used_chars.set(removed_char,used_chars.get(removed_char)-1)
            }
            used_chars.set(c,used_chars.get(c)+1)
            res.push(c);
        }
        remain_chars.set(c,remain_chars.get(c)-1)
    }

    return res.join('');
}

let testCases = [
    "abcabc",
    "eggegg",
    "aeiouuoiea",
    "abcdefgabcdefg"
]

for (const t of testCases) {
    console.log(reverseShuffleMerge(t))
}
