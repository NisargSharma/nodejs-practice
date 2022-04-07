const router = require('express').Router();
const AuthController = require('../controllers/auth-controller');

// set up all the request routes for auth apis
router.post('/login', AuthController.login);
router.post('/createAuthor', AuthController.create);

module.exports = router;