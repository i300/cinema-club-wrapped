import Slide, { SlideTitle } from "../../Slide";
import ProfileImage from "../../ProfileImage/ProfileImage";
import StatCard from "../../StatCard/StatCard";
import PosterGrid from "../../PosterGrid/PosterGrid";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";

const TopHostSlide = ({ stats }) => {
  if (!stats.topHost) return null;

  const { name, count } = stats.topHost;
  const hostedMovies = stats.topHostMovies || [];

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Top Host</SlideTitle>

      <ScrollableFade className="flex flex-col gap-2 w-full">
        {/* Top host card */}
        <StatCard className="gap-2">
          <div className="flex gap-2 items-center justify-center">
            <ProfileImage name={name} className="w-14 h-14" />
            <p className="text-5xl max-sm:text-4xl font-semibold text-white">
              {name}
            </p>
          </div>
          <p className="text-2xl max-sm:text-xl font-light italic text-white">
            {count} {count === 1 ? "movie" : "movies"} hosted
          </p>
        </StatCard>

        {/* Poster grid of hosted movies */}
        {hostedMovies.length > 0 && (
          <StatCard secondary className="gap-2">
            <PosterGrid movies={hostedMovies} />
          </StatCard>
        )}
      </ScrollableFade>
    </Slide>
  );
};

export default TopHostSlide;
