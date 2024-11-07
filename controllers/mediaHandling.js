const imagekit = require('../libs/imagekit');

class MediaHandling {

    static handleImage(req, res) {
        let redirectImage = `http://${req.get('host')}/images/${req.file.filename}`;
        res.status('201').json({
            data : redirectImage
        });
    }
    static handleImages(req, res) {
        if (req.files.length === 0){
            res.status(400).json({
                message : "Bad Request",
                error : "No file uploaded"
            });
        }
        let redirectImages = req.files.map((file) => {
                return `http://${req.get('host')}/images/${file.filename}`})

        res.status(201).json({
            data : redirectImages
        });
        
    }

    static handleVideo(req, res) {
        let redirectVideo = `http://${req.get('host')}/videos/${req.file.filename}`;
        res.status('201').json({
            data : redirectVideo
        });
    }

    static handlePdf(req, res) {
        let redirectPdf = `http://${req.get('host')}/pdfs/${req.file.filename}`;
        res.status('201').json({
            data : redirectPdf
        });
    }

    static async uploadImage (req,res){
        try{
            const stringFile = req.file.buffer.toString('base64');

            const uploadImage = await imagekit.upload({
                file : stringFile,
                fileName : req.file.originalname,
                folder : '/images'
            });

            // console.log(uploadImage, "INI CONSOLE.LOG nya")
            res.status(201).json({
                data : {
                    url : uploadImage.url,
                    name : uploadImage.name,
                    id : uploadImage.fileId
                }
            });

        } catch (error) {
            res.status(500).json({
                message : "Internal Server Error",
                error : error
            });
        }
    }

    static async uploadImages(req, res) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        try {
            const uploadImages = req.files.map(async (file) => {
                try {
                    const stringFile = file.buffer.toString('base64');
                    const image = await imagekit.upload({
                        file: stringFile,
                        fileName: file.originalname,
                        folder: '/images'
                    });
                    return {
                        url: image.url,
                        name: image.name,
                        id: image.fileId
                    };
                } catch (err) {
                    console.error(`Error uploading ${file.originalname}:`, err);
                    // Mengembalikan object error untuk file yang gagal
                    return { error: `Failed to upload ${file.originalname}` };
                }
            });
    
            const result = await Promise.all(uploadImages);
    
            // Kirim respons setelah semua proses selesai
            res.status(201).json({
                data: result
            });
        } catch (error) {
            console.log("INI ERRORNYA:", error);
            // Pastikan hanya mengirim error jika belum ada respons
            if (!res.headersSent) {
                res.status(500).json({
                    message: "Internal Server Error",
                    error: error.message
                });
            }
        }
    }
    
    
}

module.exports = MediaHandling