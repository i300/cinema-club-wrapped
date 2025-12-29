import Slide, { SlideTitle } from "../../Slide";
import PopularMovieCard from "../../PopularMovieCard/PopularMovieCard";
import useScreenSize from "../../../hooks/useScreenSize";

const BustOfTheYearSlide = ({ stats }) => {
  const { mobile } = useScreenSize();

  if (!stats?.leastLikedMovie) {
    return (
      <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
        <SlideTitle>Bust of the Year</SlideTitle>
        <p className="text-[2rem] max-md:text-[1.5rem] font-bold text-white text-center mb-4">
          No rating data available
        </p>
      </Slide>
    );
  }

  const worstMovie = {
    ...stats.leastLikedMovie,
    movieName: stats.leastLikedMovie.title,
  };

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Bust of the Year</SlideTitle>
      <PopularMovieCard
        movie={worstMovie}
        size={mobile ? "small" : "default"}
        variant="bust"
      />
    </Slide>
  );
};

export default BustOfTheYearSlide;
