import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import ProfileImage from "../../ProfileImage/ProfileImage";
import MoviePoster from "../../MoviePoster/MoviePoster";

const UserReview = ({ displayName, rating, liked }) => {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative shrink-0">
        <ProfileImage name={displayName} className="w-15 h-15" />
        {liked && (
          <div className="absolute -top-1 -right-1 text-base flex items-center justify-center">
            💖
          </div>
        )}
      </div>
      <p className="font-inter text-white text-center text-sm leading-normal">
        {rating}/5
      </p>
    </div>
  );
};

const MostAttendedEventSlide = ({ stats }) => {
  const event = stats.mostAttendedEvent;

  // Reviews are now attached directly to the enriched movie
  const reviews = event?.reviews || [];

  // Format the date as "Month Dayth"
  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();

    // Add ordinal suffix
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${month} ${day}${suffix}`;
  };

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Biggest Turnout</SlideTitle>

      <div className="flex flex-row max-md:flex-col gap-2 w-full max-w-225">
        {/* Primary Stat Card - Attendee Count */}
        <StatCard className="gap-2 text-white text-center leading-normal flex-1">
          <p className="font-inter font-semibold text-5xl max-md:text-4xl">
            {event.attendeeCount} Attendees
          </p>
          <p className="font-inter text-3xl max-md:text-2xl">
            {event.eventName}
          </p>
          <p className="font-inter font-light text-2xl max-md:text-base">
            {formatDate(event.watchedDate)}
          </p>
        </StatCard>

        {/* Secondary Card - Movie Info + Reviews */}
        <StatCard
          secondary
          className="gap-2 items-start flex-1 max-md:items-center"
        >
          {/* Movie Info Row */}
          <div className="flex gap-4 items-start w-full">
            {/* Poster */}
            <MoviePoster movie={event} className="w-21 max-md:w-17" />

            {/* Movie Details */}
            <div className="flex flex-1 flex-col gap-2 justify-center text-white">
              <p className="font-inter text-4xl max-md:text-3xl">
                {event.title}
              </p>
              <p className="font-inter font-light italic text-base">
                {event.year} - Directed by {event.director}
              </p>
            </div>
          </div>

          {/* User Reviews Grid */}
          {reviews.length > 0 && (
            <div className="flex flex-wrap gap-2.5 items-center justify-center w-full px-2">
              {reviews.map((review, index) => (
                <UserReview
                  key={index}
                  displayName={review.displayName}
                  rating={review.rating}
                  liked={review.liked}
                />
              ))}
            </div>
          )}
        </StatCard>
      </div>
    </Slide>
  );
};

export default MostAttendedEventSlide;
