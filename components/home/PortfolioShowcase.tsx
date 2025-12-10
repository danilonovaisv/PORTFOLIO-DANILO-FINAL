'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../lib/constants';
import { ArrowUpRight } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const PortfolioShowcaseSection: FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const stripeVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };
  const pulseClass = prefersReducedMotion ? '' : 'animate-pulse';

  return (
    <section
      id="portfolio-showcase"
      className="relative w-full bg-[#F4F5F7] py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.35em] text-slate-600">
              [ what we love working on ]
            </span>
          </div>

          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
            <h2 className="text-3xl md:text-4xl font-semibold lowercase tracking-tight text-[#0057FF]">
              <span className="text-[#0057FF]">portfólio</span>{' '}
              <span className="font-normal text-[#111111]">showcase</span>
            </h2>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md shadow-[#0057FF]/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0057FF]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
            >
              veja mais →
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#dfe1e5] bg-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="divide-y divide-[#dfe1e5]">
            {CATEGORIES.map((category) => (
              <motion.a
                key={category.id}
                href={`/portfolio?category=${category.id}`}
                initial={stripeVariants ? 'hidden' : undefined}
                whileInView={stripeVariants ? 'visible' : undefined}
                viewport={prefersReducedMotion ? undefined : { once: true }}
                variants={stripeVariants}
                className="group relative flex items-center justify-between px-6 py-8 transition hover:bg-[#F4F5F7] md:px-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-white"
                aria-label={`Abrir categoria ${category.label}`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-lg md:text-2xl font-medium leading-tight text-[#111111] group-hover:text-[#0057FF]">
                    {category.label}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-[11px] uppercase tracking-[0.3em] text-slate-500 md:inline">
                    [ explore ]
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full bg-[#0057FF] ring-4 ring-[#0057FF]/25 transition duration-300 group-hover:scale-110 group-hover:ring-opacity-60 ${pulseClass}`}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <motion.a
            href="/#contact"
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.03, y: -2 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-10 py-4 text-white shadow-[0_18px_40px_rgba(0,87,255,0.28)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
          >
            <span className="text-base font-semibold lowercase">
              let’s build something great →
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:bg-white group-hover:text-[#0057FF]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
