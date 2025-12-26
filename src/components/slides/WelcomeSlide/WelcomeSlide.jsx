import Slide from "../../Slide";

const WelcomeSlide = () => {
  return (
    <Slide className="bg-gradient-welcome rounded-[20px] shadow-[--shadow-slide]">
      <div className="text-center w-full p-8">
        <h1 className="text-[5rem] max-md:text-[3rem] font-extrabold m-0 bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent tracking-[-2px]">
          Cinema Club Wrapped
        </h1>
        <h2 className="text-[4rem] max-md:text-[2.5rem] font-bold my-2 text-white/95">
          2025
        </h2>
        <p className="text-2xl text-white/80 mt-4">Our year in films</p>
      </div>
    </Slide>
  );
};

export default WelcomeSlide;
