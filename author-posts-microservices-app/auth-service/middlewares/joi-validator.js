const Joi = require('joi'); 

exports.validateSchema = (schema, property) => { 
  return (req, res, next) => {
      const { error } = schema.validate(req.body);

      if (error == null) { 
          next(); 
      } else { 
        const message = error.details.map(error => error.message).join(',');
        res.status(422).json({ error: message }) } 
    } 
}