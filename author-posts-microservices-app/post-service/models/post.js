const mongoose = require('mongoose');

// create post schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    createdDate: {
        type : Date,
        default: Date.now,
    },
    updatedDate: {
        type : Date, 
        default: Date.now,
    },
    authorId: {
        type: String,
        required: true,
        default: ''
    },
    visibility: {
        type: String,
        default: 'private'
    }
});

// export the post model created from the defined schema
module.exports = new mongoose.model('Post', PostSchema);