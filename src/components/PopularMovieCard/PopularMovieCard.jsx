import clsx from "clsx";
import ProfileImage from "../ProfileImage/ProfileImage";

const UserReview = ({ displayName, rating, liked, size = "default" }) => {
  // Format rating as stars for default size, or as "X/5" for small size
  const formatRating = () => {
    if (size === "small") {
      return `${rating}/5`;
    }

    // Convert rating to stars (★½ format)
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = "★".repeat(fullStars);
    if (hasHalf) stars += "½";
    return stars;
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center flex-shrink-0",
        size === "default" ? "w-[75px] min-w-[75px] gap-2" : "gap-1"
      )}
    >
      <div className="relative shrink-0">
        <ProfileImage name={displayName} className="w-16 h-16" />
        {liked && (
          <div className="absolute -top-1 -right-1 text-lg flex items-center justify-center">
            💖
          </div>
        )}
      </div>
      <p
        className={clsx(
          "font-inter text-white text-center m-0 leading-normal",
          size === "default" ? "font-semibold text-sm" : "font-normal text-sm"
        )}
      >
        {formatRating()}
      </p>
    </div>
  );
};

const PopularMovieCard = ({
  movie,
  posterUrl,
  size = "default",
  secondary = false,
}) => {
  if (!movie) return null;

  // Sort reviews by rating to show variety
  const sortedReviews = [...movie.reviews].sort((a, b) => a.rating - b.rating);

  // Limit reviews display based on size
  const displayReviews =
    size === "small" ? sortedReviews.slice(0, 7) : sortedReviews;

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
        <div
          className={clsx(
            "shrink-0 rounded overflow-hidden self-stretch",
            !secondary && "h-30 sm:h-50",
            secondary && "h-30"
          )}
        >
          <img
            src={posterUrl}
            alt={movie.movieName}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Title Card, Stats */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Movie Title */}
          <div className={clsx("flex items-center justify-between gap-4")}>
            <h2
              className={clsx(
                "font-inter font-bold text-white",
                !secondary && "text-5xl md:text-6xl",
                secondary && "font-semibold text-4xl"
              )}
            >
              {movie.movieName}
            </h2>

            {!secondary && (
              <div className="font-inter font-semibold text-gold text-shadow-gold shrink-0 text-4xl md:text-5xl">
                {movie.averageScore.toFixed(2)}
              </div>
            )}
          </div>

          {/* Movie Stats */}
          <div
            className={clsx(
              "flex gap-2 items-center text-white font-inter italic",
              "font-light text-base md:font-extralight md:text-2xl"
            )}
          >
            {secondary && (
              <>
                <span className="leading-normal">
                  {movie.averageScore.toFixed(2)}
                </span>
                <span className="opacity-70 max-sm:text-sm">•</span>
              </>
            )}
            <span className="leading-normal">{movie.totalReviews} reviews</span>
            <span className="opacity-70 max-sm:text-sm">•</span>
            <span className="leading-normal">{movie.likeCount} likes</span>
          </div>

          {size === "default" && !secondary && (
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {displayReviews.map((review, index) => (
                <UserReview
                  key={index}
                  displayName={review.displayName}
                  rating={review.rating}
                  liked={review.liked}
                  size={size}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* In small size, show reviews under poster row */}
      {size === "small" && !secondary && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {displayReviews.map((review, index) => (
            <UserReview
              key={index}
              displayName={review.displayName}
              rating={review.rating}
              liked={review.liked}
              size={size}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularMovieCard;
