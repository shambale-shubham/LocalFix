const mongoose = require('mongoose');

let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connectionPromise) {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/localfix';
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    }).then(() => {
      console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
      return mongoose.connection;
    }).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }
  return connectionPromise;
}

module.exports = { connectDB };
