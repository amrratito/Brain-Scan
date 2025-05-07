const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
    startChat, 
    sendMessage, 
    getChatHistory,
    endChat 
} = require('../controllers/chatbotController');

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: AI Chatbot interaction endpoints
 */

/**
 * @swagger
 * /api/chatbot/start:
 *   post:
 *     summary: Start a new chat session
 *     tags: [Chatbot]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               initialMessage:
 *                 type: string
 *                 description: Optional initial message to start the conversation
 *                 example: "Hello, I have some questions about brain health"
 *     responses:
 *       200:
 *         description: Chat session started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: Unique identifier for the chat session
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/start', protect, startChat);

/**
 * @swagger
 * /api/chatbot/message:
 *   post:
 *     summary: Send a message to the chatbot
 *     tags: [Chatbot]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - message
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID of the active chat session
 *               message:
 *                 type: string
 *                 description: Message to send to the chatbot
 *               context:
 *                 type: object
 *                 description: Optional context for the message
 *                 properties:
 *                   previousMessages:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: Message processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 confidence:
 *                   type: number
 *                   format: float
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Chat session not found
 *       500:
 *         description: Server error
 */
router.post('/message', protect, sendMessage);

/**
 * @swagger
 * /api/chatbot/history/{sessionId}:
 *   get:
 *     summary: Get chat history for a session
 *     tags: [Chatbot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat session
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         enum: [user, assistant]
 *                       content:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Chat session not found
 *       500:
 *         description: Server error
 */
router.get('/history/:sessionId', protect, getChatHistory);

/**
 * @swagger
 * /api/chatbot/end/{sessionId}:
 *   post:
 *     summary: End a chat session
 *     tags: [Chatbot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat session to end
 *     responses:
 *       200:
 *         description: Chat session ended successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sessionId:
 *                   type: string
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Chat session not found
 *       500:
 *         description: Server error
 */
router.post('/end/:sessionId', protect, endChat);

module.exports = router; 