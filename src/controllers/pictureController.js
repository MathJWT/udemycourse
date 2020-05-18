const multer = require("multer");
const multerConfig = require('../config/multerConfig');
const upload = multer(multerConfig).single('file')

module.exports = () => {
    const store = async (req, res) => {
       return upload(req, res, err => {
           if (err) return res.status(401).json({Errors: [err]});
           return res.json(req.file)
       })
    };

    return {
        store
    }
}