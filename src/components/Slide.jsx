import "./Slide.css";

const Slide = ({ children, className = "" }) => {
  return <div className={`w-full max-w-[900px] ${className}`}>{children}</div>;
};

export const SlideTitle = ({ children }) => {
  return (
    <p className="text-5xl md:text-6xl font-tangerine text-white text-center mb-4 md:mb-8">
      {children}
    </p>
  );
};
export default Slide;
