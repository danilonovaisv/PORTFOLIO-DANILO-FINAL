'use client';

import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
  type Variants,
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
    [0.56, 0.68, 0.95, 1],
    [0, 1, 1, 1],
    {
      ease: ghostEase,
    }
  );

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.03,
      },
    },
  };
  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : '100%',
    },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : '0%',
      transition: prefersReducedMotion
        ? { duration: 0.25, ease: 'easeOut' }
        : { type: 'spring', stiffness: 200, damping: 20, mass: 1 },
    },
  };

  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
      data-testid="beliefs-manifesto"
      role="presentation"
      style={{
        opacity,
        willChange: 'opacity',
      }}
    >
      <blockquote
        className="relative text-center select-none"
        aria-label="Manifesto Ghost Design — Isso é Ghost Design"
      >
        <motion.p
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
          aria-hidden="true"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block opacity-40"
              variants={lineVariants}
              style={{ willChange: 'transform, opacity' }}
            >
              ISSO É
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[#0048ff] mix-blend-overlay drop-shadow-[0_0_30px_rgba(0,72,255,0.4)]"
              variants={lineVariants}
              style={{ willChange: 'transform, opacity' }}
            >
              GHOST
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineVariants}
              style={{ willChange: 'transform, opacity' }}
            >
              DESIGN
            </motion.span>
          </span>
        </motion.p>

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
