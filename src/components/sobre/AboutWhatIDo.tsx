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
      <div className="text-center pt-6 md:pt-12 mb-8 md:mb-12 space-y-2 max-w-[820px] mx-auto z-10 relative">
        <h2 className="text-[28px] md:text-[34px] lg:text-[40px] xl:text-[44px] font-semibold tracking-tight leading-[1.15] text-white">
          Do <span className="text-primary">insight</span> ao{' '}
          <span className="text-primary">impacto</span>.
          <span className="text-white font-medium block mt-2">
            Mesmo quando você não percebe.
          </span>
        </h2>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen bg-ghost-surface-deep py-20 relative overflow-hidden"
      aria-label="O que eu faço"
    >
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-3 md:gap-4 auto-rows-fr">
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
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className={`
                  group relative
                  bg-[#1a0f2d]/90
                  border border-white/5
                  rounded-xl
                  px-4 py-3 md:px-5 md:py-4
                  flex items-start gap-3
                  min-h-[72px] md:min-h-[88px]
                `}
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
                  ↗
                </span>
                <p className="text-[15px] md:text-[14px] lg:text-[13px] xl:text-[13px] font-normal text-white/90 leading-snug">
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
