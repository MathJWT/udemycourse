const Patient = require('../models/patientModel');
const Insurance = require('../models/insuranceModel');
const Attendance = require('../models/attendanceModel');
const async = require('async');
const Op = require('sequelize').Op;

// INSURANCE (1 - N) PATIENT 
// INSURANCE (1 - N) ATTENDANCE 

module.exports = () => {
    const store = (req, res) => {
        const { name = null, plan } = req.body;
        // const InsuranceClass = new Insurance(req.body);
        // InsuranceClass.validFields();
        async.auto({
            find: (done) => {
                Insurance.findOne({
                    raw: true,
                    where: {
                        name,
                        plan 
                    }
                }).then(resp => done(null, resp))
                .catch(err => done(err));
            },
            userExists: ['find', (done, results) => {
                const data = results.find;
                
                if (data) {
                    done(true);
                    return res.json({Error: 'The insurance created already Exists!'})
                };

                done(null, true);
            }],
            create: ['find', 'userExists', (done, results) => {
                if (!results.userExists) {
                    done(true);
                    return res.json({Error: "Patient does not exist!"})
                };

                Insurance.create({
                    name,
                    plan
                }, { raw: true })
                .then(resp => done(null, resp))
                .catch(err => done(err));
            }],
            show: ['find', 'userExists', 'create', (done, results) => {
                const created = results.create;
                if (!created) {
                    done(true);
                    return res.json(null);
                };

                done(null, true);
                return res.json(created);
            }]
        })        
    };

    const index = (req, res) => { 
        
        async.auto({
            findAll: (done) => {
                Insurance.findAll()
                .then(resp => {
                    console.log(resp);
                    return done(null, resp)
                })
                .catch(error => done(error))
            },
            show: ['findAll', (done, results) => {
                const data = results.findAll;
                
                if (!data) {
                    done(true);
                    return res.json({Error: 'Results were not found!'});
                };

                done(null, true);
                return res.json(data)
            }]
        })
    };

    const show = (req, res) => {
        const { insurance_id } = req.params;

        async.auto({
            find: (done) => {
                Insurance.findByPk(insurance_id)
                .then(resp => done(null, resp))
                .catch(err => done(err));
            },
            existsAndShow:['find', (done, results) => {
                if (!results.find) {
                    done(true);
                    return res.json({Error: 'Insurance not found!'})
                };

                done(null, true);
                return res.json(results.find);
            }]
        })
    };

    const update = (req, res) => {
        const { insurance_id } = req.params;
        async.auto({
            find: (done) => {
                Insurance.findByPk(insurance_id)
                .then(response => done(null, response))
                .catch(err => done(err))
            },
            update: ['find', (done, results) => {
                if (!results.find) {
                    done(true);
                    return res.json({Error: 'Insurance not found!'});
                };

                const { name = results.find.name, plan = results.find.plan} = req.body;
                
                if (name == results.find.name && plan == results.find.plan) {
                    done(true);
                    return res.json({Error: "The insurance can't be updated with the same data."})
                }
                
                console.log(results.find)
                Insurance.update(
                    {
                        name,
                        plan
                    },
                    {
                        where: {
                            id: insurance_id
                        }
                    }
                )
                .then(response => done(null, response))
                .catch(error => done(null, error));
            }],
            show: ['find', 'update', (done, results) => {
                if (results.update.length == 0) {
                    done(true);
                    return res.json({Error: 'Insurance was not updated!'});
                };

                done(null, true);
                return res.json(results.update)
            }]
        })
        
    };

    const delet = (req, res) => {
        const { insurance_id } = req.params;

        async.auto({
            find: (done) => {
                Insurance.findByPk(insurance_id)
                .then(resp => done(null, resp))
                .catch(err => done(err));
            },
            exists: ['find', (done, results) => {
                const insuranceToBeDeleted = results.find;
                if (!insuranceToBeDeleted) {
                    done(true);
                    return res.json({Error: 'Insurance not found!'})
                };

                done(null, true);
            }],
            delete: ['find', 'exists', (done, results) => {
                if (!results.exists) {
                    done(true);
                    return res.json({Error: 'Insuranced does not exist!'});
                }

                Insurance.destroy({
                    where: {
                        id: insurance_id
                    }
                })
                .then(resp => done(null, resp))
                .catch(err => done(err));
            }],
            show: ['find', 'exists', 'delete', (done, results) => {
                if (results.delete[0] == 0) {
                    done(true);
                    return res.json({Err: 'Something Happened and the Insurance wasnt deleted!'})
                }                

                return res.json(null);
            }]
        })

    };

    return {
        store,
        index,
        show,
        update,
        delet
    };
}
