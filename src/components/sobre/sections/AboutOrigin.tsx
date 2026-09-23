'use client';

import { useRef, useState } from 'react';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import {
  ORIGIN_CONTENT,
  ORIGIN_INTRO,
  ORIGIN_BRIDGE,
} from '@/components/sobre/origin/data';
import {
  OriginInfoBlock,
  OriginStickyGallery,
} from '@/components/sobre/origin/OriginComponents';
import { useOriginAnimations } from '@/components/sobre/origin/useOriginAnimations';
import { useMotionGate } from '@/hooks/useMotionGate';

export function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Resolver cada imagem consolidada separadamente como fallback
  const originImage1 = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.originImages[0],
    ORIGIN_CONTENT[0].fallback
  );

  const originImage2 = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.originImages[1],
    ORIGIN_CONTENT[1].fallback
  );

  const originImage3 = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.originImages[2],
    ORIGIN_CONTENT[2].fallback
  );

  const originImage4 = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.originImages[3],
    ORIGIN_CONTENT[3].fallback
  );

  const contentBlocks = [
    // First image is candidate for /sobre — priority: true prevents lazy-load penalty.
    { ...ORIGIN_CONTENT[0], img: originImage1, priority: true },
    { ...ORIGIN_CONTENT[1], img: originImage2, priority: false },
    { ...ORIGIN_CONTENT[2], img: originImage3, priority: false },
    { ...ORIGIN_CONTENT[3], img: originImage4, priority: false },
  ];

  useOriginAnimations({
    isClient: true,
    archRef,
    archRightRef,
    contentCount: contentBlocks.length,
    prefersReducedMotion: !!prefersReducedMotion,
    onActiveSceneChange: setActiveSceneIndex,
  });

  return (
    <section
      className="relative w-full transition-colors duration-bg"
      ref={containerRef}
      aria-labelledby="origin-heading"
    >
      <div className="std-grid py-16 md:py-24">
        {/* Editorial Section Introduction */}
        <div className="mb-14 md:mb-20 text-center max-w-3xl mx-auto px-4 select-none">
          <span
            id="origin-eyebrow"
            className="text-xs uppercase tracking-[0.25em] font-semibold text-bluePrimary mb-3 block"
          >
            {ORIGIN_INTRO.eyebrow}
          </span>
          <h2
            id="origin-heading"
            className="text-h1 font-bold leading-tight text-white tracking-tight mb-4"
          >
            {ORIGIN_INTRO.headline}
          </h2>
          <p className="text-body text-white/60 leading-relaxed font-normal">
            {ORIGIN_INTRO.description}
          </p>
        </div>

        {/* Narrative Split Stage (Left: Storytelling, Right: Sticky 4-Layer Stage) */}
        <div
          className="relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8"
          ref={archRef}
        >
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col">
            {contentBlocks.map((block) => (
              <OriginInfoBlock key={block.id} block={block} />
            ))}

            {/* Conceptual Bridge to Next Section */}
            <div className="pt-16 pb-12 mt-8 border-t border-white/10 px-4 lg:px-0">
              <span className="text-xs uppercase tracking-widest font-semibold text-bluePrimary/80 block mb-2">
                CONTINUIDADE
              </span>
              <p className="text-h3 font-medium text-white/90 leading-snug mb-4">
                {ORIGIN_BRIDGE.text}
              </p>
              <a
                href={ORIGIN_BRIDGE.ctaHref}
                className="inline-flex items-center gap-2 text-sm text-bluePrimary hover:text-blueAccent transition-colors font-semibold uppercase tracking-wider group"
              >
                <span>{ORIGIN_BRIDGE.ctaText}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>

          <OriginStickyGallery
            blocks={contentBlocks}
            archRightRef={archRightRef}
            activeSceneIndex={activeSceneIndex}
          />
        </div>
      </div>
    </section>
  );
}
