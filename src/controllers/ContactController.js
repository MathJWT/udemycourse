const Op = require("sequelize").Op;
const Aluno = require("../models/alunoModel");
const Contact = require("../models/contactModel");

module.exports = () => {
    const show = async (req, res) => {
        const { user_id } = req.params;
        const user = await Aluno.findAll({
            attributes: ['id', 'name','email'],
            where: {
                id: {
                    [Op.notBetween]: [1,2]
                },
            },
            include: [{
                association: 'addresses',
            },
            {
                association: 'techs',
            }
            ]
        });
        
        if (!user) return res.status(404).json({ Error: "User not found!" });
        
        return res.json(user);
    };
    
    const store = async (req, res) => {
        const { user_id } = req.params;
        const { name, email, cellphone } = req.body;
        const user = await Aluno.findByPk(user_id, {
            include: [ { association: 'contacts' }, { association: 'addresses' } ]
        });;
        
        if (!user) return res.status(400).json({error: 'Patient not found!'});
        
        const contact = await Contact.findOrCreate({
            where: {
            name,
            email,
            cellphone,
            user_id
            }
        })

        return res.json(contact);
    }

    const update = async (req, res) => {
        const id_user = req.params.user_id;
        const contact_id = req.params.contact_id;
        const user = await Aluno.findByPk(id_user, {
            include: [{association: 'addresses'}, {association: 'contacts'}]
        });

        if (!user) res.status(401).json({Error: 'User not found!'});

        const contact = await Contact.findByPk(contact_id);

        if(!contact) res.status(401).json({Error: 'Contact not found!'});
        console.log('antes do updated')
        const updated = await Contact.update(
            {
                name: req.body.name,
                email: req.body.email,
                cellphone: req.body.cellphone
            },
            {
                where: {
                    id: {
                        [Op.gt]: 20
                    }
                }
            }
        )
        console.log(updated)
        return res.json(updated)
    }

    const delet = async (req, res) => {
        const id_user = req.params.user_id;
        console.log("My idUser = " + id_user)
        const email_user = req.body.email;
        const user = await Aluno.findByPk(id_user, {
            include: [
                { association: 'contacts' },
                { association: 'addresses' }
            ]
        })
        if (!user) return res.status(404).json({Error: 'Patient not found!'});
        
        const contact = await Contact.findAll({
            where: {
                user_id: id_user,
                email: email_user,
            }
        });
        if (!contact) return res.status(404).json({Error: "This user doesn't have a contact with this name and email to be excluded!"});
        
       const deleted =  await Contact.destroy( {
        where: {
            user_id: id_user,
            email: email_user,
        }
       });
        
        res.json(deleted)
    };

    return {
        store,
        show, 
        delet,
        update
    }
}
