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
        className={`w-full ${aspectRatio} object-cover rounded-md blur-[0.5px]`}
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-md overflow-hidden`}
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
      className="relative min-h-[130vh] py-20 md:py-28 lg:py-36 bg-ghost-surface-deep overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Label + divider */}
        <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
          <motion.h2
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] font-bold text-center"
          >
            {ABOUT_CONTENT.origin.sectionLabel}
          </motion.h2>
          <div
            className="h-px w-[70%] max-w-[560px] bg-[#4fe6ff]/60"
            aria-hidden
          />
        </div>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {contentPairs.map((pair, index) => {
            const isEven = index % 2 === 0;
            const textBlock = pair.textBlock as any;
            const mediaBlock = pair.mediaBlock as any;

            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-8 lg:gap-x-12 items-center"
              >
                {/* Texto: Always First on Mobile (order-1), Alternates on Desktop */}
                <motion.div
                  variants={fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  className={`col-span-12 md:col-span-5 order-1 ${
                    isEven
                      ? 'md:order-1 md:col-start-2'
                      : 'md:order-2 md:col-start-7'
                  }`}
                >
                  <div className="hidden lg:block h-px w-full bg-[#4fe6ff]/60 mb-6" />
                  <p
                    className={`text-[20px] md:text-[24px] lg:text-[28px] font-light leading-relaxed text-[#fcffff] text-center max-w-[440px] mx-auto ${
                      isEven
                        ? 'md:text-center md:mx-auto'
                        : 'md:text-left md:mx-0 md:mr-auto'
                    }`}
                  >
                    <HighlightText
                      text={textBlock.text}
                      highlight={textBlock.highlight}
                    />
                  </p>
                </motion.div>

                {/* Mídia: Always Second on Mobile (order-2), Alternates on Desktop */}
                <motion.div
                  variants={imageFloat}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  className={`col-span-12 md:col-span-6 order-2 ${
                    isEven
                      ? 'md:order-2 md:col-start-7'
                      : 'md:order-1 md:col-start-1'
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
