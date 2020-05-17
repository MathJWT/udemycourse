const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Users = require('../models/userModel');
const Companies = require('../models/companyModel');

const connection = new Sequelize(dbConfig);
// Initializations
Users.init(connection)
Companies.init(connection)
Users.Associate(connection.models);
Companies.Associate(connection.models);

module.exports = connection;    