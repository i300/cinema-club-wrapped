import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const ScrollableFade = ({ children, className = "", fadeDistance = 8 }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    isAtBottom: true,
    hasOverflow: false,
  });

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const hasOverflow = scrollHeight > clientHeight;
    const isAtTop = scrollTop <= 1;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Calculate scroll distances from top and bottom
    const maxScroll = scrollHeight - clientHeight;
    const scrollFromTop = scrollTop;
    const scrollFromBottom = maxScroll - scrollTop;

    setScrollState({
      isAtTop,
      isAtBottom,
      hasOverflow,
      scrollFromTop,
      scrollFromBottom,
      maxScroll,
    });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  const getMaskImage = () => {
    if (!scrollState.hasOverflow) return "none";

    if (scrollState.isAtTop && scrollState.isAtBottom) {
      return "none";
    }

    const maxFadeDistance = fadeDistance * 2;

    // Exponential easing function for smoother fade
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    // Calculate dynamic fade distances with exponential easing
    const topScrollRatio = scrollState.scrollFromTop / scrollState.maxScroll;
    const bottomScrollRatio =
      scrollState.scrollFromBottom / scrollState.maxScroll;

    const topFadeDistance = scrollState.isAtTop
      ? 0
      : Math.min(
          maxFadeDistance,
          easeOutExpo(topScrollRatio) * maxFadeDistance
        );

    const bottomFadeDistance = scrollState.isAtBottom
      ? 0
      : Math.min(
          maxFadeDistance,
          easeOutExpo(bottomScrollRatio) * maxFadeDistance
        );

    if (scrollState.isAtTop) {
      return `linear-gradient(to bottom, black calc(100% - ${bottomFadeDistance}px), transparent)`;
    } else if (scrollState.isAtBottom) {
      return `linear-gradient(to bottom, transparent, black ${topFadeDistance}px)`;
    } else {
      return `linear-gradient(to bottom, transparent, black ${topFadeDistance}px, black calc(100% - ${bottomFadeDistance}px), transparent)`;
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={checkScroll}
      className={clsx(
        "overflow-y-auto overflow-x-hidden [touch-action:pan-y]",
        className
      )}
      style={{
        maskImage: getMaskImage(),
        WebkitMaskImage: getMaskImage(),
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableFade;
