const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  inviteId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  targetName: {
    type: String,
    required: true,
    trim: true
  },
  senderEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  response: {
    type: String,
    enum: ['pending', 'yes'],
    default: 'pending'
  },
  noClickCount: {
    type: Number,
    default: 0
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Invitation', invitationSchema);
