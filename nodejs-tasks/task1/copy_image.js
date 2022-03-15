const fs = require('fs');


/**
 * @description function to copy an image from one path to the other
 * @returns {void}
 */
module.exports = function(sourcePath, destinationPath) {
    // create a readable stream to read data of image file
    const readStream = fs.createReadStream(sourcePath);
    // create a writeable stream to write the data of image file in the destination path
    const writeStream = fs.createWriteStream(destinationPath);

    // combine the writeable stream with readble stream to copy the iamge
    readStream.pipe(writeStream);
}