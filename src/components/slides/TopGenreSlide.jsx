import Slide from '../Slide';

const TopGenreSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide genre-slide">
      <div className="slide-content">
        <p className="stat-label">Your favorite genre</p>
        <h1 className="stat-highlight">{stats.topGenre.genre}</h1>
        <p className="stat-description">{stats.topGenre.percentage}% of your movies</p>
        <div className="genre-breakdown">
          {Object.entries(stats.genreCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([genre, count]) => (
              <div key={genre} className="genre-item">
                <span className="genre-name">{genre}</span>
                <span className="genre-count">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </Slide>
  );
};

export default TopGenreSlide;
