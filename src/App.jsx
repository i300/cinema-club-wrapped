import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { fetchMovies } from "./data/movies";
import { calculateStats } from "./utils/statistics";
import WelcomeSlide from "./components/slides/WelcomeSlide";
import EventListSlide from "./components/slides/EventListSlide";
import TotalMoviesSlide from "./components/slides/TotalMoviesSlide";
import RuntimeSlide from "./components/slides/RuntimeSlide";
import TopGenreSlide from "./components/slides/TopGenreSlide";
import OldestNewestSlide from "./components/slides/OldestNewestSlide";
import HighestRatedSlide from "./components/slides/HighestRatedSlide";
import LongestMovieSlide from "./components/slides/LongestMovieSlide";
import TopDirectorSlide from "./components/slides/TopDirectorSlide";
import MostAttendedEventSlide from "./components/slides/MostAttendedEventSlide";
import TopAttendeeSlide from "./components/slides/TopAttendeeSlide";
import DecadeBreakdownSlide from "./components/slides/DecadeBreakdownSlide";
import SummarySlide from "./components/slides/SummarySlide";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies();
        const calculatedStats = calculateStats(movies);
        setStats(calculatedStats);
      } catch (err) {
        console.error("Error loading movies:", err);
        setError("Failed to load movie data");
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
    <SummarySlide key="summary" stats={stats} />,
  ];

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(slides.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

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
      <ProgressBar totalSlides={slides.length} currentSlide={index} />

      <div className="slides-container">
        <motion.div
          className="slides-carousel"
          ref={containerRef}
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            const containerWidth = containerRef.current?.offsetWidth || 1;
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            let newIndex = index;

            // If fast swipe, use velocity
            if (Math.abs(velocity) > 500) {
              newIndex = velocity > 0 ? index - 1 : index + 1;
            }
            // Otherwise use offset threshold (30% of container width)
            else if (Math.abs(offset) > containerWidth * 0.3) {
              newIndex = offset > 0 ? index - 1 : index + 1;
            }

            // Clamp index
            newIndex = Math.max(0, Math.min(slides.length - 1, newIndex));
            setIndex(newIndex);
          }}
          style={{ x }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="slides-container-wrapper">
              {slide}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
