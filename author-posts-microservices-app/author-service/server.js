const bodyParser = require('body-parser');
// create an express application
const app = require('express')();
const cors = require('cors');
const AuthorRoutes = require('./routes/author-routes');

// import environment variables
const SERVER_PORT = require('config').get('server.port');
const API_GATEWAY_HOST = require('config').get('connections.apiGateway.host');
const API_GATEWAY_PORT = require('config').get('connections.apiGateway.port');

// configure cors options to be used by the api
const corsOptions = {
    origin: `http://${ API_GATEWAY_HOST }:${ API_GATEWAY_PORT }`,
    methods: "*",
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200 // For legacy browser support
}

const allowlist = [ `http://${ API_GATEWAY_HOST }:${ API_GATEWAY_PORT }` ]

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    console.log(req.headers);
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        console.log("in if");
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        console.log("in else");
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

/**
 * @description function to configure the server with required parameters
 * using express methods and start listening for incoming http requests
 * @returns {void}
 */
exports.startServer = () => {
    // add middlewares that parses the request (of various content types) 
    // and creates a req.body object that can be accessed by our routes
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // enable cors middleware
    app.use(cors(corsOptionsDelegate));

    // add user routes to the app
    app.use('/api/author', AuthorRoutes);

    // define simple GET route to return a welcome message
    app.get('/', (req, res) => res.json({ message: `Hello author microservice!` }));

    // start listening to incoming requests on the defined port
    app.listen(SERVER_PORT, () => console.log(`Author service is listening on port ${ SERVER_PORT },`));
}
