'use client';

import React, { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const PortfolioShowcase: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Easing "Premium"
  const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easePremium },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={fadeInUp}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.9] tracking-tight text-[#111111]">
            portfólio <br />
            <span className="text-[#0057FF]">showcase</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {CATEGORIES.map((category) => (
            <PortfolioCard
              key={category.id}
              category={category}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex justify-center"
        >
          <Button
            href="/#contact"
            className="rounded-full bg-[#111111] text-white hover:bg-[#0057FF] transition-colors px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-[#0057FF]/20"
          >
            Vamos trabalhar juntos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioCard = ({
  category,
  prefersReducedMotion,
}: {
  category: (typeof CATEGORIES)[0];
  prefersReducedMotion: boolean;
}) => {
  const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easePremium },
    },
  };

  return (
    <motion.div variants={cardVariants} className="w-full">
      <Link
        href={`/portfolio?category=${category.id}`}
        className={`group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-[#0057FF]/20 ${prefersReducedMotion ? '' : 'hover:translate-y-[-8px]'}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <motion.img
            src={category.posterUrl}
            alt={category.label}
            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${prefersReducedMotion ? '' : 'group-hover:scale-110'}`}
          />
          {/* Overlay Escuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top Pill & Arrow */}
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-semibold uppercase tracking-wider text-white">
              {category.label}
            </span>

            <div
              className={`w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${prefersReducedMotion ? '' : 'group-hover:rotate-45 group-hover:scale-110'}`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Text Overlay */}
          <div
            className={`transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-2 ${prefersReducedMotion ? 'translate-y-0' : 'group-hover:translate-y-0'}`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {category.label}
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
              <span className="block mt-2 text-sm text-white/80 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Ver projetos
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PortfolioShowcase;
