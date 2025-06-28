const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

// Simple in-memory cache for weather data
const weatherCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Define a simple schema for search history
const searchSchema = new mongoose.Schema({
  city: String,
  weather: Object,
  date: { type: Date, default: Date.now }
});
const Search = mongoose.model('Search', searchSchema);

// Connect to MongoDB (only once) with error handling
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err.message));
}

// GET /weather?city=CityName
router.get('/', async (req, res) => {
  const city = req.query.city?.trim();
  if (!city) return res.status(400).json({ error: 'City is required' });

  // Check cache first
  const cacheKey = `weather:${city.toLowerCase()}`;
  const cached = weatherCache.get(cacheKey);
  
  if (cached && isCacheValid(cached.timestamp)) {
    console.log(`Cache hit for ${city}`);
    return res.json(cached.data);
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    
    console.log(`Fetching weather for ${city}`);
    const response = await axios.get(url, {
      timeout: 5000 // 5 second timeout
    });
    const weather = response.data;

    // Cache the result
    weatherCache.set(cacheKey, {
      data: weather,
      timestamp: Date.now()
    });

    // Save to MongoDB (only if connected) - do this asynchronously
    if (mongoose.connection.readyState === 1) {
      Search.create({ city, weather }).catch(dbError => {
        console.log('Failed to save to database:', dbError.message);
      });
    }

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.json(weather);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET /weather/history
router.get('/history', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json([]);
  }
  
  try {
    const history = await Search.find()
      .sort({ date: -1 })
      .limit(10)
      .lean(); // Use lean() for better performance
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=60'); // 1 minute
    res.json(history);
  } catch (error) {
    console.error('History fetch error:', error.message);
    res.json([]);
  }
});

// GET /weather/cache/stats - for debugging
router.get('/cache/stats', (req, res) => {
  const stats = {
    size: weatherCache.size,
    keys: Array.from(weatherCache.keys()),
    memoryUsage: process.memoryUsage()
  };
  res.json(stats);
});

// POST /weather/cache/clear - for cache management
router.post('/cache/clear', (req, res) => {
  weatherCache.clear();
  res.json({ message: 'Cache cleared successfully' });
});

module.exports = router; 