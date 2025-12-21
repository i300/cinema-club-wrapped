import Slide from "../../Slide";
import "./TopMoviesSlide.css";

const TopMoviesSlide = ({ stats }) => {
  if (
    !stats?.ratingsStats?.movieStats ||
    stats.ratingsStats.movieStats.length === 0
  ) {
    return (
      <Slide className="stat-slide top-movies-slide">
        <div className="slide-content">
          <p className="stat-label">No rating data available</p>
        </div>
      </Slide>
    );
  }

  const topMovies = stats.ratingsStats.movieStats.slice(0, 3);
  const [first, ...podiumMovies] = topMovies;

  return (
    <Slide className="stat-slide top-movies-slide">
      <div className="slide-content">
        <p className="stat-label">Top rated movies</p>
        <h1 className="stat-highlight">{first.movieName}</h1>
        <div className="score-display">
          <span className="weighted-score">
            {first.averageScore.toFixed(2)}
          </span>
          <span className="score-label">average score</span>
        </div>
        <div className="movie-details">
          <span className="detail-item">{first.totalReviews} reviews</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">{first.likeCount} likes</span>
        </div>

        {podiumMovies.length > 0 && (
          <div className="movie-podium">
            {podiumMovies.map((movie, index) => (
              <div key={movie.movieName} className="podium-item">
                <span className="podium-rank">#{index + 2}</span>
                <span className="podium-name">{movie.movieName}</span>
                <span className="podium-score">
                  {movie.averageScore.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Slide>
  );
};

export default TopMoviesSlide;
