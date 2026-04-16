'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  cubicBezier,
} from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress?: MotionValue<number>;
  headerOpacity?: MotionValue<number>;
  MotionHeader?: React.ElementType;
  prefersReducedMotion?: boolean;
}

/**
 * MorphText — Staggered word reveal with blur + opacity + y animation.
 * Each word enters independently based on its scroll range.
 */
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
  const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
    ease: ghostEase,
  });
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};

/**
 * BeliefFixedHeader — Sticky header with "Acredito no design..." text.
 *
 * Layout per spec:
 * - Desktop: center visual + right-aligned via grid, text-right
 * - Mobile: top-right, sticky, text-right
 * - Uses mix-blend-difference for Ghost overlap readability
 */
export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
  headerOpacity,
  MotionHeader,
  prefersReducedMotion,
}) => {
  const Header = MotionHeader ?? motion.header;
  const staticProgress = useMotionValue(1);
  const progress = scrollProgress ?? staticProgress;

  // Use provided headerOpacity or derive from scroll progress
  const defaultOpacity = useTransform(
    progress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const opacity = headerOpacity ?? defaultOpacity;

  return (
    <Header
      style={prefersReducedMotion ? undefined : { opacity }}
      className="sticky top-0 z-30 flex h-screen pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        {/* Desktop: center visual + right / Mobile: top-right */}
        <div className="flex h-full items-start md:items-center justify-end pt-16 md:pt-0 col-span-12">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-4 md:pr-0">
            {/* Primeira parte: "Acredito no..." */}
            <h2 className="text-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans text-display leading-[1.1] tracking-tighter mb-4 md:mb-8 uppercase font-black mix-blend-difference whitespace-nowrap">
              {prefersReducedMotion ? (
                <>
                  <span className="block">Acredito no</span>
                  <span className="block">design que</span>
                  <span className="block">muda o dia</span>
                  <span className="block">de alguém.</span>
                </>
              ) : (
                <>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.1, 0.2]}>
                      Acredito no
                    </MorphText>
                  </div>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.12, 0.22]}>
                      design que
                    </MorphText>
                  </div>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.14, 0.24]}>
                      muda o dia
                    </MorphText>
                  </div>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.16, 0.26]}>
                      de alguém.
                    </MorphText>
                  </div>
                </>
              )}
            </h2>

            {/* Segunda parte: "Não pelo choque..." */}
            <div className="flex flex-col items-end gap-1 text-text text-sm md:text-2xl lg:text-4xl font-sans text-display leading-[1.2] tracking-normal font-bold whitespace-nowrap drop-shadow-[0_0_12px_rgba(4,0,19,1)] mix-blend-difference">
              {prefersReducedMotion ? (
                <>
                  <span className="block">Não pelo choque,</span>
                  <span className="block">mas pela conexão.</span>
                </>
              ) : (
                <>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.22, 0.32]}>
                      Não pelo choque,
                    </MorphText>
                  </div>
                  <div className="overflow-visible">
                    <MorphText progress={progress} range={[0.24, 0.34]}>
                      mas pela conexão.
                    </MorphText>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};
