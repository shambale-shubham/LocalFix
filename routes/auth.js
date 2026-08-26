const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'localfix-development-secret-change-before-deploy';
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not configured');
  }
  return jwt.sign({ id: String(user._id || user.id), name: user.name, email: user.email, role: user.role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
}

function publicUser(user) {
  return { id: String(user._id || user.id), name: user.name, email: user.email, role: user.role };
}

router.post('/register', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (email === String(process.env.ADMIN_EMAIL || 'admin@localfix.com').toLowerCase()) return res.status(400).json({ message: 'This email is reserved for admin' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists' });

    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10), role: 'user' });
    const safe = publicUser(user);
    res.status(201).json({ message: 'Account created', token: signToken(user), user: safe });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const safe = publicUser(user);
    res.json({ message: 'Login successful', token: signToken(user), user: safe });
  } catch (error) { next(error); }
});

router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

module.exports = router;
