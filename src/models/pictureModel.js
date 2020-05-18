const Sequelize = require('sequelize');
const validator = require('validator');

class Picture extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            cpf: Sequelize.STRING,
        },{
            sequelize,
            paranoid: true,
            tableName: 'pictures'
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Patient, {foreignKey: 'patient_id', as: 'picture-patients'})
    };

};

module.exports = Picture;