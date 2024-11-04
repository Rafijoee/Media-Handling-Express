const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Fungsi untuk memastikan folder tujuan ada
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = (destination) => {
    const fullPath = path.join(__dirname, `../public/${destination}`);
    ensureDirExists(fullPath);  // Pastikan folder tujuan ada
    
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPath); // Set direktori tujuan ke fullPath yang sudah dibuat
        },
        filename: (req, file, cb) => {
            let newName = Date.now() + path.extname(file.originalname);
            cb(null, newName);
        }
    });
};

module.exports = {
    image: multer({
        storage: storage("images"),
        fileFilter: (req, file, cb) => { 
            const allowedType = ["image/png", "image/jpeg"];  // Mengizinkan .png dan .jpg
            if (allowedType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    }),

    videos: multer({
        storage: storage("videos"),
        fileFilter: (req, file, cb) => { 
            const allowedType = ["video/mp4", "video/quicktime"];
            if (allowedType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    })
};
