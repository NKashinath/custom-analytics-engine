const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (userId) => {
    console.log("Secret Key:", process.env.JWT_SECRET);
   return jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn:"1h"
    })
}

module.exports = tokenGenerator;