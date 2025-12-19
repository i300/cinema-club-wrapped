import './Slide.css';

const Slide = ({ children, className = '' }) => {
  return (
    <div className={`slide ${className}`}>
      {children}
    </div>
  );
};

export default Slide;
