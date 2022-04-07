const AuthorController = require('../controllers/author-controller');
const router = require('express').Router();

// set up all the request routes for author apis
router.get('/getAllAuthors', AuthorController.findAll);
router.get('/getAuthorById/:id', AuthorController.findOne);
router.patch('/updateAuthorById/:id', AuthorController.update);
router.delete('/deleteAuthorById/:id', AuthorController.delete);

module.exports = router;