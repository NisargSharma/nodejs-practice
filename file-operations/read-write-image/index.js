const fs = require('fs');

/**
 * @description function to copy an image from one path to the other
 * @returns {void}
 */
function readWriteImage() {
    // create a readable stream to read data  of image file
    const readStream = fs.createReadStream('source/image.jpg');
    // create a writeable stream to write the data of image file in the destination
    const writeStream = fs.createWriteStream('destination/image.jpg');

    // combine the writeable stream with readble stream
    readStream.pipe(writeStream);
}

// function call
readWriteImage();
