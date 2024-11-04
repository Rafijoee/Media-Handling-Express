

class MediaHandling {

    static handleImage(req, res) {
        let redirectImage = `http://${req.get('host')}/images/${req.file.filename}`;
        res.status('201').json({
            data : redirectImage
        });
    }
    static handleImages(req, res) {
        console.log(req.files);

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
}

module.exports = MediaHandling