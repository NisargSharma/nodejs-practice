const fs = require('fs');

function readAppendSync() {
    // synchronously read the entire contents of a file
    const data = fs.readFileSync("sample.txt", "utf-8");
    // synchronously append data to a file, creating the file if it does not yet exist
    fs.appendFileSync("demo.txt", data, "utf-8");
}

// function call
readAppendSync();