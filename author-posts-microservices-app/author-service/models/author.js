const mongoose = require('mongoose');

// create author schema
const AuthorSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        default: ''
    },
    domain: {
        type: String,
        default: ''
    },
    awards: [{
        type: String,
    }],
    gender: {
        type: String,
        default: ''
    }
});

// export the author model created from the defined schema
module.exports = new mongoose.model('Author', AuthorSchema);