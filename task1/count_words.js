const fs = require('fs');
const wordsCounter = require('word-counting')


/**
 * @description function to count words in a text file
 * @param {String} filePath
 * @returns {Number} count of words
 */
module.exports = function (filePath) {
    // synchronously read the entire contents of a file with utf-8 encoding
    // and use wordsCounter package to count words in the file
    return wordsCounter(fs.readFileSync(filePath, "utf-8")).wordsCount;
};
