const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const listingRoutes = require('./routes/listingRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin for development server
    // origin: 'https://listing-website.netlify.app', // Allow frontend origin for production server
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Enable credentials for CORS
}));

const pool = require('./controllers/listingController');

// Routes
app.use('/api', listingRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, pool };
