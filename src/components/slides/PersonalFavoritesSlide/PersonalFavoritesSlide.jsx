import Slide from '../../Slide';
import './PersonalFavoritesSlide.css';

const PersonalFavoritesSlide = ({ stats }) => {
  if (!stats?.ratingsStats?.personalFavorites) {
    return (
      <Slide className="stat-slide personal-favorites-slide">
        <div className="slide-content">
          <p className="stat-label">No rating data available</p>
        </div>
      </Slide>
    );
  }

  const favorites = stats.ratingsStats.personalFavorites;
  const favoritesArray = Object.entries(favorites);

  return (
    <Slide className="stat-slide personal-favorites-slide">
      <div className="slide-content">
        <p className="stat-label">Personal favorites</p>
        <div className="favorites-grid">
          {favoritesArray.map(([name, fav]) => (
            <div key={name} className="favorite-card">
              <span className="user-name">{name}</span>
              <span className="favorite-arrow">→</span>
              <span className="movie-name">{fav.movieName}</span>
            </div>
          ))}
        </div>
        <p className="stat-detail">{favoritesArray.length} personal favorites</p>
      </div>
    </Slide>
  );
};

export default PersonalFavoritesSlide;
