import clsx from "clsx";
import MoviePoster from "../MoviePoster/MoviePoster";
import UserReview from "../UserReview/UserReview";

const PopularMovieCard = ({
  movie,
  size = "default",
  secondary = false,
  variant = "default",
}) => {
  if (!movie) return null;

  // Sort reviews by rating to show variety
  const sortedReviews = [...movie.reviews].sort((a, b) => a.rating - b.rating);

  const small = size === "small";
  const isBust = variant === "bust";

  return (
    <div
      className={clsx(
        "rounded-2xl p-4",
        "flex flex-col gap-4 w-full",
        !secondary && "bg-gradient-card",
        secondary && "border border-purple-primary bg-gradient-card-secondary"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Poster */}
        <MoviePoster
          movie={movie}
          alt={movie.movieName}
          className={clsx(!secondary && "w-20 sm:w-32", secondary && "w-20")}
        />

        {/* Title Card, Stats */}
        <div
          className={clsx(
            "flex flex-1 flex-col",
            !secondary && "gap-2",
            secondary && "gap-0"
          )}
        >
          {/* Movie Title */}
          <div className={clsx("flex items-center justify-between gap-4")}>
            <h2
              className={clsx(
                "font-inter font-bold text-white",
                !secondary && "text-4xl md:text-5xl",
                secondary && "font-semibold text-3xl"
              )}
            >
              {movie.movieName}
            </h2>

            {!secondary && !small && (
              <div
                className={clsx(
                  "font-inter font-semibold shrink-0 text-4xl md:text-5xl",
                  isBust
                    ? "text-bust text-shadow-bust"
                    : "text-gold text-shadow-gold"
                )}
              >
                {movie.averageScore.toFixed(2)}
              </div>
            )}
          </div>

          {/* Movie Stats */}
          <div className="flex gap-2 items-center text-white font-inter italic">
            {(secondary || small) && (
              <>
                <span
                  className={clsx(
                    "leading-normal",
                    !secondary && "font-inter font-semibold shrink-0 text-2xl",
                    !secondary &&
                      (isBust
                        ? "text-bust text-shadow-bust"
                        : "text-gold text-shadow-gold")
                  )}
                >
                  {movie.averageScore.toFixed(2)}
                </span>
                <span className="opacity-70 max-sm:text-sm">•</span>
              </>
            )}
            <span className="leading-normal">{movie.totalReviews} reviews</span>
            <span className="opacity-70 max-sm:text-sm">•</span>
            <span className="leading-normal">{movie.likeCount} likes</span>
          </div>

          {!secondary && !small && (
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {sortedReviews.map((review, index) => (
                <UserReview
                  key={index}
                  displayName={review.displayName}
                  rating={review.rating}
                  liked={review.liked}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* In small size, show reviews under poster row */}
      {small && !secondary && (
        <div className="grid grid-cols-4 gap-4">
          {sortedReviews.map((review, index) => (
            <UserReview
              key={index}
              displayName={review.displayName}
              rating={review.rating}
              liked={review.liked}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularMovieCard;
