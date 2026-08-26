const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, default: '🛠️' },
  rating: { type: String, default: '5.0' },
}, { timestamps: true });
module.exports = mongoose.model('Service', serviceSchema);
