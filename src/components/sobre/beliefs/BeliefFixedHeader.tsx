'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
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
      className="sticky top-[20vh] md:top-0 z-30 text-right col-span-10 col-start-3 md:col-span-5 md:col-start-8 pt-8 pr-6"
      style={prefersReducedMotion ? undefined : { y: exitY, opacity: exitOpacity }}
      initial={prefersReducedMotion ? false : { opacity: 0.3, x: 18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display font-black text-white leading-tight">
        Acredito no design que muda o dia de alguém.
      </p>
      <h2 className="font-h2 font-bold text-white mt-2">
        Não pelo choque, mas pela conexão.
      </h2>
    </motion.header>
  );
}
