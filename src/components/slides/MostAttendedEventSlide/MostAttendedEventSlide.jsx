import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import MoviePoster from "../../MoviePoster/MoviePoster";
import UserReview from "../../UserReview/UserReview";

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
            <div className="grid grid-cols-4 md:flex md:flex-wrap gap-4 md:items-center md:justify-center">
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
