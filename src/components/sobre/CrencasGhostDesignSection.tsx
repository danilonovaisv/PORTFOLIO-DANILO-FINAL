// src/components/sobre/CrencasGhostDesignSection.tsx
'use client';
import { motion } from 'framer-motion';
import { motionTokens } from './motionTokens';

export default function CrencasGhostDesignSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#050511]" aria-labelledby="crencas">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-7">
          <motion.h3
            id="crencas"
            variants={motionTokens.riseSoft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Acredito no design que <span className="ghost-accent">muda o dia</span> de alguém.
          </motion.h3>
          <motion.p
            variants={motionTokens.fadeGhost}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-white/85"
          >
            Não pelo choque — mas pela conexão. Um design que respira. Uma marca que se reconhece. Um detalhe que faz foco.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contato" className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur hover:bg-white/20 transition">
              fale comigo
            </a>
            <a href="/cv.pdf" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/90 hover:bg-white/10 transition">
              baixar curriculum
            </a>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <motion.div
            variants={motionTokens.fadeGhost}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#0a0b1a] p-6 shadow-xl"
          >
            <div className="text-right text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              <span className="block">ISSO É</span>
              <span className="block ghost-accent">GHOST</span>
              <span className="block">DESIGN.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
