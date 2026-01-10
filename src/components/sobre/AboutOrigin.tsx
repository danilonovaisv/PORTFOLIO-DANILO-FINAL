'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { OriginPair } from './origin/OriginPair';
import { OriginBlock } from './origin/types';
import { textReveal } from './origin/animations';
import { BRAND } from '@/config/brand';

export default function AboutOrigin() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const originBlocks = ABOUT_CONTENT.origin.content as OriginBlock[];

  return (
    <section
      className="relative min-h-[130vh] py-16 sm:py-20 md:py-24 lg:py-32 bg-background overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className={BRAND.layout.container}>
        {/* Section Label */}
        <div className="hidden lg:grid grid-cols-12 items-center mb-8 md:mb-10">
          <motion.h2
            variants={textReveal('right')}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="col-span-12 text-center font-mono type-caption text-[#0048ff]"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
        </div>
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 md:mb-12 lg:hidden">
          <motion.h2
            variants={textReveal('left')}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center font-mono type-caption text-[#0048ff]"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
        </div>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {originBlocks.map((block, index) => (
            <OriginPair
              key={index}
              index={index}
              block={block}
              prefersReducedMotion={prefersReducedMotion ?? false}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
