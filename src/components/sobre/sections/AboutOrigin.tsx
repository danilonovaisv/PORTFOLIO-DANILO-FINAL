"use client";

/**
 * AboutOrigin — "Origem Criativa" Section (/sobre)
 * Ghost System v3.0 · Full Cinema Reel Architecture
 *
 * 3-Layer Architecture:
 * 1. Data:       src/components/sobre/origin/data.ts
 * 2. Render:     src/components/sobre/origin/OriginComponents.tsx
 * 3. Animations: src/components/sobre/origin/useOriginAnimations.ts
 */

import React, { useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { useSiteAssetUrl } from "@/contexts/site-assets";
import {
  ORIGIN_CHAPTERS,
  ORIGIN_INTRO,
  ORIGIN_BRIDGE,
  type OriginLocalWebpPath,
} from "@/components/sobre/origin/data";
import {
  OriginMask,
  CinemaReelStageFrame,
  CinemaReelRightRail,
  DetailsPanel,
  type ResolvedOriginChapter,
} from "@/components/sobre/origin/OriginComponents";
import {
  useOriginAnimations,
  ORIGIN_LAYOUT,
} from "@/components/sobre/origin/useOriginAnimations";
import { useMotionGate } from "@/hooks/useMotionGate";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

function resolveOriginAsset(
  localWebp: OriginLocalWebpPath,
  hookUrl?: string
): string {
  if (localWebp) return localWebp;
  if (hookUrl && !hookUrl.startsWith("/site.assets/webp/")) return hookUrl;
  return localWebp;
}

export default function AboutOrigin() {
  const containerRef = useRef<HTMLElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useMotionGate();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [openSlideKey, setOpenSlideKey] = useState<string | null>(null);

  // Dynamic asset resolution with fallback
  const assetUrl1 = useSiteAssetUrl(
    ORIGIN_CHAPTERS[0].imageId,
    ORIGIN_CHAPTERS[0].fallback
  );
  const assetUrl2 = useSiteAssetUrl(
    ORIGIN_CHAPTERS[1].imageId,
    ORIGIN_CHAPTERS[1].fallback
  );
  const assetUrl3 = useSiteAssetUrl(
    ORIGIN_CHAPTERS[2].imageId,
    ORIGIN_CHAPTERS[2].fallback
  );
  const assetUrl4 = useSiteAssetUrl(
    ORIGIN_CHAPTERS[3].imageId,
    ORIGIN_CHAPTERS[3].fallback
  );

  const contentBlocks: ResolvedOriginChapter[] = [
    {
      ...ORIGIN_CHAPTERS[0],
      img: resolveOriginAsset(ORIGIN_CHAPTERS[0].fallback, assetUrl1),
      priority: true,
    },
    {
      ...ORIGIN_CHAPTERS[1],
      img: resolveOriginAsset(ORIGIN_CHAPTERS[1].fallback, assetUrl2),
      priority: false,
    },
    {
      ...ORIGIN_CHAPTERS[2],
      img: resolveOriginAsset(ORIGIN_CHAPTERS[2].fallback, assetUrl3),
      priority: false,
    },
    {
      ...ORIGIN_CHAPTERS[3],
      img: resolveOriginAsset(ORIGIN_CHAPTERS[3].fallback, assetUrl4),
      priority: false,
    },
  ];

  useOriginAnimations({
    isClient: true,
    stageWrapRef,
    containerRef,
    contentCount: contentBlocks.length,
    prefersReducedMotion,
    onActiveSceneChange: setActiveSceneIndex,
  });

  const handleExplore = (block: ResolvedOriginChapter) => {
    setOpenSlideKey(block.id);
  };

  const handlePipClick = (index: number) => {
    setActiveSceneIndex(index);
    if (typeof window !== "undefined") {
      const stageWrap = stageWrapRef.current;
      if (stageWrap) {
        const top = stageWrap.getBoundingClientRect().top + window.scrollY;
        const totalDistance = (contentBlocks.length - 1) * 0.9 * window.innerHeight;
        const targetScroll = top + (index / (contentBlocks.length - 1)) * totalDistance;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const activeSlide =
    contentBlocks.find((b) => b.id === openSlideKey) || contentBlocks[0];

  return (
    <section
      id="origem-criativa"
      ref={containerRef}
      aria-labelledby="origin-heading"
      className="relative w-full bg-[#040013] text-[#fcffff] overflow-hidden"
    >
      {/* Stage Edge Gradient Masks */}
      <OriginMask />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-[10dvh] pb-[6dvh]">
        {/* Editorial Section Introduction */}
        <header className="mb-[6dvh] md:mb-[7dvh] text-center max-w-3xl mx-auto px-4 select-none">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]"
            />
            <span
              id="origin-eyebrow"
              className="font-mono text-xs uppercase tracking-[0.28em] font-semibold text-[#0048ff]"
            >
              {ORIGIN_INTRO.eyebrow}
            </span>
          </div>

          <h2
            id="origin-heading"
            className={`${playfair.className} text-[clamp(2.4rem,5dvh,4.25rem)] font-semibold leading-[1.02] text-[#0048ff] tracking-tight mb-4`}
          >
            {ORIGIN_INTRO.headline}
          </h2>

          <p className="font-sans text-body text-[#fcffff]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            {ORIGIN_INTRO.description}
          </p>
        </header>

        {/* Cinematic Cinema Reel Stage Frame (Widescreen 80dvh Dominant Visual Area) */}
        <div
          ref={stageWrapRef}
          className="relative w-full h-[76dvh] md:h-[80dvh] min-h-[500px] max-h-[880px]"
        >
          {contentBlocks.map((block, index) => (
            <CinemaReelStageFrame
              key={block.id}
              block={block}
              index={index}
              isActive={index === activeSceneIndex}
              playfairClassName={playfair.className}
              onExplore={handleExplore}
            />
          ))}
        </div>

        {/* Conceptual Bridge to Next Section */}
        <div className="pt-[8dvh] pb-[4dvh] mt-[6dvh] border-t border-white/10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#E50914]"
            />
            <span className="font-mono text-xs uppercase tracking-[0.24em] font-semibold text-[#0048ff]">
              {ORIGIN_BRIDGE.eyebrow}
            </span>
          </div>

          <p
            className={`${playfair.className} text-[clamp(1.5rem,3dvh,2.3rem)] italic font-normal text-white/95 leading-snug mb-5`}
          >
            {ORIGIN_BRIDGE.text}
          </p>

          <a
            href={ORIGIN_BRIDGE.ctaHref}
            className="inline-flex min-h-[48px] items-center gap-3 font-mono text-xs text-[#0048ff] hover:text-[#4fe6ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0048ff] transition-colors font-semibold uppercase tracking-[0.24em] group"
          >
            <span>{ORIGIN_BRIDGE.ctaText}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-1 text-[#E50914]"
            >
              ↓
            </span>
          </a>
        </div>
      </div>

      {/* Right Rail Navigation Pips (01..04) */}
      <CinemaReelRightRail
        total={contentBlocks.length}
        activeSceneIndex={activeSceneIndex}
        onPipClick={handlePipClick}
      />

      {/* Aside Details Panel (Cinema Reel Style) */}
      <DetailsPanel
        open={!!openSlideKey}
        slide={activeSlide}
        onClose={() => setOpenSlideKey(null)}
        playfairClassName={playfair.className}
      />
    </section>
  );
}

export { AboutOrigin };
