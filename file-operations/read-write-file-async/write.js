const fs = require('fs');

/**
 * @description function to write the provided data into a new text file
 * @param {String} path
 * @param {String} data 
 */
module.exports = function(path, data) {
    // asynchronously write data to a file, creating the file if it does not yet exist
    fs.writeFile(path, data, "utf-8", (err) => {
        // error handling
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
