'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { RefObject } from 'react';

export function BeliefFixedHeader({
  containerRef,
  scrollYProgress,
  prefersReducedMotion,
}: {
  containerRef: RefObject<HTMLElement | null>;
  scrollYProgress?: MotionValue<number>;
  prefersReducedMotion?: boolean;
}) {
  const scrollState = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const progress = scrollYProgress ?? scrollState.scrollYProgress;

  const exitY = useTransform(progress, [0.85, 1], [0, -18]);
  const exitOpacity = useTransform(progress, [0.85, 0.97], [1, 0]);

  return (
    <motion.header
      className="absolute right-0 top-[10vh] z-30 w-[min(22rem,72vw)] pr-6 text-right md:inset-y-0 md:flex md:w-[min(30rem,34vw)] md:items-center md:justify-end md:pr-[4vw]"
      style={
        prefersReducedMotion ? undefined : { y: exitY, opacity: exitOpacity }
      }
      initial={prefersReducedMotion ? false : { opacity: 0.3, x: 18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-[24px] border border-white/8 bg-[rgba(4,0,19,0.28)] px-5 py-4 backdrop-blur-md md:max-w-[24rem] md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
        <p className="font-display text-[0.95rem] font-black leading-tight text-white/90 md:text-[1.08rem]">
          Acredito no design que muda o dia de alguém.
        </p>
        <h2 className="mt-2 font-h2 text-[clamp(1.15rem,2vw,2rem)] font-bold leading-[1.04] text-white">
          Não pelo choque, mas pela conexão.
        </h2>
      </div>
    </motion.header>
  );
}
