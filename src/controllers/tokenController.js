require('dotenv').config();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const async = require('async')

module.exports = () => {
    const store = (req, res) => {
        const userModel = new User(req.body);
        const { email } = req.body;
        let password = req.body.password;
        const id = req.params.user_id;

        async.auto({
            findUser: (done) => {
                User.findByPk(id, { raw: true })
                .then(resp => done(null, resp))
                .catch(error => done(error));
            }, 
            valid: ['findUser', (done, results) => {
                if (!results.findUser) {
                    done(true);
                    return res.json({Error: 'User not found!'});
                };

                if (!email || !password) return res.status(401).json({Error: "The email and password are both required!"});

                password = userModel.comparePassword(password, results.findUser.password)
                
                if (!password) {
                    done(true);
                    return res.json({Error: 'Password is invalid!'})
                }

                done(null, true)
            }],
            passwordIsValid: ['findUser', 'valid', (done, results) => {
                if (!results.valid) {
                    done(true);
                    return res.json({Error: 'Fields are invalid!'});
                };

                done(null, true);
            }],
            createToken: ['findUser', 'valid', 'passwordIsValid', (done, results) => {
                const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                })

                if (!token) {
                    done(true);
                    return res.json({Error: "Token was not created!"});
                };

                done(null, true);
                return res.json({token})
            }]
        })
    };
    
    return {
        store
    }
}

