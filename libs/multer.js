const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // Folder public/images harus sudah ada
    },
    filename: (req, file, cb) => {
        let newName = Date.now() + path.extname(file.originalname);
        cb(null, newName);
    }
});

module.exports = {
    image: multer({
        storage: storage,
        fileFilter: (req, file, cb) => { 
            const allowedType = ["image/png", "image/jpeg"];  // Mengizinkan .png dan .jpg
            if (allowedType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    })
};
