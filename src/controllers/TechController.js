const Tech = require("../models/techModel");
const Aluno = require("../models/alunoModel");

module.exports = () => {
    const deleteTechnology = async (req, res) => {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await Aluno.findByPk(user_id);

        if(!user) return res.status(404).json({Error: 'Patient not found!'});

        const tech = await Tech.findOne({
            where: { name }
        });

        const deletedTech = await user.removeTech();
        console.log('that is my deletedTech: ' + deletedTech)
        return res.json(tech);
    }

    const showTechnologies = async (req, res) => {
        const { user_id } = req.params;
        const user = await Aluno.findByPk(user_id, {
            include: [
                { association: 'addresses'},
                { association: 'techs'}
            ]
        })

        if (!user) return res.status(404).json({Error: 'Patient not found!'})
        res.json(user)
    };

    const insertTechonology = async (req, res) => {
        const { user_id } = req.params;
        const { name } = req.body;
        
        const user = await Aluno.findByPk(user_id, {
            include: [
                { association: 'addresses' }, 
                { association: 'techs' }
            ]
        });
        if (!user) return res.status(404).json({Error: 'User not found!'});
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        })
        
        // addTech
        // getTech
        //removeTech
        await user.addTech(tech);
        return res.json(user)
    }
 
    return {
        showTechnologies,
        insertTechonology,
        deleteTechnology
    }
}