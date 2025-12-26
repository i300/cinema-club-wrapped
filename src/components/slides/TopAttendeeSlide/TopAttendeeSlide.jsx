import Slide from "../../Slide";
import ProfileImage from "../../ProfileImage/ProfileImage";

const TopAttendeeSlide = ({ stats }) => {
  const sortedAttendees = Object.entries(stats.attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const getAvatarContent = (name, count) => {
    return (
      <div className="relative">
        <ProfileImage name={name} className="w-20 h-20" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 max-md:w-7 max-md:h-7 rounded-full bg-white text-[#333] text-base max-md:text-[0.9rem] font-black flex items-center justify-center shadow-[--shadow-rank-badge] border-2 border-white/90">
          {count}
        </div>
      </div>
    );
  };

  return (
    <Slide className="stat-slide bg-gradient-top-attendee">
      <div className="slide-content">
        <p className="stat-label">Most dedicated member</p>
        <h1 className="stat-highlight">{stats.topAttendee.name}</h1>
        <h2 className="stat-number">{stats.topAttendee.count}</h2>
        <p className="stat-description">
          out of {stats.totalMovies} events attended
        </p>

        <div className="mt-6 p-4 rounded-[15px] max-w-[750px] mx-auto max-h-[420px] flex flex-col">
          <h3 className="text-2xl text-white/90 mb-4 font-semibold flex-shrink-0">
            Top Attendees
          </h3>
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6 max-md:gap-4 justify-items-center overflow-y-auto py-2 pr-4 pl-2 scrollbar-custom">
            {sortedAttendees.map(([name, count]) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 relative w-full"
              >
                {getAvatarContent(name, count)}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-lg max-md:text-[0.95rem] text-white font-bold text-center">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default TopAttendeeSlide;
