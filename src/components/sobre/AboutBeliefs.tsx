'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeGhost } from '@/lib/motionTokens';

export default function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen py-24 flex items-center justify-center bg-[#000022]"
      aria-label="O Que Me Move"
    >
      <div className="w-full max-w-4xl px-6 text-center space-y-24 md:space-y-32">
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={fadeGhost}
          custom={0}
        >
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-white">
            Acredito no design que muda o dia de alguém.
            <br />
            Não pelo choque —<br />
            <span className="font-medium text-[#0057FF]">
              mas pela conexão.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={fadeGhost}
          custom={1.4}
        >
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
            Um vídeo que respira.
            <br />
            Uma marca que se reconhece.
            <br />
            Um detalhe que fica.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={fadeGhost}
          custom={2.8}
        >
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-white">
            Crio para gerar presença.
            <br />
            Mesmo quando não estou ali.
            <br />
            Mesmo quando ninguém percebe o esforço.
            <br />
            <br />
            <span className="font-bold text-white block mt-6 text-3xl md:text-5xl tracking-tight">
              Isso é ghost design.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
