const fs = require('fs');

/**
 * @description function to log the count of files 
 * in the current project directory
 * @param {String} path
 * @returns {void} 
 */
module.exports.getFilesCount = function (path) {
    // asynchronously read the project directory using readdir method
    fs.readdir(path, (err, files) => {
        // error handling
        if (err) throw err;
        // filtering the files array to get only the files and not directories
        const allFiles = files.filter(file => (fs.lstatSync(file).isFile() && file !== ".gitignore"));
        // logging the count of all the files in the provided path 
        console.log(`Count of files in current project: ${allFiles.length}`);
    });
}

/**
 * @description function to log the count of directories
 * in the current project directory
 * @param {String} path
 * @returns {void} 
 */
module.exports.getDirectoriesCount = function (path) {
    // asynchronously read the project directory using readdir method
    fs.readdir(path, (err, files) => {
        // error handling
        if (err) throw err;
        // filtering the files array to get only the directories 
        const allDirectories = files.filter(file => (fs.lstatSync(file).isDirectory() && file !== "node_modules"));
        // logging the count of all the directories in the provided path 
        console.log(`Count of directories in current project: ${allDirectories.length}`);
    });
}