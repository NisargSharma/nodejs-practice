const https = require('https');

// defining the https request options to be passed in the http request
const options = {
    hostname: `jsonplaceholder.typicode.com`,
    port: 443,
    path: `/users`,
    method: 'GET'
}

// making an api https request to external web server
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    // event triggered when data is received
    res.on('data', data => process.stdout.write(data));
});

// event triggered if any error occurs in the request
req.on('error', error => console.error(error));

// end the request
req.end()
