const router = require('express').Router();
const AuthController = require('../controllers/auth-controller');
const Middleware = require('../middlewares/middleware');
const { schemas } = require('../schemas/validation-schemas');

// set up all the request routes for auth apis
router.post('/login', Middleware.validateSchema(schemas.login, 'body'), AuthController.login);
router.post('/createAuthor', Middleware.validateSchema(schemas.createAuthor, 'body'), AuthController.create);

module.exports = router;