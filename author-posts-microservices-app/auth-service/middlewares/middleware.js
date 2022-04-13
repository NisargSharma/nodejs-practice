const jwt = require('jsonwebtoken');

// import token secret for jwt verification/authorization
const TOKEN_SECRET = require('config').get('auth.tokenSecret');

/**
 * @description handler to authenticate/verify JWT 
 * sent in the request headers
 * @param {Object} req 
 * @param {Object} res 
 * @returns {void}
 */
exports.verifyToken = (req, res, next) => {
    // split request headers to get access token
    const token = req.headers['authorization'].split(' ')[1];
  
    // error handling if token not found in request headers
    if (!token) return res.status(401).send({
        authenticated: false,
        message: `No token provided`
    });
  
    try {
        // verify token using token secret
        jwt.verify(token, TOKEN_SECRET, (err, verifiedToken) => {
            // error handling if token verfication fails
            if (err) return res.status(403).send({
                message: `Access forbidden. Token has expired`
            });

            // add the decoded author id to the req object
            // on successful verification of JWT
            req.authorId = verifiedToken.id;
            // execute the next middleware function in line 
            next();
        });
    } catch (error) {
        // server side error handling
        return res.status(500).send({
            authenticated: false,
            message: error.message || `Something went wrong`
        });
    }
}

/**
 * @description handler to validate the request data with a defined schema
 * @param {Object} schema 
 * @param {String} property 
 * @returns {void}
 */
exports.validateSchema = (schema, property) => { 
    return (req, res, next) => {
        // validating the given request property with the defined schema
        // and destructuring the return object to get the error object
        const { error } = schema.validate(req[property]);
      
        if (error == null) {
            // if no errors found, then execute next middleware
            next();
        } else { 
            // if errors are found, map all errors to an object 
            const message = error.details.map(error => error.message).join(',');
            // send the errors in the error response
            res.status(422).json({ error: message });
        } 
    } 
}