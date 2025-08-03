const mongoose = require('mongoose');

const SOSSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  message: {
    type: String,
    default: 'SOS Alert!'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SOS', SOSSchema);
