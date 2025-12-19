import Slide from '../Slide';

const HighestRatedSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide highest-rated-slide">
      <div className="slide-content">
        <p className="stat-label">Your club's favorite</p>
        <h1 className="stat-movie-title">{stats.highestRated.title}</h1>
        <div className="rating-display">
          <span className="rating-number">{stats.highestRated.rating}</span>
          <span className="rating-max">/10</span>
        </div>
        <p className="stat-detail">{stats.highestRated.director} • {stats.highestRated.year}</p>
      </div>
    </Slide>
  );
};

export default HighestRatedSlide;
