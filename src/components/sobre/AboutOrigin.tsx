'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/config/content';
import { kw } from './keywords';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';

const { origin } = ABOUT_CONTENT;

// Helper: Parallax specific wrapper for images
function ParallaxWrapper({
  children,
  offset = 40,
  className = '',
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create parallax motion value
  const yLink = useTransform(scrollYProgress, [0, 1], [0, -offset]); // Move slightly up as we scroll down
  const y = useSpring(yLink, { stiffness: 40, damping: 15 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ... existing HighlightedText and MediaItem helpers logic ...
function HighlightedText({
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
          <span key={i}>{kw(part)}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

function MediaItem({
  src,
  alt,
  aspectRatio,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
}) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`w-full ${aspectRatio} object-cover rounded-lg shadow-2xl relative z-10`}
        aria-label={alt}
      />
    );
  }
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden shadow-2xl`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

// Asymmetric line separator
function AsymmetricSeparator({ align = 'left' }: { align?: 'left' | 'right' }) {
  return (
    <div
      className={`col-span-12 flex ${align === 'right' ? 'justify-end' : 'justify-start'} py-10 md:py-16`}
    >
      <div className="w-[30%] h-px bg-white/10" />
    </div>
  );
}

export default function AboutOrigin() {
  const { prefersReducedMotion, variants } = useEditorialMotion();

  return (
    <section
      className="relative py-20 md:py-32 bg-(--ghost-bg) overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Section Label */}
        <motion.h2
          variants={variants.fadeGhost}
          custom={0}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="text-sm font-mono uppercase tracking-[0.2em] text-(--ghost-flare) mb-16 md:mb-24 font-bold"
        >
          {origin.sectionLabel}
        </motion.h2>

        {/* Editorial Layout: Increased gaps, Parallax, Max-Width text */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-y-28 md:gap-x-12 lg:gap-x-16 items-start">
          {/* Pair 1: Row 1 - Text 7 / Image 5 */}
          <motion.div
            variants={variants.fadeGhost}
            custom={0.12}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7 order-1 pb-8 md:pb-0"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-(--ghost-text) max-w-[46ch]">
              <HighlightedText
                text={origin.content[0].text || ''}
                highlight={origin.content[0].highlight}
              />
            </p>
          </motion.div>

          <div className="col-span-12 md:col-span-5 order-2">
            <ParallaxWrapper offset={60}>
              <motion.div
                variants={variants.imageFloat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MediaItem
                  src={origin.content[1].src || ''}
                  alt={origin.content[1].alt || ''}
                  aspectRatio={origin.content[1].aspectRatio || 'aspect-square'}
                />
              </motion.div>
            </ParallaxWrapper>
          </div>

          <AsymmetricSeparator align="right" />

          {/* Pair 2: Row 2 - Image 5 (left) / Text 7 (right) */}
          <div className="col-span-12 md:col-span-5 order-4 md:order-3">
            <ParallaxWrapper offset={48}>
              <motion.div
                variants={variants.imageFloat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MediaItem
                  src={origin.content[3].src || ''}
                  alt={origin.content[3].alt || ''}
                  aspectRatio={origin.content[3].aspectRatio || 'aspect-square'}
                />
              </motion.div>
            </ParallaxWrapper>
          </div>

          <motion.div
            variants={variants.fadeGhost}
            custom={0.24}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7 md:pl-10 lg:pl-16 order-3 md:order-4"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-(--ghost-text) max-w-[46ch]">
              <HighlightedText
                text={origin.content[2].text || ''}
                highlight={origin.content[2].highlight}
              />
            </p>
          </motion.div>

          <AsymmetricSeparator align="left" />

          {/* Pair 3: Row 3 */}
          <motion.div
            variants={variants.fadeGhost}
            custom={0.36}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7 order-5 pb-8 md:pb-0"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-(--ghost-text) max-w-[46ch]">
              <HighlightedText
                text={origin.content[4].text || ''}
                highlight={origin.content[4].highlight}
              />
            </p>
          </motion.div>

          <div className="col-span-12 md:col-span-5 order-6">
            <ParallaxWrapper offset={36}>
              <motion.div
                variants={variants.imageFloat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MediaItem
                  src={origin.content[5].src || ''}
                  alt={origin.content[5].alt || ''}
                  aspectRatio={origin.content[5].aspectRatio || 'aspect-square'}
                />
              </motion.div>
            </ParallaxWrapper>
          </div>

          <AsymmetricSeparator align="right" />

          {/* Pair 4: Row 4 */}
          <div className="col-span-12 md:col-span-6 md:col-start-1 order-8 md:order-7">
            <ParallaxWrapper offset={28}>
              <motion.div
                variants={variants.imageFloat}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MediaItem
                  src={origin.content[7].src || ''}
                  alt={origin.content[7].alt || ''}
                  aspectRatio={origin.content[7].aspectRatio || 'aspect-square'}
                />
              </motion.div>
            </ParallaxWrapper>
          </div>

          <motion.div
            variants={variants.fadeGhost}
            custom={0.48}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 md:col-start-7 order-7 md:order-8 md:text-right flex flex-col items-end"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-(--ghost-text-secondary) max-w-[46ch]">
              <HighlightedText
                text={origin.content[6].text || ''}
                highlight={origin.content[6].highlight}
              />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
