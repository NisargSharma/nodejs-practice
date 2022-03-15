const csv = require('csv-parser');
const fs = require('fs');


/**
 * @description main wrapper function
 * @returns {void}
 */
function init() {
    const csvData = [];
    // read csv file using csv-parser package and store the read data
    fs.createReadStream('sources/10000_Sales_Records.csv')
    .pipe(csv())
    .on('data', (data) => csvData.push(data))
    .on('end', () => console.log(csvData));
}

// function call
init();