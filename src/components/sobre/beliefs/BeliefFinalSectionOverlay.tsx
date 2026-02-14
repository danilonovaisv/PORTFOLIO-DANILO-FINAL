'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BeliefFinalSectionOverlay: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <div
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
      >
        {/* 🟣 [CONFIG VISUAL]: "ISSO É" - Tamanho (16vw a 14rem), Cor branca (herdada), Opacidade 80% */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 0.8, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black mix-blend-overlay"
          suppressHydrationWarning
        >
          ISSO É
        </motion.div>

        {/* 🟣 [CONFIG VISUAL]: "GHOST" - Tamanho (30vw a 25rem), Cor branca (herdada) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase relative z-10 text-white"
          suppressHydrationWarning
        >
          GHOST
        </motion.div>

        {/* 🟣 [CONFIG VISUAL]: "DESIGN" - Tamanho (24vw a 19rem), Cor branca (herdada), Opacidade 80% */}
        <motion.div
          initial={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 0.8, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black mix-blend-overlay"
          suppressHydrationWarning
        >
          DESIGN
        </motion.div>
      </div>
    </section>
  );
};
