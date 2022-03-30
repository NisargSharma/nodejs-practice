const http = require('http');
const fs = require('fs');
const csv = require('csvtojson');
const port = process.env.PORT || 3000;

function readCSV() {
    csv()
    .fromFile('./data/10000_Sales_Records.csv')
    .then(jsonData => fs.writeFileSync('./data/jsonData.txt', JSON.stringify(jsonData)));
}

function init() {
    readCSV();
    
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`Hello World!`);
        res.end();
    });

    server.listen(port, () => console.log(`Server listening on port ${port}`));
}

init();