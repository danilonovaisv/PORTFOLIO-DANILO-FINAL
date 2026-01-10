'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { OriginBlock } from './types';
import { HighlightText } from './HighlightText';
import { MediaItem } from './MediaItem';
import { textReveal, mediaReveal } from './animations';
import { motionSprings } from '../motion';

type OriginPairProps = {
  index: number;
  block: OriginBlock;
  prefersReducedMotion: boolean;
  isDesktop: boolean;
};

export function OriginPair({
  index,
  block,
  prefersReducedMotion,
  isDesktop,
}: OriginPairProps) {
  const isEven = index % 2 === 0;
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, motionSprings.ghost);

  // Enhanced Ghost Parallax Physics
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    isDesktop ? [0, -50] : [0, 0]
  );
  const mediaY = useTransform(
    smoothProgress,
    [0, 1],
    isDesktop ? [40, -40] : [0, 0]
  );

  const blockDelay = Math.min(0.1 + index * 0.08, 0.3);

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 sm:gap-y-10 lg:gap-y-0 lg:gap-x-12 items-center"
    >
      {/* TEXT CONTENT (Title + Description) */}
      <motion.div
        style={{ y: textY }}
        className={`col-span-1 lg:col-span-5 flex flex-col gap-6
          ${isEven ? 'lg:col-start-2 lg:text-right lg:items-end' : 'lg:col-start-8 lg:text-left lg:items-start'}
        `}
      >
        <motion.div
          variants={textReveal(isEven ? 'left' : 'right')}
          custom={blockDelay}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="relative z-10"
        >
          {/* Title (H1 equivalent) */}
          <h3 className="type-h2 leading-[1.1] tracking-tight mb-4 text-[#0048ff]">
            {block.title}
          </h3>

          {/* Main Statement (H3 equivalent) */}
          <h4 className="type-h3 font-semibold leading-[1.2] tracking-tight mb-4 text-white">
            <HighlightText text={block.text} highlight={block.highlight} />
          </h4>

          {/* Description Body */}
          <p className="type-body text-textSecondary leading-relaxed max-w-[480px]">
            {block.description}
          </p>
        </motion.div>
      </motion.div>

      {/* MEDIA BLOCK */}
      <motion.div
        style={{ y: mediaY }}
        className={`col-span-1 lg:col-span-6 relative w-full
          ${isEven ? 'lg:col-start-8 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'}
        `}
      >
        <motion.div
          variants={mediaReveal(isEven ? 'right' : 'left')}
          custom={blockDelay + 0.1}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          className="relative w-full aspect-4/5 md:aspect-square lg:aspect-4/5 max-w-[500px] mx-auto overflow-hidden rounded-sm bg-ghost-bg-accent"
        >
          <MediaItem
            src={block.src}
            alt={block.alt}
            aspectRatio={block.aspectRatio}
            preserveRatio={block.preserveRatio}
            type="image"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent pointer-events-none" />
        </motion.div>

        {/* Motion Title (Index) */}
        <motion.span
          className={`absolute top-0 text-[10vw] lg:text-[120px] font-bold text-white/5 font-display leading-none select-none z-0
            ${isEven ? '-right-10 lg:-right-24' : '-left-10 lg:-left-24'}
          `}
          style={{ y: useTransform(smoothProgress, [0, 1], [0, 120]) }}
        >
          {`0${index + 1}`}
        </motion.span>
      </motion.div>
    </div>
  );
}
