const express = require("express");
const route = express.Router();
const homeController  = require('../controllers/HomeController')();
const alunoController = require('../controllers/AlunoController')();
const addressController = require("../controllers/AddressController")();
const techController = require('../controllers/TechController')();
const contactController = require('../controllers/ContactController')();

module.exports = route
//HomeRoutes
route.get('/', homeController.index);
route.post('/users/create', alunoController.store);

// //Addresses Routes
// route.post('/user/:user_id/address', addressController.insertAddress);
// route.get('/user/find', addressController.showAll);


//Tech Routes
// route.get('/users/:user_id/techs', techController.showTechnologies);
// route.post('/users/:user_id/techs', techController.insertTechonology);
// route.delete('/users/:user_id/techs', techController.deleteTechnology);

//User Routes
route.get('/users/:user_id/read', alunoController.show);
route.delete('/users/:user_id/delete', alunoController.delet);  
route.put('/users/:user_id/update', alunoController.update)