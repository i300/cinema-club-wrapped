import Slide from "../../Slide";

const EventListSlide = ({ stats }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  return (
    <Slide className="bg-gradient-events rounded-[20px] shadow-[--shadow-slide] overflow-hidden">
      <div className="slide-content">
        <h2 className="text-[2.5rem] max-md:text-[1.8rem] font-bold text-white mb-6">
          Your 2025 Cinema Club Events
        </h2>
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto px-4 items-start scrollbar-custom">
          {stats.movies.map((movie, index) => (
            <div
              key={index}
              className="relative w-full aspect-[2/3] rounded-xl overflow-hidden"
            >
              <div className="relative w-full h-full">
                {movie.posterPath ? (
                  <img
                    src={getPosterUrl(movie.posterPath)}
                    alt={movie.title}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full bg-white/15 flex items-center justify-center p-4 text-center font-semibold text-white text-[0.9rem]">
                    {movie.title}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-overlay p-3 pt-4">
                  <div className="text-[0.65rem] font-semibold text-white/90 text-left bg-white/20 py-1 px-2 rounded inline-block mb-2">
                    {formatDate(movie.watchedDate)}
                  </div>
                  <h3 className="text-[0.75rem] font-bold text-white m-0 mb-1 leading-tight overflow-hidden text-ellipsis line-clamp-2">
                    {movie.eventName}
                  </h3>
                  <p className="text-[0.7rem] text-white/90 m-0 mb-1 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {movie.title}
                  </p>
                  <p className="text-[0.65rem] text-white/70 m-0">
                    {movie.attendeeCount}{" "}
                    {movie.attendeeCount === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default EventListSlide;
