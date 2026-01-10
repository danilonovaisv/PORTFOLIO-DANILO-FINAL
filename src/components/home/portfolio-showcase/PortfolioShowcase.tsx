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
          {/* Headline */}
          <div className="flex flex-col items-center text-center">
            <h2 className="type-h2 font-bold uppercase tracking-tighter leading-none">
              <span className="inline text-white">portfólio</span>{' '}
              <span className="inline text-bluePrimary">showcase</span>
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

        {/* CTA - Using AntigravityCTA component */}
        <div className="flex justify-center mt-12 md:mt-20">
          <AntigravityCTA
            href={HOME_CONTENT.showcase.cta.href}
            label={ctaLabel}
            variant="primary"
            size="lg"
            ariaLabel={ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}
