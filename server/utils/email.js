const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                    body { margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #333333; }
                    .content { padding: 40px 30px; text-align: center; }
                    .header { padding: 20px; background-color: #0a0a0a; border-bottom: 1px solid #222222; text-align: center; }
                    .footer { padding: 20px; text-align: center; color: #666666; font-size: 12px; background-color: #0a0a0a; border-top: 1px solid #222222; }
                </style>
            </head>
            <body style="background-color: #000000; padding: 20px; margin: 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <div class="container">
                                <div class="header">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 1px;">🎟️ EVENTORA</h1>
                                </div>
                                <div class="content">
                                    <h2 style="margin-top: 0; color: #f3f4f6; font-size: 24px;">Hi ${userName}!</h2>
                                    <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">Your booking for <strong style="color: #ffffff;">${eventTitle}</strong> is successfully confirmed.</p>
                                    <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you for choosing Eventora for your experiences.</p>
                                </div>
                                <div class="footer">
                                    <p style="margin: 0;">If you have any questions, please reply to this email.</p>
                                    <p style="margin: 15px 0 0 0; font-size: 10px;">&copy; ${new Date().getFullYear()} Eventora. All rights reserved.</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Eventora Account' : 'Eventora Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Eventora account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                    body { margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #333333; }
                    .otp-box { background: linear-gradient(135deg, #6366f1, #a855f7); color: #ffffff; font-size: 36px; font-weight: 900; letter-spacing: 12px; padding: 20px 20px 20px 32px; border-radius: 12px; text-align: center; margin: 35px auto; width: max-content; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    .otp-box:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6); }
                    .content { padding: 50px 30px; text-align: center; }
                    .header { padding: 20px; background-color: #0a0a0a; border-bottom: 1px solid #222222; text-align: center; }
                    .footer { padding: 20px; text-align: center; color: #666666; font-size: 12px; background-color: #0a0a0a; border-top: 1px solid #222222; }
                    @media screen and (max-width: 600px) {
                        .content { padding: 30px 15px; }
                        .otp-box { font-size: 28px; letter-spacing: 8px; padding: 15px 15px 15px 23px; }
                    }
                </style>
            </head>
            <body style="background-color: #000000; padding: 20px; margin: 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <div class="container">
                                <div class="header">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 1px;">🎟️ EVENTORA</h1>
                                </div>
                                <div class="content">
                                    <h2 style="margin-top: 0; color: #f3f4f6; font-size: 22px;">${title}</h2>
                                    <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">${msg}</p>
                                    <div class="otp-box">${otp}</div>
                                    <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin-top: 30px;">Please enter this code in the application to continue.</p>
                                </div>
                                <div class="footer">
                                    <p style="margin: 0 0 10px 0;">This code expires in <strong style="color: #888;">5 minutes</strong>.</p>
                                    <p style="margin: 0;">If you didn't request this code, you can safely ignore this email.</p>
                                    <p style="margin: 15px 0 0 0; font-size: 10px;">&copy; ${new Date().getFullYear()} Eventora. All rights reserved.</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };
