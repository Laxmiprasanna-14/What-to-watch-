require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = 5000;

// Your TMDB API key in .env: TMDB_API_KEY=adaaYourRealKeyHere
const TMDB_API_KEY = process.env.TMDB_API_KEY;
console.log("Using TMDB API Key:", TMDB_API_KEY);

// Root test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Random movie suggestion (optional genre filter via query string)
app.get('/api/random', async (req, res) => {
  try {
    const { genre } = req.query;                     // e.g., ?genre=28 for Action
    const genreFilter = genre ? `&with_genres=${genre}` : '';
    const tmdbURL =
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}` +
      `&sort_by=popularity.desc${genreFilter}&language=en-US&page=1`;

    // Fetch from TMDB
    const response = await axios.get(tmdbURL);
    const movies = response.data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    res.json(randomMovie);
  } catch (error) {
    // Detailed server-side logging
    console.error('Error fetching movie from TMDB:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    // Return specific error to frontend
    const errorMsg = error.response?.data?.status_message || 'Failed to fetch movie from TMDB.';
    res.status(500).json({ error: errorMsg });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
