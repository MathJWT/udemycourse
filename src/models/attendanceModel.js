const Sequelize = require('sequelize');
const validator = require('validator');

class Attendance extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            procedure: Sequelize.STRING,
            date: Sequelize.DATE,
            price: Sequelize.INTEGER,
        },{
            sequelize,
            paranoid: true,
            tableName: 'attendances'
        });
        return this;
    };

    static Associate(models) {
        this.belongsTo(models.Patient, {foreignKey: 'patient_id', as: 'attendance-patient'});
    };

    validFields(data) {
        const price = data.price;
        const procedure = data.procedure;
        const date = data.date;
        let valid = true;
        
        if (typeof price !== 'number') {
            valid = false;
        };

        if (typeof procedure !== 'string' || procedure.length <= 6) {
            valid = false;
        };

        if (!date || date.trim().length == 0) {
            valid = false;
        }

        return valid
    }


};

module.exports = Attendance;