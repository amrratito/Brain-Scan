const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    diagnosisResult: {
        type: String,
        required: true
    },

    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    
    analysisTimestamp: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Scan = mongoose.model('Scan', scanSchema);

module.exports = Scan;
