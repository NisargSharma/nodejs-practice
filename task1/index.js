const copyImage = require('./copy_image');
const getWordCount = require('./count_words');
const getLinesCount = require('./count_lines');
const getHighestOccurence = require('./count_highest_occurence');
const filesAndDirectoriesCount = require('./count_files_directories');
const getMemoryUsage = require('./memory_usage');


/**
 * @description wrapper function
 * @returns {void}
 */
function init() {
    // copy image from source directory to destination directory
    copyImage("source/image.jpg", "destination/copy_image.jpg");

    // log count of words in text file
    getWordCount("source/db.txt");

    // log the count of lines in text file
    getLinesCount("source/db.txt");

    // log the word with highest occurence with its count
    getHighestOccurence("source/db.txt");

    // count and log number of files in current project directory
    filesAndDirectoriesCount.getFilesCount('C:/Users/nisarg.rupesh.sharma/Desktop/training/nodejs/task1');

    // count and log number of directories in current project directory
    filesAndDirectoriesCount.getDirectoriesCount('C:/Users/nisarg.rupesh.sharma/Desktop/training/nodejs/task1');

    // log the memory usage of this script
    getMemoryUsage();

}

// function call
init();