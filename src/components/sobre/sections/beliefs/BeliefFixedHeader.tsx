import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import React from 'react';

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

  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-20 flex h-screen pointer-events-none"
      data-testid="beliefs-header"
    >
      <div className="std-grid w-full h-full">
        {/* Desktop: center visual + right alignment */}
        {/* Mobile: top-right with 14vh offset */}
        <div className="flex h-full items-start md:items-center justify-end pt-[14vh] md:pt-0">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-4 md:pr-0">
            {/* Main Title: "Acredito no..." */}
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tighter mb-4 md:mb-8 uppercase font-black mix-blend-difference whitespace-nowrap">
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.1, 0.2]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  Acredito no
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.12, 0.22]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <span className="text-[#0048ff]">design</span> que
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.14, 0.24]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  muda o dia
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.16, 0.26]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  de alguém.
                </MorphText>
              </div>
            </h2>

            {/* Subtext: "Não pelo choque..." */}
            <div className="flex flex-col items-end gap-1 text-white text-sm md:text-2xl lg:text-4xl font-h1 leading-[1.2] tracking-normal font-bold whitespace-nowrap">
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.22, 0.32]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  Não pelo choque,
                </MorphText>
              </div>
              <div className="overflow-visible">
                <MorphText
                  progress={scrollProgress}
                  range={[0.24, 0.34]}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  mas pela conexão.
                </MorphText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Helper MorphText for synchronized blur/fade/y transitions
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  prefersReducedMotion?: boolean;
}> = ({ children, progress, range, className, prefersReducedMotion }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  const blurValue = useTransform(progress, range, [12, 0], {
    ease: ghostEase,
  });
  const filter = useTransform(blurValue, (v) =>
    prefersReducedMotion ? 'none' : `blur(${v}px)`
  );
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

  return (
    <motion.span
      style={{
        filter,
        opacity,
        y: prefersReducedMotion ? 0 : y,
      }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};
