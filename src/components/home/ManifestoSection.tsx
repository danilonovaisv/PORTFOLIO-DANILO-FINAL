// src/components/home/ManifestoSection.tsx
'use client';

import * as React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { BRAND } from '@/config/brand';

// Variants para a animação de entrada
const manifestoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Easing premium
    },
  },
};

export default function ManifestoSection() {
  const rootRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(rootRef, {
    once: true, // Anima apenas uma vez ao entrar na view
    margin: '-100px', // Aciona um pouco antes de estar completamente visível
  });

  return (
    <section
      id="manifesto"
      ref={rootRef}
      aria-label="Manifesto"
      className="bg-[#0E0F12] py-20" // Espaçamento consistente
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
        <motion.div
          variants={manifestoVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'} // Aciona a animação baseada no Intersection Observer
          className={[
            'overflow-hidden rounded-xl', // Mantém o border-radius do thumbnail, ou ajuste se quiser 0
            'shadow-[0_26px_90px_rgba(0,0,0,0.35)]', // Sombra premium
            'bg-white/5', // Fundo sutil se necessário
          ].join(' ')}
        >
          <div className="aspect-video w-full">
            {' '}
            {/* Mantém a proporção 16:9 */}
            <video
              className="h-full w-full object-cover"
              src={BRAND.video.manifesto}
              autoPlay
              loop
              muted // Começa mudo, conforme regras
              playsInline
              controls // Opcional: pode ser removido se não quiser controles
              preload="metadata" // Otimização
              aria-label="Vídeo manifesto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
