const AuthorModel = require('../models/Author');
const encryptPassword = require('../utils/encrypt-password.js');

// create and save a new author
exports.create = async (req, res) => {
    // error handling for empty request body
    if(!req.body) {
        res
        .status(400)
        .send({ message: `Author details cannot be empty` });
    }

    // create author model to save with request body
    const author = new AuthorModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptPassword(req.body.password),
        qualification: req.body.qualification,
        domain: req.body.domain,
        awards: req.body.awards,
        gender: req.body.gender
    });

    // save author model in db
    await author.save()
    .then(data => 
        res
        .status(200)
        .send({ 
            message: `Author created successfully`, 
            author: data
        })
    )
    .catch(err =>
        res
        .status(500)
        .send({ message: err.message || `Something went wrong` })
    )
}

// retrieve all authors
exports.findAll = async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        res
        .status(200)
        .json(authors);
    } catch (error) {
        res
        .status(404)
        .json({ message: error.message });
    }
}

// retrieve a single author by id
exports.findOne = async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            res
            .status(404)
            .json({ message: `Author not found` });
        } else {
            res
            .status(200)
            .json(author);
        }
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message || `Something went wrong` });
    }
}

// update a single author by id
exports.update = async (req, res) => {  
    if(!req.body) {
        res
        .status(400)
        .send({ message: `Author details cannot be empty` });
    }

    await AuthorModel.findByIdAndUpdate(req.params.id, req.body, { 
        useFindAndModify: false 
    })
    .then(data => {
        if(!data) {
            res
            .status(404)
            .send(`Author not found`)
        } else {
            res
            .status(200)
            .send({ message: `Author updated successfully` });
        }
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message || `Something went wrong` });    
    });
}

// delete a single author by id
exports.delete = async (req, res) => {
    await AuthorModel.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            res
            .status(404)
            .send({ message: `Author not found` });
        } else {
            res
            .status(200)
            .send({ message: `Author deleted successfully` });
        }
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: err.message || `Something went wrong` });
    });
}