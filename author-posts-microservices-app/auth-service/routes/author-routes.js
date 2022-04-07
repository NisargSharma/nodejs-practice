const { AUTHOR_SERVICE_BASE_URL } = process.env;
const router = require('express').Router();
const apiAdapter = require('./api-adapter');
const RequestAuthorization = require('../middlewares/request-authorization');

/**
 * @description route handler to retrieve all authors
 * @returns {Array} response object with array of all authors 
 * in the collection
 */
router.get('/getAllAuthors', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
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
 router.get('/getAuthorById/:id', RequestAuthorization.verifyToken, (req, res) => {
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
 router.patch('/updateAuthorById/:id', RequestAuthorization.verifyToken, (req, res) => {
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
 router.delete('/deleteAuthorById/:id', RequestAuthorization.verifyToken, (req, res) => {
  // split request headers to get access token
  const token = req.headers['authorization'].split(' ')[1];
  
  // use apiAdapter to handle incoming http requests 
  // using the microservice base url and auth token
  apiAdapter(AUTHOR_SERVICE_BASE_URL, token)
  .delete(req.path)
  .then(response => res.send(response.data));
});

module.exports = router