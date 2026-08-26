const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const Message = require('../models/Message');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
    const item = await Message.create({ name, email, phone: phone || '', message, read: false });
    res.status(201).json({ message: 'Message sent successfully', item: { id: String(item._id), name: item.name, email: item.email, phone: item.phone, message: item.message, createdAt: item.createdAt, read: item.read } });
  } catch (e) { next(e); }
});

router.get('/', verifyToken, requireAdmin, async (req, res, next) => {
  try { const messages = await Message.find().sort({ createdAt: -1 }); res.json({ messages: messages.map(m => ({ id: String(m._id), name: m.name, email: m.email, phone: m.phone, message: m.message, createdAt: m.createdAt, read: m.read })) }); } catch (e) { next(e); }
});

router.patch('/:id/read', verifyToken, requireAdmin, async (req, res, next) => {
  try { const item = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true }); if (!item) return res.status(404).json({ message: 'Message not found' }); res.json({ message: 'Message marked as read', item }); } catch (e) { next(e); }
});
module.exports = router;
