//longest-chain-of-letters-in-word-javascript
const word = '00000111110101001111100001001';

//////*********** 1st way ***********////////
/////brute force/////

var current = 0;
var max = 0;

for (let i = 0; i < word.length; i++) {
    if (word[i] === '1') {
        current++;
        if (current > max) {
            max = current;
        }
    } else {
        current = 0;
    }
}

console.log("Longest chain of letters length:", max);

//////*********** 2nd way ***********////////
/////using reduce method/////

const longestChain = word.split('0').reduce((acc, curr) => { // split method and reduce method is used to split a string into an array of substrings, and returns the new array. reduce method is used to reduce the array to a single value.
    return Math.max(acc, curr.length);
}
    , 0);

console.log("Longest chain of letters length:", longestChain);

//////*********** 3rd way ***********////////
/////using match method/////

const longestChain2 = word.match(/1+/g).reduce((acc, curr) => { // match method is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring.
    return Math.max(acc, curr.length);
});

console.log("Longest chain of letters length:", longestChain2);


