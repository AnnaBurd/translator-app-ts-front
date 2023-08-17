import { useEffect } from "react";

export const useDisableBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
      //   document.body.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
      //   document.body.style.overflowY = "unset";
    }
  }, [isOpen]);
};
