const fs = require('fs');

function readWriteSync() {
    // synchronously read the entire content of a file
    const data = fs.readFileSync("sample.txt", "utf-8");
    // synchronously write data to a file, creating the file if it does not yet exist
    fs.writeFileSync("demo.txt", data, "utf-8");
}

// function call
readWriteSync();