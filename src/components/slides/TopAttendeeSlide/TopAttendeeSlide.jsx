import Slide, { SlideTitle } from "../../Slide";
import ProfileImage from "../../ProfileImage/ProfileImage";
import StatCard from "../../StatCard/StatCard";
import ScrollableFade from "../../ScrollableFade/ScrollableFade";

const ProfileWithBadgeCount = ({ name, count }) => {
  return (
    <div className="space-y-1 text-center">
      <div className="relative">
        <ProfileImage name={name} className="w-16 h-16" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-[#333] text-sm font-black flex items-center justify-center shadow-[--shadow-rank-badge] border-2 border-white/90">
          {count}
        </div>
      </div>
      <span className="text-base md:text-lg text-white text-center">
        {name}
      </span>
    </div>
  );
};

const TopAttendeeSlide = ({ stats }) => {
  const sortedAttendees = Object.entries(stats.attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  );

  // Find top attendees (may be multiple if tied)
  const topCount = sortedAttendees[0]?.[1];
  const topAttendees = sortedAttendees
    .filter(([, count]) => count === topCount)
    .sort((a, b) => a[0].localeCompare(b[0]));
  const otherAttendees = sortedAttendees.filter(
    ([, count]) => count !== topCount
  );

  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Top Attendees</SlideTitle>

      <ScrollableFade className="flex flex-col gap-2 w-full">
        {/* Primary cards for top attendee(s) */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {topAttendees.map(([name, count]) => (
            <StatCard key={name} className="gap-2">
              <div className="flex gap-2 items-center justify-center">
                <ProfileImage name={name} className="w-16 h-16" />
                <p className="text-5xl max-sm:text-4xl font-semibold text-white">
                  {name}
                </p>
              </div>
              <p className="text-2xl max-sm:text-xl font-light italic text-white">
                {count} events attended
              </p>
            </StatCard>
          ))}
        </div>

        {/* Secondary card for other attendees */}
        {otherAttendees.length > 0 && (
          <StatCard
            secondary
            className="flex-row flex-wrap gap-2 justify-center"
          >
            {otherAttendees.map(([name, count]) => (
              <ProfileWithBadgeCount key={name} name={name} count={count} />
            ))}
          </StatCard>
        )}
      </ScrollableFade>
    </Slide>
  );
};

export default TopAttendeeSlide;
