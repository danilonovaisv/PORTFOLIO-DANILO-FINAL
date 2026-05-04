"use client";

import { RefObject, useEffect, useState, useRef } from "react";
import { useReducedMotion, useScroll } from "motion/react";

export function useBeliefsScroll(containerRef?: RefObject<HTMLElement | null>) {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const targetRef = containerRef || fallbackRef;

  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
