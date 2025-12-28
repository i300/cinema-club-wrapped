import clsx from "clsx";

/**
 * MoviePoster - Displays a movie poster image
 *
 * @param {Object} props
 * @param {Object|string} props.movie - Movie object with posterPath, or just the posterPath string
 * @param {string} props.alt - Alt text for the image (defaults to movie.title)
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.fallback - Fallback content when no poster (defaults to null)
 */
const MoviePoster = ({ movie, alt, className, fallback = null }) => {
  const posterPath = typeof movie === "string" ? movie : movie?.posterPath;
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const altText =
    alt || (typeof movie === "object" ? movie?.title : "Movie poster");

  if (!posterUrl) {
    return fallback;
  }

  return (
    <div
      className={clsx("aspect-2/3 rounded overflow-hidden shrink-0", className)}
    >
      <img
        src={posterUrl}
        alt={altText}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default MoviePoster;
