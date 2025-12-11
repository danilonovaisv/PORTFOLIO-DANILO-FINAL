'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const PORTFOLIO_CATEGORIES = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    href: '/portfolio?category=brand-campaigns',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    href: '/portfolio?category=videos-motions',
  },
  {
    id: 'websites-webcampaigns-tech',
    label: 'Web Campaigns, Websites & Tech',
    href: '/portfolio?category=websites-webcampaigns-tech',
  },
];

export default function PortfolioShowcaseSection() {
  const reduced = usePrefersReducedMotion();

  const containerProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.section
      id="portfolio-showcase"
      className="bg-[#F4F5F7] py-16"
      {...containerProps}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row">
        <div className="md:w-1/4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0057FF]">
            [what we love working on]
          </p>
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-center text-xl font-semibold text-[#0057FF] md:text-left">
            portfólio showcase
          </h2>

          <div className="space-y-4">
            {PORTFOLIO_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={reduced ? undefined : { opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={category.href}
                  className="group flex items-center justify-between rounded-full border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-[#111111] shadow-sm transition-colors hover:border-[#0057FF] hover:bg-white"
                >
                  <span>{category.label}</span>
                  <span className="relative inline-flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#0057FF]" />
                    <motion.span
                      className="absolute inline-flex h-3 w-3 rounded-full border border-[#0057FF]"
                      animate={
                        reduced
                          ? undefined
                          : {
                              scale: [1, 1.8, 1],
                              opacity: [0.5, 0, 0.5],
                            }
                      }
                      transition={
                        reduced
                          ? undefined
                          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                      }
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-[#0057FF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
            >
              VEJA MAIS →
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center text-[#111111] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
            >
              let&apos;s build something great →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
