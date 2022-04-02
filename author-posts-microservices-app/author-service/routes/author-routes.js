const AuthController = require('../controllers/auth-controller');
const AuthorController = require('../controllers/author-controller');
const router = require('express').Router();
const VerifyToken = require('../middlewares/verify-token');

// set up all the request routes for author apis
router.post('/login', AuthController.login);
router.post('/createAuthor', AuthorController.create);
router.get('/getAllAuthors', VerifyToken.authenticateToken, AuthorController.findAll);
router.get('/getAuthorById/:id', VerifyToken.authenticateToken, AuthorController.findOne);
router.patch('/updateAuthorById/:id', VerifyToken.authenticateToken, AuthorController.update);
router.delete('/deleteAuthorById/:id', VerifyToken.authenticateToken, AuthorController.delete);

module.exports = router;