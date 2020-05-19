const express = require("express");
const route = express.Router();
const userController = require('../controllers/UserController')();
const tokenController = require('../controllers/tokenController')();
const middlewareGlobal = require('../middlewares/globalMiddleware')();
const companyController = require('../controllers/companyController')();
const patientController = require("../controllers/patientController")();
const pictureController = require("../controllers/pictureController")();

module.exports = route
//configs
// const multer = require('multer');
// const multerConfig = require('../config/multerConfig');
// const upload = multer(multerConfig);

// Token Routes
route.post("/tokens/:user_id", tokenController.store);

// Company Routes
route.post("/company/create/:user_id", companyController.store);
route.delete('/company/delete/:user_id', companyController.delet);
route.put('/company/update', companyController.update)
route.get('/company/index', companyController.index);
route.get("/company/:company_id", companyController.show)

//User Routes
route.post('/user/create', userController.store);
route.get('/users/:user_id/read', userController.show);
route.delete('/users/:user_id/delete', userController.delet);  
route.put('/users/:user_id/update', userController.update);

//Patient Routes
route.post('/patient/create/:company_id', patientController.store);
route.get('/patients/index', patientController.index);
route.get('/patient/:patient_id/read', patientController.show);
route.put('/patient/:patient_id/update', patientController.update);
route.delete('/patient/:patient_id/delete', patientController.delet);

//Picture Routes
route.get('/picture/index', pictureController.index);
route.get('/picture/:picture_id/show', pictureController.show)
route.post('/picture/:patient_id/upload', pictureController.store);
route.delete('/picture/:patient_id/delete', pictureController.delet);
route.put('/picture/:patient_id/update/:picture_id', pictureController.update)