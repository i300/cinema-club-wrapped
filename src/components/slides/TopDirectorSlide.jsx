import Slide from '../Slide';

const TopDirectorSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide director-slide">
      <div className="slide-content">
        <p className="stat-label">Director spotlight</p>
        <h1 className="stat-highlight">{stats.topDirector.name}</h1>
        <p className="stat-description">
          {stats.topDirector.count} {stats.topDirector.count === 1 ? 'film' : 'films'} watched
        </p>
      </div>
    </Slide>
  );
};

export default TopDirectorSlide;
