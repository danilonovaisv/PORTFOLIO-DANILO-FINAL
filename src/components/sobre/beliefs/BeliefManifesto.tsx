'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

export function BeliefManifesto({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0.85, 1], ['-0.05em', '0.05em']);

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {['ISSO É', 'GHOST', 'DESIGN.'].map((line) => (
        <motion.p
          key={line}
          className="font-display font-black text-white w-[90vw] text-center leading-[0.9] text-[clamp(2.25rem,12vw,9rem)]"
          style={{ letterSpacing }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
