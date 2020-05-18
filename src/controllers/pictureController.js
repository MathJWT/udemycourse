const multer = require("multer");
const multerConfig = require('../config/multerConfig');
const upload = multer(multerConfig).single('file');
const Picture = require("../models/pictureModel");
const Patient = require('../models/patientModel');

module.exports = () => {
    const store = async (req, res) => {
       return upload(req, res, err => {
            if (err) return res.status(401).json({Errors: [err]});
           
            const {patient_id} = req.params;
            const patient = Patient.findByPk(patient_id)
            .then(done => done)
            .catch(e => e);

            if (!patient) return res.status(404).json({Error: 'Patient not found!'});

            const pic = Picture.create({
                originalname: req.file.originalname,
                filename: req.file.filename,
                patient_id
            })
            .then(data => {
                return res.json(data);  
            })
            .catch(err => {
                console.log(err)
                return res.json(err);
            })

            return;
       })
    };

    return {
        store
    }
}