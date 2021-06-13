const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.env.HOME}/backend-bookstore/images/bookCover/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
