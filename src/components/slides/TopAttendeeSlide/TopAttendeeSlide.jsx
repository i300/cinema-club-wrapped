import Slide from "../../Slide";

// Import profile images
import alexImg from "../../../assets/alex.jpeg";
import brennaImg from "../../../assets/brenna.jpeg";
import jerryImg from "../../../assets/jerry.jpeg";
import jojoImg from "../../../assets/jojo.jpeg";
import julietImg from "../../../assets/juliet.jpeg";
import michaelImg from "../../../assets/michael.jpeg";
import nirImg from "../../../assets/nir.jpeg";
import zoeImg from "../../../assets/zoe.jpeg";

const profileImages = {
  alex: alexImg,
  brenna: brennaImg,
  jerry: jerryImg,
  jojo: jojoImg,
  juliet: julietImg,
  michael: michaelImg,
  nir: nirImg,
  zoe: zoeImg,
};

// Generate a consistent gradient color based on name
const getGradientForName = (name) => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
};

const TopAttendeeSlide = ({ stats }) => {
  const sortedAttendees = Object.entries(stats.attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const getAvatarContent = (name, count) => {
    const nameLower = name.toLowerCase();
    const profileImage = profileImages[nameLower];

    if (profileImage) {
      return (
        <div
          className="w-[100px] h-[100px] max-md:w-20 max-md:h-20 rounded-full border-[3px] border-white/40 flex items-center justify-center relative shadow-[--shadow-avatar] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${profileImage})`,
            backgroundOrigin: "border-box",
          }}
        >
          <div className="absolute -bottom-1 -right-1 w-8 h-8 max-md:w-7 max-md:h-7 rounded-full bg-white text-[#333] text-base max-md:text-[0.9rem] font-black flex items-center justify-center shadow-[--shadow-rank-badge] border-2 border-white/90">
            {count}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="w-[100px] h-[100px] max-md:w-20 max-md:h-20 rounded-full border-[3px] border-white/40 flex items-center justify-center relative shadow-[--shadow-avatar] bg-cover bg-center bg-no-repeat backdrop-blur-[10px]"
          style={{
            background: `${getGradientForName(name)} border-box`,
            backgroundOrigin: "border-box",
          }}
        >
          <div className="absolute -bottom-1 -right-1 w-8 h-8 max-md:w-7 max-md:h-7 rounded-full bg-white text-[#333] text-base max-md:text-[0.9rem] font-black flex items-center justify-center shadow-[--shadow-rank-badge] border-2 border-white/90">
            {count}
          </div>
          <span className="text-[2.5rem] max-md:text-[2rem] font-black text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] relative z-10">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }
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
