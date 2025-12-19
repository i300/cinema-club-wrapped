import Slide from '../Slide';

const TopActorsSlide = ({ stats }) => {
  // Edge case: no actors data
  if (!stats.topActors || stats.topActors.length === 0) {
    return (
      <Slide className="stat-slide top-actors-slide">
        <div className="slide-content">
          <p className="stat-label">No actor data available</p>
        </div>
      </Slide>
    );
  }

  const topActor = stats.topActors[0];
  const podiumActors = stats.topActors.slice(1, 4); // 2nd-4th place
  const isPopularityMode = stats.actorRankingMode === 'popularity';

  return (
    <Slide className="stat-slide top-actors-slide">
      <div className="slide-content">
        {isPopularityMode ? (
          <>
            {/* Popularity ranking mode */}
            <p className="stat-label">Most popular actors</p>
            <p className="stat-description" style={{ marginBottom: '1rem' }}>
              No actors appeared in multiple films
            </p>
            <h1 className="stat-highlight">{topActor.name}</h1>
            <div className="popularity-display">
              <span className="popularity-score">{topActor.popularity.toFixed(1)}</span>
              <span className="popularity-label">popularity score</span>
            </div>

            {/* Show movie they appeared in */}
            {topActor.movies.length > 0 && (
              <div className="actor-movies">
                <p className="stat-description">Seen in:</p>
                <div className="movie-badges">
                  {topActor.movies.map((movieTitle, index) => (
                    <span key={index} className="movie-badge">{movieTitle}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Podium for 2nd-4th place by popularity */}
            {podiumActors.length > 0 && (
              <div className="actor-podium">
                {podiumActors.map((actor, index) => (
                  <div key={actor.id} className="podium-item">
                    <span className="podium-rank">#{index + 2}</span>
                    <span className="podium-name">{actor.name}</span>
                    <span className="podium-count">{actor.popularity.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="stat-detail">{stats.totalUniqueActors} unique actors total</p>
          </>
        ) : (
          <>
            {/* Appearance count mode */}
            <p className="stat-label">Most featured actor</p>
            <h1 className="stat-highlight">{topActor.name}</h1>
            <h2 className="stat-number">{topActor.count}</h2>
            <p className="stat-unit">appearances</p>

            {/* Movies featuring top actor */}
            <div className="actor-movies">
              <p className="stat-description">Appeared in:</p>
              <div className="movie-badges">
                {topActor.movies.map((movieTitle, index) => (
                  <span key={index} className="movie-badge">{movieTitle}</span>
                ))}
              </div>
            </div>

            {/* Podium for 2nd-4th place */}
            {podiumActors.length > 0 && (
              <div className="actor-podium">
                {podiumActors.map((actor, index) => (
                  <div key={actor.id} className="podium-item">
                    <span className="podium-rank">#{index + 2}</span>
                    <span className="podium-name">{actor.name}</span>
                    <span className="podium-count">{actor.count}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="stat-detail">{stats.totalUniqueActors} unique actors total</p>
          </>
        )}
      </div>
    </Slide>
  );
};

export default TopActorsSlide;
