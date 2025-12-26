import Slide from "../../Slide";

const OldestNewestSlide = ({ stats }) => {
  const decades = Object.entries(stats.decadeCounts)
    .sort((a, b) => a[0] - b[0])
    .map(([decade, count]) => ({
      decade: `${decade}s`,
      count,
      percentage: (count / stats.totalMovies) * 100,
    }));

  const maxCount = Math.max(...decades.map((d) => d.count));

  return (
    <Slide className="stat-slide bg-gradient-oldest">
      <div className="slide-content">
        <p className="stat-label">Time travelers</p>
        <div className="flex gap-8 items-center justify-center mt-8 max-md:flex-col max-md:gap-8">
          <div className="flex-1 max-w-[350px]">
            <h3 className="text-xl text-white/80 mb-4 font-semibold uppercase tracking-[2px]">
              Oldest
            </h3>
            <h2 className="stat-movie-title">{stats.oldestMovie.title}</h2>
            <p className="text-2xl text-white/90 font-semibold">
              {stats.oldestMovie.year}
            </p>
          </div>
          <div className="w-0.5 h-[150px] bg-white/40 max-md:w-[150px] max-md:h-0.5"></div>
          <div className="flex-1 max-w-[350px]">
            <h3 className="text-xl text-white/80 mb-4 font-semibold uppercase tracking-[2px]">
              Newest
            </h3>
            <h2 className="stat-movie-title">{stats.newestMovie.title}</h2>
            <p className="text-2xl text-white/90 font-semibold">
              {stats.newestMovie.year}
            </p>
          </div>
        </div>

        <div className="my-8">
          <h3 className="text-xl text-white/90 mb-6 font-semibold uppercase tracking-[2px] text-center">
            Decade distribution
          </h3>
          <div className="flex flex-col gap-4 max-w-[600px] mx-auto">
            {decades.map(({ decade, count }) => (
              <div key={decade} className="flex items-center gap-4">
                <div className="min-w-[60px] font-semibold text-white text-lg text-left">
                  {decade}
                </div>
                <div className="flex-1 bg-white/20 rounded-[10px] overflow-hidden h-10">
                  <div
                    className="h-full bg-gradient-decade-bar flex items-center justify-end pr-4 transition-all duration-500 min-w-[60px]"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  >
                    <span className="text-[#333] font-bold text-lg">
                      {count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default OldestNewestSlide;
