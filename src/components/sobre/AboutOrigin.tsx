'use client';

import React, { useRef } from 'react';
import type { Variants } from 'framer-motion';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { GHOST_EASE } from '@/lib/motionTokens';

type OriginText = {
  type: 'text';
  text: string;
  highlight?: string;
};

type OriginMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  aspectRatio?: string;
  preserveRatio?: boolean;
};

const textReveal = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -40 : 40,
    filter: 'blur(8px)',
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE, delay },
  }),
});

const mediaReveal = (direction: 'left' | 'right'): Variants => ({
  hidden: {
    opacity: 0,
    y: 18,
    x: direction === 'left' ? -10 : 10,
    filter: 'blur(12px)',
  },
  visible: (delay = 0) => ({
    opacity: 0.9, // Imagens/vídeos nunca chegam a 100%
    y: 0,
    x: 0,
    filter: 'blur(0.6px)',
    transition: { duration: 1.1, ease: GHOST_EASE, delay: 0.12 + delay },
  }),
});

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

// Componente para renderizar keyword com ghost-accent
function HighlightText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-primary font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Componente para mídia (vídeo ou imagem)
function MediaItem({ src, alt, aspectRatio, preserveRatio }: OriginMedia) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
  const ratioClass = aspectRatio || 'aspect-[0.8]';

  if (isVideo) {
    if (preserveRatio) {
      return (
        <div className="w-full overflow-hidden rounded-xl">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-auto"
            aria-label={alt}
          />
        </div>
      );
    }

    return (
      <div
        className={`relative w-full ${ratioClass} overflow-hidden rounded-xl`}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${ratioClass} rounded-xl overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

type OriginPairProps = {
  index: number;
  textBlock: OriginText;
  mediaBlock: OriginMedia;
  prefersReducedMotion: boolean;
  isDesktop: boolean;
};

function OriginPair({
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

  const preset = parallaxPresets[index % parallaxPresets.length];
  const baseNudge = isDesktop ? verticalNudges[index] || 0 : 0;
  const mediaLift = isDesktop ? mediaLifts[index] || 0 : 0;
  const showInlineRule = !(isDesktop && index === 0);
  const blockDelay = Math.min(0.1 + index * 0.08, 0.3);
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || !isDesktop ? [0, 0] : preset.text
  );
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || !isDesktop
      ? [baseNudge, baseNudge]
      : [(preset.media[0] ?? 0) + baseNudge, (preset.media[1] ?? 0) + baseNudge]
  );

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 sm:gap-y-10 lg:gap-y-0 gap-x-10 lg:gap-x-16 items-start"
    >
      {/* TEXT BLOCK */}
      <motion.div
        style={{ y: textY }}
        className={`col-span-1 lg:col-span-5
          ${isEven ? 'lg:col-start-2 lg:order-1' : 'lg:col-start-7 lg:order-2'}
        `}
      >
        <motion.div
          variants={textReveal(isEven ? 'left' : 'right')}
          custom={blockDelay}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className={`flex flex-col gap-3 sm:gap-4 text-center items-center max-w-[360px] sm:max-w-[420px] md:max-w-[520px] mx-auto lg:max-w-[420px]
            ${
              isEven
                ? 'lg:text-center lg:items-center'
                : 'lg:text-left lg:items-start lg:mr-auto lg:ml-0'
            }
          `}
        >
          {showInlineRule && (
            <div className="h-px w-[65%] sm:w-[60%] lg:w-full bg-[#4fe6ff]/60" />
          )}
          <p className="text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-light leading-[1.55] text-[#fcffff] tracking-[-0.01em]">
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
        className={`col-span-1 lg:col-span-6 lg:col-start-auto relative ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <motion.div
          variants={mediaReveal(isEven ? 'right' : 'left')}
          custom={blockDelay}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
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
      <div className="w-full max-w-[1180px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12">
        {/* Section Label */}
        <div className="hidden lg:grid grid-cols-12 items-center mb-8 md:mb-10">
          <div className="col-span-5 col-start-2">
            <div className="h-px w-full max-w-[420px] ml-auto bg-[#4fe6ff]/60" />
          </div>
          <motion.h2
            variants={textReveal('right')}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-6 col-start-7 text-left text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] font-bold"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
        </div>
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 md:mb-12 lg:hidden">
          <motion.h2
            variants={textReveal('left')}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] font-bold text-center"
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
