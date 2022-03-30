const path = require('path');
const copyImage = require('./copy_image');
const getWordCount = require('./count_words');
const getLinesCount = require('./count_lines');
const getMostOccurence = require('./count_most_occurence');
const filesAndDirectoriesCount = require('./count_files_directories');
const http = require('http');
const port = process.env.PORT || 3000;


function init() {
    // creating an instance of http server
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // copy image from one directory to another
        copyImage("source/image.jpg", "destination/copy_image.jpg")
        .then(res.write(`<h2>File ${path.basename("source/image.jpg")} is copied from ${path.dirname("source/image.jpg")} directory to ${path.dirname("destination/copy_image.jpg")} directory</h2>`));
        
        // // get the most occurring word in a file and its occurence count
        result = getMostOccurence("source/db.txt");
        res.write(`<h2>Word with most occurence in ${path.basename("source/db.txt")} is "${result.word}" with a word count: ${result.count}</h2>`);

        // get the count of words in text file and send it in response
        res.write(`<h2>Count of words in ${path.basename("source/db.txt")}: ${getWordCount("source/db.txt")}</h2>`);

        // get the count of lines in text file and send it in response
        res.write(`<h2>Count of lines in ${path.basename("source/db.txt")}: ${getLinesCount("source/db.txt")}</h2>`);

        // get count of all files in a project directory
        res.write(`<h2>Count of files: ${filesAndDirectoriesCount.getFilesCount("C:/Users/nisarg.rupesh.sharma/Desktop/training/nodejs/task1-text-analysis")}</h2>`);

        // get count of all directories in a project directory
        res.write(`<h2>Count of directories: ${filesAndDirectoriesCount.getDirectoriesCount("C:/Users/nisarg.rupesh.sharma/Desktop/training/nodejs/task1-text-analysis")}</h2>`);

        // using the process module to get the memory usage of script
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        res.write(`<h2>The script uses approximately ${Math.round(memoryUsage * 100) / 100} MB</h2>`);

        res.end();
    });

    // server starts listening on the specified port for incoming http requests
    server.listen(port, () => console.log(`Server running on port ${port}`));
}

init();