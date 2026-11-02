'use client';

/**
 * Origin Section Components — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 2 (Render):
 * - LaurelBadge: Wreath badge minimalista para autenticação editorial
 * - OriginMask: Máscaras de gradiente para dissolução nas bordas do stage
 * - CinemaReelStageFrame: Palco cinematográfico widescreen com imagem Supabase Storage
 *   e animações orquestradas via Framer Motion com staging e stagger progressivo
 * - CinemaReelRightRail: HUD lateral de navegação dos 4 capítulos
 * - DetailsPanel: Gaveta lateral acessível com narrativa detalhada e pilares estratégicos
 * - CinemaReelEntrance: Full-screen entrance overlay with scanlines & SVG motion blur
 */

import React from 'react';
import Image from 'next/image';
import { m, type Variants } from 'motion/react';
import { GHOST_EASE } from '@/config/motion';
import type { OriginChapter } from '@/components/sobre/origin/data';
import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

/**
 * CinemaReelEntrance — Full-screen entrance overlay with scanlines & SVG motion blur
 * Used during the 3-loop auto-scroll entrance (2.5s)
 */
export function CinemaReelEntrance({ isPlaying, onComplete }: { isPlaying: boolean; onComplete: () => void }) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const scanlinesRef = React.useRef<HTMLDivElement>(null);
  const svgFilterRef = React.useRef<SVGFilterElement>(null);

  React.useEffect(() => {
    if (!isPlaying) return;

    const overlay = overlayRef.current;
    const scanlines = scanlinesRef.current;
    const filter = svgFilterRef.current;
    const feGaussianBlur = filter?.firstElementChild as SVGFEGaussianBlurElement | null;

    if (!overlay || !scanlines || !filter || !feGaussianBlur) return;

    // GSAP timeline for entrance (mirrors useOriginAnimations)
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Register custom ease
    const naturalEase =
      typeof window !== 'undefined'
        ? CustomEase.create('naturalEase', GHOST_EASE.join(','))
        : 'cubic-bezier(0.22, 1, 0.36, 1)';

    const ENTRANCE_DURATION = 2.5;
    const ENTRANCE_LOOPS = 3;
    const CHAPTERS = 4;
    const ENTRANCE_TOTAL_SLIDES = ENTRANCE_LOOPS * CHAPTERS;
    const MAX_BLUR_SVG_DEVIATION = 18;
    const segmentDuration = ENTRANCE_DURATION / ENTRANCE_TOTAL_SLIDES;

    // Opacity fade-in
    tl.to([overlay, scanlines], {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, 0);

    for (let loop = 0; loop < ENTRANCE_LOOPS; loop++) {
      for (let chapter = 0; chapter < CHAPTERS; chapter++) {
        const label = `loop${loop}_ch${chapter}`;

        // SVG blur
        tl.to(
          feGaussianBlur,
          {
            attr: { stdDeviation: `0 ${MAX_BLUR_SVG_DEVIATION}` },
            duration: segmentDuration * 0.4,
            ease: 'power2.in',
          },
          label
        ).to(
          feGaussianBlur,
          {
            attr: { stdDeviation: '0 0' },
            duration: segmentDuration * 0.6,
            ease: 'power2.out',
          },
          `${label}+=${segmentDuration * 0.4}`
        );

        // Scanlines pulse
        tl.to(
          scanlines,
          {
            opacity: 0.6,
            duration: segmentDuration * 0.2,
            ease: 'power2.in',
          },
          label
        ).to(
          scanlines,
          {
            opacity: 0.15,
            duration: segmentDuration * 0.8,
            ease: 'power2.out',
          },
          `${label}+=${segmentDuration * 0.2}`
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [isPlaying, onComplete]);

  if (!isPlaying) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* SVG Motion Blur Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="entrance-motion-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" edgeMode="duplicate" />
        </filter>
      </svg>

      {/* Scanlines Overlay — Ghost Cyan (#4fe6ff) */}
      <div
        ref={scanlinesRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          mixBlendMode: 'screen',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(79, 230, 255, 0.08) 2px, rgba(79, 230, 255, 0.08) 4px)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
}

export type ResolvedOriginChapter = OriginChapter & {
  img: string;
  priority?: boolean;
};

/**
 * Motion Staging Variants (Emil Kowalski Philosophy + Ghost Ease)
 * Curva física responsiva: cubic-bezier(0.16, 1, 0.3, 1) com desaceleração natural.
 * Stagger sequencial para que apenas um elemento domine o foco por vez.
 *
 * ANIM: Variants atualizados com textRevealVariants para stagger cinematográfico
 * Eyebrow: delay 0.3s | Title: delay 0.5s | Caption: delay 0.7s | Description: delay 0.9s
 */
export const STAGE_MOTION_VARIANTS: {
  container: Variants;
  topBadge: Variants;
  eyebrow: Variants;
  title: Variants;
  copy: Variants;
  metadata: Variants;
  asideCard: Variants;
} = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.28,
        ease: GHOST_EASE,
      },
    },
  },
  topBadge: {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: GHOST_EASE,
      },
    },
  },
  // ANIM: Eyebrow — primeiro elemento a aparecer (delay 0.3s via custom index)
  eyebrow: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.3 + i * 0.12, // Base delay 0.3s + stagger
        duration: 0.7,
        ease: GHOST_EASE,
      },
    }),
  },
  // ANIM: Title — segundo elemento (delay 0.5s)
  title: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.5 + i * 0.12, // Base delay 0.5s + stagger
        duration: 0.7,
        ease: GHOST_EASE,
      },
    }),
  },
  // ANIM: Copy/Description — terceiro elemento (delay 0.9s)
  copy: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.9 + i * 0.12, // Base delay 0.9s + stagger
        duration: 0.7,
        ease: GHOST_EASE,
      },
    }),
  },
  // ANIM: Metadata — quarto elemento (delay 1.1s)
  metadata: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 1.1 + i * 0.12, // Base delay 1.1s + stagger
        duration: 0.7,
        ease: GHOST_EASE,
      },
    }),
  },
  asideCard: {
    hidden: { opacity: 0, x: 14 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: GHOST_EASE,
      },
    },
  },
};

