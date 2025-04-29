const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const safeFilename = file.originalname
            .replace(/\s+/g, '-')           
            .replace(/[^a-zA-Z0-9.-]/g, ''); 
        cb(null, Date.now() + '-' + safeFilename);
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed.'));
    }
  }
});

module.exports = upload;
