require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const invitationRoutes = require('./routes/invitationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size

// Database connection for Serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.log('No MONGODB_URI found, running in offline mode.');
  }
};

// Ensure DB is connected before handling routes in serverless
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api', invitationRoutes);
app.use('/', invitationRoutes); // Vercel sometimes strips /api from req.url

// Start server locally (Vercel bypasses this)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
