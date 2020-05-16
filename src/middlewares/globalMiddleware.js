require('dotenv').config();
const jwt = require("jsonwebtoken");
module.exports = () => {
    const loginRequired = (req, res, next) => {
        const {authorization} = req.headers
        if (!authorization) return res.status(401).json({ Error: 'User not authorized to complete the request!'})
        const [text, token] = authorization.split(' ');
        
        try {
            const user_data = jwt.verify(token, process.env.TOKEN_SECRET)
            req.userId = user_data.id; 
            req.userEmail = user_data.email;
            return next();
        } catch (e) {
            return res.status(401).json({Err: 'Token expired or invalid!'})
        }
    }

    return {
        loginRequired,
    }
}