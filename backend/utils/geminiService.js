const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeBrainScan = async (imageBase64) => {
    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        // Convert base64 to image data
        const imageData = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg" // Adjust based on your image type
            }
        };

        // Prepare the prompt
        const prompt = `Analyze this brain scan image and provide:
        1. A detailed analysis of any visible abnormalities
        2. Potential conditions or concerns
        3. Level of urgency (if any)
        4. Recommendations for follow-up
        
        Please provide the analysis in a clear, medical-professional format.`;

        // Generate content
        const result = await model.generateContent([prompt, imageData]);
        const response = await result.response;
        const analysis = response.text();

        return {
            analysis,
            confidence: 0.85, // You might want to implement a more sophisticated confidence scoring
            timestamp: new Date()
        };
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to analyze brain scan: ' + error.message);
    }
};

module.exports = {
    analyzeBrainScan
}; 