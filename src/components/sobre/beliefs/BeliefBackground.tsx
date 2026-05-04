"use client";

import { animate, inView } from "motion";
import { useEffect, useRef } from "react";
import { beliefColors, beliefMotion } from "@/config/beliefTokens";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";

const stops = [
  beliefColors.deepVoid,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.deepVoid,
] as const;

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    const stop = inView(
      ".belief-scroll-section",
      (element) => {
        const index = Number.parseInt(
          element.getAttribute("data-index") ?? "0",
          10,
        );

        const color = stops[Math.min(index + 1, stops.length - 1)];

        if (shouldReduceMotion) {
          ref.current!.style.backgroundColor = color;
          return;
        }

        animate(
          ref.current!,
          { backgroundColor: color },
          {
            duration: beliefMotion.revealDuration,
            ease: beliefMotion.ambientEase,
          },
        );
      },
      { amount: 0.55 },
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-0 bg-[#040013]"
    />
  );
}
