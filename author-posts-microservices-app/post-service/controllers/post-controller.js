const PostModel = require('../models/post');

// create and save a new post
exports.create = async (req, res) => {
    // error handling for empty request body
    if(!req.body || !req.body.title || !req.body.authorId) {
        return res.status(400).send({ 
            message: `Required post details cannot be empty` 
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

// retrieve all posts
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

// retrieve a single post by id
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

// update a single post by id
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

// delete a single post by id
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