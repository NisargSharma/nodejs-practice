const router = require('express').Router();
const AuthController = require('../controllers/auth-controller');
const JoiValidator = require('../middlewares/joi-validator');
const { schemas } = require('../joi-schemas/schemas');

// set up all the request routes for auth apis
router.post('/login', JoiValidator.validateSchema(schemas.loginPOST), AuthController.login);
router.post('/createAuthor', JoiValidator.validateSchema(schemas.authorPOST), AuthController.create);

module.exports = router;