import Slide from '../Slide';

const RuntimeSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide runtime-slide">
      <div className="slide-content">
        <p className="stat-label">That's</p>
        <h1 className="stat-number">{stats.totalHours}h {stats.totalMinutes}m</h1>
        <p className="stat-description">of cinematic magic</p>
        <p className="stat-detail">({Math.round(stats.totalHours / 24)} days worth of movies!)</p>
      </div>
    </Slide>
  );
};

export default RuntimeSlide;
