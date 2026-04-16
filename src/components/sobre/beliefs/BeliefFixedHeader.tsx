'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

export function BeliefFixedHeader({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const exitY = useTransform(scrollYProgress, [0.85, 1], [0, -18]);
  const exitOpacity = useTransform(scrollYProgress, [0.85, 0.97], [1, 0]);

  return (
    <motion.header
      className="sticky top-[20vh] md:top-0 z-30 text-right col-span-10 col-start-3 md:col-span-5 md:col-start-8 pt-8 pr-6"
      style={{ y: exitY, opacity: exitOpacity }}
      initial={{ opacity: 0.3, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display font-black text-white leading-tight">
        Acredito no design que muda o dia de alguém.
      </p>
      <p className="font-h2 font-bold text-white mt-2">
        Não pelo choque, mas pela conexão.
      </p>
    </motion.header>
  );
}
