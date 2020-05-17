require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
module.exports = () => {
    const loginRequired = (req, res, next) => {
        const {authorization} = req.headers
        if (!authorization) return res.status(401).json({ Error: 'User not authorized to complete the request!'})
        const [text, token] = authorization.split(' ');
        
        try {
            const user_data = jwt.verify(token, process.env.TOKEN_SECRET)
            const isValid = User.findOne({
                where: {
                    email: user_data.email,
                    id: user_data.email
                }
            })

            if (!isValid) return res.status(401).json({Error: 'Invalid token!'})

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