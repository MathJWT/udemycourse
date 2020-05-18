const Sequelize = require('sequelize');
const validator = require('validator');

class Patient extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            cpf: Sequelize.STRING,
        },{
            sequelize,
            paranoid: true,
            tableName: 'patients'
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Company, {foreignKey: 'company_id', as: 'patient-companies'})
    };

    validFields(patient_name, patient_email, patient_age) {
        const name = patient_name;
        const email = patient_email;
        const age = patient_age;
        let valid = true

        if (age && typeof age !== 'number') valid = false;

        if (email && !validator.default.isEmail(email)) valid = false;

        if (name.trim().length <= 5) valid = false;
        console.log('validei full')

        return valid
    }

};

module.exports = Patient;