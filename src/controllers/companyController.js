const Company = require("../models/companyModel");
const User = require("../models/userModel");

module.exports = () => {
    const store = async (req, res) => {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) return res.status(401).json({Error: "User not found!"}) 
    
        const [ company ] = await Company.findOrCreate({
            where: { name }
        })
        
        await user.addCompany(company)        
        return res.json({company})
    }

    return {
        store
    }
}