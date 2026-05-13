'use client';

import { useMemo } from 'react';
import { m, useTransform, useSpring } from 'motion/react';
import { beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefManifesto() {
  const { scrollYProgress, isClimax, shouldReduceMotion } = useBeliefsScrollContext();

  // Reveal Progress: 0.82 -> 1.0 mapeado para 0 -> 1
  const rawRevealProgress = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
  
  // Aplicamos um spring para suavizar o reveal editorial
  const revealProgress = useSpring(rawRevealProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Interpolações baseadas no revealProgress
  const opacity = revealProgress;
  const y = useTransform(revealProgress, [0, 1], [shouldReduceMotion ? 0 : 20, 0]);
  const scale = useTransform(revealProgress, [0, 1], [0.98, 1]);

  // Itens do manifesto para facilitar o mapeamento
  const manifestoLines = useMemo(() => [
    { text: 'ISSO É', className: 'text-[16vw] lg:text-[14rem] mix-blend-overlay opacity-80' },
    { text: 'GHOST', className: 'text-[30vw] lg:text-[25rem] text-[#0048ff] z-10' },
    { text: 'DESIGN', className: 'text-[24vw] lg:text-[19rem] mix-blend-overlay opacity-80' }
  ], []);

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="col-span-full row-start-1 col-start-1 pointer-events-none flex flex-col items-center justify-center px-4 h-full"
      style={{ 
        zIndex: beliefZIndex.manifesto,
        opacity,
        y,
        scale,
      }}
      aria-live={isClimax ? 'polite' : 'off'}
    >
      <div className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full">
        {manifestoLines.map((line, idx) => (
          <m.div 
            key={line.text} 
            className={`${line.className} tracking-tighter uppercase font-black will-change-transform`}
            initial={false}
            animate={{
              y: isClimax ? 0 : 12,
              opacity: isClimax ? 1 : 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {line.text}
          </m.div>
        ))}
      </div>
    </m.div>
  );
}
