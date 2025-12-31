'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';
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
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Headline Centralizada */}
        <h2 className="mb-20 text-center text-4xl font-bold md:mb-28 md:text-7xl">
          portfólio <span className="text-primary font-bold">showcase</span>
        </h2>

        <div className="relative">
          {/* Floating Label - Desktop Only - Alinhado ao primeiro item */}
          <div className="pointer-events-none absolute left-0 top-0 hidden -translate-y-10 md:block">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              [what we love working on]
            </span>
          </div>

          {/* Accordion Rows */}
          <motion.div
            className="flex flex-col border-b border-primary/30"
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

        {/* CTA Centralizado */}
        <div className="mt-20 flex flex-col items-center justify-center">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-3 bg-primary text-white py-5 px-10 rounded-full hover:-translate-y-px transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span className="text-lg font-medium tracking-tight">
              let&apos;s build something great
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <span className="text-xl">→</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
