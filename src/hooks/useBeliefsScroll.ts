"use client";

import { RefObject, useRef } from "react";
import { useScroll } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function useBeliefsScroll(containerRef?: RefObject<HTMLElement | null>) {
  const fallbackRef = useRef<HTMLElement | null>(null);
  const targetRef = containerRef || fallbackRef;

  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
