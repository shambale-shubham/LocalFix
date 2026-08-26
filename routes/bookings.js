const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const Review = require('../models/Review');
const router = express.Router();
router.use(verifyToken);

const serialize = (b) => ({ id: String(b._id), userId: b.userId, userEmail: b.userEmail, fullName: b.fullName, email: b.email, phone: b.phone, service: b.service, address: b.address, notes: b.notes, status: b.status, createdAt: b.createdAt, completedAt: b.completedAt });

router.post('/', async (req, res, next) => {
  try {
    const { fullName, email, phone, service, address, notes } = req.body || {};
    if (!fullName || !phone || !service || !address) return res.status(400).json({ message: 'fullName, phone, service and address are required' });
    const booking = await Booking.create({ userId: req.user.id, userEmail: req.user.email, fullName, email: email || req.user.email, phone, service, address, notes: notes || '', status: 'Pending' });
    res.status(201).json({ message: 'Booking confirmed', booking: serialize(booking) });
  } catch (e) { next(e); }
});

router.get('/my', async (req, res, next) => {
  try {
    const bookings = await Booking.find({ $or: [{ userEmail: req.user.email }, { userId: req.user.id }] }).sort({ createdAt: -1 });
    const notifications = await Notification.find({ userEmail: req.user.email, read: false }).sort({ createdAt: -1 });
    res.json({ bookings: bookings.map(serialize), notifications: notifications.map(n => ({ id: String(n._id), userEmail: n.userEmail, bookingId: n.bookingId, type: n.type, message: n.message, createdAt: n.createdAt, read: n.read })) });
  } catch (e) { next(e); }
});

router.get('/', requireAdmin, async (req, res, next) => {
  try { const bookings = await Booking.find().sort({ createdAt: -1 }); res.json({ bookings: bookings.map(serialize) }); } catch (e) { next(e); }
});

router.patch('/:id/status', requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body || {};
    const allowed = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: `status must be one of: ${allowed.join(', ')}` });
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    if (status === 'Completed') booking.completedAt = new Date();
    await booking.save();
    const messages = { Pending: 'Your booking is pending confirmation.', 'In Progress': 'Your service is now in progress.', Completed: 'Your service has been completed successfully. Please share your review.', Cancelled: 'Your booking has been cancelled.' };
    await Notification.create({ userEmail: booking.userEmail, bookingId: String(booking._id), type: 'booking-status', message: messages[status], read: false });
    res.json({ message: 'Booking updated and user notified', booking: serialize(booking) });
  } catch (e) { next(e); }
});

router.patch('/notifications/:id/read', async (req, res, next) => {
  try { const n = await Notification.findOneAndUpdate({ _id: req.params.id, userEmail: req.user.email }, { read: true }, { new: true }); if (!n) return res.status(404).json({ message: 'Notification not found' }); res.json({ message: 'Notification read' }); } catch (e) { next(e); }
});
module.exports = router;
