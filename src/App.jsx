import { useState, useEffect } from 'react';
import { fetchMovies } from './data/movies';
import { calculateStats } from './utils/statistics';
import WelcomeSlide from './components/slides/WelcomeSlide';
import EventListSlide from './components/slides/EventListSlide';
import TotalMoviesSlide from './components/slides/TotalMoviesSlide';
import RuntimeSlide from './components/slides/RuntimeSlide';
import TopGenreSlide from './components/slides/TopGenreSlide';
import OldestNewestSlide from './components/slides/OldestNewestSlide';
import HighestRatedSlide from './components/slides/HighestRatedSlide';
import LongestMovieSlide from './components/slides/LongestMovieSlide';
import TopDirectorSlide from './components/slides/TopDirectorSlide';
import MostAttendedEventSlide from './components/slides/MostAttendedEventSlide';
import TopAttendeeSlide from './components/slides/TopAttendeeSlide';
import DecadeBreakdownSlide from './components/slides/DecadeBreakdownSlide';
import SummarySlide from './components/slides/SummarySlide';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies();
        const calculatedStats = calculateStats(movies);
        setStats(calculatedStats);
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Failed to load movie data');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const slides = [
    <WelcomeSlide key="welcome" />,
    <EventListSlide key="events" stats={stats} />,
    <TotalMoviesSlide key="total" stats={stats} />,
    <RuntimeSlide key="runtime" stats={stats} />,
    <TopGenreSlide key="genre" stats={stats} />,
    <OldestNewestSlide key="oldest-newest" stats={stats} />,
    <HighestRatedSlide key="highest" stats={stats} />,
    <LongestMovieSlide key="longest" stats={stats} />,
    <TopDirectorSlide key="director" stats={stats} />,
    <MostAttendedEventSlide key="most-attended" stats={stats} />,
    <TopAttendeeSlide key="top-attendee" stats={stats} />,
    <DecadeBreakdownSlide key="decade" stats={stats} />,
    <SummarySlide key="summary" stats={stats} />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading your Cinema Club Wrapped...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="app">
      <div className="slides-container">
        {slides[currentSlide]}
      </div>

      <div className="navigation">
        <button
          className="nav-button"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          ←
        </button>
        <div className="progress">
          <span className="progress-text">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
        <button
          className="nav-button"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          →
        </button>
      </div>

      <div className="instructions">
        Use arrow keys or click buttons to navigate
      </div>
    </div>
  );
}

export default App;
