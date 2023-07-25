import { useEffect, useState } from "react";

export type ScreenSize = "small" | "medium" | "large";
const breakpoints = {
  small: 640,
  large: 1280,
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("medium");

  useEffect(() => {
    const mqlSmall = window.matchMedia(`(min-width: ${breakpoints.small}px)`);
    const mqlLarge = window.matchMedia(`(min-width: ${breakpoints.large}px)`);

    const handleResize = () => {
      const isSmall = !mqlSmall.matches;
      const isLarge = !!mqlLarge.matches;

      const currentSceenSize = isSmall ? "small" : isLarge ? "large" : "medium";
      setScreenSize(currentSceenSize);
    };

    handleResize();

    mqlSmall.addEventListener("change", handleResize);
    mqlLarge.addEventListener("change", handleResize);

    return () => {
      mqlSmall.removeEventListener("change", handleResize);
      mqlLarge.removeEventListener("change", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
