import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";

const TotalMoviesSlide = ({ stats }) => {
  // Helper to get poster URL for a movie
  const getPosterUrl = (movie) => {
    if (!movie?.posterPath) return null;
    return `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
  };

  // Get first 12 movies for the poster grid (chronological order)
  const movies = stats.movies?.slice(0, 12) || [];

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Movies Watched</SlideTitle>

      <ScrollableFade className="flex flex-col items-center gap-2 w-full max-sm:h-full">
        {/* Stat cards row */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <StatCard>
            <p className="text-5xl md:text-6xl font-semibold text-white">
              {stats.totalMovies} movies
            </p>
          </StatCard>
          <StatCard secondary>
            <p className="text-2xl md:text-3xl text-white">
              {stats.totalHours} hours {stats.totalMinutes} minutes
            </p>
            <p className="text-base font-light italic text-white">
              of movie magic
            </p>
          </StatCard>
        </div>

        {/* Movie poster grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 w-full">
          {movies.map((movie, index) => (
            <div
              key={movie.id || index}
              className="aspect-2/3 rounded overflow-hidden"
            >
              {getPosterUrl(movie) && (
                <img
                  src={getPosterUrl(movie)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </ScrollableFade>
    </Slide>
  );
};

export default TotalMoviesSlide;
