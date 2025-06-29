// const fs = require('fs');
// const path = require('path');
// const Scan = require('../models/Scan');
// const sendEmail = require('../utils/sendEmail');
// const mongoose = require('mongoose');



// exports.uploadScan = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     try {
//         const userId = req.user._id;
//         const imageUrl = req.body.imageUrl;
        
//         // Advanced AI analysis options
//         const aiOptions = {
//             scanType: req.body.scanType || 'mri', // mri, ct, xray
//             analysisType: req.body.analysisType || 'general', // general, tumor, stroke, atrophy, hemorrhage
//             provider: req.body.aiProvider || 'huggingface', // huggingface, openai, custom
//             detailed: req.body.detailed !== 'false' // true by default
//         };
        
//         if (!imageUrl) {
//             return res.status(400).json({ message: 'Image upload failed.' });
//         }

//         // Validate the image
//         await advancedAIDiagnosis.validateImage(imageUrl);

//         // Perform advanced AI analysis
//         console.log('Starting advanced AI analysis with options:', aiOptions);
//         const analysis = await advancedAIDiagnosis.analyzeBrainScan(imageUrl, aiOptions);
//         console.log('Advanced AI analysis completed:', analysis);

//         const scan = new Scan({
//             user: userId,
//             imageUrl: imageUrl,
//             diagnosisResult: analysis.analysis,
//             confidence: analysis.confidence,
//             analysisTimestamp: analysis.timestamp
//         });

//         await scan.save();

//         // Send enhanced notification email
//         await sendEmail({
//             email: req.user.email,
//             subject: 'Your Advanced NeuraX Analysis is Ready!',
//             message: `
// Hello ${req.user.firstName},

// Your ${aiOptions.scanType.toUpperCase()} brain scan has been analyzed using our advanced AI system.

// Analysis Type: ${aiOptions.analysisType.toUpperCase()}
// Scan Type: ${aiOptions.scanType.toUpperCase()}

// Analysis Results:
// ${analysis.analysis}

// Confidence Level: ${(analysis.confidence * 100).toFixed(1)}%
// AI Provider: ${analysis.provider}

// ${analysis.recommendations ? `Recommendations: ${analysis.recommendations}` : ''}

// Thank you for using NeuraX!

// Best regards,
// NeuraX Team
//             `
//         });

//         res.status(201).json({
//             message: 'Scan uploaded and analyzed successfully.',
//             scan: {
//                 id: scan._id,
//                 diagnosisResult: scan.diagnosisResult,
//                 confidence: scan.confidence,
//                 analysisTimestamp: scan.analysisTimestamp,
//                 aiProvider: analysis.provider,
//                 scanType: analysis.scanType,
//                 analysisType: analysis.analysisType,
//                 details: analysis.details,
//                 recommendations: analysis.recommendations
//             }
//         });
//     } catch (error) {
//         console.error('Scan upload error:', error);
//         res.status(500).json({ 
//             message: 'Error processing scan',
//             error: error.message 
//         });
//     }
// };

// // Get All Scans of the Logged-in User
// exports.getMyScans = async (req, res) => {
//     try {
//         const scans = await Scan.find({ user: req.user._id })
//             .select('-__v')
//             .sort({ createdAt: -1 });
//         res.status(200).json(scans);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a Scan by ID
// exports.deleteScan = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Optional: Validate the ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid scan ID.' });
//         }

//         const scan = await Scan.findById(id);

//         // If no scan found
//         if (!scan) {
//             return res.status(404).json({ message: 'Scan not found.' });
//         }

//         // Ensure req.user is defined and has _id
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: 'Unauthorized. User info missing.' });
//         }

//         // Check if user owns the scan
//         if (scan.user.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Not authorized to delete this scan.' });
//         }

//         // Delete file from disk if it exists (safe path handling)
//         if (scan.imageUrl && fs.existsSync(path.resolve(scan.imageUrl))) {
//             fs.unlinkSync(path.resolve(scan.imageUrl));
//         }

//         await scan.deleteOne();

//         res.status(200).json({ message: 'Scan deleted successfully.' });
//     } catch (error) {
//         console.error('Delete scan error:', error);
//         res.status(500).json({ message: 'Server error: ' + error.message });
//     }
// };


// // Export Scans To PDF
// exports.exportScanToPDF = async (req, res) => {
//     try {
//         const scan = await Scan.findById(req.params.id).populate('user');

//         if (!scan) {
//             return res.status(404).json({ message: 'Scan not found' });
//         }

//         // Check user owns scan
//         if (scan.user._id.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

//         // Create PDF
//         const doc = new PDFDocument();
//         const filename = `ScanReport_${scan._id}.pdf`;

//         res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//         res.setHeader('Content-Type', 'application/pdf');

//         doc.pipe(res);

//         // Title
//         doc.fontSize(20).text('BrainScan Diagnosis Report', { align: 'center' });
//         doc.moveDown();

//         // User Info
//         doc.fontSize(14).text(`Name: ${scan.user.firstName} ${scan.user.lastName}`);
//         doc.text(`Email: ${scan.user.email}`);
//         doc.text(`Date: ${scan.createdAt.toDateString()}`);
//         doc.moveDown();

//         // Diagnosis
//         doc.fontSize(16).text('Diagnosis Result:', { underline: true });
//         doc.fontSize(14).text(scan.diagnosisResult || 'No diagnosis available.');
//         doc.moveDown();

//         // Image (if file exists)
//         const imagePath = path.resolve(scan.imageUrl);
//         const fs = require('fs');
//         if (fs.existsSync(imagePath)) {
//             doc.addPage().image(imagePath, {
//                 fit: [500, 400],
//                 align: 'center',
//                 valign: 'center'
//             });
//         }

//         doc.end();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


//*********** ******* ******* ******* ******* ******* ******* ******* ******* */

const axios = require('axios');
const FormData = require('form-data');
exports.uploadScan = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const imageBuffer = req.file.buffer;
        const originalName = req.file.originalname;

        const formData = new FormData();
        formData.append('image', imageBuffer, {
            filename: originalName,
            contentType: req.file.mimetype
        });

        const flaskResponse = await axios.post('http://127.0.0.1:5001/predict', formData, {
            headers: formData.getHeaders()
        });
        console.log("🚀 ~ exports.uploadScan= ~ flaskResponse:", flaskResponse)

        const result = flaskResponse.data;

        console.log('🎯 Flask Model Response:', result);

        // Example: Return result directly to client
        res.status(200).json({
            message: 'Scan analyzed successfully',
            prediction: result
        });

    } catch (err) {
        console.error('❌ Error calling Flask model:', err.message);
        res.status(500).json({ message: 'Failed to analyze image', error: err.message });
    }
};