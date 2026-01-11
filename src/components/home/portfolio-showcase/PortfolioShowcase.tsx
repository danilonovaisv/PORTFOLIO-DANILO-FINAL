'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import CategoryStripe, { type CategoryStripeConfig } from './CategoryStripe';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const categories = HOME_CONTENT.showcase.categories.map((c) => ({
    id: c.id,
    titleDesktop: c.titleDesktop,
    titleMobile: c.titleMobile,
    align: c.align as 'start' | 'center' | 'end',
    thumb: c.thumb,
  })) satisfies CategoryStripeConfig[];

  // Clean label (remove arrow from content.ts)
  const ctaLabel = HOME_CONTENT.showcase.cta.label.replace(' →', '');

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="relative z-10 overflow-hidden bg-background py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        <div className="relative mb-12 md:mb-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="type-h1 font-bold uppercase tracking-[0.3em] leading-none">
              <span className="inline text-white">portfólio</span>{' '}
              <span className="inline text-bluePrimary">showcase</span>
            </h2>
          </div>
        </div>

        <div className="relative mb-10">
          <div className="pointer-events-none absolute left-[3vw] top-20 hidden lg:flex">
            <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-primary">
              {HOME_CONTENT.showcase.floatingLabel}
            </span>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#8705f2]/40 bg-[#03000f]/70 shadow-[0_40px_120px_rgba(135,5,242,0.35)]">
            <div className="divide-y divide-[#8705f2]/40">
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
        </div>

        <div className="flex justify-center mt-12 md:mt-20">
          <AntigravityCTA
            href={HOME_CONTENT.showcase.cta.href}
            label={ctaLabel}
            variant="primary"
            size="lg"
            ariaLabel={ctaLabel}
            className="shadow-[0_20px_60px_rgba(0,72,255,0.35)]"
            animateArrowIdle
          />
        </div>
      </div>
    </section>
  );
}
