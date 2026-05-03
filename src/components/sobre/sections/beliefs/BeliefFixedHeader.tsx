import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
  type Variants,
} from 'motion/react';
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
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

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
              className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tighter mb-4 md:mb-8 uppercase font-black mix-blend-difference whitespace-nowrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <RevealLine variants={lineVariants}>Acredito no</RevealLine>
              <RevealLine variants={lineVariants}>
                <span className="text-[#0048ff]">design</span> que
              </RevealLine>
              <RevealLine variants={lineVariants}>muda o dia</RevealLine>
              <RevealLine variants={lineVariants}>de alguém.</RevealLine>
            </motion.h2>

            {/* Subtext: "Não pelo choque..." */}
            <motion.div
              aria-hidden="true"
              className="flex flex-col items-end gap-1 text-white text-sm md:text-2xl lg:text-4xl font-h1 leading-[1.2] tracking-normal font-bold whitespace-nowrap"
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
