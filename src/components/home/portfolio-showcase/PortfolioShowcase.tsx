'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import CategoryStripe, { type CategoryStripeConfig } from './CategoryStripe';

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const categories = HOME_CONTENT.showcase.categories.map((c) => ({
    id: c.id,
    titleDesktop: c.label,
    titleMobile: c.labelMobile || c.label,
    align: c.align as 'start' | 'center' | 'end',
    thumb: c.thumb,
  })) satisfies CategoryStripeConfig[];

  const arrowLoopProps = prefersReducedMotion
    ? {}
    : {
        animate: { x: [0, 2, 0] },
        transition: {
          duration: 2.1,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: [0.42, 0, 0.58, 1] as const,
        },
      };

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="relative z-10 overflow-hidden bg-background py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        <div className="relative mb-12 md:mb-20">
          {/* Headline */}
          <div className="flex flex-col items-center text-center">
            <h2 className="type-display uppercase tracking-tighter leading-none">
              <span className="inline text-white">portfólio</span>{' '}
              <span className="inline text-primary">showcase</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="border-t border-primary/30">
            {categories.map((category, index) => (
              <CategoryStripe
                key={category.id}
                category={category}
                index={index}
                parentInView={isInView}
                showFloatingLabel={index === 0}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 md:mt-20">
          <Link
            href={HOME_CONTENT.showcase.cta.href}
            className="group relative flex items-center overflow-hidden rounded-full bg-primary pl-10 pr-4 py-3 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,72,255,0.3)] hover:shadow-[0_8px_30px_rgba(0,72,255,0.45)]"
          >
            <span className="z-10">
              {HOME_CONTENT.showcase.cta.label.replace(' →', '')}
            </span>
            <div className="ml-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:bg-white/20">
              <motion.span {...arrowLoopProps} className="text-xl font-light">
                →
              </motion.span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
