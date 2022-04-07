const PostModel = require('../models/post');
const getAuthorById = require('../external-api-handler/author');

/**
 * @description handler to create and save a new post
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either created post data 
 * and success message or error message
 */
exports.create = async (req, res) => {
    // error handling for empty request body
    if(!req.body || !req.body.title || !req.body.authorId) {
        return res.status(400).send({ 
            message: `Post title and authorId are required` 
        });
    }

    // create post model to save with request body
    const post = new PostModel({
        title: req.body.title,
        description: req.body.description,
        createdDate: req.body.createdDate,
        updatedDate: req.body.updatedDate,
        authorId: req.body.authorId,
    });

    // save post model in db
    await post.save()
    .then(data => res.status(201).send({ 
        message: `Post created successfully`,
        post: data
    }))
    .catch(err => res.status(500).send({ 
        message: err.message || `Something went wrong` 
    }));
}

/**
 * @description handler to retrieve all posts
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Array} response object with array of all posts 
 * in the collection or error messsage
 */
exports.findAll = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || `Something went wrong` 
        });
    }
}

/**
 * @description handler to retrieve single post by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either post doc found by id 
 * or error messsage
 */
exports.findOne = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) return res.status(404).json({ 
            message: `Post not found` 
        });
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message || `Something went wrong` 
        });
    }
}

/**
 * @description handler to retrieve the author details 
 * and associated posts by author id 
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either author details 
 * and associated posts or error messsage
 */
exports.findAllByAuthorId = async (req, res) => {
    try {
        // error handling if authorId is missing in request params
        if (!req.params.authorId) return res.status(400).send({
            message: `Author Id not found`
        });

        // destructure and split request headers to get access token
        const token = req.headers['authorization'].split(' ')[1];

        // retrieve author details using author id
        const author = await getAuthorById(token, req.params.authorId);

        // retrieve all posts using authorId
        const posts = await PostModel.find({ authorId: req.params.authorId });
        // send the retrieved posts as an array of objects
        res.status(200).send({
            author: author,
            posts: posts
        });
    } catch (error) {
        // error handling for server side issues
        return res.status(500).send({
            message: error.message || `Something went wrong`
        });
    }
}

/**
 * @description handler to update single post by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either success message 
 * on successful post update or error messsage
 */
exports.update = async (req, res) => {  
    if(!req.body) return res.status(400).send({ 
        message: `Post details cannot be empty` 
    });

    await PostModel.findByIdAndUpdate(req.params.id, req.body, { 
        useFindAndModify: false 
    })
    .then(data => {
        if (!data) return res.status(404).send({ 
            message: `Post not found`
        });
        
        res.status(200).send({
            message: `Post updated successfully`
        });
    })
    .catch(err => res.status(500).send({
        message: err.message || `Something went wrong`
    }));
}

/**
 * @description handler to delete single post by id
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either success message 
 * on successful deletion of post or error messsage
 */
exports.delete = async (req, res) => {
    await PostModel.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) return res.status(404).send({ 
            message: `Post not found`
        });

        res.status(200).send({ 
            message: `Post deleted successfully`
        });
    })
    .catch(err => res.status(500).send({ 
        message: err.message || `Something went wrong`
    }));
}