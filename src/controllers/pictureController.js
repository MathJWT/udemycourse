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

    const update = async (req, res) => {
        return upload(req, res, err => {
            if (err) return res.status(401).json({Errors: [err]});
            const { picture_id } = req.params;
            const {patient_id} = req.params;
             
            const patient = Patient.findByPk(patient_id)
                .then(done => done)
                .catch(e => res.json({Error: 'Patient not found!'}));
 
            const picture = Picture.findByPk(picture_id)
            .then(data => data)
            .catch((e) => res.json({Err: e}));

            const pic = Picture.update({
                originalname: req.file.originalname,
                filename: req.file.filename,
                patient_id
            },
            {
                where: {
                    id: picture_id
                }
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

    const delet = async (req, res) => {
        const { patient_id }  = req.params;
        const { picture_id } = req.body;

        const patient = await Patient.findByPk(patient_id, {
            include: {
                association: 'patient-pictures',
                attributes: ['id', 'originalname', 'filename']
            }
        })
        
        if (!patient) return res.status(401).json({Error: 'Patient not found!'});
        
        const picture = await Picture.findByPk(picture_id);

        if (!picture) return res.status(404).json({Error: "Picture doesn't exist!"})
        
        const patientPics = patient["patient-pictures"];

        for (let index = 0; index < patientPics.length; index   ++) {
            if (patientPics[index].id == picture_id) {
                  await picture.destroy();
                return res.json(null)
            }
        }

        return res.json({Error: 'Picture wasnt destroyed!'})
    }

    const index = (req, res) => {
        const pictures = Picture.findAll({
            attributes: ['id', 'filename', 'originalname'],
            raw: true, //Basically if that is set true it will just return the data we want, not the metadata, that would get a large amount of space.
        }) 

        if (pictures.length == 0) return res.status(401).json({Error: "There insn't any picture."}) 
        
        pictures.then(data =>  {
            console.log(data)
            res.json(data)
        })
        .catch(e => res.json(e));
        
        return
    };

    const show = (req, res) => {
        const { picture_id } = req.params; 
        const picture = Picture.findByPk(picture_id, {
            attributes: ['id', 'originalname', 'filename']
        })
        .then(data => getData(data))
        .catch(e => res.json(e));
        
        function getData(data) {
            return res.json(data);
        };

        return
    }

    return {
        show,
        store,
        delet,
        index,
        update
    }
}