import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovie = async (genreId = '') => {
    setLoading(true);
    setError('');
    setMovie(null);
    try {
      const url = `http://localhost:5000/api/random${genreId ? `?genre=${genreId}` : ''}`;
      const response = await axios.get(url);
      setMovie(response.data);
    } catch (err) {
      // Enhanced client-side error logging
      const errMsg = err.response?.data?.error || err.message;
      console.error('Error fetching movie:', errMsg);
      setError(errMsg || 'Could not load a suggestion. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🎬 What to Watch?</h1>
      <div className="controls">
        <button onClick={() => fetchMovie()} disabled={loading}>
          {loading ? 'Loading...' : 'Show Me Something!'}
        </button>
        <select onChange={e => fetchMovie(e.target.value)}>
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
        </select>
      </div>

      {error && <p className="error">Error: {error}</p>}

      {movie && (
        <div className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>⭐ {movie.vote_average} | 📅 {movie.release_date.substring(0, 4)}</p>
          <p>{movie.overview}</p>
        </div>
      )}
    </div>
  );
}

export default App;
