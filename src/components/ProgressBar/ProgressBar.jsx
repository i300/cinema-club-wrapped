import { motion } from 'framer-motion';
import './ProgressBar.css';

const ProgressBar = ({ totalSlides, currentSlide }) => {
  return (
    <div className="progress-bars">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div key={index} className="progress-bar-item">
          <motion.div
            className="progress-bar-fill"
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
