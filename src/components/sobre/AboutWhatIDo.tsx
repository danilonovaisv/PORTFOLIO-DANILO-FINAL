'use client';

import { motion, useReducedMotion } from 'framer-motion';

// 7 Cards Content hardcoded to match prototype perfectly if not in config
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

  // Split title lines and highlight keywords
  const renderTitle = () => {
    return (
      <div className="text-center pt-4 md:pt-8 mb-7 md:mb-10 space-y-2 max-w-[860px] mx-auto z-10 relative">
        <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold tracking-tight leading-[1.2] text-white">
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
      className="bg-ghost-surface-deep py-14 sm:py-16 md:py-20 relative overflow-hidden"
      aria-label="O que eu faço"
    >
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderTitle()}
        </motion.div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 md:gap-4 auto-rows-fr">
          {CAPABILITIES.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                <p className="text-[14px] md:text-[13px] lg:text-[12.5px] xl:text-[13px] font-normal text-white/90 leading-snug">
                  <span className="text-primary font-semibold">
                    {item.title}
                  </span>{' '}
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
