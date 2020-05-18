const User = require('../models/userModel');

module.exports = () => {
    const store = async (req, res) => {
        const user = new User(req.body);
        const name = req.body.name;
        const age = req.body.age;
        const user_email = req.body.email;
        let password = req.body.password;

        const userExists = await User.findOne({
            where: {
                email: user_email,
            }
        });;

        if (userExists) return res.status(400).json({error: 'User existent!'});        
     
        password = user.passwordHash(password);
        const newUser = await User.create(
            {
                name,
                email: user_email,
                age,
                password,
            }
        )

        return res.json(newUser);
    }

    const delet = async (req, res) => {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id, { paranoid: false }); //Paranoid:false, in order to find the users that were soft deleted

        if (!user) return res.status(401).json({Error: 'User not found'});

        const deleted = await User.destroy({
            where: {
                id: user_id
            },    
        //  force: true, //deletar valendo o file -- paranoid:true
        }) 
        console.log(deleted)
        res.json(deleted)
    };

    const show = async (req, res) => {
        const { user_id }= req.params;
        
        const user = await User.findByPk(user_id, {
            attributes: ['name', 'email', 'age'],
            include: { 
                association: 'companies',
                attributes: ['id', 'name'],
                through: {
                    attributes: [] //Estou fazendo o "members", que seria o through n retornar nada na request
                }
            }
        }); 

        if (!user) return res.status(401).json({Error: "User not found!"})

        res.json(user)
    };

    const update = async (req, res) => {
        const userClass = new User(req.body)    
        const { user_id } = req.params;
        const previousPassword = req.body.senhaAtual;
        const { name, email, age} = req.body;
        let password = req.body.password;
        const user = await User.findByPk(user_id, { 
            attributes: ['name', 'email', 'age', 'password']
        });

        if (!user) return res.status(401).json({Error: 'User not found!'});

        if (!userClass.comparePassword(previousPassword, user.password)) return res.status(404).json({Error: 'Incorrect password!'});

        password = userClass.passwordHash(password)

        const updation = await user.update({
            id: user_id,
            name,
            age,
            email,
            password,
        })
        console.log(updation)
        res.json(updation)
    }

    return {
        store,
        delet,
        show,
        update
    }
}
