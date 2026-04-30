'use client';

import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function BeliefManifesto({
  scrollProgress,
  prefersReducedMotion,
}: BeliefManifestoProps) {
  const ghostEase = cubicBezier(...GHOST_EASE_AMBIENT);

  // Climax fade — Ghost System: only opacity, blur, translateY
  const opacity = useTransform(
    scrollProgress,
    [0.85, 0.95, 0.98, 1],
    [0, 1, 1, 0],
    {
      ease: ghostEase,
    }
  );

  // Subtle vertical entrance (replaces prohibited scale)
  const y = useTransform(scrollProgress, [0.85, 0.95], [40, 0], {
    ease: ghostEase,
  });

  const blurValue = useTransform(scrollProgress, [0.85, 0.92], [20, 0], {
    ease: ghostEase,
  });

  const filter = useTransform(blurValue, (v) =>
    prefersReducedMotion ? 'none' : `blur(${v}px)`
  );

  return (
    <motion.div
      className="absolute inset-0 z-[50] flex items-center justify-center pointer-events-none"
      data-testid="beliefs-manifesto"
      role="presentation"
      style={{
        opacity,
        y: prefersReducedMotion ? 0 : y,
        filter,
      }}
    >
      <blockquote
        className="relative text-center select-none"
        aria-label="Manifesto Ghost Design — Isso é Ghost Design"
      >
        <p
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          <span className="block opacity-40">ISSO É</span>
          <span className="block text-[#0048ff] mix-blend-overlay drop-shadow-[0_0_30px_rgba(0,72,255,0.4)]">
            GHOST
          </span>
          <span className="block">DESIGN</span>
        </p>

        {/* Decorative elements to add "Ghost" vibe */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#0048ff]/30 to-transparent rotate-12"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#4fe6ff]/20 to-transparent -rotate-12"
          aria-hidden="true"
        />
      </blockquote>
    </motion.div>
  );
}
