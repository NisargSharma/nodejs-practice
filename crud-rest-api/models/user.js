const mongoose = require('mongoose');

// create a schema using mongoose
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        default: ''
    },
    lastName: {
        type: String,
        required: true,
        default: ''
    },
    phone: String
});

// export the user model created from the defined schema
module.exports = new mongoose.model('User', userSchema);