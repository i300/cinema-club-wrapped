import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import PosterGrid from "../../PosterGrid/PosterGrid";

const TotalMoviesSlide = ({ stats }) => {
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
        <PosterGrid movies={movies} cols="4" />
      </ScrollableFade>
    </Slide>
  );
};

export default TotalMoviesSlide;
