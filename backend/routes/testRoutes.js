const express = require('express');
const router = express.Router();
const testEmailConnection = require('../utils/testEmailConnection');

/**
 * @swagger
 * /api/test/test-email-connection:
 *   get:
 *     summary: Test email connection and configuration
 *     description: Tests the SMTP connection, verifies credentials, and sends a test email
 *     tags: [Testing]
 *     responses:
 *       200:
 *         description: Email connection test successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email connection test successful! Check your email for the test message.
 *                 status:
 *                   type: string
 *                   example: success
 *       500:
 *         description: Email connection test failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email connection test failed. Check server logs for details.
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Authentication failed. Please check your email and app password.
 */
router.get('/test-email-connection', async (req, res) => {
    try {
        const result = await testEmailConnection();
        if (result) {
            res.status(200).json({ 
                message: 'Email connection test successful! Check your email for the test message.',
                status: 'success'
            });
        } else {
            res.status(500).json({ 
                message: 'Email connection test failed. Check server logs for details.',
                status: 'error'
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error testing email connection',
            error: error.message,
            status: 'error'
        });
    }
});

module.exports = router; 