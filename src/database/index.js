const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Aluno = require('../models/alunoModel');
const Index = require('../models/indexModel');
const Address = require("../models/addressModel");
const Tech = require('../models/techModel');
const Contact = require('../models/contactModel');

const connection = new Sequelize(dbConfig);

// Initiations
const models = [Aluno, Index, Address, Tech, Contact]
models.forEach(model => model.init(connection))
// Associations
Tech.Associate(connection.models);
Address.Associate(connection.models);
Aluno.Associate(connection.models);
Contact.Associate(connection.models);

module.exports = connection;