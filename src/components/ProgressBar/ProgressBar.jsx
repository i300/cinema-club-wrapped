import { motion } from 'framer-motion';

const ProgressBar = ({ totalSlides, currentSlide }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-[900px] flex gap-1.5 z-[1000] md:top-6 max-md:top-4 max-md:w-[calc(100%-2rem)] max-md:gap-1">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div key={index} className="flex-1 h-[3px] bg-white/25 rounded-[2px] overflow-hidden max-md:h-[2px]">
          <motion.div
            className="h-full bg-white origin-left"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: index <= currentSlide ? 1 : 0,
              opacity: index < currentSlide ? 1 : index === currentSlide ? 0.9 : 0.3
            }}
            transition={{
              scaleX: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
