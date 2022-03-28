const fs = require('fs');

/**
 * @description function to count the no. of files 
 * in the current project directory
 * @param {String} path
 * @returns {Number} count of files
 */
module.exports.getFilesCount = function (path) {
    return fs.readdirSync(path)
    .filter(file => (fs.lstatSync(file).isFile() && file !== ".gitignore")).length;
}

/**
 * @description function to count the no. of directories
 * in the current project directory
 * @param {String} path
 * @returns {Number} count of directories 
 */
module.exports.getDirectoriesCount = function (path) {
    return fs.readdirSync(path)
    .filter(file => (fs.lstatSync(file).isDirectory() && file !== "node_modules")).length;
}