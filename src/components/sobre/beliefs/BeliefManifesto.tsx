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

  // Climax fade and scale
  const opacity = useTransform(scrollProgress, [0.85, 0.95, 0.98, 1], [0, 1, 1, 0], {
    ease: ghostEase,
  });
  
  const scale = useTransform(scrollProgress, [0.85, 0.98], [0.8, 1.1], {
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
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      data-testid="beliefs-manifesto"
      style={{ 
        opacity, 
        scale: prefersReducedMotion ? 1 : scale,
        filter
      }}
    >
      <div className="relative text-center select-none">
        <h2 
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 22vw, 18rem)' }}
        >
          <span className="block opacity-40">ISSO É</span>
          <span className="block text-[#0048ff] mix-blend-overlay drop-shadow-[0_0_30px_rgba(0,72,255,0.4)]">
            GHOST
          </span>
          <span className="block">DESIGN</span>
        </h2>
        
        {/* Decorative elements to add "Ghost" vibe */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#0048ff]/30 to-transparent rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#4fe6ff]/20 to-transparent -rotate-12" />
      </div>
    </motion.div>
  );
}
