const path = require('path')

/**
 * @description function to perform basic path operations
 * @returns {void}
 */
function pathOperations() {
    const filePath='C:/Users/nisarg.rupesh.sharma/Desktop/training/nodejs/path-operations/index.js';

    console.log(`Directory name: ${path.dirname(filePath)}`);
    console.log(`Base file location: ${path.basename(filePath)}`);
    console.log(`Extension: ${path.extname(filePath)}`);

    // join two or more parts of a path
    const joinedPath = path.join('/', 'users', 'john', 'notes.txt');
    console.log(`Joined path: ${joinedPath}`);

    // parse the path to an object
    const pathObject = path.parse('/users/test.txt')
    console.log(`Object after parsing: ${pathObject}`);
}

// function call
pathOperations();
