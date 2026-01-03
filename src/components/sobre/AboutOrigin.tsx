'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

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

// Conteúdo oficial do protótipo interativo
const ORIGIN_CONTENT = {
  sectionLabel: 'Origem',
  blocks: [
    {
      type: 'text-media',
      text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia.',
      highlight: 'ficava',
      media: {
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/photo.mp4',
        alt: 'Foto pessoal - memória visual',
        aspectRatio: 'aspect-[3/4]',
      },
    },
    {
      type: 'text-media',
      text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros.',
      highlight: 'rastros',
      media: {
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/squetch.webp',
        alt: 'Desenho e rabiscos iniciais',
        aspectRatio: 'aspect-video',
      },
    },
    {
      type: 'text-media',
      text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação.',
      highlight: 'transformação',
      media: {
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/design.webp',
        alt: 'Momento criativo no design',
        aspectRatio: 'aspect-square',
      },
    },
    {
      type: 'text-media',
      text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação.',
      highlight: 'essência humana',
      media: {
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/AI.mp4',
        alt: 'Inteligência Artificial e criação',
        aspectRatio: 'aspect-[4/5]',
      },
    },
  ],
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

  return (
    <section
      className="relative min-h-screen py-16 md:py-24 lg:py-40 bg-[#040013] overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Label */}
        <motion.h2
          variants={fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] mb-10 md:mb-16 font-bold"
        >
          {ORIGIN_CONTENT.sectionLabel}
        </motion.h2>

        {/* Editorial Layout: Alternating Text <-> Media */}
        <div className="space-y-16 md:space-y-24 lg:space-y-40">
          {ORIGIN_CONTENT.blocks.map((block, index) => {
            // Alternância: par = texto esquerda, ímpar = texto direita
            const isEven = index % 2 === 0;

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
                    isEven ? 'md:order-1' : 'md:order-2 md:text-right'
                  }`}
                >
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-[#fcffff]">
                    <HighlightText
                      text={block.text}
                      highlight={block.highlight}
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
                    src={block.media.src}
                    alt={block.media.alt}
                    aspectRatio={block.media.aspectRatio}
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
