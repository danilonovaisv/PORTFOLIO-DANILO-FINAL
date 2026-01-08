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
          ease: 'easeInOut',
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
        <div className="relative mb-12 md:mb-16">
          {/* Headline */}
          <div className="flex flex-col items-center text-center">
            <h2 className="type-display text-white uppercase tracking-tighter leading-none">
              <span className="block">portfólio</span>
              <span className="block text-primary">{'showcase'}</span>
            </h2>
          </div>

          {/* Floating Label - Contextual */}
          <div className="pointer-events-none absolute left-0 top-0 hidden lg:flex">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent opacity-80">
              {HOME_CONTENT.showcase.floatingLabel}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="border-t border-white/10">
            {categories.map((category, index) => (
              <CategoryStripe
                key={category.id}
                category={category}
                index={index}
                parentInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16 md:mt-24">
          <Link
            href={HOME_CONTENT.showcase.cta.href}
            className="group inline-flex items-center gap-4 rounded-full border border-white/20 px-10 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-accent hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
          >
            <span className="whitespace-nowrap">
              {HOME_CONTENT.showcase.cta.label}
            </span>
            <motion.span
              {...arrowLoopProps}
              whileHover={prefersReducedMotion ? undefined : { x: 4 }}
              className="text-xl font-light"
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
