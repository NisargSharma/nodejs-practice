const axios = require('axios');

// import author service uri
const AUTHOR_SERVICE_URI = require('config').get('connections.author.uri');

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
        url: `${ AUTHOR_SERVICE_URI }/getAuthorById/${ authorId }`,
        headers : { Authorization: `Bearer ${ token }` }
    })
    .then(author => author.data)
    .catch(error => console.log(error));
}