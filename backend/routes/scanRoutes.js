const express = require('express');
const router = express.Router();
const { uploadScan, getMyScans, deleteScan, exportScanToPDF } = require('../controllers/scanController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * @swagger
 * /api/scans/upload:
 *   post:
 *     summary: Upload and analyze a brain scan
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Scan uploaded and analyzed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 scan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     diagnosisResult:
 *                       type: string
 *                     confidence:
 *                       type: number
 *                     analysisTimestamp:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/upload', protect, upload.single('file'), uploadScan);

/**
 * @swagger
 * /api/scans/my-scans:
 *   get:
 *     summary: Get all scans of the logged-in user
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's scans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scan'
 *       401:
 *         description: Not authorized
 */
router.get('/my-scans', protect, getMyScans);

// Delete user's scan
router.delete('/delete/:id', protect, deleteScan);

// Exports user's scan to PDF
router.get('/export/:id', protect, exportScanToPDF);

module.exports = router;
