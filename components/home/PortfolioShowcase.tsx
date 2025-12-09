'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';

const splitLabel = (label: string) => {
  const commaParts = label
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (commaParts.length > 1) {
    return commaParts;
  }

  const ampersandParts = label.split(' & ').map((segment) => segment.trim());

  return ampersandParts.length > 1 ? ampersandParts : [label];
};

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const stripeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#F4F5F7] py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-[90%] md:max-w-7xl">
        {/* Header: Title Centered */}
        <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm uppercase tracking-[0.35em] text-[#0057FF] font-medium">
              portfólio showcase
            </span>
            <h2
              id="portfolio-title"
              className="text-center text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#111111]"
            >
              <span className="text-[#0057FF]">portfólio</span>{' '}
              <span className="text-[#111111]">showcase</span>
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6 w-full max-w-5xl"
          >
            {[
              { id: 'brand', label: 'Brand & Campaigns' },
              { id: 'videos', label: 'Videos & Motions' },
              { id: 'web', label: 'Web Campaigns, Websites & Tech' },
            ].map((category) => {
              const segments = splitLabel(category.label);
              return (
                <motion.div
                  key={category.id}
                  variants={stripeVariants}
                  className="w-full"
                >
                  <Link
                    href={`${showcase.finalCtaHref}?category=${encodeURIComponent(category.label)}`}
                    className="group relative flex w-full items-center justify-between p-8 md:p-10 rounded-4xl bg-white border border-transparent hover:border-[#0057FF]/10 hover:shadow-2xl hover:shadow-[#0057FF]/5 transition-all duration-500 ease-out overflow-hidden"
                    aria-label={`Ver projetos de ${category.label}`}
                  >
                    {/* Content */}
                    <div className="flex flex-col gap-1 z-10 w-full relative">
                      {segments.map((segment, index) => (
                        <span
                          key={`${segment}-${index}`}
                          className="block text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-[#111111] transition-colors duration-300 group-hover:text-[#0057FF]"
                        >
                          {segment}
                        </span>
                      ))}
                    </div>

                    {/* Icon / Blue Dot */}
                    <div className="relative z-10 shrink-0 ml-6">
                      <div className="relative flex h-16 w-16 items-center justify-center">
                        {/* Pulsing ring */}
                        <div className="absolute inset-0 rounded-full bg-[#0057FF] opacity-0 group-hover:animate-ping" />
                        {/* Main dot */}
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30 transition-transform duration-500 group-hover:scale-110">
                          <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer / Global CTA */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 flex justify-center w-full"
          >
            {/* Primary CTA */}
            <Link
              href="/#contato"
              className="group inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-8 py-4 md:px-10 md:py-5 text-lg font-semibold text-white shadow-xl shadow-[#0057FF]/30 transition-all duration-300 hover:shadow-[#0057FF]/50 hover:-translate-y-1"
            >
              <span className="uppercase tracking-[0.2em] text-sm md:text-base">
                let's build something great
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#0057FF]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
