const Sequelize = require('sequelize');
const validator = require('validator');
const appConfig = require('../config/appConfig');

class Picture extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            originalname: Sequelize.STRING,
            filename: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${appConfig.url}/images/${this.getDataValue('filename')}`
                }
            }
        },{
            sequelize,
            paranoid: true,
            tableName: 'pictures',
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Patient, {foreignKey: 'patient_id', as: 'picture-patients'})
    };

};

module.exports = Picture;