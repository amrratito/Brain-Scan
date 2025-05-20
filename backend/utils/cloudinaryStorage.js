const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'brain-scan-uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1024, crop: "limit" }]
  }
});

const upload = multer({ storage });

module.exports = upload;
