const AuthorModel = require('../models/author');

/**
 * @description handler to retrieve all authors
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
 * @description handler to retrieve single author by id
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
 * @description handler to update single author by id
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
 * @description handler to delete single author by id
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