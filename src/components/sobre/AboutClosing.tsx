'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motion';
import { kw } from './keywords';
import { CONTACT_CONFIG } from '@/lib/constants';

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-(--ghost-bg) py-24 md:py-32">
      <motion.div
        variants={motionTokens.fadeGhost}
        custom={0.2}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[720px] mx-auto px-6 md:px-10 lg:px-0 text-(--ghost-text) bg-black/25 border border-white/10 rounded-2xl shadow-[0_18px_80px_rgba(0,0,0,0.35)] p-8 md:p-12"
      >
        <p className="text-lg md:text-xl leading-relaxed text-(--ghost-text-secondary) mb-10">
          Hoje sou Diretor de Criação, com mais de 10 anos de estrada. Quero
          criar algo que {kw('permaneça')} — com você.
        </p>

        <div className="flex flex-wrap gap-4 md:gap-6">
          <a
            className="cta inline-flex items-center justify-center px-5 md:px-6 py-3 rounded-full bg-[#0057FF] text-sm font-semibold tracking-tight shadow-[0_10px_40px_rgba(0,87,255,0.45)] hover:bg-[#0a5dff] transition-colors"
            href={`mailto:${CONTACT_CONFIG.emails.secondary}`}
          >
            Fale comigo
          </a>
          <a
            className="cta inline-flex items-center justify-center px-5 md:px-6 py-3 rounded-full border border-white/20 text-sm font-semibold tracking-tight text-(--ghost-text) hover:border-[#0057FF]/60 transition-colors"
            href={`mailto:${CONTACT_CONFIG.emails.secondary}?subject=Solicitar%20CV`}
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
}
