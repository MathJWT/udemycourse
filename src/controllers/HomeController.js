const Aluno = require('../models/alunoModel');

module.exports = () => {
    const index = async (req, res) => {
        res.json({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });
    };

    return {
        index
    }
}

