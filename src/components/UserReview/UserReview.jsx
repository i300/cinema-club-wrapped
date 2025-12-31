import clsx from "clsx";
import ProfileImage from "../ProfileImage/ProfileImage";
import useScreenSize from "../../hooks/useScreenSize";

const UserReview = ({ displayName, rating, liked }) => {
  const { mobile: small } = useScreenSize();

  // Format rating as stars for default size, or as "X/5" for small size
  const formatRating = () => {
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
        "flex flex-col items-center shrink-0",
        small ? "gap-1" : "w-[75px] min-w-[75px] gap-2"
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
      {rating !== undefined && (
        <p className="font-inter text-white text-center m-0 leading-normal font-normal text-sm">
          {formatRating()}
        </p>
      )}
    </div>
  );
};

export default UserReview;
