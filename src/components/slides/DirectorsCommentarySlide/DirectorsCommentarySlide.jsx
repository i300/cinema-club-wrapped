import ScrollableFade from "../../ScrollableFade/ScrollableFade";
import Slide, { SlideTitle } from "../../Slide";

const DirectorsCommentarySlide = () => {
  return (
    <Slide className="flex flex-col items-center w-full mx-auto max-sm:h-full">
      <SlideTitle>Director's Commentary</SlideTitle>

      <ScrollableFade className="max-w-lg px-4 text-lg md:text-xl text-white/90 leading-relaxed space-y-2">
        <p>And that's your 2025 Cinema Club Wrapped!</p>
        <p>
          What started as a silly idea quickly became a really large project. It
          made me appreciate all the effort that goes into a little app like
          this. I hand collected all the data from Letterboxd and Partiful,
          designed each slide by hand in Figma, and spent way too many hours
          debugging. Getting this to work on every platform (iPhone, Android,
          Chrome, and Safari) was much more challenging than I anticipated. All
          that is to say I really put a lot into this project, to show my
          appreciation for you all.
        </p>
        <p>
          Our silly little group means a great deal to me and I'm so happy we
          spent the year watching movies together. Tessa, thank you for getting
          this started with the first Cinema Alub. Alex, Nir, & Brenna, thanks
          for always hosting and having a great space to hang out. Happy New
          Year, here's to many more movies in 2026!
        </p>
        <p className="font-tangerine text-4xl text-right w-full max-sm:mb-4">
          Love, Jerry
        </p>
      </ScrollableFade>
    </Slide>
  );
};

export default DirectorsCommentarySlide;
