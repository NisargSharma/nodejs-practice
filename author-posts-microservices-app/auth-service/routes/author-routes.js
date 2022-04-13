const router = require('express').Router();
const apiAdapter = require('./api-adapter');
const Middleware = require('../middlewares/middleware');
const { schemas } = require('../schemas/validation-schemas');

// import base url of author service
const AUTHOR_SERVICE_BASE_URL = require('config').get('connections.author.baseURL');

/**
 * @description route handler to retrieve all authors
 * @returns {Array} response object with array of all authors 
 * in the collection
 */
router.get('/getAllAuthors', Middleware.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  // console.log(req.headers);
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(AUTHOR_SERVICE_BASE_URL, token)
  .get(req.path)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to retrieve single author by id
 * @returns {Object} response object with either author doc found by id
 * or error message
 */
 router.get('/getAuthorById/:id', [Middleware.verifyToken, Middleware.validateSchema(schemas.getAuthorById, 'params')], (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(AUTHOR_SERVICE_BASE_URL, token)
  .get(req.path)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to update single author by id
 * @returns {Object} response object with either success message 
 * on successful author update or error messsage
 */
 router.patch('/updateAuthorById/:id', [Middleware.verifyToken, Middleware.validateSchema(schemas.updateAuthorById, 'body')], (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(AUTHOR_SERVICE_BASE_URL, token, req.body)
  .patch(req.path, req.body)
  .then(response => res.send(response.data));
});

/**
 * @description route handler to delete single author by id
 * @returns {Object} response object with either success message 
 * on successful deletion of author or error messsage
 */
 router.delete('/deleteAuthorById/:id',[Middleware.verifyToken, Middleware.validateSchema(schemas.deleteAuthorById, 'params')], (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(AUTHOR_SERVICE_BASE_URL, token)
  .delete(req.path)
  .then(response => res.send(response.data));
});

module.exports = router