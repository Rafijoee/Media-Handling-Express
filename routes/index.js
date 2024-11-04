const express = require('express');
const router = express.Router();
const storage = require('../libs/multer');
const MediaHandling = require('../controllers/mediaHandling.js');

router.post('/image', storage.image.single("image"), MediaHandling.handleImage);

router.post('/images', storage.image.array("images", 5), MediaHandling.handleImages);
module.exports = router; 