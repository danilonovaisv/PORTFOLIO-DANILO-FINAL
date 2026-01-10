'use client';

import { motion } from 'framer-motion';
import Section03Marquee from './Section03Marquee';

// --- DADOS DA SEÇÃO ---
const capabilities = [
  { id: 1, highlight: 'Direção criativa', text: 'que organiza o caos' },
  { id: 2, highlight: 'Design estratégico', text: 'que guia decisões' },
  { id: 3, highlight: 'Identidades', text: 'que permanecem na memória' },
  { id: 4, highlight: 'Campanhas', text: 'multicanais com lógica e emoção' },
  { id: 5, highlight: 'Branding', text: 'que não grita — mas marca' },
  {
    id: 6,
    highlight: 'Inteligência artificial',
    text: 'aplicada à criação e automação',
  },
  { id: 7, highlight: 'Liderança criativa', text: 'com visão e método' },
];

export function AboutWhatIDo() {
  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* Container Central */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        {/* Título da Seção */}
        <div className="text-center mb-16 md:mb-24 max-w-[800px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white leading-[1.2] tracking-tight">
            Do <span className="text-primary">insight</span> ao{' '}
            <span className="text-primary">impacto</span>.
            <br />
            <span className="text-white/60 md:text-white">
              Mesmo quando você não percebe.
            </span>
          </h2>
        </div>

        {/* Grid de Cards */}
        {/* Mobile: 1 Coluna | Tablet/Desktop: 7 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-7 md:grid-rows-1 gap-4 xl:gap-6">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`
                group relative flex flex-col justify-between gap-4
                w-full h-[120px] md:h-[220px] p-5 sm:p-6 rounded-2xl bg-[#0C061D] border border-white/5
                hover:bg-[#160D33] hover:-translate-y-2 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              `}
              aria-label={`Capacidade de ${item.highlight}`}
              role="listitem"
              tabIndex={0}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(0,72,255,0.4)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
                <span className="text-[18px] md:text-[20px] font-semibold text-primary leading-tight">
                  {item.highlight}
                </span>
              </div>

              <p className="text-base md:text-lg text-white leading-[1.6] text-left">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rodapé Animado (Componente Separado) */}
      <Section03Marquee />
    </section>
  );
}
