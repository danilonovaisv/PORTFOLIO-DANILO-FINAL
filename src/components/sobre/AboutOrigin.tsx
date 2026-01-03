'use client';

import React, { useRef } from 'react';
import type { Variants } from 'framer-motion';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
};

const textReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: GHOST_EASE, delay },
  }),
};

const mediaReveal = (direction: 'left' | 'right'): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -14 : 14,
    filter: 'blur(12px)',
  },
  visible: (delay = 0) => ({
    opacity: 0.85, // Imagens/vídeos nunca chegam a 100%
    x: 0,
    filter: 'blur(1.5px)',
    transition: { duration: 1.1, ease: GHOST_EASE, delay: 0.08 + delay },
  }),
});

const parallaxPresets: Array<{ text: [number, number]; media: [number, number] }> =
  [
    { text: [-18, 18], media: [16, -14] },
    { text: [-14, 16], media: [20, -18] },
    { text: [-20, 14], media: [12, -16] },
    { text: [-12, 20], media: [18, -12] },
  ];

const verticalNudges = [0, 14, -12, 10];

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
function MediaItem({ src, alt, aspectRatio }: OriginMedia) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
  const ratioClass = aspectRatio || 'aspect-[4/5]';

  if (isVideo) {
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
          className="absolute inset-0 h-full w-full object-cover opacity-85 blur-[1.5px]"
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${ratioClass} rounded-xl overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-85 blur-[1.5px]"
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
  const blockDelay = Math.min(0.12 + index * 0.06, 0.24);
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
      : [
          (preset.media[0] ?? 0) + baseNudge,
          (preset.media[1] ?? 0) + baseNudge,
        ]
  );

  return (
    <div
      ref={blockRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-12 items-center"
    >
      {/* TEXT BLOCK */}
      <motion.div
        style={{ y: textY }}
        variants={textReveal}
        custom={blockDelay}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        className={`col-span-1 lg:col-span-5 flex flex-col gap-4
          ${isEven ? 'lg:col-start-2 lg:order-1 lg:text-right' : 'lg:col-start-7 lg:order-2 lg:text-left'}
          text-left
        `}
      >
        <div className="hidden lg:block h-px w-full bg-[#4fe6ff]/60" />
        <p className="text-[17px] sm:text-[19px] md:text-[20px] lg:text-[24px] xl:text-[26px] font-light leading-[1.55] text-[#fcffff] max-w-[640px] lg:max-w-[460px] mx-auto lg:mx-0 px-5 sm:px-6 md:px-0">
          <HighlightText text={textBlock.text} highlight={textBlock.highlight} />
        </p>
      </motion.div>

      {/* MEDIA BLOCK */}
      <motion.div
        style={{ y: mediaY }}
        variants={mediaReveal(isEven ? 'right' : 'left')}
        custom={blockDelay}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        className="col-span-1 lg:col-span-6 lg:col-start-auto relative"
      >
        <div
          className={`relative ${mediaBlock.aspectRatio || 'aspect-[4/5]'} w-full lg:max-w-none md:max-w-[80%] md:mx-auto`}
          style={{
            marginLeft: isEven && isDesktop ? 'auto' : undefined,
            marginRight: !isEven && isDesktop ? 'auto' : undefined,
          }}
        >
          <MediaItem
            src={mediaBlock.src}
            alt={mediaBlock.alt}
            aspectRatio={mediaBlock.aspectRatio}
            type={mediaBlock.type}
          />
        </div>
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
        {/* Section Label + divider */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-12 md:mb-16">
          <motion.h2
            variants={textReveal}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] font-bold text-center"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
          <div
            className="h-px w-[70%] max-w-[560px] bg-[#4fe6ff]/60"
            aria-hidden
          />
        </div>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {contentPairs.map((pair, index) => (
            <OriginPair
              key={index}
              index={index}
              textBlock={pair.textBlock}
              mediaBlock={pair.mediaBlock}
              prefersReducedMotion={prefersReducedMotion}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
