//find duplicate and same values in two array
// var fullWordList = ['1','2','3','4','5'];
// var wordsToRemove = ['1','2','3'];



const fullWordList = ['1', '2', '3', '4', '5'];
const wordsToRemove = ['1', '2', '3'];

////////*********** 1st way ***********////////
const removeWords = [];
const notRemovesWords = [];

// Check for duplicates and same values
for (const word of fullWordList) {
    // 
    if (wordsToRemove.includes(word)) { // includes method is used to check if an array includes the specified element.

        removeWords.push(word); // push method is used to add an element to the end of an array.
    } else {
        notRemovesWords.push(word);
    }
}
console.log(`removed words: ${removeWords}`);
console.log(`remaining words: ${notRemovesWords}`);


////////*********** 2nd way ***********////////

// used filter method to remove duplicate and same values
const filteredWordList = fullWordList.filter(word => !wordsToRemove.includes(word));

console.log(filteredWordList);



