import Slide from "../../Slide";

const BustOfTheYearSlide = ({ stats }) => {
  if (!stats?.leastLikedMovie) {
    return (
      <Slide className="stat-slide bg-gradient-bust">
        <div className="slide-content">
          <p className="stat-label">No rating data available</p>
        </div>
      </Slide>
    );
  }

  const worstMovie = stats.leastLikedMovie;

  return (
    <Slide className="stat-slide bg-gradient-bust">
      <div className="slide-content">
        <p className="stat-label">Bust of the year</p>
        <h1 className="stat-highlight">{worstMovie.title}</h1>
        <h2 className="stat-number">{worstMovie.averageScore.toFixed(1)}</h2>
        <p className="stat-unit">average score</p>
        <p className="stat-description">
          {worstMovie.totalReviews} reviews • {worstMovie.likeCount} likes
        </p>
      </div>
    </Slide>
  );
};

export default BustOfTheYearSlide;
