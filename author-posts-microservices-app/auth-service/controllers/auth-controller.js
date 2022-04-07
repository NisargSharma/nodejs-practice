const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthorModel = require('../models/author');


/**
 * @description function to create and save a new author
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} response object with either created author data 
 * and success message or error message
 */
exports.create = async (req, res) => {
    // error handling for empty request body
    if(!req.body || !req.body.firstName || !req.body.lastName
        || !req.body.email || !req.body.password) {
        return res.status(400).send({ 
            message: `Author first name, last name, email and password are required`
        });
    }

    // encrypt the request password using hash method before saving to the db
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // create author model to save with request body
    const author = new AuthorModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        qualification: req.body.qualification,
        domain: req.body.domain,
        awards: req.body.awards,
        gender: req.body.gender
    });

    // save author model in db
    await author.save()
    .then(data => {
        const responseData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            qualification: data.qualification,
            domain: data.domain,
            awards: data.awards,
            gender: data.gender
        }
        res.status(201).send({ 
            message: `Author created successfully`, 
            author: responseData
        });
    })
    .catch(err => res.status(500).send({
        message: err.message || `Something went wrong` 
    }));
}

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
        const author = await AuthorModel.findOne({ email: req.body.email });

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
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}