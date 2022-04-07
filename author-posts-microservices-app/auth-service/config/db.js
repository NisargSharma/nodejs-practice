const mongoose = require('mongoose');

// import db uri
const MONGODB_URI = require('config').get('db.uri');

/**
 * @description function to establish connection 
 * with mongodb db using mongoose
 * @returns {void}
 */
exports.connectDB = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => {
        console.error(`Could not connect to the database`, err);
        process.exit();
    });
};