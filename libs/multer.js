const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storageMemory = multer.memoryStorage();

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
        storage: storageMemory,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB untuk file gambar
        fileFilter: (req, file, cb) => { 
            const allowedTypes = ["image/png", "image/jpeg"];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    }),
    // Tetap gunakan disk storage untuk file selain ImageKit
    diskStorage: destination => multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, `./public/${destination}`),
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        }),
        limits: { fileSize: 50 * 1024 * 1024 } // Ukuran sesuai kebutuhan
    }),

    videos: multer({
        storage: storage("videos"),
        limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB untuk file video
        fileFilter: (req, file, cb) => { 
            const allowedType = ["video/mp4", "video/quicktime"];
            if (allowedType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    }),

    pdf: multer({
        storage: storage("pdfs"),
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB untuk file PDF
        fileFilter: (req, file, cb) => { 
            const allowedType = ["application/pdf"];
            if (allowedType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("File type not supported"), false);
            }
        }
    })

};
