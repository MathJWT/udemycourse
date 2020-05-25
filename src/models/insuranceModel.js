const Sequelize = require('sequelize');
const validator = require('validator');
const dbConfig = require('../config/database');
const sequelize = new Sequelize(dbConfig);

class Insurance extends Sequelize.Model {
};

Insurance.init({
    name: Sequelize.STRING,
    plan: Sequelize.STRING
}, {
    paranoid: true,
    sequelize,
    tableName: 'insurances',
    modelName: 'insurances'
});

module.exports = Insurance;

