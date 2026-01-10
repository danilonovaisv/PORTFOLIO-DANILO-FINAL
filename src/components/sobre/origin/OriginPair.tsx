'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { OriginText, OriginMedia } from './types';
import { HighlightText } from './HighlightText';
import { MediaItem } from './MediaItem';
import { textReveal, mediaReveal } from './animations';
import { motionSprings } from '../motion';

const parallaxPresets: Array<{
  text: [number, number];
  media: [number, number];
}> = [
  { text: [-8, 8], media: [60, -60] },
  { text: [6, -8], media: [-65, 55] },
  { text: [-8, 6], media: [55, -65] },
  { text: [8, -6], media: [-60, 60] },
];

const verticalNudges = [0, 10, -8, 12];
const mediaLifts = [-22, -30, -16, -26];

type OriginPairProps = {
  index: number;
  textBlock: OriginText;
  mediaBlock: OriginMedia;
  prefersReducedMotion: boolean;
  isDesktop: boolean;
};

export function OriginPair({
  index,
  textBlock,
  mediaBlock,
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

  const preset = parallaxPresets[index % parallaxPresets.length];
  const baseNudge = isDesktop ? verticalNudges[index] || 0 : 0;
  const mediaLift = isDesktop ? mediaLifts[index] || 0 : 0;
  const showInlineRule = !(isDesktop && index === 0);
  const blockDelay = Math.min(0.1 + index * 0.08, 0.3);
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion || !isDesktop ? [0, 0] : preset.text
  );
  const mediaY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion || !isDesktop
      ? [baseNudge, baseNudge]
      : [(preset.media[0] ?? 0) + baseNudge, (preset.media[1] ?? 0) + baseNudge]
  );

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 sm:gap-y-10 lg:gap-y-0 lg:gap-x-0 items-start"
    >
      {/* TEXT BLOCK */}
      <motion.div
        style={{ y: textY }}
        className={`col-span-1 lg:col-span-5
          ${isEven ? 'lg:col-start-2' : 'lg:col-start-8'}
        `}
      >
        <motion.div
          variants={textReveal(isEven ? 'left' : 'right')}
          custom={blockDelay}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`flex flex-col gap-3 sm:gap-4 text-center items-center max-w-[360px] sm:max-w-[420px] md:max-w-[520px] mx-auto lg:max-w-[420px]
            ${
              isEven
                ? 'lg:text-center lg:items-center'
                : 'lg:text-left lg:items-start lg:mr-auto lg:ml-0'
            }
          `}
        >
          {showInlineRule && (
            <div className="h-px w-[65%] sm:w-[60%] lg:w-full bg-accent/60" />
          )}
          <p className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[20px] xl:text-[22px] font-light leading-[1.55] text-text-light tracking-[-0.01em] whitespace-pre-line">
            <HighlightText
              text={textBlock.text}
              highlight={textBlock.highlight}
            />
          </p>
        </motion.div>
      </motion.div>

      {/* MEDIA BLOCK */}
      <motion.div
        style={{ y: mediaY, marginTop: mediaLift }}
        className={`col-span-1 lg:col-span-5 relative
          ${isEven ? 'lg:col-start-8' : 'lg:col-start-2 lg:row-start-1 lg:self-start'}
        `}
      >
        <motion.div
          variants={mediaReveal(isEven ? 'right' : 'left')}
          custom={blockDelay}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`w-full max-w-[360px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[560px] mx-auto lg:mx-0 overflow-hidden rounded-xl ${
            isEven ? 'lg:ml-auto' : 'lg:mr-auto'
          }`}
        >
          <MediaItem
            src={mediaBlock.src}
            alt={mediaBlock.alt}
            aspectRatio={mediaBlock.aspectRatio}
            preserveRatio={mediaBlock.preserveRatio}
            type={mediaBlock.type}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
