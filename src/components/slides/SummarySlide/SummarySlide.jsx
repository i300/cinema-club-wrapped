import Slide, { SlideTitle } from "../../Slide";
import StatCard from "../../StatCard/StatCard";
import ProfileImage from "../../ProfileImage/ProfileImage";
import MoviePoster from "../../MoviePoster/MoviePoster";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";

const SummaryItemContainer = ({ title, subtitle, children }) => (
  <StatCard
    secondary
    className="grow-0 flex-row items-center gap-4 justify-start"
  >
    {children}
    <div className="text-left min-w-0">
      <p className="text-sm text-white/70 font-light italic">{title}</p>
      <p className="text-2xl font-semibold text-white truncate">{subtitle}</p>
    </div>
  </StatCard>
);

const SummaryItem = ({ icon, poster, profile, title, subtitle }) => (
  <SummaryItemContainer title={title} subtitle={subtitle}>
    {icon && (
      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <span className="text-2xl">{icon}</span>
      </div>
    )}
    {poster && <MoviePoster movie={poster} className="w-12 rounded-lg!" />}
    {profile && <ProfileImage name={profile} className="w-12 h-12" />}
  </SummaryItemContainer>
);

const TopAtendeesCard = ({ stats }) => {
  // Find top attendees (may be multiple if tied)
  const sortedAttendees = Object.entries(stats.attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const topCount = sortedAttendees[0]?.[1];
  const topAttendees = sortedAttendees
    .filter(([, count]) => count === topCount)
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <SummaryItemContainer
      title={`Top Attendee${topAttendees.length > 1 ? "s" : ""}`}
      subtitle={topAttendees.map(([name]) => name).join(" & ")}
    >
      <div className="flex -space-x-3">
        {topAttendees.map(([name]) => (
          <ProfileImage key={name} name={name} className="w-12 h-12" />
        ))}
      </div>
    </SummaryItemContainer>
  );
};

const TopHostsCard = ({ stats }) => {
  if (!stats.topHosts) return null;

  const topHost = stats.topHosts[0];

  return (
    <SummaryItemContainer title="Most Movies Chosen" subtitle={topHost.name}>
      <ProfileImage name={topHost.name} className="w-12 h-12" />
    </SummaryItemContainer>
  );
};

const SummarySlide = ({ stats }) => {
  return (
    <Slide className="flex flex-col items-center justify-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Cinema Club Wrapped 2025</SlideTitle>

      <ScrollableFade className="w-full h-full gap-2 max-sm:flex max-sm:flex-col md:grid md:grid-cols-2">
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
          title="Most Attended Event"
          subtitle={stats.mostAttendedEvent?.eventName}
        />
        <TopHostsCard stats={stats} />
        <TopAtendeesCard stats={stats} />
        <SummaryItem
          poster={stats.leastLikedMovie}
          title="Bust of the Year"
          subtitle={stats.leastLikedMovie?.title}
        />
        <SummaryItem
          poster={stats.mostLikedMovie}
          title="Top Movie"
          subtitle={stats.mostLikedMovie?.title}
        />
      </ScrollableFade>
    </Slide>
  );
};

export default SummarySlide;
