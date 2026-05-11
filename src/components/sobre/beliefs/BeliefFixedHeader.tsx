'use client';

import { m, useTransform } from 'framer-motion';
import { SPLIT_TEXT_CONFIG, BELIEF_SCROLL_THRESHOLDS } from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefFixedHeader() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();
  const { header } = SPLIT_TEXT_CONFIG;
  const text = 'O que me move';
  const chars = text.split('');

  // Fade out as phrases start
  const opacity = useTransform(
    scrollYProgress,
    [0, BELIEF_SCROLL_THRESHOLDS.entryStart, BELIEF_SCROLL_THRESHOLDS.entryEnd, BELIEF_SCROLL_THRESHOLDS.phrasesStart],
    [0, 1, 1, 0]
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: header.delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: header.duration,
        ease: [0.22, 1, 0.36, 1] as const, // GSAP_GHOST_EASE equivalent
      },
    },
  };

  return (
    <header className="pointer-events-none absolute inset-x-0 top-[14vh] z-[var(--z-layer-header)] w-full py-8 md:top-0">
      <div className="mx-auto flex max-w-[1680px] justify-end px-6 md:px-12 lg:px-16">
        <m.h2
          id="beliefs-header"
          className="max-w-xs text-right font-medium uppercase tracking-[0.18em] text-white/80"
          style={{ textAlign: 'right', opacity: prefersReducedMotion ? 0.9 : opacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          aria-label={text}
        >
          {chars.map((char, index) => (
            <m.span
              key={`${index}`}
              aria-hidden="true"
              className="inline-block will-change-[transform,opacity,filter]"
              variants={charVariants}
            >
              {char === ' ' ? '\u00A0' : char}
            </m.span>
          ))}
        </m.h2>
      </div>
    </header>
  );
}
