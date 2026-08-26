const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true, lowercase: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  completedAt: { type: Date, default: null },
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
