'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
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

const MotionLink = motion(Link);

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const revealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const stripesContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const initialState = shouldReduceMotion ? 'visible' : 'hidden';

  const stripes = [
    'Brand & Campaigns',
    'Videos & Motions',
    'Web Campaigns, Websites & Tech',
  ];

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#F4F5F7] py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-[90%] md:max-w-6xl">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
              },
            },
          }}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-3 mb-10 md:mb-12 items-center"
        >
          <motion.h2
            id="portfolio-title"
            variants={revealVariant}
            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111]"
          >
            portfólio showcase
          </motion.h2>
          <motion.span
            variants={revealVariant}
            className="self-start text-xs md:text-sm uppercase tracking-[0.45em] text-[#0057FF] font-semibold"
          >
            [ what we love working on ]
          </motion.span>
        </motion.div>

        <motion.div
          variants={stripesContainer}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="flex flex-col gap-4 w-full"
        >
          {stripes.map((label, index) => {
            const segments = splitLabel(label);
            return (
              <motion.div
                key={label}
                variants={revealVariant}
                className="w-full border-b border-[#0057FF]/30 last:border-b-0"
              >
                <MotionLink
                  href={`${showcase.finalCtaHref}?category=${encodeURIComponent(
                    label
                  )}`}
                  aria-label={`Ver projetos de ${label}`}
                  className="group flex w-full items-center justify-between gap-4 rounded-[2rem] border border-transparent bg-white px-6 py-6 md:px-8 md:py-7 transition-all duration-300 ease hover:bg-[#E8EAED] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
                  tabIndex={0}
                >
                  <div className="flex-1 space-y-0.5">
                    {segments.map((segment, segmentIndex) => (
                      <span
                        key={`${segment}-${segmentIndex}`}
                        className="block text-3xl md:text-4xl font-bold tracking-tight text-[#111111] leading-tight"
                      >
                        {segment}
                      </span>
                    ))}
                  </div>

                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white transition-transform duration-200 ease group-hover:scale-[1.2]"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </MotionLink>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
