const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const Service = require('../models/Service');
const router = express.Router();

const serialize = (s) => ({ id: String(s._id), title: s.title, description: s.description, icon: s.icon, rating: s.rating, createdAt: s.createdAt });

router.get('/', async (req, res, next) => {
  try { const services = await Service.find().sort({ createdAt: -1 }); res.json({ services: services.map(serialize) }); } catch (e) { next(e); }
});

router.post('/', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const { title, description, icon, rating } = req.body || {};
    if (!title || !description) return res.status(400).json({ message: 'Title and description are required' });
    const service = await Service.create({ title, description, icon: icon || '🛠️', rating: rating || '5.0' });
    res.status(201).json({ message: 'Service added', service: serialize(service) });
  } catch (e) { next(e); }
});

router.put('/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try {
    const { title, description, icon, rating } = req.body || {};
    const service = await Service.findByIdAndUpdate(req.params.id, { $set: { title, description, icon, rating } }, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service updated', service: serialize(service) });
  } catch (e) { next(e); }
});

router.delete('/:id', verifyToken, requireAdmin, async (req, res, next) => {
  try { const service = await Service.findByIdAndDelete(req.params.id); if (!service) return res.status(404).json({ message: 'Service not found' }); res.json({ message: 'Service deleted' }); } catch (e) { next(e); }
});
module.exports = router;
