// import and connect to db
const MongoDB = require('./config/db');
MongoDB.connectDB();

// import and start the http server
const Server = require('./server');
Server.startServer();