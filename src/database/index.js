const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Users = require('../models/userModel');
const Companies = require('../models/companyModel');
const Patients = require('../models/patientModel');
const Pictures = require('../models/pictureModel');
const Attendances = require('../models/attendanceModel');

const connection = new Sequelize(dbConfig);

// Initializations
Attendances.init(connection);
Pictures.init(connection);
Patients.init(connection);
Users.init(connection);
Companies.init(connection);

//Associations
Attendances.Associate(connection.models);
Pictures.Associate(connection.models);
Users.Associate(connection.models);
Companies.Associate(connection.models);
Patients.Associate(connection.models);

module.exports = connection;    