import Slide, { SlideTitle } from "../../Slide";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import StatCard from "../../StatCard/StatCard";
import MoviePoster from "../../MoviePoster/MoviePoster";
import ProfileImage from "../../ProfileImage/ProfileImage";
import { userToName } from "../../../data/ratings";

const StandoutReviewsSlide = ({ stats }) => {
  const moviesWithStandoutReviews =
    stats.movies?.filter((movie) => movie.standoutReview) || [];

  const totalReviews = stats.movies?.reduce(
    (sum, m) => sum + (m.totalReviews || 0),
    0
  );

  if (moviesWithStandoutReviews.length === 0) {
    return (
      <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
        <SlideTitle>Standout Reviews</SlideTitle>
        <p className="text-[2rem] max-md:text-[1.5rem] font-bold text-white text-center mb-4">
          No standout reviews this year
        </p>
      </Slide>
    );
  }

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Standout Reviews</SlideTitle>

      <ScrollableFade className="flex flex-col md:grid md:grid-cols-2 gap-2 w-full">
        <StatCard className="col-span-2">
          <p className="text-4xl font-semibold">
            {moviesWithStandoutReviews.length} standout reviews
          </p>
          <p className="text-xl font-light italic">
            {totalReviews} reviews total
          </p>
        </StatCard>

        {moviesWithStandoutReviews.map((movie) => {
          const displayName =
            userToName[movie.standoutReview.user] || movie.standoutReview.user;

          return (
            <StatCard
              secondary
              key={movie.title}
              className="w-full items-start justify-start md:min-w-sm"
            >
              <div className="flex items-start gap-4 w-full">
                <MoviePoster movie={movie} className="w-16 sm:w-20 shrink-0" />

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="font-inter font-bold text-white text-xl sm:text-2xl">
                    {movie.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <ProfileImage name={displayName} className="w-8 h-8" />
                    <span className="font-inter text-white/80 text-sm">
                      {displayName}
                    </span>
                  </div>

                  <p className="font-inter text-white/90 text-sm sm:text-base italic leading-relaxed">
                    "{movie.standoutReview.text}"
                  </p>
                </div>
              </div>
            </StatCard>
          );
        })}
      </ScrollableFade>
    </Slide>
  );
};

export default StandoutReviewsSlide;