/**
 * LaurelBadge — Badge minimalista de autenticação de método autoral
 */
export function LaurelBadge({ label = 'MÉTODO AUTORAL' }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 select-none rounded-full bg-background/75 px-3 py-1.5 border border-white/15 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <svg
        width="22"
        height="16"
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
        className="text-[#4fe6ff] shrink-0"
      >
        <path
          d="M8.5 2C7 5 5 9 5 14C5 19 7 23 8.5 26M5.5 5C4.2 8 3.5 11 3.5 14C3.5 17 4.2 20 5.5 23M2 9C1.5 10.5 1 12.2 1 14C1 15.8 1.5 17.5 2 19"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M27.5 2C29 5 31 9 31 14C31 19 29 23 27.5 26M30.5 5C31.8 8 32.5 11 32.5 14C32.5 17 31.8 20 30.5 23M34 9C34.5 10.5 35 12.2 35 14C35 15.8 34.5 17.5 34 19"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="18" cy="7" r="1.5" fill="#E50914" />
      </svg>
      <div className="flex flex-col">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] font-semibold text-white/90">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * OriginMask — Gradientes verticais para transição suave com o fundo Void Black (#040013)
 */
export function OriginMask() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-3d-layer h-[8dvh]"
        style={{
          background:
            'linear-gradient(180deg, #040013 0%, rgba(4, 0, 19, 0) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-3d-layer h-[8dvh]"
        style={{
          background:
            'linear-gradient(0deg, #040013 0%, rgba(4, 0, 19, 0) 100%)',
        }}
      />
    </>
  );
}

