'use client';

import { motion } from 'framer-motion';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-4xl text-ghost-text">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] opacity-60">
        [BRAND AWARENESS]
      </p>
      <h1 className="mb-6 text-5xl font-bold leading-[0.95] tracking-tighter md:text-8xl lg:text-[7rem]">
        Design, não é
        <br />
        só estética.
      </h1>
      <p className="mb-10 text-lg font-medium tracking-tight opacity-80 md:text-xl">
        [É intenção, é estratégia, é experiência.]
      </p>
      <motion.a
        whileHover={{ x: 10 }}
        href="/sobre"
        className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-70"
        aria-label="Ir para a seção sobre e conhecer melhor o trabalho de Danilo"
      >
        get to know me better <span className="text-primary">→</span>
      </motion.a>
    </div>
  );
}

export default HeroCopy;
