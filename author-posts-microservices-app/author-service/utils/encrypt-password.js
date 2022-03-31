const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @description function to encrypt password by hashing
 * @param {String} password
 * @returns {String} hashed password 
 */
module.exports = (password) => {
    bcrypt.hash(password, saltRounds)
    .then(hashedPassword => hashedPassword)
    .catch(err => { throw err });
}