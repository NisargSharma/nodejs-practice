const fs = require('fs');

/**
 * @description function to append the provided data into an existing text file
 * @param {String} path
 * @param {String} data 
 */
module.exports = function(path, data) {
    // asynchronously append data to a file, creating the file if it does not yet exist
    fs.appendFile(path, data, "utf-8", (err) => {
        // error handling
        if (err) throw err;
        console.log('The file has been modified!');
    });
}
