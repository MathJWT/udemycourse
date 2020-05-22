const Patient = require('../models/patientModel');
const Insurance = require('../models/insuranceModel');
const Attendance = require('../models/attendanceModel');

module.exports = () => {
    const store = (req, res) => {
        res.json({true: true})
    };

    const index = (req, res) => {

    };

    const show = (req, res) => {

    };

    const update = (req, res) => {

    };

    const delet = (req, res) => {

    };

    return {
        store,
        index,
        show,
        update,
        delet
    };
}