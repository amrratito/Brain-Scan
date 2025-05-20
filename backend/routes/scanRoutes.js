const express = require('express');
const router = express.Router();
const { uploadScan, getMyScans, deleteScan, exportScanToPDF } = require('../controllers/scanController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.post('/upload', protect, upload.single('scanImage'), uploadScan);


router.get('/my-scans', protect, getMyScans);

// Delete user's scan
router.delete('/delete/:id', protect, deleteScan);

// Exports user's scan to PDF
router.get('/export/:id', protect, exportScanToPDF);

module.exports = router;
