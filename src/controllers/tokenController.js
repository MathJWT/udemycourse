require('dotenv').config();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

module.exports = () => {
    const store = async (req, res) => {
        const userModel = new User(req.body)
        const { email } = req.body;
        let password = req.body.password;
        const id = req.params.user_id;
        const user =  await User.findOne({ where: { id, email }})

        if (!email || !user || !password) return res.status(401).json({Error: "The email and password are both required!"})
        
        password = await userModel.comparePassword(password, user.password)
        
        if(!password) return res.status(401).json({Error: 'Password informed is not valid!'})

        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        })

        res.json({token})
    }
    
    return {
        store
    }
}

