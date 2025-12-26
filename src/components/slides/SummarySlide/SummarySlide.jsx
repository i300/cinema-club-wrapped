import Slide from "../../Slide";

const SummarySlide = ({ stats }) => {
  return (
    <Slide className="bg-gradient-summary rounded-[20px] shadow-[--shadow-slide]">
      <div className="slide-content">
        <h2 className="text-5xl font-bold text-white mb-8">
          2025: A Year in Cinema
        </h2>
        <div className="flex gap-8 justify-center my-8 max-md:flex-wrap max-md:gap-4">
          <div className="flex flex-col items-center p-6 bg-white/15 rounded-[15px] min-w-[120px]">
            <span className="text-5xl font-extrabold text-white">
              {stats.totalMovies}
            </span>
            <span className="text-base text-white/80 mt-2">Movies</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/15 rounded-[15px] min-w-[120px]">
            <span className="text-5xl font-extrabold text-white">
              {stats.totalHours}h
            </span>
            <span className="text-base text-white/80 mt-2">Watched</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/15 rounded-[15px] min-w-[120px]">
            <span className="text-5xl font-extrabold text-white">
              {stats.averageRating}
            </span>
            <span className="text-base text-white/80 mt-2">Avg Rating</span>
          </div>
        </div>
        <div className="my-8 p-6 bg-white/10 rounded-[15px] inline-block">
          <p className="text-lg text-white/90 my-2">
            Top Genre: {stats.topGenre.genre}
          </p>
          <p className="text-lg text-white/90 my-2">
            Favorite: {stats.highestRated.title}
          </p>
          <p className="text-lg text-white/90 my-2">
            Most Featured: {stats.topDirector.name}
          </p>
        </div>
        <p className="text-xl text-white/80 mt-8 italic">
          Thanks for another great year of cinema!
        </p>
      </div>
    </Slide>
  );
};

export default SummarySlide;
