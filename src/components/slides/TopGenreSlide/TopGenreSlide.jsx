import clsx from "clsx";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import PosterGrid from "../../PosterGrid/PosterGrid";

const getMoviesByGenre = (movies, genre) => {
  return (
    movies?.filter((movie) => {
      const genres = movie.genres || [movie.genre];
      return genres.includes(genre);
    }) || []
  );
};

const GenreCard = ({ genre, count, movies }) => {
  return (
    <>
      <StatCard className="w-full items-start">
        <div className="flex items-center justify-between w-full text-white">
          <p className="text-5xl md:text-6xl">{genre}</p>
          <p className="text-xl font-extralight italic">
            {count} {count === 1 ? "movie" : "movies"}
          </p>
        </div>
      </StatCard>
      <PosterGrid movies={movies} cols="6" />
    </>
  );
};

const TopGenreSlide = ({ stats }) => {
  const sortedGenres = Object.entries(stats.genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  const [topGenre, topCount] = sortedGenres[0] || [];
  const [secondGenre, secondCount] = sortedGenres[1] || [];

  const topGenreMovies = getMoviesByGenre(stats.movies, topGenre);
  const secondGenreMovies = getMoviesByGenre(stats.movies, secondGenre);

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Top Genres</SlideTitle>

      <ScrollableFade className="flex flex-col gap-2 w-full max-w-[650px]">
        {topGenre && (
          <GenreCard
            genre={topGenre}
            count={topCount}
            movies={topGenreMovies}
          />
        )}
        {secondGenre && (
          <GenreCard
            genre={secondGenre}
            count={secondCount}
            movies={secondGenreMovies}
          />
        )}
      </ScrollableFade>
    </Slide>
  );
};

export default TopGenreSlide;
