const fs = require('fs');
const writeData = require('./write.js');

/**
 * @description function to read a text file
 * @returns {void}
 */
function readData() {
    // asynchronously read the entire contents of a file with utf-8 encoding
    fs.readFile("sample.txt", "utf-8", (err, data) => {
        // error handling
        if (err) reject(err);
        // function call to write data to a text file
        writeData("demo.txt", data);
    });
}

// function call
readData();
