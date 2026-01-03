'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/config/content';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const imageFloat = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 0.85, // Imagens nunca chegam a 100%
    x: 0,
    transition: { duration: 1.2, ease: GHOST_EASE },
  },
};

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
          <span key={i} className="ghost-accent">
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
        className={`w-full ${aspectRatio} object-cover rounded-lg blur-[0.5px]`}
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover blur-[0.5px]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export default function AboutOrigin() {
  const prefersReducedMotion = useReducedMotion();

  // Agrupar o conteúdo flat do config em pares (texto + mídia) para o layout de grid
  const contentPairs = [];
  for (let i = 0; i < ABOUT_CONTENT.origin.content.length; i += 2) {
    contentPairs.push({
      textBlock: ABOUT_CONTENT.origin.content[i],
      mediaBlock: ABOUT_CONTENT.origin.content[i + 1],
    });
  }

  return (
    <section
      className="relative min-h-[130vh] py-20 md:py-28 lg:py-36 bg-[#040013] overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Label + divider */}
        <div className="h-px w-full bg-white/10 mb-8 md:mb-10" aria-hidden />
        <motion.h2
          variants={fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] mb-12 md:mb-16 font-bold"
        >
          {ABOUT_CONTENT.origin.sectionLabel}
        </motion.h2>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-12 md:space-y-20 lg:space-y-28">
          {contentPairs.map((pair, index) => {
            const isEven = index % 2 === 0;
            const textBlock = pair.textBlock as any;
            const mediaBlock = pair.mediaBlock as any;

            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-12 items-center"
              >
                {/* Texto - Mobile: sempre primeiro (order-1) */}
                <motion.div
                  variants={fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  className={`col-span-12 md:col-span-7 order-1 ${
                    isEven ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-[#fcffff]">
                    <HighlightText
                      text={textBlock.text}
                      highlight={textBlock.highlight}
                    />
                  </p>
                </motion.div>

                {/* Mídia - Mobile: sempre segundo (order-2) */}
                <motion.div
                  variants={imageFloat}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  className={`col-span-12 md:col-span-5 order-2 ${
                    isEven ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <MediaItem
                    src={mediaBlock.src}
                    alt={mediaBlock.alt}
                    aspectRatio={mediaBlock.aspectRatio}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
