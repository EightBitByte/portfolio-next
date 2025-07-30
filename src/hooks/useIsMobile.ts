"use client";

import { useEffect, useState } from "react";

/**
 * A custom hook to determine if the screen is mobile-sized.
 * @param {number} [breakpoint=768] The width in pixels to consider the mobile breakpoint.
 * @returns {boolean} True if the window width is less than the breakpoint, otherwise false.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
