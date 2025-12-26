import Slide from "../../Slide";

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
  const isPopularityMode = stats.actorRankingMode === "popularity";

  return (
    <Slide className="stat-slide bg-gradient-actors">
      <div className="slide-content">
        {isPopularityMode ? (
          <>
            {/* Popularity ranking mode */}
            <p className="stat-label">Most popular actors</p>
            <p className="stat-description mb-4">
              No actors appeared in multiple films
            </p>
            <h1 className="stat-highlight">{topActor.name}</h1>
            <div className="flex flex-col items-center gap-2 my-6">
              <span className="text-[4rem] font-black text-[--color-gold] text-shadow-gold">
                {topActor.popularity.toFixed(1)}
              </span>
              <span className="text-xl text-white/90 font-semibold">
                popularity score
              </span>
            </div>

            {/* Show movie they appeared in */}
            {topActor.movies.length > 0 && (
              <div className="my-6">
                <p className="stat-description">Seen in:</p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {topActor.movies.map((movieTitle, index) => (
                    <span
                      key={index}
                      className="bg-white/25 text-white px-4 py-2 rounded-[20px] font-semibold text-[0.9rem]"
                    >
                      {movieTitle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Podium for 2nd-4th place by popularity */}
            {podiumActors.length > 0 && (
              <div className="flex gap-4 justify-center mt-6 max-md:flex-col max-md:gap-3">
                {podiumActors.map((actor, index) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center gap-2 bg-white/15 p-4 rounded-xl min-w-[100px] max-md:w-full"
                  >
                    <span className="text-xl font-bold text-white/90">
                      #{index + 2}
                    </span>
                    <span className="text-lg font-semibold text-white text-center">
                      {actor.name}
                    </span>
                    <span className="text-2xl font-extrabold text-white">
                      {actor.popularity.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="stat-detail">
              {stats.totalUniqueActors} unique actors total
            </p>
          </>
        ) : (
          <>
            {/* Appearance count mode */}
            <p className="stat-label">Most featured actor</p>
            <h1 className="stat-highlight">{topActor.name}</h1>
            <h2 className="stat-number">{topActor.count}</h2>
            <p className="stat-unit">appearances</p>

            {/* Movies featuring top actor */}
            <div className="my-6">
              <p className="stat-description">Appeared in:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {topActor.movies.map((movieTitle, index) => (
                  <span
                    key={index}
                    className="bg-white/25 text-white px-4 py-2 rounded-[20px] font-semibold text-[0.9rem]"
                  >
                    {movieTitle}
                  </span>
                ))}
              </div>
            </div>

            {/* Podium for 2nd-4th place */}
            {podiumActors.length > 0 && (
              <div className="flex gap-4 justify-center mt-6 max-md:flex-col max-md:gap-3">
                {podiumActors.map((actor, index) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center gap-2 bg-white/15 p-4 rounded-xl min-w-[100px] max-md:w-full"
                  >
                    <span className="text-xl font-bold text-white/90">
                      #{index + 2}
                    </span>
                    <span className="text-lg font-semibold text-white text-center">
                      {actor.name}
                    </span>
                    <span className="text-2xl font-extrabold text-white">
                      {actor.count}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="stat-detail">
              {stats.totalUniqueActors} unique actors total
            </p>
          </>
        )}
      </div>
    </Slide>
  );
};

export default TopActorsSlide;
