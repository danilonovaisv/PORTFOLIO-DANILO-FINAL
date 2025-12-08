'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FluidProjectGrid from './FluidProjectGrid';
import { motion } from 'framer-motion';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;
  const featuredImage = HOMEPAGE_CONTENT.projectCards[0]?.imageUrl;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#f4f5f7] pb-16 pt-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto flex flex-col gap-10 px-6 md:px-8 max-w-6xl"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full overflow-hidden rounded-[36px] border border-white/40 shadow-[0_30px_50px_rgba(15,23,42,0.2)]">
            {featuredImage ? (
              <div className="relative h-[320px] w-full">
                <Image
                  src={featuredImage}
                  alt="Portfolio showcase hero"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-[320px] w-full bg-gradient-to-br from-[#0b4cd5] to-[#8b5cf6]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-5 right-6 rounded-full border border-white/60 bg-white/90 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0057FF]">
              Branding
            </div>
            <div className="absolute bottom-6 left-6 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#111]">
              watch now
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.6em] text-[#0057FF]">
            {showcase.title}
          </p>
        </div>

        <div className="w-full space-y-2 rounded-[36px] border border-[#d8dde6] bg-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          {showcase.categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between px-6 py-6 text-2xl font-light tracking-tight text-[#111]"
            >
              <span className="leading-[1.1]">{category.label}</span>
              <span className="h-3 w-3 rounded-full bg-[#0057FF]" />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={showcase.finalCtaHref}
            className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[#0b4cd5]"
          >
            {showcase.finalCtaLabel}
            <span className="text-white">↗</span>
          </Link>
        </div>
      </motion.div>

      <div className="mt-12">
        <FluidProjectGrid />
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
