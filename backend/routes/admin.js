const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');
const router = express.Router();
router.use(verifyToken, requireAdmin);

router.get('/stats', async (req, res, next) => {
  try {
    const [totalBookings, users, completed, pending, recent] = await Promise.all([
      Booking.countDocuments(), User.countDocuments({ role: 'user' }), Booking.countDocuments({ status: 'Completed' }), Booking.countDocuments({ status: 'Pending' }), Booking.find().sort({ createdAt: -1 }).limit(8)
    ]);
    res.json({ stats: [
      { label: 'Total Bookings', value: totalBookings },
      { label: 'Registered Users', value: users },
      { label: 'Completed Jobs', value: completed },
      { label: 'Pending Bookings', value: pending },
    ], recentBookings: recent.map(b => ({ id: String(b._id), service: b.service, customer: b.fullName, status: b.status })) });
  } catch (e) { next(e); }
});
router.get('/profile', (req, res) => res.json({ user: req.user }));
module.exports = router;
