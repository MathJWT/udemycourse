const Company = require("../models/companyModel");
const User = require("../models/userModel");

module.exports = () => {
    const store = async (req, res) => {
        try {
            const { user_id } = req.params;
            const { name } = req.body;

            const user = await User.findByPk(user_id);

            if (!user) return res.status(401).json({Error: "User not found!"}) 
        
            const [ company, created] = await Company.findOrCreate({
                where: { name }
            });
        
            if (!created) {
                return res.json({Error: 'Company was not created!'})
            };

            await user.addCompany(company)        
            return res.json({company})
        } catch(err) {
            return res.json(err)
        }
    }

    const delet = async (req, res) => {
        const id = req.params.user_id;
        const { name } = req.body;
        
        const user = await User.findByPk(id)

        //comp[i][name]
        if (!user) return res.status(401).json({Err: 'User not found!'});

        const company = await Company.findOne({
            where: { name }
        });

        if (!company) return res.status(401).json({Err: 'Company not found!'})
        
        await user.removeCompany(company)
        res.json(user);
    }

    const update = async (req, res) => {
        const { previous_name } = req.body;
        const { new_name } = req.body;
        const company = await Company.findOne({
            where: {
                name: previous_name
            }
        });

        if (!company) return res.status(401).json({Error: 'Company not found!'})

        const update = await company.update({
            name: new_name
        })
        
        return res.json(update)
    }

    const index = async (req, res) => {
        const companies = await Company.findAll();
        
        if (companies.length == 0) return res.status(401).json({Error: "There isn't companies in this database."})
        
        return res.json(companies)
    }

    const show = async (req, res) => {
        const { company_id } = req.params;
        const company = await Company.findByPk(company_id)

        if (!company) res.status(401).json({Error: 'Company not found!'});

        res.json(company);
    }
 
    return {
        store,
        delet,
        update,
        index,
        show
    }
}