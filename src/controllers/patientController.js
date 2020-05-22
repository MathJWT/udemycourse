const Patient = require('../models/patientModel');
const Company = require('../models/companyModel');
const Op = require('sequelize').Op;
const async = require('async');

module.exports = () => {
    
    const show = (req, res) => {
        const { patient_id } = req.params;
        async.auto({
            find: (done) => {
                Patient.findByPk(patient_id, {
                    include: {
                        association: 'patient-pictures'
                    }
                })
                .then(resp => done(null, resp))
                .catch(err => done(err)); 
            },
            show: ['find', (done, results) => {
                const data = (results.find);
                if (!data) {
                    done(true);
                    return res.json({Err:"Patient not found!"});
                }
                done(null, true);
                return res.json(data);
            }]
        })
    };

    const index = async (req, res) => {
        const patients = await Patient.findAll({
            attributes: ['id','name', 'email', 'age', 'cpf', 'company_id'],
            include: {
                association: 'patient-pictures',
                attributes: ['id', 'originalname', 'filename']
            }
        });
        
        if (!patients) return res.stauts(401).json({Error: "Patients not found!"})
        
        return res.json(patients);
    };

    const delet = async (req, res) => {
        const { patient_id } = req.params;

        const find_patient = await Patient.findByPk(patient_id);

        if (!find_patient) return res.status(401).json({Error: 'Patient not found!'});
    
        await Patient.destroy({
            where: {
                id: patient_id
            }
        });
            // force: true - tem que jogar um objeto no destroy // deletar full
        return res.json(null);
    };
    const update = (req, res) => {
        const { patient_id } = req.params;
        let { name = null, email = null, cpf = null, age = null } = req.body;
        const previousPatientData = [ name, email, cpf, age];

        async.auto({
            findPatient: (done) => {
                Patient.findByPk(patient_id, { raw: true })
                .then(response => done(null, response))
                .catch(err => done(err))
            },
            validFields: ['findPatient', (done, results) => {
                if (!results.findPatient){ 
                console.log(results.findPatient)
                done(true);
                return res.json({Error: 'Patient not found!'})
            };
                const previousName = results.findPatient.name;
                const previousEmail = results.findPatient.email;
                const previousCpf = results.findPatient.cpf;
                const previousAge = results.findPatient.age;

                const attendanceData = [previousName, previousEmail, previousCpf, previousAge];
            
                done(null, attendanceData);
                }],
            update: ['findPatient', 'validFields', (done, results) => {
                if (!results.findPatient || !results.validFields.length > 0) return res.status(401).json({Err: 'Attendance or the fields are invalid!'});
                
                for (let index = 0; index < previousPatientData.length; index++) {
                    if (index == 0 && !previousPatientData[0]) {
                        name = results.validFields[0];
                    };
                    
                    if (index == 1 && !previousPatientData[1]) {
                        email = results.validFields[1];
                    };
                    
                    if (index == 2 && !previousPatientData[2]) {
                        cpf = results.validFields[2];
                    }; 

                    if (index == 3 && !previousPatientData[3]) {
                        age = results.validFields[3];
                    }; 
                };

                Patient.update({
                    name,
                    email,
                    cpf,
                    age
                }, {
                where: {
                    id: patient_id
                }                    
                })
                .then(response => done(null, response))
                .catch((err) => done(err));
                }],
                showData: ['update',(done, results) => {
                    if (!results.update) {
                        done(true);
                        return;
                    };

                    done(null, true);
                    return res.json(results.update);
                }]
            })
        };

    const store = async (req, res) => {
        const patientClass = new Patient(req.body);
        const { company_id } = req.params;    
        const { name, email, cpf, age } = req.body;
        
        const company_exists = await Company.findByPk(company_id);

        const patient_exists = await Patient.findAll({
            where: {
                [Op.or]: [{name}, {cpf}]                    
            }
        })

        if (!company_exists  || patient_exists.length > 0) return res.status(404).json({Error: "Patient already exists or the company wasn't found!"});

        const valid = patientClass.validFields(name, email, age);

        if(!valid) return res.status(401).json({Error: 'Fields invalid!'});

        const patient = await Patient.create({
            company_id,
            name,
            email,
            cpf,
            age
        });
        
        return res.json(patient);
    };

    return {
        store, 
        index,
        show,
        delet,
        update
    }
}