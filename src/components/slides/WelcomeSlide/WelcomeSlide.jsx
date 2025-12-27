import Slide, { SlideTitle } from "../../Slide";
import useScreenSize from "../../../hooks/useScreenSize";

const WelcomeSlide = () => {
  const { mobile } = useScreenSize();

  const stickerSize = mobile ? 80 : 96;

  return (
    <Slide className="h-full flex flex-col items-center justify-center relative">
      <div className="relative text-center">
        <SlideTitle className="text-[5rem] md:text-[6rem] mb-0!">
          Cinema Club
        </SlideTitle>
        <p className="font-bold italic text-[2.5rem] md:text-[3rem]">Wrapped</p>
        <img
          src="public/sticker.svg"
          width={stickerSize}
          height={stickerSize}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p className="absolute top-[85vh] font-extralight">
        Made with &lt;3 by Jerry
      </p>
    </Slide>
  );
};

export default WelcomeSlide;
