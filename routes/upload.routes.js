const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// Charge the img
router.post('/product/upload/image', uploadController.uploadProduct);

router.post('/product/upload/file', uploadController.uploadFile);

router.post('/product/image/:id', uploadController.getImage);
router.post('/product/images', uploadController.getImages);

module.exports = router;