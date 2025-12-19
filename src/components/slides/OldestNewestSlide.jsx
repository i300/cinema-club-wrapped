import Slide from '../Slide';

const OldestNewestSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide oldest-newest-slide">
      <div className="slide-content">
        <p className="stat-label">Time travelers</p>
        <div className="split-stats">
          <div className="stat-half">
            <h3 className="stat-subtitle">Oldest</h3>
            <h2 className="stat-movie-title">{stats.oldestMovie.title}</h2>
            <p className="stat-year">{stats.oldestMovie.year}</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-half">
            <h3 className="stat-subtitle">Newest</h3>
            <h2 className="stat-movie-title">{stats.newestMovie.title}</h2>
            <p className="stat-year">{stats.newestMovie.year}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default OldestNewestSlide;
