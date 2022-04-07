const bodyParser = require('body-parser');
// create an express application
const app = require('express')();
const cors = require('cors');
const PostRoutes = require('./routes/post-routes');

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
    app.use(cors(corsOptions));

    // add user routes to the app
    app.use('/api/post', PostRoutes);

    // define simple GET route to return a welcome message
    app.get('/', (req, res) => res.json({ message: `Hello Post microservice!` }));

    // start listening to incoming requests on the defined port
    app.listen(SERVER_PORT, () => console.log(`Post service is listening on port ${ SERVER_PORT },`));
}

