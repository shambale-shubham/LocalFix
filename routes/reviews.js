const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try { const reviews = await Review.find().sort({ createdAt: -1 }); res.json({ reviews: reviews.map(r => ({ id: String(r._id), bookingId: r.bookingId, userId: r.userId, userEmail: r.userEmail, userName: r.userName, service: r.service, rating: r.rating, comment: r.comment, createdAt: r.createdAt })) }); } catch (e) { next(e); }
});

router.get('/my', verifyToken, async (req, res, next) => {
  try { const reviews = await Review.find({ $or: [{ userId: req.user.id }, { userEmail: req.user.email }] }).sort({ createdAt: -1 }); res.json({ reviews }); } catch (e) { next(e); }
});

router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body || {};
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userEmail !== req.user.email) return res.status(403).json({ message: 'You cannot review this booking' });
    if (booking.status !== 'Completed') return res.status(400).json({ message: 'Review is available after service completion' });
    if (!rating || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    if (await Review.exists({ bookingId: String(booking._id) })) return res.status(409).json({ message: 'Review already submitted' });
    const review = await Review.create({ bookingId: String(booking._id), userId: req.user.id, userEmail: req.user.email, userName: req.user.name, service: booking.service, rating: Number(rating), comment: comment || '' });
    res.status(201).json({ message: 'Review submitted', review });
  } catch (e) { next(e); }
});
module.exports = router;
