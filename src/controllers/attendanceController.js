const Attendance = require("../models/attendanceModel");
const Patient = require('../models/patientModel');
const async = require('async');

module.exports = () => {
    const store = (req, res) => {
        const { patient_id } = req.params;
        const { procedure, date, price } = req.body;
        
        async.auto({
            find_patient: (done) => {
                Patient.findByPk(patient_id, { raw: true })
                .then(response => done(null, response))
                .catch(err => done(err));
            },
            patientExists: ['find_patient', (done, results) => {
                if (!results.find_patient) return res.json({Error: "Patient not found!"});    

                done(null, true);
            }],
            createAttendance: ['find_patient', 'patientExists', ( done, results) => {
                Attendance.create({
                    price,
                    date,
                    patient_id,
                    procedure
                })
                .then(resp => done(null, resp))
                .catch(e => done(e));
            }],
            showData: ['createAttendance', (done, results) => {
                if (!results.createAttendance) {
                    done(true);
                    return;
                }
                return res.json(results.createAttendance)
            }]
        });
 
    };

    const index = (req, res) => {
        async.auto({
            findAll: (done) => {
                Attendance.findAndCountAll({
                    limit: 11,
                })
                .then(response => done(null, response))
                .catch(err => done(err));
            },
            show: ['findAll', (done, results) => {
                const result = results.findAll;
                if (result.length == 0) {
                    done(true);
                    return res.json({Error: "Results weren't found!"})
                }
                
               return res.json(result);
            }]
        })
    };
    
    const update = (req, res) => {
        const { attendance_id } = req.params;
        let { date = null, procedure = null, price = null } = req.body;
        const previousAttendanceData = [ date, procedure, price];
        
        async.auto({
            findAttendance: (done) => {
                Attendance.findByPk(attendance_id, { raw: true })
                .then(response => done(null, response))
                .catch(err => done(err))
            },
            validFields: ['findAttendance', (done, results) => {
                if (!results.findAttendance){ 
                console.log(results.findAttendance)
                done(true);
                return res.json({Error: 'Attendance not found!'})
            };
                const previousDate = results.findAttendance.date;
                const previousProcedure = results.findAttendance.procedure;
                const previousPrice = results.findAttendance.price;
                const attendanceData = [previousDate, previousProcedure, previousPrice];
            
                done(null, attendanceData);
                }],
            update: ['findAttendance', 'validFields', (done, results) => {
                if (!results.findAttendance || !results.validFields.length > 0) return res.status(401).json({Err: 'Attendance or the fields are invalid!'});
                console.log('cheguei aqui, pai')
                
                for (let index = 0; index < previousAttendanceData.length; index++) {
                    if (index == 0 && !previousAttendanceData[0]) {
                        date = results.validFields[0];
                    };
                    
                    if (index == 1 && !previousAttendanceData[1]) {
                        procedure = results.validFields[1];
                    };
                    
                    if (index == 0 && !previousAttendanceData[2]) {
                        price = results.validFields[2];
                    }; 
                };

                Attendance.update({
                    price,
                    procedure,
                    date
                }, {
                where: {
                    id: attendance_id
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

                    return res.json(results.update);
                }]
            }
        )
    };

    const delet = (req, res) => {
        const { attendance_id } = req.params;
        async.auto({
            find: (done) => {
                Attendance.findByPk(attendance_id, { raw: true })
                .then(resp => done(null, resp))
                .catch(err => done(err));
            },
            exist: ['find', (done, results) => {
                 const deleteAttendance = results.find;
                 if (!deleteAttendance) {
                     done(true);
                     return res.json({Error: 'not found!'});
                 };
                done(null, true);
            }], 
            destroy: ['exist', (done, results) => {
                const deleted = Attendance.destroy({
                    where: {
                        id: attendance_id
                    }
                })
                .then(resp => done(null, resp))
                .catch(e => done(e))
            }],
            showData: ['destroy', (done, results) => {
                if (!results.destroy) {
                    done(true);
                    return res.json({Err: "Wasn't destroyed!"})
                };

                return res.json(results.destroy)
            }]
        })
    };

    

    const show = (req, res) => {
        const { attendance_id } = req.params;
        async.auto({
            find: (done) => {
                Attendance.findByPk(attendance_id, { raw: true })
                .then(resp => done(null, resp))
                .catch(err => done(err)); 
            },
            show: ['find', (done, results) => {
                const data = (results.find);
                
                if (!data) {
                    done(true);
                    return res.json({Err:"Attendance not found!"});
                };

                done(null, true);
                return res.json(data);
            }]
        })
    };

    return {
        store,
        show,
        update, 
        delet, 
        index
    }
};