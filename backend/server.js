require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { connectDB } = require('./utils/db');
const User = require('./models/User');
const Service = require('./models/Service');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services');
const messageRoutes = require('./routes/messages');
const reviewRoutes = require('./routes/reviews');

const app = express();
const configuredPort = Number(process.env.PORT || 5001);

app.use(cors({ 
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => res.json({ ok: true, message: 'Service Local API is running with MongoDB' }));
app.get('/api/health', (req, res) => res.json({ ok: true, database: 'MongoDB', mongoState: require('mongoose').connection.readyState, time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('API error:', err);
  if (err && err.code === 11000) return res.status(409).json({ message: 'Duplicate record already exists' });
  if (err && err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
  res.status(500).json({ message: err?.message || 'Server error' });
});

async function seedDatabase() {
  const adminEmail = String(process.env.ADMIN_EMAIL || 'admin@localfix.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({ name: process.env.ADMIN_NAME || 'Super Admin', email: adminEmail, passwordHash: await bcrypt.hash(adminPassword, 10), role: 'admin' });
    console.log(`Admin created: ${adminEmail}`);
  } else if (existingAdmin.role !== 'admin') {
    existingAdmin.role = 'admin';
    await existingAdmin.save();
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { title: 'Plumbing', description: 'Professional plumbing repair and installation.', icon: '🔧', rating: '5.0' },
      { title: 'Electrical', description: 'Safe electrical repair, wiring and installation.', icon: '⚡', rating: '5.0' },
      { title: 'House Cleaning', description: 'Reliable home cleaning and deep-cleaning services.', icon: '🧹', rating: '4.9' },
      { title: 'Painting', description: 'Interior and exterior painting professionals.', icon: '🎨', rating: '4.9' },
    ]);
    console.log('Default services seeded.');
  }
}

async function startServer(port, allowFallback = true) {
  try {
    await connectDB();
    await seedDatabase();
    const server = app.listen(port, () => {
      console.log(`\nService Local API running on http://localhost:${port}`);
      console.log(`MongoDB database: ${process.env.MONGO_URI}`);
      console.log(`Health check: http://localhost:${port}/api/health`);
    });
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE' && allowFallback) {
        console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
        startServer(port + 1, false);
      } else {
        console.error('Unable to start API:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('\nMongoDB connection failed.');
    console.error('Check that MongoDB is running and backend/.env contains a valid MONGO_URI.');
    console.error(error.message);
    process.exit(1);
  }
}

startServer(configuredPort);
