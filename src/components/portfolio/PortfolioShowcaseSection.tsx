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
      className="relative z-10 bg-ghost-bg py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        <div className="relative">
          {/* Centered Headline - Mixed Color - Desktop Only (Mobile uses simple text in AccordionRow generally, but here the section needs a title too?) 
            Wait, the prompt says 'Centred headline' for both Desktop and Mobile. 
            On Desktop: "portfólio showcase" (mixed). 
            On Mobile: "The 'portfólio showcase' headline is centered with reduced spacing from the CTA" -> WAIT. 
            Actually, commonly this title is above the rows. 
            Let's add it. 
          */}
          <div className="flex justify-center mb-16 md:mb-24">
             <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white text-center">
                portfólio <span className="text-[#0057FF]">showcase</span>
             </h2>
          </div>

          {/* Floating Label - LightBlue (#4fe6ff) - Posicionado ao lado do primeiro item */}
          <div className="pointer-events-none absolute left-0 top-[20%] lg:top-[80px] z-20 hidden lg:block">
            <span className="font-mono text-[14px] uppercase tracking-[0.4em] text-[#4fe6ff]">
              {HOME_CONTENT.showcase.floatingLabel}
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
        <div className="flex justify-center mt-16 md:mt-20">
          <CTAButton href={HOME_CONTENT.showcase.cta.href}>
            {HOME_CONTENT.showcase.cta.label}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
