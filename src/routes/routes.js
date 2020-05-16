const express = require("express");
const route = express.Router();
const homeController  = require('../controllers/HomeController')();
const alunoController = require('../controllers/AlunoController')();
const addressController = require("../controllers/AddressController")();
const techController = require('../controllers/TechController')();
const contactController = require('../controllers/ContactController')();
const tokenController = require('../controllers/tokenController')();
const middlewareGlobal = require('../middlewares/globalMiddleware')();
module.exports = route
//HomeRoutes
route.get('/', homeController.index);

// //Addresses Routes
// route.post('/user/:user_id/address', addressController.insertAddress);
// route.get('/user/find', addressController.showAll);


//Tech Routes
// route.get('/users/:user_id/techs', techController.showTechnologies);
// route.post('/users/:user_id/techs', techController.insertTechonology);
// route.delete('/users/:user_id/techs', techController.deleteTechnology);

// Token Routes
route.post("/tokens/:user_id", tokenController.store);

//User Routes
route.post('/user/create', alunoController.store);
route.get('/users/:user_id/read', [middlewareGlobal.loginRequired], alunoController.show);
route.delete('/users/:user_id/delete', [middlewareGlobal.loginRequired], alunoController.delet);  
route.put('/users/:user_id/update', [middlewareGlobal.loginRequired], alunoController.update)