const Op = require("sequelize").Op;
const Address = require('../models/addressModel');
const Aluno = require("../models/alunoModel");

module.exports = () => {
    const showAll = async (req, res) => {
        const { user_id } = req.params;
        const user = await Aluno.findAll({
            attributes: ['id', 'name','email'],
            where: {
                id: {
                    [Op.notBetween]: [1,2]
                },
            },
            include: {
                association: 'addresses',
            }
        });
        
        if (!user) return res.status(404).json({ Error: "User not found!" });
        
        return res.json(user);
    };
    
    const insertAddress = async (req, res) => {
        const { user_id } = req.params;
        const { street, number, neighborhood } = req.body;
        const user = await Aluno.findByPk(user_id, {
            include: {
                association: 'addresses'
            }
        });;
        
        if (!user) return res.status(400).json({error: 'Patient not found!'});
        
        if (user.addresses.length > 0) {
            return res.status(400).json({error: 'Patient already got an address!'})
        }
        
        const address = await Address.create({
            street,
            number,
            neighborhood,
            user_id
        })

        return res.json(address);
}

    return {
        insertAddress,
        showAll
    }
}
