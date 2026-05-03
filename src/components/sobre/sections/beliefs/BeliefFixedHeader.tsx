import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
  type Variants,
} from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';
import type { ReactNode } from 'react';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  opacity?: MotionValue<number>;
}

export function BeliefFixedHeader({
  scrollProgress,
  prefersReducedMotion,
  opacity: externalOpacity,
}: BeliefFixedHeaderProps) {
  const ghostEase = cubicBezier(...GHOST_EASE_AMBIENT);

  // Default opacity if not provided externally
  const defaultOpacity = useTransform(
    scrollProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  const opacity = externalOpacity || defaultOpacity;
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
      style={{ opacity }}
      className="absolute inset-0 z-20 flex h-screen pointer-events-none"
      data-testid="beliefs-header"
      role="presentation"
    >
      <div className="std-grid w-full h-full">
        {/* Desktop: center visual + right alignment */}
        {/* Mobile: top-right with 14vh offset */}
        <div className="flex h-full items-start md:items-center justify-end pt-[14vh] md:pt-0">
          <div
            className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-4 md:pr-0"
            data-testid="beliefs-header-content"
          >
            {/* Main Title: "Acredito no..." */}
            <motion.h2
              id="beliefs-section-heading"
              aria-label="Acredito no design que muda o dia de alguém. Não pelo choque, mas pela conexão."
              className="text-white text-xs md:text-sm font-mono tracking-widest mb-2 md:mb-4 uppercase mix-blend-difference whitespace-nowrap opacity-70"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <RevealLine variants={lineVariants}>Acredito no <span className="text-[#0048ff] font-bold">design</span> que</RevealLine>
              <RevealLine variants={lineVariants}>muda o dia de alguém.</RevealLine>
            </motion.h2>

            {/* Subtext: "Não pelo choque..." */}
            <motion.div
              aria-hidden="true"
              className="flex flex-col items-end gap-1 text-white/50 text-[10px] md:text-xs font-mono tracking-wider uppercase whitespace-nowrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <RevealLine variants={lineVariants}>Não pelo choque,</RevealLine>
              <RevealLine variants={lineVariants}>mas pela conexão.</RevealLine>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RevealLine({
  children,
  variants,
}: {
  children: ReactNode;
  variants: Variants;
}) {
  return (
    <span aria-hidden="true" className="block overflow-hidden">
      <motion.span
        className="block"
        variants={variants}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.span>
    </span>
  );
}
