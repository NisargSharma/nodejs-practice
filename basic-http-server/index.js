const http = require('http');
const port = process.env.PORT || 3000;

// creating an instance of http server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Hello World!</h1?`);
});

// server starts listening on the specified port for incoming http requests
server.listen(port, () => console.log(`Server running at port ${port}`));