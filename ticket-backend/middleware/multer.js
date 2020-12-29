const multer = require("multer");

// Multer config
module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname);
        },

    }),
    limits: { fileSize: 5000000 }
});