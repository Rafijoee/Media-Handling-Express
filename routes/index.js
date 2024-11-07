const express = require('express');
const router = express.Router();
const storage = require('../libs/multer');
const MediaHandling = require('../controllers/mediaHandling.js');
const HandleQr = require('../controllers/handleQr.js');

router.post('/image', storage.image.single("image"), MediaHandling.handleImage);

router.post('/images', storage.image.array("images", 5), MediaHandling.handleImages);

router.post('/video', storage.videos.single("video"), MediaHandling.handleVideo);

router.post('/pdf', storage.pdf.single("pdf"), MediaHandling.handlePdf);

router.post('/uploadimage', storage.image.single("image"), MediaHandling.uploadImage);

router.post('/upload-images', storage.image.array('image', 5), MediaHandling.uploadImages);

module.exports = router; 