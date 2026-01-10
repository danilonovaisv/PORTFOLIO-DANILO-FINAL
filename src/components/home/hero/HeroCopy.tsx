'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

/**
 * Animation: Page Load Entry
 * - Scale: 0.92 → 1.02 → 1
 * - Blur: 10px → 0
 * - Y: 60px → 0
 * - Duration: 1.2s
 * - Easing: [0.25, 0.46, 0.45, 0.94]
 */
const textContainerAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [0.92, 1.02, 1],
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroCopy() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'initial' as const,
        animate: 'animate' as const,
        variants: textContainerAnimation,
      };

  return (
    <motion.div
      {...motionProps}
      className="hero-content flex flex-col items-center justify-center text-center max-w-5xl px-4 pointer-events-auto"
    >
      {/* Tag decorativa - Mono, 19px, uppercase */}
      <motion.span
        variants={itemAnimation}
        className="font-mono text-[19px] uppercase tracking-[0.2em] text-[#d9dade] opacity-50 mb-8"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* Headline principal - Display: 6-9rem, Black weight */}
      <motion.h1
        variants={itemAnimation}
        className="font-black tracking-tight leading-[0.95] mb-6 text-text-light"
        style={{
          fontSize: 'clamp(3.5rem, 10vw + 1rem, 9rem)',
        }}
      >
        {/* Desktop/Tablet: 2 linhas */}
        <span className="hidden md:block">
          Você não vê
          <br />o design.
        </span>

        {/* Mobile: 3 linhas */}
        <span className="md:hidden">
          Você não
          <br />
          vê o
          <br />
          design.
        </span>
      </motion.h1>

      {/* Subheading - H2 size, #d9dade */}
      <motion.h2
        variants={itemAnimation}
        className="font-bold text-[#d9dade] mb-14"
        style={{
          fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 2.5rem)',
        }}
      >
        Mas ele vê você.
      </motion.h2>

      {/* CTA Button - Using AntigravityCTA component */}
      <motion.div variants={itemAnimation}>
        <AntigravityCTA
          href="/sobre"
          label="step inside"
          variant="primary"
          size="md"
          ariaLabel="Ir para seção sobre"
        />
      </motion.div>
    </motion.div>
  );
}
