const { POST_SERVICE_BASE_URL } = process.env;
const router = require('express').Router();
const apiAdapter = require('./api-adapter');
const RequestAuthorization = require('../middlewares/request-authorization');

/**
 * @description handler to create and save a new post 
 * @returns {Object} response object with either created post data 
 * and success message or error message
 */
router.post('/createPost', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token)
  .post(req.path, req.body)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to retrieve all posts
 * @param {Object} res 
 * @returns {Array} response object with array of all posts 
 * in the collection or error messsage
 */
 router.get('/getAllPosts', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token)
  .get(req.path)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to retrieve single post by id
 * @returns {Object} response object with either post doc found by id 
 * or error messsage
 */
 router.get('/getPostById/:id', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token, req.body)
  .get(req.path)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to retrieve the author details 
 * and associated posts by author id 
 * @returns response object with either author details 
 * and associated posts or error messsage
 */
 router.get('/getAuthorPostsByAuthorId/:authorId', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token)
  .get(req.path)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to update single post by id
 * @returns {Object} response object with either success message 
 * on successful post update or error messsage
 */
 router.patch('/updatePostById/:id', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token)
  .patch(req.path, req.body)
  .then(response => res.send(response.data));
});

/**
 * @description request handler to delete single post by id
 * @returns {Object} response object with either success message 
 * on successful deletion of post or error messsage
 */
 router.delete('/deletePostById/:id', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(POST_SERVICE_BASE_URL, token)
  .delete(req.path)
  .then(response => res.send(response.data));
});

module.exports = router