const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, lowercase: true },
  bookingId: { type: String, default: '' },
  type: { type: String, default: 'booking-status' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Notification', notificationSchema);
