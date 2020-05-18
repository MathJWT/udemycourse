const Patient = require('../models/patientModel');
const Company = require('../models/companyModel');
const Op = require('sequelize').Op;

module.exports = () => {
    const show = async (req, res) => {

    };

    const index = async (req, res) => {
        const patients = await Patient.findAll({
            attributes: ['id','name', 'email', 'age', 'cpf', 'company_id'],
            include: { association: 'patient-pictures' }
        });

        if (!patients) return res.stauts(401).json({Error: "Patients not found!"})
        
        return res.json(patients);
    };

    const delet = async (req, res) => {
        const { patient_id } = req.params;

        const find_patient = await Patient.findByPk(patient_id);

        if (!find_patient) return res.status(401).json({Error: 'Patient not found!'});
    
        await find_patient.destroy();
            // force: true - tem que jogar um objeto no destroy // deletar full


        return res.json(null)
    };

    const update = async (req, res) => {
        const { patient_id } = req.params;
        const patientClass = new Patient(req.body);
        const { name, email, age } = req.body;
        const patient = await Patient.findByPk(patient_id);

        if (!patient) return res.status(401).json({Error: 'Patient not found!'});

        const validate = patientClass.validFields(name, email, age);
        
        if(!validate) return res.status(401).json({Error: "Fields aren't well filled."})

        const update = patient.update({ 
            name,
            email,
            cpf: patient.cpf,
            age
        })        
        
        return res.json(update)
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

        if(!valid) return res.status(401).json({Error: 'Fields invalid!'})

        const patient = await Patient.create({
            company_id,
            name: name,
            email,
            cpf,
            age
        })
        
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