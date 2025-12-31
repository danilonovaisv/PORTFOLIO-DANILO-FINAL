'use client';

import { motion } from 'framer-motion';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-4xl text-ghost-text relative z-10 flex flex-col items-center justify-end h-full pb-32 pointer-events-none">
      {/* REMOVI O TÍTULO E O SUBTÍTULO DAQUI.
         Eles agora vivem no componente <RevealingText /> dentro do Canvas 3D.
      */}

      {/* Mantemos o botão aqui porque botões HTML são melhores para acessibilidade e cliques */}
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }} // Aparece depois da intro
        whileHover={{ x: 10 }}
        href="/sobre"
        className="pointer-events-auto inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-70 mt-8"
        aria-label="Ir para a seção sobre e conhecer melhor o trabalho de Danilo"
      >
        get to know me better <span className="text-primary">→</span>
      </motion.a>
    </div>
  );
}

export default HeroCopy;
