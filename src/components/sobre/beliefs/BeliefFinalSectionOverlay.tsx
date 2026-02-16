'use client';

import React, { useEffect, useRef } from 'react';
import { inView, animate, type DOMKeyframesDefinition, type AnimationOptions } from 'framer-motion';
import { BRAND } from '@/config/brand';

interface BeliefFinalSectionOverlayProps {
  visible: boolean;
  progress: number;
}

const GHOST_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MANIFEST_EASING: [number, number, number, number] = [0.17, 0.55, 0.55, 1];

/**
 * BeliefFinalSectionOverlay — Layer 4 (z-50)
 *
 * Per spec Section 8 (Manifesto Final — Morphing):
 * - Text: "ISSO É GHOST DESIGN."
 * - Each line independent, small spacing between lines
 * - Animation via inView + animate:
 *   - opacity: 1 (from 0)
 *   - y: [40, 0] (entry from above)
 *   - duration: 0.9
 *   - easing: [0.17, 0.55, 0.55, 1]
 * - Ghost intensifies when "GHOST" completes animation
 * - Cleanup: reverse opacity: 0, y: 40 for bidirectionality
 */
export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ visible, progress }) => {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // inView + animate pattern for the manifesto (per spec Section 8)
  useEffect(() => {
    if (!manifestoRef.current || !bgRef.current) return;

    const manifestoEl = manifestoRef.current;
    const bgEl = bgRef.current;

    // Set initial CSS state
    manifestoEl.style.opacity = '0';
    manifestoEl.style.transform = 'translateY(40px)';
    bgEl.style.opacity = '0';

    // Detect when manifesto enters viewport
    const unsubscribe = inView(
      manifestoEl,
      (el) => {
        // Animate BG overlay in
        animate(
          bgEl,
          { opacity: 1 } as DOMKeyframesDefinition,
          { duration: 0.3, ease: GHOST_EASING } as AnimationOptions
        );

        // Animate manifesto text in
        animate(
          el,
          { opacity: 1, y: [40, 0] } as DOMKeyframesDefinition,
          { duration: 0.9, ease: MANIFEST_EASING } as AnimationOptions
        );

        // Cleanup: reverse when leaving viewport
        return () => {
          animate(
            bgEl,
            { opacity: 0 } as DOMKeyframesDefinition,
            { duration: 0.3, ease: GHOST_EASING } as AnimationOptions
          );

          animate(
            el,
            { opacity: 0, y: 40 } as DOMKeyframesDefinition,
            { duration: 0.9, ease: MANIFEST_EASING } as AnimationOptions
          );
        };
      },
      { amount: 0.7 }
    );

    return () => unsubscribe();
  }, []);

  // Scroll progress-driven fallback for the sticky context
  const safeProgress = Math.max(0, Math.min(1, progress));
  const opacity = visible ? safeProgress : 0;
  const y = 24 - safeProgress * 24;
  const blur = `blur(${Math.max(0, 10 - safeProgress * 10)}px)`;

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ backgroundColor: BRAND.colors.bluePrimary, opacity }}
      />
      <div
        ref={manifestoRef}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        style={{ opacity, transform: `translateY(${y}px)`, filter: blur }}
      >
        <div className="text-[16vw] text-white md:text-[14rem] tracking-tighter uppercase font-black">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] text-white font-black tracking-tighter uppercase relative z-10">
          GHOST
        </div>
        <div className="text-[24vw] text-white md:text-[19rem] tracking-tighter uppercase font-black">
          DESIGN
        </div>
      </div>
    </section>
  );
};
