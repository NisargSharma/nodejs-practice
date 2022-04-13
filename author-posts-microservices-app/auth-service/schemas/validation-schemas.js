const Joi = require('joi') 

/**
 * @description schema definitions for validating 
 * different request body, params and query 
 */
exports.schemas = {
    // auth POST schema
    login: Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),

    // author POST scheema
    createAuthor: Joi.object().keys({ 
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        qualification: Joi.string().allow(null),
        domain: Joi.string().allow(null),
        awards: Joi.array().items(Joi.string()),
        gender: Joi.string().allow(null)
    }),

    // author GET schema
    getAuthorById: Joi.object({
        id: Joi.string().alphanum().length(24).required() 
    }),

    // author PATCH schema
    updateAuthorById: Joi.object({
        // id: Joi.string().alphanum().length(24).required() 
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        qualification: Joi.string().allow(null),
        domain: Joi.string().allow(null),
        awards: Joi.array().items(Joi.string()),
        gender: Joi.string().allow(null)
    }),

    // author DELETE schema
    deleteAuthorById: Joi.object({
        id: Joi.string().alphanum().length(24).required() 
    }),

    // posts POST scheema
    createPost: Joi.object().keys({ 
        title: Joi.string().required(),
        authorId: Joi.string().min(24).required(),
        description: Joi.string().allow(null),
        visibility: Joi.string().allow(null),
        createdDate: Joi.string(),
        updatedDate: Joi.string(),
    }),

    // posts GET schema
    getPostById: Joi.object({
        id: Joi.string().alphanum().length(24).required() 
    }),

    // posts GET all posts with authorId schema
    getAuthorPostsByAuthorId: Joi.object({
        authorId: Joi.string().alphanum().length(24).required() 
    }),

    // posts PATCH schema
    updatePostById: Joi.object({
        // id: Joi.string().alphanum().length(24).required() 
        title: Joi.string(),
        description: Joi.string(),
        visibility: Joi.string(),
        createdDate: Joi.string(),
        updatedDate: Joi.string(),
    }),

    // posts DELETE schema
    deletePostById: Joi.object({
        id: Joi.string().alphanum().length(24).required() 
    }),
}; 