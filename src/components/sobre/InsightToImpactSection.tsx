// src/components/sobre/InsightToImpactSection.tsx
'use client';
import { motion } from 'framer-motion';
import { motionTokens } from './motionTokens';

const PILLARS = [
  'Direção criativa',
  'Design de sistemas',
  'Campanhas & conteúdo',
  'Branding que vira ação',
  'Storytelling de produto',
  'Experiências digitais',
  'Web & tech',
  'Liderança criativa',
];

export default function InsightToImpactSection() {
  return (
    <section className="relative py-20 bg-[#050511]" aria-labelledby="impacto">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-10">
          <h3 id="impacto" className="text-2xl md:text-3xl font-semibold text-white">
            Do <span className="ghost-accent">insight</span> ao impacto.<br className="hidden md:block" />
            Mesmo quando você não percebe.
          </h3>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-3">
          {PILLARS.map((pill, i) => (
            <motion.div
              key={pill}
              variants={motionTokens.fadeGhost}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...motionTokens.fadeGhost.visible.transition, delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-center text-sm text-white/90 backdrop-blur"
            >
              • {pill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
