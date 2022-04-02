const dotenv = require('dotenv');
// load .env variables into process.env
dotenv.config();
const connectDB = require('./config/db.js');
const bodyParser = require('body-parser');
const PostRoutes = require('./routes/post-routes');

// create an express application
const app = require('express')();

// import server port from .env file
const PORT = process.env.SERVER_PORT;

// connect to the db
connectDB();

// add middlewares that parses the request (of various content types) 
// and creates a req.body object that can be accessed by our routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add post routes to the app
app.use('/api/post', PostRoutes);

// define simple GET route to return a welcome message
app.get('/', (req, res) => res.json({ message: `Hello post microservice!` }));

// start listening to incoming requests on the defined port
app.listen(PORT, () => console.log(`Server is listening on port ${ PORT },`));
