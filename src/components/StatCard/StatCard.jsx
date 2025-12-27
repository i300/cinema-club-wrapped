import clsx from "clsx";

const StatCard = ({ children, className, secondary = false }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center p-4 rounded-2xl flex-1",
        secondary
          ? "bg-gradient-card-secondary border border-purple-primary"
          : "bg-gradient-card",
        className
      )}
    >
      {children}
    </div>
  );
};

export default StatCard;
