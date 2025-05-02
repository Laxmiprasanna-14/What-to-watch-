require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = 5000;

// TMDB API Key - Create a .env file with: TMDB_API_KEY=your_key_here
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Movie route
app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});