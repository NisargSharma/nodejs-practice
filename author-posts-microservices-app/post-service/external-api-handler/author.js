const { AUTHOR_SERVICE_PORT, SERVER_HOST } = process.env;
const axios = require('axios');

/**
 * @description function to retrieve author details by invoking 
 * author microservice api using the provided authorId and access token
 * @param {String} token 
 * @param {String} authorId 
 * @returns {Object} JSON object with retrieved author details
 */
module.exports = async (token, authorId) => {
    // use the axios http client to invoke microservice api endpoint
    // and get the author details object    
    return await axios({
        method: 'get',
        url: `http://${ SERVER_HOST }:${ AUTHOR_SERVICE_PORT }/api/author/getAuthorById/${ authorId }`,
        headers : { Authorization: `Bearer ${ token }` }
    })
    .then(author => author.data)
    .catch(error => console.log(error));
}