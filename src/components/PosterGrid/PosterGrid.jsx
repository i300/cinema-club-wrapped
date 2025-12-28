import clsx from "clsx";
import MoviePoster from "../MoviePoster/MoviePoster";

/**
 * PosterGrid - Displays a responsive grid of movie posters
 *
 * @param {Object} props
 * @param {Array} props.movies - Array of movie objects with posterPath
 * @param {string} props.className - Additional classes for the grid container
 * @param {string} props.cols - Column configuration: "4" (default), "6", or custom tailwind classes
 */
const PosterGrid = ({ movies, className, cols = "4" }) => {
  if (!movies || movies.length === 0) return null;

  const colsClass =
    cols === "6"
      ? "grid-cols-3 sm:grid-cols-6"
      : cols === "4"
        ? "grid-cols-4 sm:grid-cols-6"
        : cols;

  return (
    <div className={clsx("grid gap-2 w-full", colsClass, className)}>
      {movies.map((movie, index) => (
        <MoviePoster key={movie.id || index} movie={movie} alt={movie.title} />
      ))}
    </div>
  );
};

export default PosterGrid;
