const Aluno = require('../models/alunoModel');

module.exports = () => {
    const index = async (req, res) => {
        const users = await Aluno.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users)
    };

    return {
        index
    }
}

