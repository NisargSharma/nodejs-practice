/**
 * @desription function to generate token secret for JWT authentication
 * @returns {void}
 */
 function generateTokenSecret() {
    console.log(`${require('crypto').randomBytes(64).toString('hex')}`);
}

generateTokenSecret();