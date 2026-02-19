"use client";

import { useEffect, useRef } from "react";
import { animate, inView } from "motion";

const easing = [0.17, 0.55, 0.55, 1] as const;

type Section = {
  text: string;
  bgClass: string;
  textClass: string;
};

const SECTIONS: Section[] = [
  {
    text: "Scroll",
    bgClass: "bg-[rgba(245,1,211,0.08)]",
    textClass: "text-[var(--color-pinkDetails)]",
  },
  {
    text: "to",
    bgClass: "bg-[rgba(135,5,242,0.10)]",
    textClass: "text-[var(--color-purpleDetails)]",
  },
  {
    text: "trigger",
    bgClass: "bg-[rgba(0,72,255,0.10)]",
    textClass: "text-[var(--color-bluePrimary)]",
  },
  {
    text: "animations!",
    bgClass: "bg-[rgba(79,230,255,0.10)]",
    textClass: "text-[var(--color-blueAccent)]",
  },
];

export function ScrollInViewExample() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scroll-inview-target]"),
    );

    if (prefersReducedMotion) {
      for (const el of targets) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0px)";
      }
      return;
    }

    const stops = targets.map((target) =>
      inView(target, (element) => {
        animate(
          element,
          { opacity: 1, x: [-100, 0] },
          { duration: 0.9, ease: easing },
        );

        return () => {
          animate(element, { opacity: 0, x: -100 });
        };
      }),
    );

    return () => {
      for (const stop of stops) stop();
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col">
      {SECTIONS.map((section) => (
        <section
          key={section.text}
          className={[
            "box-border",
            "flex h-[100svh] w-screen items-center justify-center",
            "overflow-hidden px-8 py-12 md:px-12",
            section.bgClass,
          ].join(" ")}
        >
          <pre
            data-scroll-inview-target
            className={[
              "font-display font-black",
              "text-5xl md:text-6xl",
              "leading-none tracking-tight",
              "opacity-0 -translate-x-[100px]",
              "select-none",
              section.textClass,
            ].join(" ")}
          >
            {section.text}
          </pre>
        </section>
      ))}
    </div>
  );
}

