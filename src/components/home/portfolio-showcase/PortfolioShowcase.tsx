'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import CategoryStripe, { type CategoryStripeConfig } from './CategoryStripe';

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const categories = HOME_CONTENT.showcase.categories.map((c) => ({
    id: c.id,
    titleDesktop: c.label,
    titleMobile: c.labelMobile || c.label,
    align: c.align as 'start' | 'center' | 'end',
    thumb: c.thumb,
  })) satisfies CategoryStripeConfig[];

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
            className="group relative inline-flex flex-row items-center justify-center h-[64px] cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-px"
            aria-label={HOME_CONTENT.showcase.cta.label.replace(' →', '')}
          >
            {/* NÓ 1: CÁPSULA DE TEXTO (Esquerda) */}
            <div className="flex items-center justify-center h-full pl-8 pr-4 bg-primary group-hover:bg-[rgb(50,120,255)] text-white rounded-l-full transition-colors duration-300">
              <span className="text-lg font-medium uppercase text-[0.9rem] tracking-[0.25em] whitespace-nowrap">
                {HOME_CONTENT.showcase.cta.label.replace(' →', '')}
              </span>
            </div>

            {/* NÓ 2: ESFERA DO ÍCONE (Direita) */}
            <div className="flex items-center justify-center h-full aspect-square bg-primary group-hover:bg-[rgb(50,120,255)] text-white rounded-r-full transition-colors duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-45"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
