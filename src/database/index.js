const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Users = require('../models/userModel');
const Companies = require('../models/companyModel');
const Patients = require('../models/patientModel');


const connection = new Sequelize(dbConfig);
// Initializations
Patients.init(connection)
Users.init(connection)
Companies.init(connection)

//Associations
Users.Associate(connection.models);
Companies.Associate(connection.models);
Patients.Associate(connection.models)

module.exports = connection;    