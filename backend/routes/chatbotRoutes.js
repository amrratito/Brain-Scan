const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { 
    startChat, 
    sendMessage, 
    getChatHistory,
    endChat 
} = require('../controllers/chatbotController');


router.post('/start', protect, startChat);


router.post('/message', protect, sendMessage);


router.get('/history/:sessionId', protect, getChatHistory);


router.post('/end/:sessionId', protect, endChat);

module.exports = router; 