const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Resend } = require('resend');
const InvitationResponse = require('../models/InvitationResponse');
const Invitation = require('../models/Invitation');

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Create Invitation
router.post('/invitations', async (req, res) => {
  try {
    const { targetName, senderEmail } = req.body;
    
    if (!targetName || !targetName.trim() || targetName.length > 50) {
      return res.status(400).json({ success: false, message: 'Valid target name is required' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderEmail || !emailRegex.test(senderEmail.trim())) {
      return res.status(400).json({ success: false, message: 'Valid sender email is required' });
    }

    const inviteId = crypto.randomBytes(8).toString('hex');
    
    const invitation = new Invitation({
      inviteId,
      targetName: targetName.trim(),
      senderEmail: senderEmail.trim().toLowerCase()
    });

    await invitation.save();
    
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    res.status(201).json({
      success: true,
      inviteId,
      inviteUrl: `${baseUrl}/i/${inviteId}`
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
});

// Get Invitation Details (Public)
router.get('/invitations/:inviteId', async (req, res) => {
  try {
    const { inviteId } = req.params;
    
    const invitation = await Invitation.findOne({ inviteId });
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    res.status(200).json({
      success: true,
      invitation: {
        inviteId: invitation.inviteId,
        targetName: invitation.targetName
      }
    });
  } catch (error) {
    console.error('Error fetching invitation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update Invitation Response
router.post('/invitation-response', async (req, res) => {
  try {
    const { inviteId, response, noClickCount, timestamp } = req.body;
    
    if (response !== 'yes') {
      return res.status(400).json({ success: false, error: 'Invalid response' });
    }

    // Support legacy invitations without an ID
    if (!inviteId) {
      const newResponse = new InvitationResponse({
        response,
        noClickCount: noClickCount || 0,
        timestamp: timestamp || new Date()
      });
      await newResponse.save();
      return res.status(201).json({ success: true, message: 'Legacy response saved' });
    }

    const invitation = await Invitation.findOne({ inviteId });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    invitation.response = 'yes';
    invitation.noClickCount = noClickCount || 0;
    invitation.respondedAt = new Date();

    if (!invitation.notificationSent && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: invitation.senderEmail,
          subject: '🎉 Your Dandiya invitation was accepted!',
          text: `Your Dandiya invitation was accepted! ❤️\n\n${invitation.targetName} said YES to being your Dandiya partner.\n\nNO clicks before YES: ${invitation.noClickCount}\n\nMission Dandiya: ACCEPTED ✅`
        });
        invitation.notificationSent = true;
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    await invitation.save();

    res.status(200).json({ success: true, message: 'Response recorded successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
