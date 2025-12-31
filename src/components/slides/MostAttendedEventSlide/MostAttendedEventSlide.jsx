import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import MoviePoster from "../../MoviePoster/MoviePoster";
import UserReview from "../../UserReview/UserReview";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import ProfileImage from "../../ProfileImage/ProfileImage";

const MostAttendedEventSlide = ({ stats }) => {
  const event = stats.mostAttendedEvent;

  // Reviews are now attached directly to the enriched movie
  const reviews = event?.reviews || [];

  const processedReviews = [...event.attendees]
    .map((attendee) => {
      const review = reviews.find(
        (r) => r.displayName.toLowerCase() === attendee.toLowerCase()
      );
      return { attendee, review };
    })
    .sort((a, b) => {
      // Users without reviews go last
      if (!a.review && !b.review) return 0;
      if (!a.review) return 1;
      if (!b.review) return -1;
      // Sort by rating, lowest to highest
      return a.review.rating - b.review.rating;
    });

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

      <ScrollableFade className="flex flex-row max-md:flex-col gap-2 w-full max-w-225">
        {/* Primary Stat Card - Attendee Count */}
        <StatCard className="gap-2 text-white text-center leading-normal flex-1">
          <p className="font-inter font-semibold text-5xl max-md:text-4xl">
            {event.attendeeCount} Attendees
          </p>
          <p className="font-inter text-3xl max-md:text-2xl">
            {event.eventName}
          </p>
          <div className="flex gap-2 items-center justify-center">
            <p className="font-inter text-xl">Hosted by</p>
            <div className="flex gap-2 items-center justify-center">
              <ProfileImage name={event.host} className="w-8 h-8" small />
              <p className="text-xl font-semibold text-white">{event.host}</p>
            </div>
            <p className="font-inter font-light text-xl">
              on {formatDate(event.watchedDate)}
            </p>
          </div>
        </StatCard>

        {/* Secondary Card - Movie Info + Reviews */}
        <StatCard
          secondary
          className="gap-4 items-start flex-1 max-md:items-center"
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
          {processedReviews?.length > 0 && (
            <div className="grid grid-cols-5 gap-4">
              {processedReviews.map(({ attendee, review }, index) => (
                <UserReview
                  key={index}
                  displayName={attendee}
                  rating={review?.rating}
                  liked={review?.liked}
                />
              ))}
            </div>
          )}
        </StatCard>
      </ScrollableFade>
    </Slide>
  );
};

export default MostAttendedEventSlide;
