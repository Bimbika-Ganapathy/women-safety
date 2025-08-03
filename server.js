const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sosRoutes = require('./routes/sos');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Sample Route
app.get('/', (req, res) => {
  res.send('Women Safety API is running...');
});

// Import your routes here
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
