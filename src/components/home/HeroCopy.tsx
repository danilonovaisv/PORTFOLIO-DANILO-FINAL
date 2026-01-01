'use client';

import { motion } from 'framer-motion';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-4xl text-ghost-text relative z-10 flex flex-col items-center justify-end h-full pb-24 md:pb-32 pointer-events-none">
      {/* OBSERVAÇÃO:
        O texto principal ("Você não vê o design") agora vive no Canvas 3D (RevealingText.tsx).
        Aqui fica apenas o botão CTA.
      */}

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        href="/sobre"
        // Botão estilo Pílula (Pill Shape) com Blur
        className="group pointer-events-auto relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-[0.85rem] md:text-[0.95rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10"
        aria-label="Ir para a seção sobre"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-cyan-300">
          step inside
        </span>
        <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1 text-cyan-400 group-hover:text-cyan-300">
          →
        </span>

        {/* Glow de fundo no hover */}
        <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/0 blur-md transition-colors duration-500 group-hover:bg-cyan-500/10" />
      </motion.a>
    </div>
  );
}

export default HeroCopy;
