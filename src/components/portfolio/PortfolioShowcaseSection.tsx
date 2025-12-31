'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { CTAButton } from '@/components/ui/CTAButton';
import AccordionRow from './AccordionRow';

export type CategoryConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: 'start' | 'center' | 'end';
};

export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-30% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-background py-24 md:py-32 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Headline da Sessão - Centralizado */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-32 flex justify-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter lowercase leading-[0.9] text-center">
            <span className="text-white">portfólio</span>{' '}
            <span className="text-[#5227FF]">showcase</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Floating Label - LightBlue (#4fe6ff) - Posicionado ao lado do primeiro item */}
          <div className="pointer-events-none absolute left-0 top-[-40px] md:top-[24px] z-20">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#4fe6ff]">
              [what we love working on]
            </span>
          </div>

          {/* Accordion Rows */}
          <motion.div
            className="flex flex-col border-b border-[#0057FF]/30"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {HOME_CONTENT.showcase.categories.map((category, index) => (
              <AccordionRow
                key={category.id}
                category={{
                  id: category.id,
                  titleDesktop: category.label,
                  titleMobile: category.labelMobile || category.label,
                  align: category.align as 'start' | 'center' | 'end',
                }}
                alignment={category.align as 'start' | 'center' | 'end'}
                index={index}
                parentInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                thumb={category.thumb}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Centralizado - Estilo Compound Pill Standard */}
        <div className="flex justify-center">
          <CTAButton href="/portfolio">
            let's build something great
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
