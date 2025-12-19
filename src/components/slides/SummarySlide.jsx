import Slide from '../Slide';

const SummarySlide = ({ stats }) => {
  return (
    <Slide className="summary-slide">
      <div className="slide-content">
        <h2 className="summary-title">2025: A Year in Cinema</h2>
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-number">{stats.totalMovies}</span>
            <span className="summary-label">Movies</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{stats.totalHours}h</span>
            <span className="summary-label">Watched</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{stats.averageRating}</span>
            <span className="summary-label">Avg Rating</span>
          </div>
        </div>
        <div className="summary-highlights">
          <p>Top Genre: {stats.topGenre.genre}</p>
          <p>Favorite: {stats.highestRated.title}</p>
          <p>Most Featured: {stats.topDirector.name}</p>
        </div>
        <p className="summary-footer">Thanks for another great year of cinema!</p>
      </div>
    </Slide>
  );
};

export default SummarySlide;
