const fs = require('fs');
const path = require('path');

/**
 * @description function to find the word with highest occurence
 * @param {Array} wordsArr 
 * @returns {Object} object with word having highest occurence and its count
 */
function getMostFrequentWord(wordsArr) {
    // create a hashmap of each word and its occurence count 
    // using the reduce method on the words array
    const hashMap = wordsArr.reduce((accObj, val) => {
        accObj[val] = (accObj[val] || 0 ) + 1;
        return accObj;
    }, {});

    // find the key from the hashmap keys with the highest occurence count
    const key = Object.keys(hashMap).reduce((a, b) => hashMap[a] > hashMap[b] ? a : b);
    
    // create and return the highest occuring word 
    // and its count as separate properties in an object
    return { word: key, count: hashMap[key] };
}

/**
 * @description function to read a text file and 
 * log the word with highest occurence and its count
 * @param {String} filePath
 * @returns {void}
 */
module.exports = function(filePath) {
    // asynchronously read the entire contents of a file with utf-8 encoding
    fs.readFile(filePath, "utf-8", (err, data) => {
        // error handling
        if (err) throw err;
        // splitting the file contents using a regex expression 
        // to get all the words in an wordsArray and
        // then logging the count of all words in the file
        const resultObj = getMostFrequentWord(data.split(/[\s.,]+/));
        console.log(`Word with highest occurence in ${path.basename(filePath)} is ${resultObj.word}: ${resultObj.count}`);
    });
}