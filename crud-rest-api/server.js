const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const UserRoutes = require('./routes/User');

const port = 3000;

// create an express application
const app = require('express')();

// add middlewares that parses the request (of various content types) 
// and creates a req.body object that can be accessed by our routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the database using mongoose
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.uri, {
   useNewUrlParser: true
})
.then(() => console.log(`Database connected successfully`))
.catch(err => {
    console.error(`Could not connect to the database`, err);
    process.exit();
});

// define simple GET route to return a welcome message
app.get('/', (req, res) => res.json({ message: "Hello CRUD app!" }));

// add user routes to the app
app.use('/user', UserRoutes);

// start listening to incoming requests on the defined port
app.listen(port, () => console.log(`Server is listening on port ${ port },`));
