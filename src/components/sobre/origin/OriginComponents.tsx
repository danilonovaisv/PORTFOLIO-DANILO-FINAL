'use client';

import { RefObject } from 'react';
import { m, AnimatePresence } from 'motion/react';
import type { OriginBlock } from '@/components/sobre/origin/data';
import { OriginParallaxScene } from '@/components/sobre/origin/OriginParallaxScene';
import { GHOST_EASE, MOTION_TOKENS, viewportConfig } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';

interface OriginInfoBlockProps {
  block: OriginBlock & { img?: string; priority?: boolean };
}

/**
 * Renderiza o parágrafo destacando a frase-âncora (highlight) em bluePrimary.
 * Preserva quebras com whitespace-pre-line (nós de texto). Se highlight ausente
 * ou não encontrada, retorna o texto puro.
 */
function renderParagraph(paragraph: string, highlight?: string) {
  if (!highlight) return paragraph;
  const idx = paragraph.indexOf(highlight);
  if (idx === -1) return paragraph;
  return (
    <>
      {paragraph.slice(0, idx)}
      <span className="text-bluePrimary font-medium">{highlight}</span>
      {paragraph.slice(idx + highlight.length)}
    </>
  );
}

/**
 * Individual content block with chapter indicator, phase badge, title, text, and mobile scene.
 * Mobile: Layout editorial linear (Capítulo → Título → Parágrafo → Cena com Paralaxe → Caption).
 * Desktop: Static content acts as scroll anchor for GSAP ScrollTrigger.
 */
export function OriginInfoBlock({ block }: OriginInfoBlockProps) {
  const isRightAligned = block.textAlign === 'right';
  const prefersReducedMotion = useMotionGate();

  return (
    <div
      className={`min-h-[50vh] flex flex-col justify-center py-10 lg:min-h-[78vh] lg:justify-center ${
        isRightAligned
          ? 'lg:items-end lg:text-right'
          : 'lg:items-start lg:text-left'
      }`}
      data-origin-block={block.id}
    >
      <div className="w-full lg:max-w-md text-left relative z-[var(--z-layer-content)] px-4 lg:px-0">
        {/* Chapter marker & phase eyebrow */}
        <div className="flex items-center gap-3 mb-3 lg:mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-bluePrimary px-2 py-0.5 rounded bg-bluePrimary/10 border border-bluePrimary/20">
            {block.chapter}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50">
            {block.phase}
          </span>
        </div>

        <m.h3
          data-origin-title
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
            delay: 0.1,
            ease: GHOST_EASE,
          }}
          className="text-h2 font-bold text-white mb-4 lg:mb-6 tracking-wide"
        >
          {block.title}
        </m.h3>

        <p
          data-origin-copy
          className="text-body font-normal text-white/80 leading-relaxed whitespace-pre-line text-pretty"
        >
          {renderParagraph(block.paragraph, block.highlight)}
        </p>

        {/* Mobile Inline Scene: Active on mobile, linear editorial flow */}
        <div className="mt-8 relative w-full aspect-square min-h-[260px] rounded-[1.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/5 lg:hidden">
          <OriginParallaxScene
            config={block.scene}
            isActive={true}
            fallbackImage={block.img || `/site.assets/${block.fallback}`}
            priority={block.id === 1}
          />
        </div>

        {/* Mobile Caption */}
        {block.caption && (
          <p className="mt-2.5 text-xs text-white/40 italic lg:hidden">
            {block.caption}
          </p>
        )}
      </div>
    </div>
  );
}

interface OriginStickyGalleryProps {
  blocks: (OriginBlock & { img?: string; priority?: boolean })[];
  archRightRef: RefObject<HTMLDivElement | null>;
  activeSceneIndex?: number;
}

/**
 * Sticky Media Stage that displays 4 multi-layer parallax scenes on desktop.
 * Sincronizado com scroll do texto via GSAP ScrollTrigger.
 *
 * Includes:
 * - 4 scenes with 4 layers each (OriginParallaxScene)
 * - Chapter Progress Counter (01 / 04)
 * - Active Phase badge & vertical progress bar
 * - Contextual caption with smooth cross-fade
 */
export function OriginStickyGallery({
  blocks,
  archRightRef,
  activeSceneIndex = 0,
}: OriginStickyGalleryProps) {
  const currentBlock = blocks[activeSceneIndex] || blocks[0];
  const total = blocks.length;

  return (
    <div
      className="hidden lg:flex lg:col-span-6 lg:h-screen lg:sticky lg:top-0 lg:items-center lg:justify-center pointer-events-none"
      ref={archRightRef}
      data-testid="origin-sticky-gallery"
    >
      <div className="origin-gallery-container relative w-full max-w-lg h-[500px]">
        {/* Glow effect behind images */}
        <div className="origin-glow" />

        {/* Desktop Stage HUD / Progress Indicator */}
        <div className="absolute -top-12 left-0 right-0 flex items-center justify-between z-20 px-2 pointer-events-auto select-none">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-bluePrimary tracking-wider">
              0{activeSceneIndex + 1} / 0{total}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase font-semibold tracking-[0.2em] text-white/70">
              {currentBlock.phase}
            </span>
          </div>

          {/* Progress bar ticks */}
          <div className="flex gap-1.5">
            {blocks.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeSceneIndex
                    ? 'w-6 bg-bluePrimary'
                    : i < activeSceneIndex
                      ? 'w-2 bg-white/40'
                      : 'w-2 bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4 Multi-depth Parallax Scenes */}
        {blocks.map((block, index) => {
          const isActive = activeSceneIndex === index;
          return (
            <div
              key={block.id}
              className="origin-img absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-background border border-white/5"
              data-img-index={index}
              data-z-index={index + 1}
            >
              <OriginParallaxScene
                config={block.scene}
                isActive={isActive}
                fallbackImage={block.img || `/site.assets/${block.fallback}`}
                priority={block.priority}
              />
              {/* Mask overlay for legacy reveal effect compatibility */}
              <div className="origin-mask absolute inset-0 bg-background z-[var(--z-layer-glass)] origin-top opacity-0 pointer-events-none" />
            </div>
          );
        })}

        {/* Bottom Contextual Caption */}
        <div className="absolute -bottom-9 left-2 right-2 flex items-center justify-between z-20 pointer-events-auto">
          <AnimatePresence mode="wait">
            <m.p
              key={currentBlock.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-white/50 italic truncate"
            >
              {currentBlock.caption}
            </m.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Alias for OriginStickyGallery per design specification */
export const OriginMediaStage = OriginStickyGallery;
