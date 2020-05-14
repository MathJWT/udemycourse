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

    const delet = async (req, res) => {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id);
        
        if (!user) return res.status(401).json({Error: 'User not found'});

        const deleted = await User.destroy({
            where: {
                id: user_id
            }
        }) 

        res.json(deleted)
    };

    const show = async (req, res) => {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id, {
            attributes: ['name', 'email', 'age']
        });

        if (!user) return res.status(401).json({Error: "User not found!"})

        res.json(user)
    }

    const update = async (req, res) => {
        const userClass = new User(req.body)
        const user_id = req.params.user_id;
        const currentPassword = req.body.currentPassword;
        const { name, email, age } = req.body;
        let password = req.body.password;

        const user = await User.findByPk(user_id, {
            attributes: ['name', 'email', 'age', 'password']
        });
        console.log(user.password)
        if (!user) return res.status(404).json({Error: 'User not found!'});

        if (!user.comparePassword(currentPassword, user.password)) return res.status(404).json({Error: 'User not found!'});

        password = userClass.passwordHash(password)

        const updation = User.update({
            name,
            age,
            email,
            password,

        }, {
            where: {
                id: user_id
            }
        })

        res.json(updation)
    }

    return {
        store,
        delet,
        show,
        update
    }
}
