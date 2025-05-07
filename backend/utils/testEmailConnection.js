const nodemailer = require('nodemailer');

const testEmailConnection = async () => {
    try {
        console.log('Testing email connection...');
        console.log('Using email:', process.env.EMAIL_USERNAME);

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            debug: true,
            logger: true
        });

        // Test the connection
        console.log('Verifying transporter configuration...');
        await transporter.verify();
        console.log('Connection successful! SMTP server is ready to take our messages');

        // Try sending a test email
        console.log('Attempting to send test email...');
        const testResult = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: process.env.EMAIL_USERNAME, // Send to yourself
            subject: 'Test Email Connection',
            text: 'If you receive this email, the connection is working properly!'
        });

        console.log('Test email sent successfully!');
        console.log('Message ID:', testResult.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(testResult));

        return true;
    } catch (error) {
        console.error('Connection test failed:', {
            name: error.name,
            message: error.message,
            code: error.code,
            command: error.command
        });

        // Check for specific error types
        if (error.code === 'EAUTH') {
            console.error('Authentication failed. Please check your email and app password.');
        } else if (error.code === 'ESOCKET') {
            console.error('Socket error. Please check your internet connection and firewall settings.');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('Connection timed out. Please check your network connection.');
        }

        return false;
    }
};

module.exports = testEmailConnection; 