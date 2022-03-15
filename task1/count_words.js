const fs = require('fs');
const path = require('path');
const wordsCounter = require('word-counting')


/**
 * @description function to read and log the number of words in a text file
 * @param {String} filePath
 * @returns {void}
 */
module.exports = function(filePath) {
    // asynchronously read the entire contents of a file with utf-8 encoding
    fs.readFile(filePath, "utf-8", (err, data) => {
        // error handling
        if (err) throw err;
        // using the word-counting package to get the count of words from data 
        const count = wordsCounter(data).wordsCount;
        console.log(`Count of words in ${path.basename(filePath)}: ${count}`);
    });
}
