import Slide, { SlideTitle } from "../../Slide";
import PopularMovieCard from "../../PopularMovieCard/PopularMovieCard";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import useScreenSize from "../../../hooks/useScreenSize";

const TopMoviesSlide = ({ stats }) => {
  const { mobile } = useScreenSize();

  if (
    !stats?.ratingsStats?.movieStats ||
    stats.ratingsStats.movieStats.length === 0
  ) {
    return (
      <Slide className="stat-slide bg-gradient-top-movies">
        <div className="flex flex-col items-center gap-8 w-full max-w-[900px] mx-auto">
          <p className="text-[2rem] max-md:text-[1.5rem] font-bold text-white text-center mb-4">
            No rating data available
          </p>
        </div>
      </Slide>
    );
  }

  // Enrich movie stats with poster path from stats.movies
  const topMovies = stats.ratingsStats.movieStats.slice(0, 3).map((movie) => ({
    ...movie,
    posterPath: stats.movies?.find((m) => m.title === movie.movieName)
      ?.posterPath,
  }));

  const [first, ...restMovies] = topMovies;

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Top Movies of the Year</SlideTitle>

      <ScrollableFade className="flex flex-col items-center gap-2 w-full max-sm:h-full">
        <PopularMovieCard movie={first} size={mobile ? "small" : "default"} />

        {restMovies.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {restMovies.map((movie) => (
              <PopularMovieCard
                key={movie.movieName}
                movie={movie}
                size={mobile ? "small" : "default"}
                secondary
              />
            ))}
          </div>
        )}
      </ScrollableFade>
    </Slide>
  );
};

export default TopMoviesSlide;
