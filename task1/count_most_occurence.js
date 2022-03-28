const fs = require('fs');

/**
 * @description function to find the word with most occurence
 * @param {Array} wordsArr 
 * @returns {Object} object with word having most occurence and its count
 */
function getMostFrequentWord(wordsArr) {
    // create a hashmap of each word and its occurence count 
    // using the reduce method on the words array
    const hashMap = wordsArr.reduce((accObj, val) => {
        accObj[val] = (accObj[val] || 0 ) + 1;
        return accObj;
    }, {});

    // find the key from the hashmap keys with the most occurence count
    const key = Object.keys(hashMap).reduce((a, b) => hashMap[a] > hashMap[b] ? a : b);
    
    // create and return the most occuring word 
    // and its count as separate properties in an object
    return { word: key, count: hashMap[key] };
}

/**
 * @description function to read a text file and 
 * return the word with most occurence and its count
 * @param {String} filePath
 * @returns {Object} object with the most occurring word and its count 
 */
module.exports = function(filePath) {
    // synchronously read the entire contents of a file with utf-8 encoding
    return getMostFrequentWord(fs.readFileSync(filePath, "utf-8").match(/\b[^\d\W\n\r]+\b/g));
}