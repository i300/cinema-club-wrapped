import Slide, { SlideTitle } from "../../Slide";
import useScreenSize from "../../../hooks/useScreenSize";

const WelcomeSlide = () => {
  const { mobile } = useScreenSize();

  const stickerSize = mobile ? 80 : 96;

  return (
    <Slide className="h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center text-center flex-1">
        <SlideTitle className="relative text-[5rem] md:text-[6rem] mb-0!">
          Cinema Club
          <img
            src="sticker.svg"
            width={stickerSize}
            height={stickerSize}
            className="absolute top-0 -right-2 translate-x-1/2 -translate-y-1/2"
          />
        </SlideTitle>
        <p className="font-bold italic text-[2.5rem] md:text-[3rem]">Wrapped</p>
      </div>
      <div className="mb-4">
        <span>Data from</span>
        <img src="partiful.svg" className="h-7" />
        <img src="letterboxd.svg" className="h-5" />
        <span>Made with &lt;3 by Jerry</span>
      </div>
    </Slide>
  );
};

export default WelcomeSlide;
