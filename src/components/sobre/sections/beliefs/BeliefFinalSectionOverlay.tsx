'use client';

import React, { useEffect, useRef } from 'react';
import {
  animate as motionAnimate,
  type DOMKeyframesDefinition,
  type AnimationOptions,
} from 'framer-motion';

interface BeliefFinalSectionOverlayProps {
  visible: boolean;
}

const MANIFEST_EASING: [number, number, number, number] = [0.17, 0.55, 0.55, 1];
const BG_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * BeliefFinalSectionOverlay — Layer 4 (z-50)
 *
 * ARCHITECTURE NOTE: This component is INSIDE a sticky container,
 * so `inView` won't work (it's always in viewport). Instead, it uses
 * Framer Motion's imperative `animate()` triggered by the `visible`
 * prop changing, which itself is driven by scrollYProgress from the
 * parent hook.
 *
 * Per spec Section 8 (Manifesto Final — Morphing):
 * - Text: "ISSO É GHOST DESIGN."
 * - Animation via animate():
 *   - opacity: 0 → 1
 *   - y: [40, 0] (entry from above)
 *   - duration: 0.9
 *   - easing: [0.17, 0.55, 0.55, 1]
 * - Cleanup: reverse opacity: 0, y: 40 for bidirectionality
 */
export const BeliefFinalSectionOverlay: React.FC<
  BeliefFinalSectionOverlayProps
> = ({ visible }) => {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);

  // Imperative animate() triggered by visibility changes
  useEffect(() => {
    if (!manifestoRef.current || !bgRef.current) return;

    const manifestoEl = manifestoRef.current;
    const bgEl = bgRef.current;

    if (visible && !wasVisible.current) {
      // ── ENTER: animate in ──
      motionAnimate(
        bgEl,
        { opacity: [0, 1] } as DOMKeyframesDefinition,
        { duration: 0.4, ease: BG_EASING } as AnimationOptions
      );

      motionAnimate(
        manifestoEl,
        { opacity: [0, 1], y: [40, 0] } as DOMKeyframesDefinition,
        { duration: 0.9, ease: MANIFEST_EASING } as AnimationOptions
      );
    } else if (!visible && wasVisible.current) {
      // ── EXIT: animate out (bidirectional) ──
      motionAnimate(
        bgEl,
        { opacity: [1, 0] } as DOMKeyframesDefinition,
        { duration: 0.4, ease: BG_EASING } as AnimationOptions
      );

      motionAnimate(
        manifestoEl,
        { opacity: [1, 0], y: [0, 40] } as DOMKeyframesDefinition,
        { duration: 0.9, ease: MANIFEST_EASING } as AnimationOptions
      );
    }

    wasVisible.current = visible;
  }, [visible]);

  return (
    <section
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none transition-opacity duration-300 ${
        visible || wasVisible.current ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={bgRef} className="absolute inset-0 bg-bluePrimary opacity-0" />
      <div
        ref={manifestoRef}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw] opacity-0 translate-y-[40px]"
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
