const mongoose = require('mongoose');

// import db uri from .env file
const DB_URI = process.env.MONGODB_URI;

/**
 * @description async function to establish connection 
 * with mongodb db using mongoose
 * @returns {void}
 */
module.exports = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(DB_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => {
        console.error(`Could not connect to the database`, err);
        process.exit();
    });
};