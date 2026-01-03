// src/components/sobre/OrigemSection.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motionTokens';

export default function OrigemSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-16 md:py-24 bg-[#0a0b1a]" aria-labelledby="origem">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="origem" className="text-xs uppercase tracking-widest text-white/60 mb-8">origem</h2>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-6 space-y-8">
            {[
              <>Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia.</>,
              <>Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros.</>,
              <>Foi ali que entendi: design não é efeito. É ferramenta invisível de transformação.</>,
              <>Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação.</>,
            ].map((p, i) => (
              <motion.p
                key={i}
                variants={motionTokens.riseSoft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ ...motionTokens.riseSoft.visible.transition, delay: i * 0.15 }}
                className="text-white/85 text-lg leading-relaxed"
                style={reduce ? { filter: 'none', transform: 'none' } : undefined}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="col-span-12 md:col-span-6 space-y-6">
            <motion.img
              src="/sobre/origem-01.jpg"
              alt="Retrato — início da jornada"
              className="w-full rounded-xl border border-white/10 shadow-lg object-cover"
              variants={motionTokens.fadeGhost}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <div className="grid grid-cols-2 gap-6">
              <motion.img
                src="/sobre/origem-02.jpg"
                alt="Equipe em projeto"
                className="w-full rounded-xl border border-white/10 shadow-lg object-cover h-40 md:h-48"
                variants={motionTokens.fadeGhost}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <motion.img
                src="/sobre/origem-03.jpg"
                alt="Cena conceitual"
                className="w-full rounded-xl border border-white/10 shadow-lg object-cover h-40 md:h-48"
                variants={motionTokens.fadeGhost}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
