const Joi = require('joi') 

exports.schemas = {
    
    loginPOST: Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),

    authorPOST: Joi.object().keys({ 
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        qualification: Joi.string().allow(null),
        domain: Joi.string().allow(null),
        awards: Joi.array().items(Joi.string()),
        gender: Joi.string().allow(null)
    })
}; 