const axios = require('axios');

/**
 * @description function to create an instance of axios http client 
 * to be used for making http requests to the microservices
 * @param {String} baseURL 
 * @param {String} token 
 * @returns {Object} axios object to handle incoming http request
 */
module.exports = (baseURL, token) => axios.create({
    baseURL: baseURL, 
    headers: { 'Authorization': `Bearer ${ token }` }
});