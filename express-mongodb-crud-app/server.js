require('dotenv').config();
const connectDB = require('./config/db.js');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/user-routes');

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

// define simple GET route to return a welcome message
app.get('/', (req, res) => res.json({ message: "Hello CRUD app!" }));

// add user routes to the app
app.use('/user', UserRoutes);

// start listening to incoming requests on the defined port
app.listen(PORT, () => console.log(`Server is listening on port ${ PORT },`));
