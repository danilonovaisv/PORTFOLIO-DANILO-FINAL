'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section03Marquee from './Section03Marquee';
import { motionTokens } from './motion';

const CAPABILITIES = [
  { title: 'Direção criativa', desc: 'que organiza o caos' },
  { title: 'Design estratégico', desc: 'que guia decisões' },
  { title: 'Identidades', desc: 'que permanecem na memória' },
  { title: 'Campanhas', desc: 'multicanais com lógica e emoção' },
  { title: 'Branding', desc: 'que não grita — mas marca' },
  { title: 'Inteligência artificial', desc: 'aplicada à criação e automação' },
  { title: 'Liderança criativa', desc: 'com visão e método' },
];

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  const renderTitle = () => {
    return (
      <div className="text-center pt-4 md:pt-8 mb-7 md:mb-10 space-y-2 max-w-[860px] mx-auto z-10 relative">
        <h2 className="text-[28px] sm:text-[30px] md:text-[30px] lg:text-[32px] font-semibold tracking-tight leading-[1.2] text-white">
          Do <span className="text-primary">insight</span> ao{' '}
          <span className="text-primary">impacto</span>.
          <span className="text-white font-semibold block mt-2">
            Mesmo quando você não percebe.
          </span>
        </h2>
      </div>
    );
  };

  return (
    <section
      className="bg-ghost-surface-deep pt-14 sm:pt-16 md:pt-20 pb-0 relative overflow-hidden flex flex-col"
      aria-label="O que eu faço"
    >
      {/* CORREÇÃO PRINCIPAL AQUI:
         1. z-30: O letreiro tem z-20. Colocamos z-30 aqui para os cards ficarem POR CIMA se houver sobreposição.
         2. pb-32 md:pb-64: Aumentei o padding bottom. Como o letreiro agora é gigante, precisamos de muito espaço vazio no final da lista para os cards não ficarem tapados.
      */}
      <div className="container mx-auto px-6 max-w-[1400px] relative z-30 pb-32 md:pb-64">
        <motion.div
          variants={motionTokens.riseSoft}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {renderTitle()}
        </motion.div>

        <motion.div
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-5 md:gap-6 auto-rows-fr"
        >
          {CAPABILITIES.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={motionTokens.riseSoft}
                className={`
                  group relative
                  bg-[#1a0c2c]/90
                  border border-white/10
                  shadow-[0_14px_28px_rgba(3,0,20,0.35)]
                  rounded-[16px]
                  px-4 py-3 md:px-5 md:py-4 lg:px-4 lg:py-5
                  flex items-start gap-3
                  min-h-[76px] md:min-h-[88px] lg:min-h-[96px]
                `}
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white shadow-[0_6px_12px_rgba(0,87,255,0.35)]">
                  ↗
                </span>
                <p className="text-[15px] font-normal text-white/90 leading-snug">
                  <span className="text-primary font-semibold">
                    {item.title}
                  </span>{' '}
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* O Marquee continua aqui, no fundo, z-20 */}
      <Section03Marquee />
    </section>
  );
}
