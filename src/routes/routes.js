const express = require("express");
const route = express.Router();
const userController = require('../controllers/UserController')();
const tokenController = require('../controllers/tokenController')();
const middlewareGlobal = require('../middlewares/globalMiddleware')();
const companyController = require('../controllers/companyController')();

module.exports = route

// Token Routes
route.post("/tokens/:user_id", tokenController.store);

// Company Routes
route.post("/company/create/:user_id", companyController.store)

//User Routes
route.post('/user/create', userController.store);
route.get('/users/:user_id/read', userController.show);
route.delete('/users/:user_id/delete', [middlewareGlobal.loginRequired], userController.delet);  
route.put('/users/:user_id/update', [middlewareGlobal.loginRequired], userController.update)