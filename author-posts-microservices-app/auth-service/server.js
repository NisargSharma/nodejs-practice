const bodyParser = require('body-parser');
// create an express application
const app = require('express')();
const cors = require('cors');
const AuthRoutes = require('./routes/auth-routes');
const AuthorRoutes = require('./routes/author-routes');
const PostRoutes = require('./routes/post-routes');

// import environment variables
const SERVER_HOST = require('config').get('server.host');
const SERVER_PORT = require('config').get('server.port');

// configure cors options to be used by the api
const corsOptions = {
    origin: `http://${ SERVER_HOST }:${ SERVER_PORT }`,
    methods: "*",
    allowedHeaders: ['Content-Type', 'Authorization'],
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

    // add api routes to the app
    app.use('/api/auth', AuthRoutes);
    app.use('/api/author', AuthorRoutes);
    app.use('/api/post', PostRoutes);
    
    // define simple GET route to return a welcome message
    app.get('/', (req, res) => res.json({ message: `Hello auth microservice!` }));

    // start listening to incoming requests on the defined port
    app.listen(SERVER_PORT, () => console.log(`Auth service is listening on port ${ SERVER_PORT },`));
}

