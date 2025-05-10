// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// Contact form endpoint
router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields",
    });
  }

  // Prepare email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "tranhoangphuc0401@gmail.com", // Admin email
    subject: `LearnNow Contact: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, "<br>")}
      </div>
      <p style="color: #888; margin-top: 20px;">Sent from LearnNow contact form</p>
    `,
  };

  // Send auto-reply to user
  const autoReplyOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting LearnNow",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #ee6c4d;">Thank You for Contacting Us!</h2>
        <p>Hello ${name},</p>
        <p>We've received your message regarding "${subject}" and will get back to you as soon as possible.</p>
        <p>For your records, here's a copy of your message:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p>Best regards,</p>
        <p><strong>The LearnNow Team</strong></p>
      </div>
    `,
  };

  try {
    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send auto-reply to user
    await transporter.sendMail(autoReplyOptions);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again later.",
    });
  }
});

module.exports = router;
