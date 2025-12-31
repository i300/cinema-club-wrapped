import Slide, { SlideTitle } from "../../Slide";
import ProfileImage from "../../ProfileImage/ProfileImage";
import StatCard from "../../StatCard/StatCard";
import PosterGrid from "../../PosterGrid/PosterGrid";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";

const TopHostSlide = ({ stats }) => {
  if (!stats.topHosts) return null;

  const topHost = stats.topHosts[0];
  const topHostedMovies = stats.movies.filter((m) => m.host === topHost.name);

  const secondPlace = stats.topHosts[1];
  const secondPlaceMovies = stats.movies.filter(
    (m) => m.host === secondPlace.name
  );

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Most Movies Chosen</SlideTitle>

      <ScrollableFade className="flex flex-col gap-2 w-full">
        {/* Top host card */}
        <StatCard className="gap-2">
          <div className="flex gap-2 items-center justify-center">
            <ProfileImage name={topHost.name} className="w-14 h-14" />
            <p className="text-5xl max-sm:text-4xl font-semibold text-white">
              {topHost.name}
            </p>
          </div>
          <p className="text-2xl max-sm:text-xl font-light italic text-white">
            {topHost.count} {topHost.count === 1 ? "movie" : "movies"} hosted
          </p>
        </StatCard>
        {topHostedMovies.length > 0 && (
          <PosterGrid movies={topHostedMovies} cols="3" />
        )}

        {/* Second place host card */}
        <StatCard secondary className="gap-2">
          <div className="flex gap-2 items-center justify-center">
            <ProfileImage name={secondPlace.name} className="w-14 h-14" />
            <p className="text-5xl max-sm:text-4xl font-semibold text-white">
              {secondPlace.name}
            </p>
          </div>
          <p className="text-2xl max-sm:text-xl font-light italic text-white">
            {secondPlace.count} {secondPlace.count === 1 ? "movie" : "movies"}{" "}
            hosted
          </p>
        </StatCard>
        {secondPlaceMovies.length > 0 && (
          <PosterGrid movies={secondPlaceMovies} cols="3" />
        )}
      </ScrollableFade>
    </Slide>
  );
};

export default TopHostSlide;
