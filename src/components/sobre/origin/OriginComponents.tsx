"use client";

/**
 * Origin Section Components — Ghost System v3.0 (Cinema Reel Architecture)
 * Layer 2 (Render):
 * - LaurelBadge: Cinema Reel laurel wreath SVG badge for editorial accreditation.
 * - OriginMask: Stage edge gradients fading into Void Black (#040013).
 * - CinemaReelStageFrame: Widescreen cinematic frame housing 16:9 full-bleed imagery,
 *   inner parallax wrapper, dual vignettes, monumental Playfair typography,
 *   narrative body, right-column editorial reviews, and action controls.
 * - CinemaReelRightRail: Vertical chapter indicator with pips (01..04).
 * - DetailsPanel: Aside modal sliding in from the right edge with chapter synopsis.
 */

import React from "react";
import type { OriginChapter } from "@/components/sobre/origin/data";

export type ResolvedOriginChapter = OriginChapter & {
  img: string;
  priority?: boolean;
};

/**
 * LaurelBadge — Editorial award/accreditation laurel wreath SVG
 */
export function LaurelBadge({ label = "MÉTODO AUTORAL" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 select-none rounded-full bg-[#040013]/70 px-3 py-1.5 border border-white/10 backdrop-blur-md">
      <svg
        width="24"
        height="18"
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
        className="text-[#4fe6ff]/90 shrink-0"
      >
        <path
          d="M8.5 2C7 5 5 9 5 14C5 19 7 23 8.5 26M5.5 5C4.2 8 3.5 11 3.5 14C3.5 17 4.2 20 5.5 23M2 9C1.5 10.5 1 12.2 1 14C1 15.8 1.5 17.5 2 19"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M27.5 2C29 5 31 9 31 14C31 19 29 23 27.5 26M30.5 5C31.8 8 32.5 11 32.5 14C32.5 17 31.8 20 30.5 23M34 9C34.5 10.5 35 12.2 35 14C35 15.8 34.5 17.5 34 19"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="18" cy="7" r="1.3" fill="#E50914" />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-center gap-0.5 text-[#4fe6ff] text-[8.5px] leading-none mb-0.5">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] font-semibold text-white/90">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * OriginMask
 * Top and bottom 10dvh gradient masks fading into Void Black (#040013)
 */
export function OriginMask() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[10dvh]"
        style={{
          background:
            "linear-gradient(180deg, #040013 0%, rgba(4, 0, 19, 0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[10dvh]"
        style={{
          background:
            "linear-gradient(0deg, #040013 0%, rgba(4, 0, 19, 0) 100%)",
        }}
      />
    </>
  );
}

/**
 * Splits eyebrow string at midpoint to mirror Cinema Reel's two-line stacked eyebrow treatment.
 */
function renderMidpointEyebrow(eyebrow: string) {
  const words = eyebrow.trim().split(/\s+/);
  const breakIdx = Math.floor(words.length / 2) - 1;

  return words.map((word, i) => (
    <span key={`${word}-${i}`}>
      {word}
      {i === breakIdx ? <br /> : i < words.length - 1 ? " " : ""}
    </span>
  ));
}

/**
 * Highlights the anchor phrase inside the narrative description in #0048ff (Ghost Blue).
 */
function renderHighlightedDescription(description: string, highlight?: string) {
  if (!highlight) return description;
  const idx = description.indexOf(highlight);
  if (idx === -1) return description;

  return (
    <>
      {description.slice(0, idx)}
      <span className="text-[#4fe6ff] font-semibold drop-shadow-[0_0_8px_rgba(79,230,255,0.4)]">
        {highlight}
      </span>
      {description.slice(idx + highlight.length)}
    </>
  );
}

interface CinemaReelStageFrameProps {
  block: ResolvedOriginChapter;
  index: number;
  isActive: boolean;
  playfairClassName: string;
  onExplore: (block: ResolvedOriginChapter) => void;
}

/**
 * CinemaReelStageFrame
 * Full-screen Cinema Reel slide frame housing:
 * - 16:9 imagery with parallax wrapper
 * - Dual vignette contrast layers
 * - Editorial typography layers
 * - Reviews & metadata strip
 */
export function CinemaReelStageFrame({
  block,
  index,
  isActive,
  playfairClassName,
  onExplore,
}: CinemaReelStageFrameProps) {
  // Extract concise narrative intro for the front stage (full narrative in DetailsPanel)
  const introParagraph = block.description.split("\n\n")[0] || block.description;

  return (
    <div
      data-origin-frame={block.order}
      aria-hidden={!isActive}
      className="absolute inset-0 h-full w-full overflow-hidden rounded-[24px] md:rounded-[36px] border border-[#0048ff]/25 bg-[#040013] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] will-change-[clip-path,filter,opacity]"
      style={{
        zIndex: index + 1,
      }}
    >
      {/* R = 1.2 Inner Parallax Image Wrapper */}
      <div
        data-origin-parallax-img={block.order}
        className="pointer-events-none absolute inset-x-0 w-full will-change-transform"
        style={{
          height: "120%",
          top: "-10%",
        }}
      >
        <img
          src={block.img}
          alt={`${block.title} — ${block.caption}`}
          loading={block.priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={block.priority ? "high" : "auto"}
          draggable={false}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== block.fallback) {
              target.src = block.fallback;
            }
          }}
          className="h-full w-full object-cover object-center select-none"
        />
      </div>

      {/* Cinema Reel Dual Vignette — Top/Bottom Gradual Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,0,19,0.85) 0%, rgba(4,0,19,0.12) 28%, rgba(4,0,19,0.16) 52%, rgba(4,0,19,0.92) 100%)",
        }}
      />

      {/* Cinema Reel Dual Vignette — Radial Corner Darkening */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(85% 75% at 50% 50%, transparent 36%, rgba(4,0,19,0.72) 100%)",
        }}
      />

      {/* Per-Frame Veil Mask for GSAP Transitions */}
      <div
        data-origin-mask
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[#040013] opacity-0"
      />

      {/* CONTENT LAYER OVER THE FRAME */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 select-none">
        {/* TOP ROW: Chapter Phase, Eyebrow & Laurel Badge */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#0048ff] px-2.5 py-0.5 rounded bg-[#0048ff]/20 border border-[#0048ff]/40 shadow-[0_0_10px_rgba(0,72,255,0.2)]">
                {block.chapter}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] font-medium text-white/90">
                {block.category}
              </span>
            </div>

            <div className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-white/65">
              {renderMidpointEyebrow(block.eyebrow)}
            </div>
          </div>

          {/* Laurel Accreditation Badge */}
          <div className="hidden sm:block">
            <LaurelBadge label="MÉTODO AUTORAL" />
          </div>
        </div>

        {/* MIDDLE / BOTTOM GRID: Title & Story Left, Editorial Reviews Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* LEFT AREA: Chapter Title, Narrative Body, Meta Row */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span
                className={`${playfairClassName} block text-[clamp(1.1rem,2dvh,1.5rem)] italic text-[#4fe6ff]/95 leading-tight`}
              >
                {block.year}
              </span>
              <h3
                data-origin-title
                className={`${playfairClassName} block font-semibold uppercase text-white tracking-tight leading-[0.92] text-[clamp(2.1rem,4.6dvh,3.8rem)]`}
              >
                {block.titleLines.map((line, idx) => (
                  <span key={idx} className="block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                    {line}
                  </span>
                ))}
              </h3>
            </div>

            {/* Narrative Body Copy (Inter Tight) — First Stanza on Stage */}
            <p
              data-origin-copy
              className="font-sans text-sm md:text-[15px] text-white/90 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {renderHighlightedDescription(introParagraph, block.highlight)}
            </p>

            {/* Metadata Footer: Direction & Method */}
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/75">
              <div>
                <span className="text-white/45 mr-1.5">DIR.</span>
                <span className="text-white font-medium">{block.director}</span>
              </div>
              <span className="text-white/25">·</span>
              <div>
                <span className="text-white/45 mr-1.5">MÉTODO</span>
                <span className="text-[#4fe6ff] font-medium">{block.method}</span>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: 2-3 Editorial Review Highlights & Explore Action */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3.5 pb-1">
            {/* Reviews Strip (Cinema Reel Style) */}
            <div className="hidden lg:flex flex-col gap-2.5 max-w-[270px] text-right">
              {block.awards.slice(0, 2).map((review, rIdx) => (
                <div key={rIdx} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 text-[#4fe6ff] text-[9.5px] justify-end">
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] font-medium text-white/55">
                    {review.label}
                  </span>
                  <p
                    className={`${playfairClassName} text-[12px] italic leading-tight text-white/95`}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Explore Button */}
            <button
              type="button"
              onClick={() => onExplore(block)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/25 bg-[#040013]/90 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all hover:border-[#0048ff] hover:bg-[#0048ff]/25 hover:shadow-[0_0_18px_rgba(0,72,255,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0048ff]"
            >
              <span>Detalhes</span>
              <span aria-hidden="true" className="text-[#4fe6ff] font-bold">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CinemaReelRightRail
 * Vertical Right-Rail HUD indicator showing 01, active dots/pips, and 04.
 */
interface CinemaReelRightRailProps {
  total: number;
  activeSceneIndex: number;
  onPipClick: (index: number) => void;
}

export function CinemaReelRightRail({
  total,
  activeSceneIndex,
  onPipClick,
}: CinemaReelRightRailProps) {
  return (
    <aside
      aria-label="Navegação dos capítulos"
      className="hidden lg:flex fixed right-[2dvh] top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 select-none"
    >
      <span className="font-mono text-[10px] font-semibold text-white/50 tracking-widest">
        01
      </span>

      <div
        role="tablist"
        aria-label="Capítulos da Origem"
        className="flex flex-col items-center gap-2.5 py-1"
      >
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === activeSceneIndex;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir para Capítulo 0${idx + 1}`}
              onClick={() => onPipClick(idx)}
              className={`w-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#0048ff] ${
                isActive
                  ? "h-7 bg-[#0048ff] shadow-[0_0_12px_#0048ff]"
                  : "h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>

      <span className="font-mono text-[10px] font-semibold text-white/50 tracking-widest">
        0{total}
      </span>
    </aside>
  );
}

/**
 * DetailsPanel — Cinema Reel modal that slides in from the right edge with backdrop blur.
 */
export interface DetailsPanelProps {
  open: boolean;
  slide: ResolvedOriginChapter;
  onClose: () => void;
  playfairClassName: string;
}

export function DetailsPanel({
  open,
  slide,
  onClose,
  playfairClassName,
}: DetailsPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          open
            ? "pointer-events-auto bg-[#040013]/70 backdrop-blur-md opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!open}
        aria-label={slide ? `Detalhes: ${slide.title}` : "Detalhes do capítulo"}
        className="fixed top-[6dvh] right-[3dvh] z-50 flex flex-col text-white w-[min(620px,90vw)] h-[88dvh] rounded-[32px] overflow-hidden border border-[#0048ff]/30 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.85)] will-change-transform"
        style={{
          transform: open ? "translateX(0)" : "translateX(calc(100% + 5dvh))",
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          background:
            "linear-gradient(180deg, rgba(8,4,28,0.96) 0%, rgba(4,0,19,0.98) 100%)",
          backdropFilter: "blur(24px) saturate(140%)",
        }}
      >
        {slide && (
          <div
            className="h-full w-full overflow-y-auto"
            style={{ overscrollBehavior: "contain", touchAction: "pan-y" }}
          >
            {/* Hero Image */}
            <div className="relative w-full h-[32dvh] shrink-0 overflow-hidden">
              <img
                src={slide.img}
                alt={`${slide.title} — ${slide.caption}`}
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
                    "linear-gradient(180deg, rgba(4,0,19,0) 0%, rgba(4,0,19,0.9) 80%, rgba(4,0,19,1) 100%)",
                }}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes"
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#040013]/70 text-white backdrop-blur-md transition-colors hover:border-[#0048ff] hover:bg-[#0048ff]/30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-8 pt-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#4fe6ff] font-semibold">
                {slide.eyebrow}
              </div>

              <h2
                className={`${playfairClassName} mt-2 font-semibold uppercase text-white tracking-tight leading-[0.95] text-[clamp(2rem,4dvh,3.2rem)]`}
              >
                {slide.titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                <span>
                  <span className="text-white/40">DIR.</span> {slide.director}
                </span>
                <span className="text-white/30">·</span>
                <span>{slide.year}</span>
                <span className="text-white/30">·</span>
                <span className="text-[#4fe6ff]">{slide.category}</span>
              </div>

              <div className="my-5 h-px w-full bg-white/10" />

              {/* Narrative Text */}
              <p
                className={`${playfairClassName} text-[15px] italic leading-relaxed text-white/90 whitespace-pre-line`}
              >
                {slide.description}
              </p>

              {/* Stats Grid */}
              {slide.stats && (
                <>
                  <div className="my-5 h-px w-full bg-white/10" />
                  <div className="grid grid-cols-3 gap-4">
                    <Stat
                      label="CRÍTICOS"
                      value={`${slide.stats.critics}`}
                      suffix="%"
                      playfairClassName={playfairClassName}
                    />
                    <Stat
                      label="AUDIÊNCIA"
                      value={`${slide.stats.audience}`}
                      suffix="%"
                      playfairClassName={playfairClassName}
                    />
                    <Stat
                      label="RUNTIME"
                      value={slide.stats.runtime}
                      playfairClassName={playfairClassName}
                    />
                    <Stat
                      label="FORMATO"
                      value={slide.stats.format}
                      playfairClassName={playfairClassName}
                    />
                    <Stat
                      label="ASPECTO"
                      value={slide.stats.aspect}
                      playfairClassName={playfairClassName}
                    />
                    <Stat
                      label="IDIOMA"
                      value={slide.stats.language}
                      playfairClassName={playfairClassName}
                    />
                  </div>
                </>
              )}

              {/* Awards Strip */}
              {slide.awards && (
                <>
                  <div className="my-5 h-px w-full bg-white/10" />
                  <div className="flex flex-col gap-3">
                    {slide.awards.map((a, i) => (
                      <div key={i} className="flex items-baseline gap-3">
                        <div className="flex shrink-0 items-center gap-0.5 text-[#4fe6ff] text-[10px]">
                          {Array.from({ length: a.stars }).map((_, s) => (
                            <span key={s}>★</span>
                          ))}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-white/50 shrink-0">
                          {a.label}
                        </div>
                        <div
                          className={`${playfairClassName} text-[13px] italic text-white/90 leading-tight`}
                        >
                          &ldquo;{a.quote}&rdquo;
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function Stat({
  label,
  value,
  suffix,
  playfairClassName,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  playfairClassName: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
        {label}
      </span>
      <span className={`${playfairClassName} text-[18px] text-white leading-none`}>
        {value}
        {suffix && <span className="text-[10px] text-white/50 ml-0.5">{suffix}</span>}
      </span>
    </div>
  );
}
