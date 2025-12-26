import Slide from '../../Slide';

const TotalMoviesSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide total-movies-slide">
      <div className="slide-content">
        <p className="stat-label">Together, you watched</p>
        <h1 className="stat-number">{stats.totalMovies}</h1>
        <p className="stat-unit">movies</p>
      </div>
    </Slide>
  );
};

export default TotalMoviesSlide;
