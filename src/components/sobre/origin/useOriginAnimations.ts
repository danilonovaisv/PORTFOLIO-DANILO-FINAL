"use client";

/**
 * Origin Section Animations — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 3 (Animation):
 * - Desktop (≥1024px): Pin the cinematic stage when it hits vertical center/top.
 * - Progressive reveals: clip-path bottom-to-top reveal with subtle blur transition.
 * - Synchronized Right-Rail HUD indicator (01..04) with smooth active scene index update.
 * - Mobile (<1024px): Responsive scroll-triggered narrative cards.
 * - Reduced Motion: Immediate states with zero blur, parallax, or scroll locks.
 */

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAP_GHOST_EASE } from "@/lib/motion/gsapGhostEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ORIGIN_LAYOUT = {
  STAGE_HEIGHT_DVH: 82,
  PAD_X_DVH: 6,
  PAD_X_MOBILE_DVH: 2,
} as const;

const CLIP_FULL = "inset(0% 0% 0% 0% round 32px)";
const CLIP_BOTTOM = "inset(100% 0% 0% 0% round 32px)";

export interface UseOriginAnimationsProps {
  isClient: boolean;
  stageWrapRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  contentCount: number;
  prefersReducedMotion: boolean;
  onActiveSceneChange?: (_index: number) => void;
}

export function useOriginAnimations({
  isClient,
  stageWrapRef,
  containerRef,
  contentCount,
  prefersReducedMotion,
  onActiveSceneChange,
}: UseOriginAnimationsProps) {
  useEffect(() => {
    if (!isClient) return;

    const mediaQueryReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isReduced = prefersReducedMotion || mediaQueryReduced;

    const mm = gsap.matchMedia();

    // DESKTOP & TABLET WIDE (≥ 1024px)
    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current;
      const stageWrap = stageWrapRef.current;
      if (!container || !stageWrap) return;

      const ctx = gsap.context(() => {
        const frames = stageWrap.querySelectorAll<HTMLElement>("[data-origin-frame]");
        const parallaxImgs = stageWrap.querySelectorAll<HTMLElement>("[data-origin-parallax-img]");
        const masks = stageWrap.querySelectorAll<HTMLElement>("[data-origin-mask]");

        if (frames.length === 0) return;

        // Initial visual states
        frames.forEach((frame, i) => {
          gsap.set(frame, {
            clipPath: i === 0 ? CLIP_FULL : CLIP_BOTTOM,
            filter: i === 0 || isReduced ? "blur(0px)" : "blur(8px)",
            autoAlpha: 1,
          });
        });

        masks.forEach((mask, i) => {
          gsap.set(mask, { opacity: i === 0 ? 0 : 0.65 });
        });

        parallaxImgs.forEach((img) => {
          gsap.set(img, { yPercent: isReduced ? 0 : -5 });
        });

        onActiveSceneChange?.(0);

        if (isReduced) {
          return;
        }

        // Each chapter transition gets approx. 90vh of scroll distance
        const totalDistance = (frames.length - 1) * 90; // vh

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageWrap,
            start: "center center",
            end: `+=${totalDistance}%`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              // Map continuous progress to discrete active scene index [0..frames.length-1]
              const segment = 1 / (frames.length - 1);
              const activeIndex = Math.min(
                frames.length - 1,
                Math.round(progress / segment)
              );
              onActiveSceneChange?.(activeIndex);
            },
          },
        });

        // Add transitions for chapters 1, 2, 3
        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const currFrame = frames[i];
          const prevMask = masks[i - 1];
          const currMask = masks[i];
          const prevImg = parallaxImgs[i - 1];
          const currImg = parallaxImgs[i];

          const label = `chapter_${i}`;
          tl.addLabel(label);

          if (prevImg) {
            tl.to(
              prevImg,
              {
                yPercent: 5,
                ease: "none",
                duration: 1,
              },
              label
            );
          }

          if (prevMask) {
            tl.to(
              prevMask,
              {
                opacity: 0.72,
                ease: "power2.inOut",
                duration: 0.8,
              },
              label
            );
          }

          tl.to(
            currFrame,
            {
              clipPath: CLIP_FULL,
              filter: "blur(0px)",
              ease: GSAP_GHOST_EASE,
              duration: 1,
            },
            label
          );

          if (currImg) {
            tl.fromTo(
              currImg,
              { yPercent: -5 },
              {
                yPercent: 0,
                ease: "none",
                duration: 1,
              },
              label
            );
          }

          if (currMask) {
            tl.to(
              currMask,
              {
                opacity: 0,
                ease: "power2.out",
                duration: 0.8,
              },
              `${label}+=0.15`
            );
          }
        }
      }, stageWrap);

      return () => {
        ctx.revert();
      };
    });

    // MOBILE (< 1024px)
    mm.add("(max-width: 1023px)", () => {
      const stageWrap = stageWrapRef.current;
      if (!stageWrap) return;

      const ctx = gsap.context(() => {
        const frames = stageWrap.querySelectorAll<HTMLElement>("[data-origin-frame]");

        frames.forEach((frame, i) => {
          gsap.set(frame, {
            position: "relative",
            clipPath: "none",
            filter: "none",
            autoAlpha: 1,
            marginBottom: "2.5rem",
            height: "auto",
            minHeight: "72dvh",
          });

          ScrollTrigger.create({
            trigger: frame,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => onActiveSceneChange?.(i),
            onEnterBack: () => onActiveSceneChange?.(i),
          });
        });
      }, stageWrap);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [
    isClient,
    stageWrapRef,
    containerRef,
    contentCount,
    prefersReducedMotion,
    onActiveSceneChange,
  ]);
}
