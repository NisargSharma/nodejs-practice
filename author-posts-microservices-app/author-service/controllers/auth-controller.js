const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Author = require('../models/author');


/**
 * @description function to authenticate user login
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either generated access token 
 * on successful verification or error message
 */
exports.login = async (req, res) => {
    try {
        // error handling for empty request body or missing parameters
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).send({
                message: `Email and password are required. Please try again`
            });
        }

        // retrieve author by email
        const author = await Author.findOne({ email: req.body.email });

        // error handling if no author found by request email
        if (!author) return res.status(404).send({
            message: `No author found with email id ${req.body.email}`
        });

        // check if request password matches the hashed/encrypted password stored in db
        const isValidPassword = await bcrypt.compare(req.body.password, author.password)

        // error handling if password does not match
        if (!isValidPassword) return res.status(401).send({
            message: `Password is incorrect`
        });

        // generate access token if password matces
        const token = generateAccessToken({ id: author._id });

        // return the access token in response for successful authentication 
        res.status(200).send({
            authenticated: true,
            token: token,
            authorId: author._id,
            message: `Login successful`
        })
    } catch (error) {
        // server side error handling
        return res.status(500).send({
            message: error.message || `Something went wrong`
        });
    }
}

/**
 * @description function to generate a signed JWT 
 * using the provided payload data and token secret
 * @param {Object} payload 
 * @returns {String} signed JWT access token
 */
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}