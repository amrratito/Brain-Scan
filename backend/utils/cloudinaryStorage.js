const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinary');
const asyncHandler = require ('express-async-handler');
const uuidv4  =require('uuid').v4;
const sharp = require('sharp');
const cloudinary = require ('../config/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'brain-scan-uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1024, crop: "limit" }]
  }
});



const upload = multer({ storage });



const uploadToCloudinary = (buffer, filename, folder, format = 'jpeg', quality = 'auto') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: filename,
                resource_type: 'image',
                format,
                quality,
                overwrite: true
            },
            (error, result) => {
                if (error) {
                    reject(new Error(`Cloudinary Upload Error: ${error.message}`, 500));
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
};

module.exports = upload;