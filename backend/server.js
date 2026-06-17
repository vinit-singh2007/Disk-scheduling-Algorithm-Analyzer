const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send('Disk Scheduling Backend Server is running successfully!');
});

// Database connection (Optional based on typical MERN stack usage, we'll connect if URL is provided)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('No MongoDB URI provided. Running without database connection.');
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
