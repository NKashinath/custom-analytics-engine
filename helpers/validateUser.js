const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateUser = (req, res, next) => {
    let token = req.header("Authorization");
    if(!token){
       return res.status(401).json({error: "Access denied. No token provided."})
    }
    try {
        token = token.replace("Bearer ", "");
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(decode.userId === "AnalyticsEngineUser"){
            next();
        } else{
            throw new Error('User is invalid')
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token.", err: error });
    }
}

module.exports = validateUser