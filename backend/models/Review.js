const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true, lowercase: true },
  userName: { type: String, required: true },
  service: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Review', reviewSchema);
