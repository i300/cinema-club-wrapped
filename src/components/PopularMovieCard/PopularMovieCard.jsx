import clsx from "clsx";

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

  // Get initials from display name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center flex-shrink-0",
        size === "default" ? "w-[75px] min-w-[75px] gap-2" : "gap-1"
      )}
    >
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center font-inter font-semibold text-lg text-white bg-gradient-avatar">
          {getInitials(displayName)}
        </div>
        {liked && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 text-xs flex items-center justify-center">
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
        "border border-[#8e2de2] rounded-2xl p-4 bg-gradient-card",
        "flex gap-4 w-full max-w-[820px]",
        size === "default" ? "flex-row items-start" : "flex-col",
        "max-md:max-w-full max-md:flex-col"
      )}
    >
      <div
        className={clsx(
          "flex-shrink-0 rounded overflow-hidden aspect-[2/3] self-stretch",
          size === "default" ? "h-[250px]" : "w-[67px] h-[100px]"
        )}
      >
        <img
          src={posterUrl}
          alt={movie.movieName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div
        className={clsx(
          "flex flex-col gap-2 flex-1 min-w-0",
          size === "small" && "flex-row h-[100px] gap-2"
        )}
      >
        {size === "small" && (
          <div className="flex-1 flex flex-col gap-2">
            <div
              className={clsx(
                "flex items-center justify-between gap-4",
                size === "default" && "text-center"
              )}
            >
              <h2
                className={clsx(
                  "font-inter font-bold text-white m-0 flex-none",
                  size === "default"
                    ? "text-[64px] max-md:text-[48px]"
                    : "text-[48px]"
                )}
              >
                {movie.movieName}
              </h2>
              {!secondary && (
                <div
                  className={clsx(
                    "font-inter font-semibold text-[--color-gold] text-shadow-gold flex-shrink-0",
                    size === "default"
                      ? "text-5xl max-md:text-4xl"
                      : "text-[32px]"
                  )}
                >
                  {movie.averageScore.toFixed(2)}
                </div>
              )}
            </div>

            <div
              className={clsx(
                "flex gap-2 items-center text-white font-inter italic",
                size === "default"
                  ? "font-extralight text-2xl max-md:text-lg"
                  : "font-light text-base"
              )}
            >
              {secondary && (
                <>
                  <span className="leading-normal">
                    {movie.averageScore.toFixed(2)}
                  </span>
                  <span
                    className={clsx(
                      "opacity-70",
                      size === "small" && "text-sm"
                    )}
                  >
                    •
                  </span>
                </>
              )}
              <span className="leading-normal">
                {movie.totalReviews} reviews
              </span>
              <span
                className={clsx("opacity-70", size === "small" && "text-sm")}
              >
                •
              </span>
              <span className="leading-normal">{movie.likeCount} likes</span>
            </div>
          </div>
        )}

        {size === "default" && (
          <>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-inter font-bold text-white m-0 flex-none text-[64px] max-md:text-[48px]">
                {movie.movieName}
              </h2>
              {!secondary && (
                <div className="font-inter font-semibold text-[--color-gold] text-shadow-gold flex-shrink-0 text-5xl max-md:text-4xl">
                  {movie.averageScore.toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center text-white font-inter italic font-extralight text-2xl max-md:text-lg">
              {secondary && (
                <>
                  <span className="leading-normal">
                    {movie.averageScore.toFixed(2)}
                  </span>
                  <span className="opacity-70">•</span>
                </>
              )}
              <span className="leading-normal">
                {movie.totalReviews} reviews
              </span>
              <span className="opacity-70">•</span>
              <span className="leading-normal">{movie.likeCount} likes</span>
            </div>

            {!secondary && (
              <div className="flex gap-2.5 items-center justify-center p-1 overflow-x-auto max-md:flex-wrap max-md:justify-start">
                {displayReviews.map((review, index) => (
                  <UserReview
                    key={index}
                    displayName={review.displayName}
                    rating={review.rating}
                    liked={review.liked}
                    size="default"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {size === "small" && !secondary && (
        <div className="flex flex-wrap gap-2.5 items-center justify-center h-[100px] px-2 overflow-hidden">
          {displayReviews.map((review, index) => (
            <UserReview
              key={index}
              displayName={review.displayName}
              rating={review.rating}
              liked={review.liked}
              size="small"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularMovieCard;
