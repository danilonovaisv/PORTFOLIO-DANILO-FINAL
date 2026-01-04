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
      className="relative z-10 bg-[#050511] py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        <div className="relative">
          <div className="flex justify-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white text-center">
              portfólio <span className="text-[#4fe6ff]">showcase</span>
            </h2>
          </div>

          <div className="pointer-events-none absolute left-0 top-[18%] lg:top-[64px] z-20 hidden lg:block">
            <span className="font-mono text-[13px] uppercase tracking-[0.35em] text-[#4fe6ff]">
              {HOME_CONTENT.showcase.floatingLabel}
            </span>
          </div>

          <motion.div
            className="flex flex-col border-t border-b border-white/10 divide-y divide-white/10"
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

        <div className="flex justify-center mt-14 md:mt-20">
          <CTAButton href={HOME_CONTENT.showcase.cta.href} variant="primary">
            {HOME_CONTENT.showcase.cta.label}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
