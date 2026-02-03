'use client';

import { RefObject } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { OriginBlock } from './data';

interface OriginInfoBlockProps {
  block: OriginBlock & { img?: string };
}

/**
 * Individual content block with subtitle marker, title, text, and mobile image
 * Mobile: Layout intercalado (texto → imagem) com ordem via CSS
 */
export function OriginInfoBlock({ block }: OriginInfoBlockProps) {
  const isRightAligned = block.textAlign === 'right';

  return (
    <div
      className={`arch__info min-h-[80vh] lg:min-h-screen flex flex-col py-12 lg:py-24 ${
        isRightAligned
          ? 'lg:items-end lg:justify-end lg:text-right'
          : 'lg:items-end lg:justify-start lg:text-left'
      }`}
      data-origin-block={block.id}
    >
      {/* Mobile: Stack vertical intercalado - Texto primeiro, depois Imagem */}
      <div className="space-y-6 lg:hidden">
        {/* Text Content - Mobile */}
        <div className="text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-h2 font-bold text-[#0048ff] mb-4"
          >
            {block.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-body text-white/70 leading-relaxed whitespace-pre-line"
          >
            {block.paragraph}
          </motion.p>
        </div>

        {/* Image - Mobile (400px dimensions per spec) */}
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.85 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mobile-img-container overflow-hidden"
        >
          {block.img && (
            <Image
              src={block.img}
              alt={block.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 0vw"
              priority={block.id === 1}
            />
          )}
        </motion.div>
      </div>

      {/* Desktop: Text Content Only (images in sticky gallery) */}
      <div className="hidden lg:block lg:max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-h2 font-bold text-[#0048ff] mb-6 tracking-wide"
        >
          {block.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-body text-white/70 leading-relaxed whitespace-pre-line"
        >
          {block.paragraph}
        </motion.p>
      </div>
    </div>
  );
}

interface OriginStickyGalleryProps {
  blocks: (OriginBlock & { img?: string })[];
  archRightRef: RefObject<HTMLDivElement | null>;
}

/**
 * Sticky gallery that displays images on desktop
 * Pinned à direita com transição de imagens conforme scroll do texto
 *
 * Specs:
 * - 4 imagens (500px altura, auto largura)
 * - Z-index: 4 → 1 (sequencial)
 * - object-fit: cover
 * - border-radius: 24px
 * - blur(4px) inicial → blur(0)
 * - opacity: 0.85 → 1
 */
export function OriginStickyGallery({
  blocks,
  archRightRef,
}: OriginStickyGalleryProps) {
  return (
    <div
      className="arch__right hidden lg:flex col-span-6 h-screen sticky top-0"
      ref={archRightRef}
    >
      {/* Gallery container - 500px height per spec */}
      <div className="origin-gallery-container relative w-full max-w-lg h-[500px]">
        {/* Glow effect behind images */}
        <div className="origin-glow" />

        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="origin-img img-wrapper"
            data-img-index={index}
            data-z-index={index + 1}
          >
            {block.img && (
              <Image
                src={block.img}
                alt={block.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 500px, 0vw"
                priority={index === 0}
              />
            )}
            {/* Mask overlay for reveal effect */}
            <div className="origin-mask" />
          </div>
        ))}
      </div>
    </div>
  );
}
