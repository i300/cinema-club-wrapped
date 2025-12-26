import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import enrichedMoviesData from "./data/enriched-movies.json";
import { calculateStats } from "./utils/statistics";
import { calculateRatingsStats } from "./data/ratings";
import WelcomeSlide from "./components/slides/WelcomeSlide/WelcomeSlide";
import EventListSlide from "./components/slides/EventListSlide/EventListSlide";
import TotalMoviesSlide from "./components/slides/TotalMoviesSlide/TotalMoviesSlide";
import RuntimeSlide from "./components/slides/RuntimeSlide/RuntimeSlide";
import TopGenreSlide from "./components/slides/TopGenreSlide/TopGenreSlide";
import OldestNewestSlide from "./components/slides/OldestNewestSlide/OldestNewestSlide";
import LongestMovieSlide from "./components/slides/LongestMovieSlide/LongestMovieSlide";
import MostAttendedEventSlide from "./components/slides/MostAttendedEventSlide/MostAttendedEventSlide";
import TopAttendeeSlide from "./components/slides/TopAttendeeSlide/TopAttendeeSlide";
import TopMoviesSlide from "./components/slides/TopMoviesSlide/TopMoviesSlide";
import BustOfTheYearSlide from "./components/slides/BustOfTheYearSlide/BustOfTheYearSlide";
import PersonalFavoritesSlide from "./components/slides/PersonalFavoritesSlide/PersonalFavoritesSlide";
import SummarySlide from "./components/slides/SummarySlide/SummarySlide";
import ProgressBar from "./components/ProgressBar/ProgressBar";

function App() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const stats = {
    ...calculateStats(enrichedMoviesData),
    ratingsStats: calculateRatingsStats(),
  };

  const slides = [
    <WelcomeSlide key="welcome" />,
    // <EventListSlide key="events" stats={stats} />,
    // <TotalMoviesSlide key="total" stats={stats} />,
    // <RuntimeSlide key="runtime" stats={stats} />,
    // <TopGenreSlide key="genre" stats={stats} />,
    // <OldestNewestSlide key="oldest-newest" stats={stats} />,
    // <LongestMovieSlide key="longest" stats={stats} />,
    // <MostAttendedEventSlide key="most-attended" stats={stats} />,
    // <TopAttendeeSlide key="top-attendee" stats={stats} />,
    <TopMoviesSlide key="top-movies" stats={stats} />,
    // <BustOfTheYearSlide key="bust" stats={stats} />,
    // <PersonalFavoritesSlide key="personal-favorites" stats={stats} />,
    // <SummarySlide key="summary" stats={stats} />,
  ];

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      x.set(targetX);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index, x]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newIndex = -1;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(slides.length - 1, i + 1));
        newIndex = Math.min(slides.length, index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        newIndex = Math.max(0, index - 1);
      } else {
        return;
      }

      setIndex(newIndex);
      const containerWidth = containerRef.current?.offsetWidth || 1;
      const targetX = -newIndex * containerWidth;
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });

      console.log("onKeyDown");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, index, x]);

  if (!stats) {
    return null;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden scrollbar-custom">
      <ProgressBar totalSlides={slides.length} currentSlide={index} />

      <div className="w-full h-full pt-16 pb-2 max-md:pt-12 relative overflow-hidden">
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing select-none"
          ref={containerRef}
          drag="x"
          dragElastic={0.1}
          dragDirectionLock
          dragMomentum={false}
          onDragEnd={(_, info) => {
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

            const targetX = -newIndex * containerWidth;
            animate(x, targetX, {
              type: "spring",
              stiffness: 300,
              damping: 30,
            });

            console.log("onDragEnd");
          }}
          style={{ x }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full h-full flex shrink-0 items-start md:justify-center md:items-center px-2"
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
