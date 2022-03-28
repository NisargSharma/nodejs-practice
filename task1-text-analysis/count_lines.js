const fs = require('fs');

/**
 * @description function to read and count lines in a text file
 * @param {String} filePath
 * @returns {Number} count of lines
 */
module.exports = function(filePath) {
    // read file from given path, split using new line character
    // and return the length
    return fs.readFileSync(filePath, "utf8").split("\n").length;
}
