// src/components/sobre/MetodoGhostSection.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motionTokens';

const STEPS = [
  'Entender bem o contexto, definir objetivos claros',
  'Estratégia como guia — não como obstáculo',
  'Explorar caminhos, sintetizar direções',
  'Provar hipóteses com rigor, iterar com desenvoltura',
  'Delivery impecável: microdetalhes, consistência, qualidade',
  'Métricas e resultados explícitos, melhoria contínua',
];

export default function MetodoGhostSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-20 md:py-28 bg-[#07081c]" aria-labelledby="metodo">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-6">
          <h3 id="metodo" className="text-3xl md:text-4xl font-semibold text-white">
            Criatividade com método.<br />Impacto sem ruído.
          </h3>
          <ul className="mt-6 space-y-3 text-white/85">
            {STEPS.map((step, i) => (
              <motion.li
                key={i}
                variants={motionTokens.riseSoft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ ...motionTokens.riseSoft.visible.transition, delay: i * 0.08 }}
                className="flex gap-3"
                style={reduce ? { filter: 'none', transform: 'none' } : undefined}
              >
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/60" />
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6">
          <motion.div
            variants={motionTokens.fadeGhost}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur"
          >
            <img
              src="/sobre/ghost-ambient.jpg"
              alt="Ghost — ambiente silencioso"
              className="h-[320px] w-full object-cover rounded-xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
