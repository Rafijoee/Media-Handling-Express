const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename : (req, file, cb) => {
        let newName = Date.now() + path.extname(file.originalname);
        cb(null, newName);
    }
});