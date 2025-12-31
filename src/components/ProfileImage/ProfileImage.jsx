// Import profile images
import clsx from "clsx";
import alexImg from "../../assets/alex.jpeg";
import brennaImg from "../../assets/brenna.jpeg";
import jerryImg from "../../assets/jerry.jpeg";
import jojoImg from "../../assets/jojo.jpeg";
import julietImg from "../../assets/juliet.jpeg";
import michaelImg from "../../assets/michael.jpeg";
import nirImg from "../../assets/nir.jpeg";
import zoeImg from "../../assets/zoe.jpeg";

const profileImages = {
  alex: alexImg,
  brenna: brennaImg,
  jerry: jerryImg,
  jojo: jojoImg,
  juliet: julietImg,
  michael: michaelImg,
  nir: nirImg,
  zoe: zoeImg,
};

// Generate a consistent gradient color based on name
const getGradientForName = (name) => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
};

const ProfileImage = ({ name, className = "", small = false }) => {
  const nameLower = name.toLowerCase();
  const profileImage = profileImages[nameLower];

  return (
    <div
      className={`rounded-full border-3 border-white/40 flex items-center justify-center shadow-[--shadow-avatar] bg-cover bg-center bg-no-repeat bg-origin-border ${className}`}
      style={{
        backgroundImage: profileImage
          ? `url(${profileImage})`
          : `${getGradientForName(name)}`,
      }}
    >
      {!profileImage && (
        <span
          className={clsx(
            "font-black text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] relative z-10",
            !small && "text-2xl"
          )}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default ProfileImage;
