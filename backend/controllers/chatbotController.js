const ChatSession = require('../models/ChatSession');

// Start a new chat session
exports.startChat = async (req, res) => {
    try {
        const { initialMessage } = req.body;
        const userId = req.user._id;

        // Create new chat session
        const chatSession = new ChatSession({
            user: userId,
            messages: initialMessage ? [{
                role: 'user',
                content: initialMessage,
                timestamp: new Date()
            }] : []
        });

        await chatSession.save();

        // If there's an initial message, get AI response
        let response = null;
        if (initialMessage) {
            // Gemini API removed
            return res.status(503).json({ message: 'Chatbot AI feature is currently unavailable.' });
        }

        res.status(200).json({
            sessionId: chatSession._id,
            message: response ? response.text() : 'Chat session started',
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Chat start error:', error);
        res.status(500).json({ message: 'Error starting chat session', error: error.message });
    }
};

// Send a message to the chatbot
exports.sendMessage = async (req, res) => {
    try {
        const { sessionId, message, context } = req.body;
        const userId = req.user._id;

        // Find chat session
        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            user: userId
        });

        if (!chatSession) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        // Add user message to session
        chatSession.messages.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });

        // Get AI response
        // Gemini API removed
        return res.status(503).json({ message: 'Chatbot AI feature is currently unavailable.' });

        // Add AI response to session
        chatSession.messages.push({
            role: 'assistant',
            content: response.text(),
            timestamp: new Date()
        });

        await chatSession.save();

        res.status(200).json({
            response: response.text(),
            timestamp: new Date(),
            confidence: 0.85 // You might want to implement a more sophisticated confidence scoring
        });
    } catch (error) {
        console.error('Message sending error:', error);
        res.status(500).json({ message: 'Error processing message', error: error.message });
    }
};

// Get chat history
exports.getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user._id;

        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            user: userId
        });

        if (!chatSession) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        res.status(200).json({
            sessionId: chatSession._id,
            messages: chatSession.messages
        });
    } catch (error) {
        console.error('Chat history error:', error);
        res.status(500).json({ message: 'Error retrieving chat history', error: error.message });
    }
};

// End chat session
exports.endChat = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user._id;

        const chatSession = await ChatSession.findOne({
            _id: sessionId,
            user: userId
        });

        if (!chatSession) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        chatSession.status = 'ended';
        chatSession.endTime = new Date();
        await chatSession.save();

        res.status(200).json({
            message: 'Chat session ended successfully',
            sessionId: chatSession._id,
            endTime: chatSession.endTime
        });
    } catch (error) {
        console.error('Chat end error:', error);
        res.status(500).json({ message: 'Error ending chat session', error: error.message });
    }
}; 