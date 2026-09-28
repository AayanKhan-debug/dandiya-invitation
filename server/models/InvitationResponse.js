const mongoose = require('mongoose');

const invitationResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
    enum: ['yes']
  },
  noClickCount: {
    type: Number,
    required: true,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InvitationResponse', invitationResponseSchema);
