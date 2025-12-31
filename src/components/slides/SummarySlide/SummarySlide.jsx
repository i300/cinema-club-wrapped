import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import ProfileImage from "../../ProfileImage/ProfileImage";
import MoviePoster from "../../MoviePoster/MoviePoster";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";

const SummaryItem = ({ icon, poster, profile, title, subtitle }) => (
  <StatCard secondary className="flex-row! items-center gap-3 justify-start!">
    {icon && (
      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <span className="text-2xl">{icon}</span>
      </div>
    )}
    {poster && <MoviePoster movie={poster} className="w-12 rounded-lg!" />}
    {profile && <ProfileImage name={profile} className="w-12 h-12" />}
    <div className="text-left min-w-0">
      <p className="text-sm text-white/70">{title}</p>
      <p className="text-base font-semibold text-white truncate">{subtitle}</p>
    </div>
  </StatCard>
);

const SummarySlide = ({ stats }) => {
  // Find top attendees (may be multiple if tied)
  const sortedAttendees = Object.entries(stats.attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const topCount = sortedAttendees[0]?.[1];
  const topAttendees = sortedAttendees
    .filter(([, count]) => count === topCount)
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Cinema Club Wrapped 2025</SlideTitle>

      <ScrollableFade className="w-full h-full grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <SummaryItem
          icon="🎬"
          title="Total Movies"
          subtitle={`${stats.totalMovies} movies`}
        />
        <SummaryItem
          icon="🎭"
          title="Top Genre"
          subtitle={stats.topGenre.genre}
        />
        <SummaryItem
          poster={stats.mostAttendedEvent}
          title="Top Event"
          subtitle={stats.mostAttendedEvent?.eventName}
        />
        <StatCard
          secondary
          className="flex-row! items-center gap-3 justify-start!"
        >
          <div className="flex -space-x-3">
            {topAttendees.map(([name]) => (
              <ProfileImage key={name} name={name} className="w-12 h-12" />
            ))}
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm text-white/70">
              Top Attendee{topAttendees.length > 1 ? "s" : ""}
            </p>
            <p className="text-base font-semibold text-white truncate">
              {topAttendees.map(([name]) => name).join(" & ")}
            </p>
          </div>
        </StatCard>
        <SummaryItem
          poster={stats.mostLikedMovie}
          title="Top Movie"
          subtitle={stats.mostLikedMovie?.title}
        />
        <SummaryItem
          poster={stats.leastLikedMovie}
          title="Bust of the Year"
          subtitle={stats.leastLikedMovie?.title}
        />
      </ScrollableFade>
    </Slide>
  );
};

export default SummarySlide;
