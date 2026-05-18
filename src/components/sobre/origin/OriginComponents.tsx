'use client';

import { RefObject } from 'react';
import { m } from 'motion/react';
import type { OriginBlock } from '@/components/sobre/origin/data';
import { DynamicAssetImage } from '@/components/ui/shared/DynamicAssetImage';
import { GHOST_EASE, MOTION_TOKENS, viewportConfig } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';

interface OriginInfoBlockProps {
  block: OriginBlock & { img?: string; priority?: boolean };
}

/**
 * Individual content block with subtitle marker, title, text, and mobile image
 * Mobile: Layout intercalado (texto → imagem) com ordem via CSS
 * Desktop: Static content acts as scroll anchor for GSAP
 */
export function OriginInfoBlock({ block }: OriginInfoBlockProps) {
  const isRightAligned = block.textAlign === 'right';
  const prefersReducedMotion = useMotionGate();

  return (
    <div
      className={`min-h-[65vh] flex flex-col justify-start pt-16 pb-20 lg:min-h-screen lg:justify-end lg:items-end lg:text-right ${
        isRightAligned
          ? 'lg:items-end lg:justify-start lg:text-right'
          : 'lg:items-end lg:justify-start lg:text-left'
      }`}
      data-origin-block={block.id}
    >
      {/* Mobile: Stack vertical intercalado - Texto primeiro, depois Imagem */}
      <div className="space-y-6 lg:hidden">
        {/* Text Content - Mobile */}
        <div className="text-center px-4">
          <m.h2
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: MOTION_TOKENS.offset.standard,
                    filter: 'blur(8px)',
                  }
            }
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={viewportConfig}
            transition={{
              duration: MOTION_TOKENS.duration.GHOST_EXIT,
              delay: 0.2,
              ease: GHOST_EASE,
            }}
            className="text-h2 font-bold text-bluePrimary mb-4"
          >
            {block.title}
          </m.h2>

          <m.p
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: MOTION_TOKENS.offset.standard,
                    filter: 'blur(8px)',
                  }
            }
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={viewportConfig}
            transition={{
              duration: MOTION_TOKENS.duration.GHOST_EXIT,
              delay: 0.3,
              ease: GHOST_EASE,
            }}
            className="text-h3 font-medium text-white/88 leading-relaxed whitespace-pre-line text-pretty"
          >
            {block.paragraph}
          </m.p>
        </div>

        {/* Image - Mobile (400px dimensions per spec) */}
        <m.div
          initial={
            prefersReducedMotion
              ? { opacity: 0.85 }
              : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.85 }
          }
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={viewportConfig}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            delay: MOTION_TOKENS.stagger.normal,
            ease: GHOST_EASE,
          }}
          className="relative w-full aspect-square min-h-[240px] rounded-[1.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:hidden"
        >
          <DynamicAssetImage
            assetKey={block.assetKey}
            alt={block.title}
            fallbackUrl={block.img || `/site-assets/${block.fallback}`}
            priority={block.priority}
            width={400}
            height={400}
            className="w-full h-full"
            sizes="(max-width: 1024px) 92vw, 0px"
          />
        </m.div>
      </div>

      {/* Desktop: Text Content Only (controlled by native scroll) */}
      <div className="hidden lg:block lg:max-w-md relative z-[var(--z-layer-content)] transition-opacity duration-modal">
        <h2
          data-origin-title
          className="text-h2 font-bold text-bluePrimary mb-6 tracking-wide translate-y-0 opacity-100"
        >
          {block.title}
        </h2>

        <p
          data-origin-copy
          className="text-body font-normal text-white/88 leading-relaxed whitespace-pre-line text-pretty translate-y-0 opacity-100"
        >
          {block.paragraph}
        </p>
      </div>
    </div>
  );
}

interface OriginStickyGalleryProps {
  blocks: (OriginBlock & { img?: string; priority?: boolean })[];
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
      className="hidden lg:flex lg:col-span-6 lg:h-screen lg:sticky lg:top-0 lg:items-center lg:justify-center pointer-events-none"
      ref={archRightRef}
      data-testid="origin-sticky-gallery"
    >
      {/* Gallery container - 500px height per spec */}
      <div className="origin-gallery-container relative w-full max-w-lg h-[500px]">
        {/* Glow effect behind images */}
        <div className="origin-glow" />

        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="origin-img absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-background"
            data-img-index={index}
            data-z-index={index + 1}
          >
            <DynamicAssetImage
              assetKey={block.assetKey}
              alt={block.title}
              fallbackUrl={block.img || `/site-assets/${block.fallback}`}
              priority={block.priority}
              width={512}
              height={500}
              className="w-full h-full rounded-3xl overflow-hidden"
              sizes="(max-width: 1024px) 0px, 40vw"
            />
            {/* Mask overlay for reveal effect */}
            <div className="origin-mask absolute inset-0 bg-background z-[var(--z-layer-glass)] origin-top" />
          </div>
        ))}
      </div>
    </div>
  );
}
