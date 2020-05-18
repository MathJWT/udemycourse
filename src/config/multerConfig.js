const multer = require('multer');
const path = require('path');

const random = () => Math.round(Math.random() * (10000 - 1000) + 1000)

module.exports = {
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' ) {
            return callback(new multer.MulterError('File is not an image!'))
        };
         return callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${random()}${path.extname(file.originalname)}`)
        },
    })
}