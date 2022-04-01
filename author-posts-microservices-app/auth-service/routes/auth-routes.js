const AuthController = require('../controllers/auth-controller');
const router = require('express').Router();

// set up all the request routes 
router.post('/login', AuthController.login);
// router.post('/authenticateToken', AuthController.authenticateToken);

module.exports = router;