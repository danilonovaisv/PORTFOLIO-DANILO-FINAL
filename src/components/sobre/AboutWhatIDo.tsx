'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section03Marquee from './Section03Marquee';

import { ABOUT_CONTENT } from '@/config/content';

export function AboutWhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      {/* Container Central */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        {/* Título da Seção */}
        <div className="text-center mb-16 md:mb-24 max-w-[800px] mx-auto">
          <h2 className="type-h1 text-white leading-[1.2] tracking-tight">
            Do <span className="text-primary">insight</span> ao{' '}
            <span className="text-primary">impacto</span>.
            <br />
            <span className="text-white/60">
              Mesmo quando você não percebe.
            </span>
          </h2>
        </div>

        {/* Grid de Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6"
        >
          {ABOUT_CONTENT.whatIDo.items.map((item, index) => {
            // Create a staggered parallax effect based on index
            const parallaxY = useTransform(
              scrollYProgress,
              [0, 1],
              [50 + index * 20, -50 - index * 10]
            );

            return (
              <motion.div
                key={item.id}
                style={{ y: parallaxY }}
                className={`
                  group relative flex flex-col justify-start gap-6
                  w-full min-h-[220px] p-6 rounded-2xl bg-[#0C061D] border border-white/5
                  hover:bg-[#160D33] transition-colors duration-500
                `}
                aria-label={`Capacidade de ${item.title}`}
                role="listitem"
                tabIndex={0}
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <span className="type-h3 font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </span>
                </div>

                <p className="type-body text-textSecondary leading-[1.6] text-left">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rodapé Animado (Componente Separado) */}
      <Section03Marquee />
    </section>
  );
}