/**
 * Destaca a frase-chave na descrição com cor Ghost Cyan e glow espectral
 */
function renderHighlightedDescription(description: string, highlight?: string) {
  if (!highlight) return description;
  const idx = description.indexOf(highlight);
  if (idx === -1) return description;

  return (
    <>
      {description.slice(0, idx)}
      <span className="text-[#4fe6ff] font-medium drop-shadow-[0_0_10px_rgba(79,230,255,0.35)]">
        {highlight}
      </span>
      {description.slice(idx + highlight.length)}
    </>
  );
}

export interface CinemaReelStageFrameProps {
  block: ResolvedOriginChapter;
  index: number;
  isActive: boolean;
  onExplore: (_block: ResolvedOriginChapter) => void;
}

/**
 * CinemaReelStageFrame
 * Frame widescreen de grande formato com imagem protagonista (~94vw) e dimensões explícitas
 */
export function CinemaReelStageFrame({
  block,
  index,
  isActive,
  onExplore,
}: CinemaReelStageFrameProps) {
  return (
    <article
      data-origin-frame={block.order}
      data-origin-block={block.order}
      aria-hidden={!isActive}
      className={`absolute inset-0 h-full w-full overflow-hidden rounded-[var(--radius-scene,1.25rem)] sm:rounded-[var(--radius-scene-sm,1.75rem)] md:rounded-[var(--radius-scene-lg,2.25rem)] border border-white/10 bg-background shadow-scene will-change-[clip-path,filter,opacity] ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        zIndex: index + 1,
      }}
    >
      {/* Marcadores de Enquadramento Cinematográfico (Cinema Reel Frames) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3.5 left-4 text-white/35 font-mono text-[9px] uppercase tracking-[0.2em] z-20 select-none hidden sm:block"
      >
        ⌜ REEL // A · 0{block.order}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3.5 right-4 text-white/35 font-mono text-[9px] uppercase tracking-[0.2em] z-20 select-none hidden sm:block"
      >
        CINEMASCOPE 2.39:1 ⌝
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 left-4 text-white/35 font-mono text-[9px] uppercase tracking-[0.2em] z-20 select-none hidden sm:block"
      >
        ⌞ 35MM T1.5 · RAW
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 right-4 text-white/35 font-mono text-[9px] uppercase tracking-[0.2em] z-20 select-none hidden sm:block"
      >
        FRAME [0{block.order}/04] ⌟
      </div>

      {/* Trilha de Progresso de Fita Cinematográfica na Borda Inferior */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 overflow-hidden"
      >
        <div
          className="h-full bg-gradient-to-r from-bluePrimary via-[#4fe6ff] to-bluePrimary shadow-[0_0_10px_#0048ff] transition-all duration-500 ease-out"
          style={{
            width: `${((index + 1) / 4) * 100}%`,
          }}
        />
      </div>

      {/* Imagem Protagonista em Alta Resolução (Supabase Storage origin2) */}
      {/* Wrapper for parallax: height 120dvh, marginTop -60dvh, centered */}
      <div
        data-slide-image
        className="absolute inset-x-0 top-1/2 w-full overflow-hidden"
        style={{
          height: '120dvh',
          marginTop: '-60dvh',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <Image
          data-origin-parallax-img
          src={block.img}
          alt={`${block.title} — ${block.caption}`}
          width={block.dimensions.width}
          height={block.dimensions.height}
          priority={block.priority}
          unoptimized
          draggable={false}
          className="h-full w-full object-cover object-center select-none will-change-transform scale-[1.03]"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== block.fallback) {
              target.src = block.fallback;
            }
          }}
        />
      </div>

      {/* Vinheta Cinematográfica Topo/Base — preserva o centro límpido para a imagem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,0,19,0.85) 0%, rgba(4,0,19,0.16) 24%, rgba(4,0,19,0.14) 55%, rgba(4,0,19,0.94) 100%)',
        }}
      />

      {/* Vinheta Radial de Bordas para Foco Central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(85% 75% at 50% 50%, transparent 40%, rgba(4,0,19,0.7) 100%)',
        }}
      />

      {/* Máscara de Transição GSAP (Hardware Accelerated) */}
      <div
        data-origin-mask
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-overlay-layer bg-background opacity-0 will-change-[opacity]"
      />

      {/* Camada Editorial Sobreposta com Hierarquia Cristalina e Stagger Framer Motion */}
      <m.div
        variants={STAGE_MOTION_VARIANTS.container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className="relative z-overlay-layer flex h-full w-full flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12 select-none"
      >
        {/* TOPO: Capítulo, Categoria, Timecode Cinematográfico e Badge de Autenticidade */}
        <div className="flex items-start justify-between gap-4">
          <m.div
            variants={STAGE_MOTION_VARIANTS.topBadge}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.16em] text-bluePrimary px-2.5 py-0.5 rounded bg-bluePrimary/20 border border-bluePrimary/40 shadow-[0_0_12px_rgba(0,72,255,0.25)]">
                {block.chapter}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914] animate-pulse"
              />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium text-white/95">
                {block.category}
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.18em] text-[#4fe6ff]/80">
                · TC 00:0{block.order}:18:24
              </span>
            </div>

            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/70">
              {block.eyebrow}
            </div>
          </m.div>

          <m.div
            variants={STAGE_MOTION_VARIANTS.topBadge}
            className="hidden sm:flex items-center gap-3"
          >
            <span className="hidden md:inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              REEL A · 35MM
            </span>
            <LaurelBadge label="MÉTODO AUTORAL" />
          </m.div>
        </div>

        {/* BASE: Título Monumental, Descrição Controlada e Painel Editorial (Layout Alternado Esquerda/Direita) */}
        {(() => {
          const isAlignRight = block.textAlign === 'right';
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              {/* BLOCO NARRATIVO: Título, Fase e Narrativa Concisa */}
              <div
                className={`flex flex-col gap-2.5 sm:gap-3 ${
                  isAlignRight
                    ? 'lg:col-span-8 lg:order-2 lg:items-end lg:text-right'
                    : 'lg:col-span-8 lg:order-1 items-start text-left'
                }`}
              >
                <m.div
                  variants={STAGE_MOTION_VARIANTS.eyebrow}
                  custom={0}
                  className={`flex flex-col gap-1 ${
                    isAlignRight ? 'lg:items-end' : 'items-start'
                  }`}
                >
                  <span className="font-sans text-body text-blueAccent italic leading-tight">
                    {block.year}
                  </span>
                  <m.h3
                    variants={STAGE_MOTION_VARIANTS.title}
                    custom={0}
                    data-origin-title
                    className="font-sans text-h1 font-semibold uppercase text-white tracking-tight leading-[0.92]"
                  >
                    {block.titleLines.map((line, idx) => (
                      <span
                        key={idx}
                        className="block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                      >
                        {line}
                      </span>
                    ))}
                  </m.h3>
                </m.div>

                {/* Descrição Concisa com Linha Confortável */}
                <m.p
                  variants={STAGE_MOTION_VARIANTS.copy}
                  custom={0}
                  data-origin-copy
                  className={`font-sans text-[13px] sm:text-[15px] md:text-[16px] text-white/90 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                    isAlignRight ? 'lg:text-right' : 'text-left'
                  }`}
                >
                  {renderHighlightedDescription(
                    block.description,
                    block.highlight
                  )}
                </m.p>

                {/* Metadados Editoriais Legítimos */}
                <m.div
                  variants={STAGE_MOTION_VARIANTS.metadata}
                  custom={0}
                  className={`mt-1 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] text-white/75 ${
                    isAlignRight ? 'lg:justify-end' : 'justify-start'
                  }`}
                >
                  <div>
                    <span className="text-white/45 mr-1.5">AUTORIA</span>
                    <span className="text-white font-medium">
                      {block.director}
                    </span>
                  </div>
                  <span className="text-white/30">·</span>
                  <div>
                    <span className="text-white/45 mr-1.5">DISCIPLINA</span>
                    <span className="text-[#4fe6ff] font-medium">
                      {block.discipline}
                    </span>
                  </div>
                  <span className="text-white/30">·</span>
                  <div>
                    <span className="text-white/45 mr-1.5">FRAME</span>
                    <span className="text-white font-medium">
                      0{block.order}/04
                    </span>
                  </div>
                </m.div>
              </div>

              {/* LADO OPOSTO: Princípio Editorial & Ação de Detalhes */}
              <m.div
                variants={STAGE_MOTION_VARIANTS.asideCard}
                className={`flex flex-col gap-3.5 pb-0.5 ${
                  isAlignRight
                    ? 'lg:col-span-4 lg:order-1 items-start lg:items-start'
                    : 'lg:col-span-4 lg:order-2 items-start lg:items-end'
                }`}
              >
                <div
                  className={`hidden lg:flex flex-col gap-2 max-w-[280px] ${
                    isAlignRight ? 'text-left' : 'text-right'
                  }`}
                >
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] font-semibold text-[#4fe6ff]">
                    PRINCÍPIO CENTRAL
                  </span>
                  <p className="font-sans text-body italic leading-snug text-white/90">
                    &ldquo;{block.principle}&rdquo;
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onExplore(block)}
                  className="inline-flex min-h-[42px] items-center gap-2.5 rounded-full border border-white/25 bg-background/85 px-4 sm:px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all hover:border-bluePrimary hover:bg-bluePrimary/30 hover:shadow-[0_0_20px_rgba(0,72,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluePrimary cursor-pointer"
                >
                  <span>Trajetória Completa</span>
                  <span aria-hidden="true" className="text-[#4fe6ff] font-bold">
                    →
                  </span>
                </button>
              </m.div>
            </div>
          );
        })()}
      </m.div>
    </article>
  );
}

/**
 * CinemaReelRightRail — HUD vertical com indicadores de 01 a 04 e rótulo contextual
 */
export interface CinemaReelRightRailProps {
  total: number;
  activeSceneIndex: number;
  onPipClick: (_index: number) => void;
  chapters?: ResolvedOriginChapter[];
}

export function CinemaReelRightRail({
  total,
  activeSceneIndex,
  onPipClick,
  chapters,
}: CinemaReelRightRailProps) {
  const activeChapter = chapters?.[activeSceneIndex];

  return (
    <aside
      data-origin-rail
      aria-label="Navegação dos capítulos"
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-cta-layer flex-col items-center gap-3.5 select-none opacity-0 pointer-events-none transition-opacity duration-300"
    >
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[8px] font-bold text-[#4fe6ff] tracking-[0.2em]">
          REEL
        </span>
        <span className="font-mono text-[10px] font-semibold text-white/70 tracking-wide">
          0{activeSceneIndex + 1}/0{total}
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Capítulos da Origem"
        className="flex flex-col items-center gap-2.5 py-2 px-1 rounded-full bg-[#040013]/70 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === activeSceneIndex;
          const chapter = chapters?.[idx];
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir para Capítulo 0${idx + 1}${chapter ? ` — ${chapter.title}` : ''}`}
              onClick={() => onPipClick(idx)}
              className={`w-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#0048ff] cursor-pointer ${
                isActive
                  ? 'h-8 bg-bluePrimary shadow-[0_0_14px_#0048ff]'
                  : 'h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          );
        })}
      </div>

      {activeChapter && (
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/50 max-w-[70px] text-center truncate">
          {activeChapter.year.split('·')[1]?.trim() || activeChapter.year}
        </span>
      )}
    </aside>
  );
}

/**
 * DetailsPanel — Gaveta lateral editorial com a narrativa detalhada e pilares reais
 */
export interface DetailsPanelProps {
  open: boolean;
  slide: ResolvedOriginChapter | null;
  onClose: () => void;
}

export function DetailsPanel({ open, slide, onClose }: DetailsPanelProps) {
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[var(--z-layer-modal-scrim)] transition-all duration-500 ${
          open
            ? 'pointer-events-auto bg-background/80 backdrop-blur-md opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Gaveta */}
      <aside
        ref={panelRef}
        aria-hidden={!open}
        aria-label={slide ? `Detalhes: ${slide.title}` : 'Detalhes do capítulo'}
        className="fixed top-[4dvh] right-[2dvh] sm:right-[3dvh] z-[var(--z-layer-modal)] flex flex-col text-white w-[min(580px,92vw)] h-[92dvh] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-bluePrimary/30 shadow-drawer will-change-transform"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(calc(100% + 5dvh))',
          transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          background:
            'linear-gradient(180deg, rgba(8,4,28,0.98) 0%, rgba(4,0,19,0.99) 100%)',
          backdropFilter: 'blur(24px) saturate(140%)',
        }}
      >
        {slide && (
          <div
            className="h-full w-full overflow-y-auto"
            style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
          >
            {/* Imagem de Topo com Aspect Ratio Garantido */}
            <div
              className="relative w-full h-[28dvh] shrink-0 overflow-hidden"
              style={{ aspectRatio: slide.dimensions.aspectRatio }}
            >
              <Image
                src={slide.img}
                alt={`${slide.title} — ${slide.caption}`}
                width={slide.dimensions.width}
                height={slide.dimensions.height}
                loading="lazy"
                unoptimized
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== slide.fallback) {
                    target.src = slide.fallback;
                  }
                }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(4,0,19,0) 0%, rgba(4,0,19,0.9) 80%, rgba(4,0,19,1) 100%)',
                }}
              />

              {/* Botão Fechar */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes"
                className="absolute right-4 top-4 z-[var(--z-layer-modal-close)] flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-background/80 text-white backdrop-blur-md transition-colors hover:border-bluePrimary hover:bg-bluePrimary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Conteúdo */}
            <div className="px-6 pb-8 pt-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4fe6ff] font-semibold">
                {slide.eyebrow}
              </div>

              <h2
                id="origin-drawer-title"
                className="font-sans text-h1 font-semibold uppercase text-white tracking-tight leading-[0.95]"
              >
                {slide.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/70">
                <span>
                  <span className="text-white/40">AUTOR</span> {slide.director}
                </span>
                <span className="text-white/30">·</span>
                <span>{slide.year}</span>
                <span className="text-white/30">·</span>
                <span className="text-[#4fe6ff]">{slide.category}</span>
              </div>

              <div className="my-5 h-px w-full bg-white/10" />

              {/* História Completa */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
                  NARRATIVA DO CAPÍTULO
                </span>
                <p className="font-sans text-[15px] text-white/90 leading-relaxed">
                  {slide.story}
                </p>
              </div>

              <div className="my-6 h-px w-full bg-white/10" />

              {/* Pilares Reais da Disciplina */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
                  PILARES ESTRATÉGICOS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {slide.focusPoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#4fe6ff]">
                        {pt.label}
                      </span>
                      <span className="font-sans text-xs font-medium text-white/90">
                        {pt.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-6 h-px w-full bg-white/10" />

              {/* Princípio de Fechamento */}
              <div className="p-4 rounded-xl bg-bluePrimary/10 border border-bluePrimary/20">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#4fe6ff] font-semibold block mb-1">
                  MÉTODO AUTORAL
                </span>
                <p className="font-sans text-body italic text-white/90 leading-snug">
                  &ldquo;{slide.principle}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}