const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },

    content: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    messages: [messageSchema],
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },

    startTime: {
        type: Date,
        default: Date.now
    },
    
    endTime: {
        type: Date
    }
}, {
    timestamps: true
});

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);

module.exports = ChatSession; 