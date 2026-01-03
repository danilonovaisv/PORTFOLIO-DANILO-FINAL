'use client';

import { motion, useReducedMotion } from 'framer-motion';
import GhostEyes from './GhostEyes';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-screen bg-ghost-surface-deep relative overflow-hidden flex flex-col items-center justify-center py-20"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          variants={fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center"
        >
          {/* Phrases */}
          <div className="text-center lg:text-left max-w-[420px] mx-auto lg:mx-0">
            <div className="space-y-1 text-base md:text-lg text-white/90 leading-relaxed">
              <p>
                Um vídeo que <span className="text-primary">respira</span>.
              </p>
              <p>
                Uma marca que se{' '}
                <span className="text-primary">reconhece</span>.
              </p>
              <p>
                Um detalhe que <span className="text-primary">fica</span>.
              </p>
            </div>
            <div className="mt-6 space-y-1 text-base md:text-lg text-white/90 leading-relaxed">
              <p>
                <span className="text-primary">Crio</span> para gerar presença.
              </p>
              <p>
                <span className="text-primary">Mesmo</span> quando não estou
                ali.
              </p>
              <p>
                <span className="text-primary">Mesmo</span> quando ninguém
                percebe o esforço.
              </p>
            </div>
          </div>

          {/* Ghost + Manifesto */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative">
                <GhostEyes interactive={true} />
              </div>
              <div className="text-left">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight">
                  <span className="text-white block">ISSO É</span>
                  <span className="text-primary block">GHOST</span>
                  <span className="text-white block">DESIGN.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
