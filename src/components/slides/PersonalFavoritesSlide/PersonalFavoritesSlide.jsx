import Slide from "../../Slide";

const PersonalFavoritesSlide = ({ stats }) => {
  if (!stats?.ratingsStats?.personalFavorites) {
    return (
      <Slide className="stat-slide bg-gradient-favorites">
        <div className="slide-content">
          <p className="stat-label">No rating data available</p>
        </div>
      </Slide>
    );
  }

  const favorites = stats.ratingsStats.personalFavorites;
  const favoritesArray = Object.entries(favorites);

  return (
    <Slide className="stat-slide bg-gradient-favorites">
      <div className="slide-content">
        <p className="stat-label">Personal favorites</p>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 my-6 max-h-[400px] max-md:max-h-[450px] overflow-y-auto p-2 scrollbar-custom">
          {favoritesArray.map(([name, fav]) => (
            <div
              key={name}
              className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-xl transition-colors duration-300 hover:bg-white/25"
            >
              <span className="text-base font-bold text-white min-w-[80px] max-md:min-w-[60px]">
                {name}
              </span>
              <span className="text-xl text-white/70">→</span>
              <span className="text-base font-semibold text-white/95 flex-1">
                {fav.movieName}
              </span>
            </div>
          ))}
        </div>
        <p className="stat-detail">
          {favoritesArray.length} personal favorites
        </p>
      </div>
    </Slide>
  );
};

export default PersonalFavoritesSlide;
