const mongoose = require('mongoose');

// create Login schema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

// export the Login model created from the defined schema
module.exports = new mongoose.model('Login', LoginSchema);