const jwt = require('jsonwebtoken');


/**
 * @description function to authenticate/verify a JWT
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with api result
 */
 exports.authenticateToken = (req, res, next) => {
    // destructure and split request headers to get access token
    const { token } = req.headers['authorization'].split(' ')[1];
  
    // error handling if token not found in request headers
    if (!token) return res.status(401).send({
        authenticated: false,
        message: `No token provided`
    });
  
    try {
        // verify token using token secret
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            // error handling if token verfication fails
            if (err) return res.status(403).send({
                message: `Access forbidden`
            });
    
            // send response for successful token verification
            // res.status(200).send({
            //     authenticated: true,
            //     decoded: decoded,
            //     message: `Token verified successfully`
            // });
            req.authorId = decoded.id;
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