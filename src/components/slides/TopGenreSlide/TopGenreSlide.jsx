import Slide from "../../Slide";

const TopGenreSlide = ({ stats }) => {
  return (
    <Slide className="stat-slide bg-gradient-genre">
      <div className="slide-content">
        <p className="stat-label">Your favorite genre</p>
        <h1 className="stat-highlight">{stats.topGenre.genre}</h1>
        <p className="stat-description">
          {stats.topGenre.percentage}% of your movies
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {Object.entries(stats.genreCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([genre, count]) => (
              <div
                key={genre}
                className="bg-white/20 px-4 py-2 rounded-[20px] flex gap-2 items-center"
              >
                <span className="text-white font-medium">{genre}</span>
                <span className="bg-white/30 px-2.5 py-0.5 rounded-[10px] font-semibold text-white text-[0.9rem]">
                  {count}
                </span>
              </div>
            ))}
        </div>
      </div>
    </Slide>
  );
};

export default TopGenreSlide;
