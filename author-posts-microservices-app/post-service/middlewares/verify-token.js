const jwt = require('jsonwebtoken');

/**
 * @description function to authenticate/verify JWT 
 * sent in the request headers
 * @param {Object} req 
 * @param {Object} res 
 * @returns {void}
 */
 exports.authenticateToken = (req, res, next) => {
     
    // error handling if request headers are missing
    if(!req.headers['authorization']) return res.status(401).send({
        authenticated: false,
        message: `No access token provided`
    });

    // destructure and split request headers to get access token
    const token = req.headers['authorization'].split(' ')[1];
  
    // error handling if token not found in request headers
    if (!token) return res.status(401).send({
        authenticated: false,
        message: `No access token provided`
    });
  
    try {
        // verify token using token secret
        jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedToken) => {
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