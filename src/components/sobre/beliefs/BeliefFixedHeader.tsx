'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
}

/**
 * MorphText: Helper component for staggered blur + opacity + y reveal animation.
 * Uses Ghost easing: cubic-bezier(0.22, 1, 0.36, 1)
 * All animations are scroll-linked via useTransform → fully bidirectional.
 */
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
  const y = useTransform(progress, range, [18, 0], { ease: ghostEase });
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const filter = useTransform(progress, range, ['blur(6px)', 'blur(0px)'], {
    ease: ghostEase,
  });

  return (
    <motion.span
      style={{ y, opacity, filter, display: 'block' }}
      className={className || ''}
    >
      {children}
    </motion.span>
  );
};

/**
 * BeliefFixedHeader — Layer 2 (z-20)
 *
 * Per spec Section 2:
 * "Header fixo no topo; z-index acima do BG; independente das trocas de cor;
 *  frase sai sincronizada com a saída do último texto animado;
 *  não participa do morph final."
 *
 * Entry: Staggered MorphText reveal at 0.04 → 0.21 scroll progress
 * Exit: Synced with last phrase exit (~0.80) → fully gone before manifesto (0.82)
 *
 * Desktop: sticky, aligned center+right of grid (text-right, justify-self-end)
 * Mobile: sticky, top-right of section (text-right)
 */
export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
}) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Opacity: fade in early (0.02 → 0.12), stay visible, fade out synced with last phrase exit
  // Per spec: "frase sai sincronizada com a saída do último texto animado"
  // Last phrase block ends at finalStart (0.82), so header starts fading at ~0.75
  const opacity = useTransform(
    scrollProgress,
    [0, 0.02, 0.12, 0.72, 0.82],
    [0, 0, 1, 1, 0]
  );

  // Exit animation: slide up + blur when approaching manifesto
  const y = useTransform(scrollProgress, [0.72, 0.82], [0, -18], {
    ease: ghostEase,
  });
  const filter = useTransform(
    scrollProgress,
    [0.72, 0.82],
    ['blur(0px)', 'blur(6px)'],
    {
      ease: ghostEase,
    }
  );

  return (
    <motion.header
      id="beliefs-heading"
      style={{ opacity, y, filter }}
      className="flex w-full h-full pointer-events-none"
    >
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start md:items-center justify-end pt-32 md:pt-0 col-span-12">
          <div className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[850px] pr-[5%] md:pr-0">
            {/* Primary: "Acredito no design que muda o dia de alguém." */}
            <div className="flex flex-col items-end text-right w-full">
              <h2 className="text-white text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-none tracking-tighter mb-4 md:mb-12 uppercase font-black whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.04, 0.12]}>
                    Acredito no
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.06, 0.14]}>
                    design que
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.08, 0.16]}>
                    muda o dia
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.10, 0.18]}>
                    de alguém.
                  </MorphText>
                </div>
              </h2>

              {/* Secondary: "Não pelo choque, mas pela conexão." */}
              <div className="flex flex-col items-end gap-1 text-white text-[clamp(1.125rem,4.4vw,1.35rem)] md:text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-normal font-bold whitespace-nowrap">
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.11, 0.19]}>
                    Não pelo choque,
                  </MorphText>
                </div>
                <div className="overflow-visible">
                  <MorphText progress={scrollProgress} range={[0.13, 0.21]}>
                    mas pela conexão.
                  </MorphText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
