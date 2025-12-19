import Slide from "../Slide";

const OldestNewestSlide = ({ stats }) => {
  const decades = Object.entries(stats.decadeCounts)
    .sort((a, b) => a[0] - b[0])
    .map(([decade, count]) => ({
      decade: `${decade}s`,
      count,
      percentage: (count / stats.totalMovies) * 100,
    }));

  const maxCount = Math.max(...decades.map((d) => d.count));

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

        <div className="decade-distribution">
          <h3 className="decade-subtitle">Decade distribution</h3>
          <div className="decade-chart">
            {decades.map(({ decade, count }) => (
              <div key={decade} className="decade-bar-container">
                <div className="decade-label">{decade}</div>
                <div className="decade-bar-wrapper">
                  <div
                    className="decade-bar"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  >
                    <span className="decade-count">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default OldestNewestSlide;
