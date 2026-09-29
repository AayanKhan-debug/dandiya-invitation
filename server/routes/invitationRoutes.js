const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const webpush = require('web-push');
const InvitationResponse = require('../models/InvitationResponse');
const Invitation = require('../models/Invitation');

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY ? process.env.VAPID_PUBLIC_KEY.trim() : null;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY ? process.env.VAPID_PRIVATE_KEY.trim() : null;
const vapidSubject = process.env.VAPID_SUBJECT ? process.env.VAPID_SUBJECT.trim() : 'mailto:admin@example.com';

if (vapidPublicKey && vapidPrivateKey) {
  try {
    webpush.setVapidDetails(
      vapidSubject,
      vapidPublicKey,
      vapidPrivateKey
    );
  } catch (err) {
    console.error('Failed to configure Web Push VAPID details on startup. Push notifications will be disabled:', err.message);
  }
}

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Create Invitation
router.post('/invitations', async (req, res) => {
  try {
    const { targetName } = req.body;
    
    if (!targetName || !targetName.trim() || targetName.length > 50) {
      return res.status(400).json({ success: false, message: 'Valid target name is required' });
    }
    
    const inviteId = crypto.randomBytes(8).toString('hex');
    const manageToken = crypto.randomBytes(16).toString('hex');
    
    const invitation = new Invitation({
      inviteId,
      manageToken,
      targetName: targetName.trim()
    });

    await invitation.save();
    
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    res.status(201).json({
      success: true,
      inviteId,
      manageToken,
      inviteUrl: `${baseUrl}/i/${inviteId}`
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Save Push Subscription
router.post('/invitations/:manageToken/push-subscription', async (req, res) => {
  try {
    const { manageToken } = req.params;
    const { subscription } = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ success: false, message: 'Invalid subscription object' });
    }

    const invitation = await Invitation.findOne({ manageToken });
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    invitation.pushSubscription = subscription;
    await invitation.save();

    res.status(200).json({ success: true, message: 'Subscription saved' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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

// Get Invitation Status (Private)
router.get('/status/:manageToken', async (req, res) => {
  try {
    const { manageToken } = req.params;
    
    const invitation = await Invitation.findOne({ manageToken });
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    res.status(200).json({
      success: true,
      status: {
        targetName: invitation.targetName,
        response: invitation.response,
        noClickCount: invitation.noClickCount,
        respondedAt: invitation.respondedAt,
        createdAt: invitation.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching status:', error);
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

    if (invitation.response !== 'yes') {
      invitation.response = 'yes';
      invitation.noClickCount = noClickCount || 0;
      invitation.respondedAt = new Date();

      if (!invitation.notificationSent && invitation.pushSubscription && vapidPublicKey) {
        try {
          const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
          const payload = JSON.stringify({
            title: '🎉 She said YES!',
            body: `${invitation.targetName} accepted your Dandiya invitation ❤️`,
            url: `${baseUrl}/status/${invitation.manageToken}`
          });
          
          webpush.sendNotification(invitation.pushSubscription, payload).catch(err => {
            console.error('Failed to send push notification:', err);
          });
          
          invitation.notificationSent = true;
        } catch (pushError) {
          console.error('Push error setup:', pushError);
        }
      }
      
      await invitation.save();
    }

    res.status(200).json({ success: true, message: 'Response recorded successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
