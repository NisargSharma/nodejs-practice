const PostController = require('../controllers/post-controller');
const router = require('express').Router();
const VerifyToken = require('../middlewares/verify-token');

// set up all the request routes for post apis
router.post('/createPost', VerifyToken.authenticateToken, PostController.create);
router.get('/getAllPosts', VerifyToken.authenticateToken, PostController.findAll);
router.get('/getPostById/:id', VerifyToken.authenticateToken, PostController.findOne);
router.patch('/updatePostById/:id', VerifyToken.authenticateToken, PostController.update);
router.delete('/deletePostById/:id', VerifyToken.authenticateToken, PostController.delete);

module.exports = router;