const AuthorModel = require('../models/author');
const bcrypt = require('bcrypt');

/**
 * @description function to create and save a new author
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either created author data 
 * and success message or error message
 */
exports.create = async (req, res) => {
    // error handling for empty request body
    if(!req.body || !req.body.firstName || !req.body.lastName
        || !req.body.email || !req.body.password) {
        return res.status(400).send({ 
            message: `Author first name, last name, email or password cannot be empty`
        });
    }

    // encrypt the request password using hash method before saving to the db
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // create author model to save with request body
    const author = new AuthorModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        qualification: req.body.qualification,
        domain: req.body.domain,
        awards: req.body.awards,
        gender: req.body.gender
    });

    // save author model in db
    await author.save()
    .then(data => {
        const responseData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            qualification: data.qualification,
            domain: data.domain,
            awards: data.awards,
            gender: data.gender
        }
        res.status(201).send({ 
            message: `Author created successfully`, 
            author: responseData
        });
    })
    .catch(err => res.status(500).send({
        message: err.message || `Something went wrong` 
    }));
}

/**
 * @description function to retrieve all authors
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Array} response object with array of all authors 
 * in the collection or error messsage
 */
exports.findAll = async (req, res) => {
    try {
        const authors = await AuthorModel.find().select('-password');
        res.status(200).json(authors);
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || `Something went wrong`
        });
    }
}

/**
 * @description function to retrieve single author by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either author doc found by id 
 * or error messsage
 */
exports.findOne = async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id, { password: false });
        if (!author) return res.status(404).json({ 
            message: `Author not found`
        });
        res.status(200).json(author);
    } catch (error) {
        return res.status(500).json({
            message: error.message || `Something went wrong`
        });
    }
}

/**
 * @description function to update single author by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either success message 
 * on successful author update or error messsage
 */
exports.update = async (req, res) => {  
    if(!req.body) return res.status(400).send({ 
        message: `Author details cannot be empty`
    });

    await AuthorModel.findByIdAndUpdate(req.params.id, req.body)
    .select('-password')
    .then(data => {
        if (!data) return res.status(404).send({
            message: `Author not found`
        }); 
        res.status(200).send({
            message: `Author updated successfully`
        });
    })
    .catch(err => res.status(500).send({
        message: err.message || `Something went wrong`
    }));
}

/**
 * @description function to delete single author by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either success message 
 * on successful deletion of author or error messsage
 */
exports.delete = async (req, res) => {
    await AuthorModel.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) return res.status(404).send({
            message: `Author not found`
        });
        
        res.status(200).send({
            message: `Author deleted successfully`
        });
    })
    .catch(err => res.status(500).send({
        message: err.message || `Something went wrong`
    }));
}