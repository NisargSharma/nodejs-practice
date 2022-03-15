const fs = require('fs');
const path = require('path');
const linesCount = require('file-lines-count');

/**
 * @description function to read and log the number of 
 * lines in a text file
 * @param {String} filePath
 * @returns {void}
 */
module.exports = async function(filePath) {
    // using the file-lines-count package to get the count of lines from file
    const count = await linesCount(filePath);
    console.log(`Count of lines in ${path.basename(filePath)}: ${count}`);
}
