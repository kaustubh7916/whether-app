const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Contact form schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email transporter configuration using Resend
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY
    }
  });
};

// POST /contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    console.log('Contact form submitted successfully:', { name, email, subject });

    // Send email notification using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.FROM_EMAIL || 'noreply@resend.dev',
          to: process.env.ADMIN_EMAIL || process.env.FROM_EMAIL,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <hr style="border: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 12px;">
                Submitted on: ${new Date().toLocaleString()}
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Contact form email sent successfully via Resend');
      } catch (emailError) {
        console.error('Failed to send email via Resend:', emailError.message);
        // Don't fail the request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured - skipping email notification');
    }

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form' 
    });
  }
});

// GET /contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ date: -1 })
      .limit(100);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contact submissions' 
    });
  }
});

// GET /contact/:id - Get specific contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ 
        error: 'Contact submission not found' 
      });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contact submission' 
    });
  }
});

// PUT /contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status' 
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        error: 'Contact submission not found' 
      });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ 
      error: 'Failed to update contact status' 
    });
  }
});

module.exports = router; 