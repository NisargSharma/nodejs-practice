const connectDB = require('./config/db.js');
const bodyParser = require('body-parser');
const PostRoutes = require('./routes/post-routes');

// create an express application
const app = require('express')();

// import server port from .env file
const PORT = process.env.SERVER_PORT;

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

    // add user routes to the app
    app.use('/api/post', PostRoutes);

    // define simple GET route to return a welcome message
    app.get('/', (req, res) => res.json({ message: `Hello Post microservice!` }));

    // start listening to incoming requests on the defined port
    app.listen(PORT, () => console.log(`Server is listening on port ${ PORT },`));
}

