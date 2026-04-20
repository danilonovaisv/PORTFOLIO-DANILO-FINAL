'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';

export function BeliefFixedHeader({
  scrollYProgress,
  prefersReducedMotion,
}: {
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion?: boolean;
}) {
  const exitY = useTransform(scrollYProgress, [0.85, 1], [0, -18]);
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <motion.header
      className="pointer-events-none sticky inset-y-0 right-0 z-30 flex w-full items-start justify-end px-6 pt-[12vh] text-right md:w-auto md:items-center md:px-0 md:pt-0 md:pr-[4vw]"
      style={prefersReducedMotion ? undefined : { y: exitY, opacity }}
      initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-[min(20rem,68vw)] rounded-[24px] border border-white/10 bg-[rgba(4,0,19,0.58)] px-5 py-4 backdrop-blur-sm md:w-[min(30rem,34vw)] md:max-w-[24rem] md:bg-[rgba(4,0,19,0.22)] md:px-6 md:py-5 md:backdrop-blur-sm">
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
