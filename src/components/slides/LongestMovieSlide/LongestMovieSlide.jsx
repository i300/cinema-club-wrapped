import Slide from '../../Slide';
import './LongestMovieSlide.css';

const LongestMovieSlide = ({ stats }) => {
  const hours = Math.floor(stats.longestMovie.runtime / 60);
  const minutes = stats.longestMovie.runtime % 60;

  return (
    <Slide className="stat-slide longest-movie-slide">
      <div className="slide-content">
        <p className="stat-label">Marathon champion</p>
        <h1 className="stat-movie-title">{stats.longestMovie.title}</h1>
        <h2 className="stat-number">{hours}h {minutes}m</h2>
        <p className="stat-description">Your longest viewing session</p>
      </div>
    </Slide>
  );
};

export default LongestMovieSlide;
