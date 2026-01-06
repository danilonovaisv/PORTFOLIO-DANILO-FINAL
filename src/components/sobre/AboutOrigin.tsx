'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { OriginPair } from './origin/OriginPair';
import { OriginText, OriginMedia } from './origin/types';
import { textReveal } from './origin/animations';
import { BRAND } from '@/config/brand';

export default function AboutOrigin() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const contentPairs = ABOUT_CONTENT.origin.content.reduce<
    Array<{ textBlock: OriginText; mediaBlock: OriginMedia }>
  >((pairs, _, i, arr) => {
    if (i % 2 !== 0) return pairs;
    pairs.push({
      textBlock: arr[i] as OriginText,
      mediaBlock: arr[i + 1] as OriginMedia,
    });
    return pairs;
  }, []);

  return (
    <section
      className="relative min-h-[130vh] py-16 sm:py-20 md:py-24 lg:py-32 bg-ghost-surface-deep overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className={BRAND.layout.container}>
        {/* Section Label */}
        <div className="hidden lg:grid grid-cols-12 items-center mb-8 md:mb-10">
          <div className="col-span-5 col-start-2">
            <div className="h-px w-full max-w-[420px] ml-auto bg-accent/60" />
          </div>
          <motion.h2
            variants={textReveal('right')}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="col-span-6 col-start-7 text-left text-[12px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold"
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
            className="text-[12px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold text-center"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
        </div>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-10 sm:space-y-14 md:space-y-16 lg:space-y-24">
          {contentPairs.map((pair, index) => (
            <OriginPair
              key={index}
              index={index}
              textBlock={pair.textBlock}
              mediaBlock={pair.mediaBlock}
              prefersReducedMotion={prefersReducedMotion ?? false}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
