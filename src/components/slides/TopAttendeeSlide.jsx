import Slide from "../Slide";

// Import profile images
import alexImg from "../../assets/alex.jpeg";
import brennaImg from "../../assets/brenna.jpeg";
import jerryImg from "../../assets/jerry.jpeg";
import jojoImg from "../../assets/jojo.jpeg";
import julietImg from "../../assets/juliet.jpeg";
import michaelImg from "../../assets/michael.jpeg";
import nirImg from "../../assets/nir.jpeg";
import zoeImg from "../../assets/zoe.jpeg";

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
          className="leaderboard-avatar"
          style={{ backgroundImage: `url(${profileImage})` }}
        >
          <div className="avatar-rank-badge">{count}</div>
        </div>
      );
    } else {
      return (
        <div
          className="leaderboard-avatar leaderboard-avatar-fallback"
          style={{ background: `${getGradientForName(name)} border-box` }}
        >
          <div className="avatar-rank-badge">{count}</div>
          <span className="avatar-initial">{name.charAt(0).toUpperCase()}</span>
        </div>
      );
    }
  };

  return (
    <Slide className="stat-slide top-attendee-slide">
      <div className="slide-content">
        <p className="stat-label">Most dedicated member</p>
        <h1 className="stat-highlight">{stats.topAttendee.name}</h1>
        <h2 className="stat-number">{stats.topAttendee.count}</h2>
        <p className="stat-description">
          out of {stats.totalMovies} events attended
        </p>

        <div className="attendee-leaderboard">
          <h3 className="leaderboard-title">Top Attendees</h3>
          <div className="leaderboard-horizontal">
            {sortedAttendees.map(([name, count]) => (
              <div key={name} className="leaderboard-card">
                {getAvatarContent(name, count)}
                <div className="leaderboard-info">
                  <span className="leaderboard-name">{name}</span>
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
