import Slide from '../Slide';

const DecadeBreakdownSlide = ({ stats }) => {
  const decades = Object.entries(stats.decadeCounts)
    .sort((a, b) => a[0] - b[0])
    .map(([decade, count]) => ({
      decade: `${decade}s`,
      count,
      percentage: (count / stats.totalMovies) * 100
    }));

  const maxCount = Math.max(...decades.map(d => d.count));

  return (
    <Slide className="stat-slide decade-slide">
      <div className="slide-content">
        <p className="stat-label">Decade distribution</p>
        <div className="decade-chart">
          {decades.map(({ decade, count, percentage }) => (
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
    </Slide>
  );
};

export default DecadeBreakdownSlide;
