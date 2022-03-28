const fs = require('fs');


/**
 * @description function to copy a file from one path to the other
 * @returns {void}
 */
module.exports = function(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {
        try {
            // create a readable stream to read data of file
            const readStream = fs.createReadStream(sourcePath);
            // create a writeable stream to write the data of file in the destination path
            const writeStream = fs.createWriteStream(destinationPath);
            // combine the writeable stream with readble stream to copy the file
            readStream
            .pipe(writeStream).on("close", () => resolve());
        } catch (error) {
            reject(error);
            throw error;
        }
    });
}