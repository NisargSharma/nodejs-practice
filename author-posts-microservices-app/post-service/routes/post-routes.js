const PostController = require('../controllers/post-controller');
const router = require('express').Router();

// set up all the request routes 
router.post('/createPost', PostController.create);
router.get('/getAllPosts', PostController.findAll);
router.get('/getPostById/:id', PostController.findOne);
router.patch('/updatePostById/:id', PostController.update);
router.delete('/deletePostById/:id', PostController.delete);

module.exports = router;