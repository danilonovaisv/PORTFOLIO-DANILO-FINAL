'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef } from 'react';
import { SplitText } from '@/lib/motion/split-text';

export const BeliefFixedHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px 0px 0px', once: false });

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // ghost-ease
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: 60,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.header
      ref={ref}
      className="sticky top-0 z-30 flex flex-col items-end justify-center gap-2 w-full px-6 md:px-12 py-8 pointer-events-none"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="text-right max-w-xs md:max-w-sm">
        <motion.p className="font-display text-sm md:text-base text-white/70 uppercase tracking-widest">
          <SplitText
            text="Acredito no design que muda o dia de alguém."
            mode="words"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.p>
        <motion.h2 className="font-h1 font-bold text-white text-lg md:text-xl mt-2 leading-tight">
          <SplitText
            text="Não pelo choque, mas pela conexão."
            mode="words"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.h2>
      </div>
    </motion.header>
  );
};
