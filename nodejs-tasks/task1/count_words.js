const fs = require('fs');
const path = require('path');


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
        // splitting the file contents using a regex expression 
        // to get all the words in an array and
        // then logging the count of all words in the file
        console.log(`Count of words in ${path.basename(filePath)}: ${data.split(/[\s.,]+/).length}`);
    });
}
