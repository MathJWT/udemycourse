const User = require('../models/alunoModel');

module.exports = () => {
    const store = async (req, res) => {
        const user = new User(req.body);        
        const name = req.body.name;
        const age = req.body.age
        const user_email = req.body.email;
        let password = req.body.password;

        const userExists = await User.findOne({
            where: {
                email: user_email,
            }
        });;
        console.log(userExists)
        if (userExists) return res.status(400).json({error: 'Patient not found!'});        
     
        password = user.passwordHash(password);
        const newUser = await User.create({
            name,
            email: user_email,
            age,
            password,
        })

        return res.json(newUser);
    }



    return {
        store,

    }
}
