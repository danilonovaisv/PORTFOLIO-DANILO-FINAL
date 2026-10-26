'use client';

import { useRef, useState, useEffect } from 'react';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import {
  ORIGIN_CONTENT,
  ORIGIN_INTRO,
  ORIGIN_BRIDGE,
  ORIGIN_PARTICLE_STAGES,
} from '@/components/sobre/origin/data';
import {
  OriginInfoBlock,
} from '@/components/sobre/origin/OriginComponents';
import { useOriginParticleAnimations } from '@/components/sobre/origin/useOriginParticleAnimations';
import { useMotionGate } from '@/hooks/useMotionGate';
import { OriginParticleScene3D } from '@/components/sobre/origin/OriginParticleScene3D';

export function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const [bgColor, setBgColor] = useState(ORIGIN_PARTICLE_STAGES[0].bgColor);

  useEffect(() => {
    document.documentElement.style.setProperty('--origin-bg-color', bgColor);
  }, [bgColor]);

  useOriginParticleAnimations({
    isClient: true,
    archRef,
    archRightRef,
    contentCount: contentBlocks.length,
    prefersReducedMotion: !!prefersReducedMotion,
    particleStages: ORIGIN_PARTICLE_STAGES,
    onActiveStageChange: setActiveSceneIndex,
    onBgColorChange: setBgColor,
  });

  // Track scroll progress for 3D particle morph
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.target.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementHeight = rect.height;

        // Calculate progress based on how much of the element is visible
        // Progress goes from 0 to 1 as the element scrolls through the viewport
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(elementHeight, viewportHeight - rect.top);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const progress = visibleHeight / elementHeight;

        // Map the element's position in viewport to 0-1 progress
        // When top of element is at bottom of viewport: progress = 0
        // When bottom of element is at top of viewport: progress = 1
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const progressFromTop = Math.max(0, Math.min(1, (viewportHeight - elementTop) / (viewportHeight + elementHeight)));

        setScrollProgress(progressFromTop);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full transition-colors duration-bg"
      ref={containerRef}
      aria-labelledby="origin-heading"
      style={
        {
          backgroundColor: `var(--origin-bg-color, ${ORIGIN_PARTICLE_STAGES[0].bgColor})`,
        } as React.CSSProperties
      }
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

        {/* Narrative Split Stage (Left: Storytelling, Right: 3D Particle Stage) */}
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

          {/* 3D Particle Scene - Replaces OriginStickyGallery */}
          <div
            className="hidden lg:flex lg:col-span-6 lg:h-screen lg:sticky lg:top-0 lg:items-center lg:justify-center pointer-events-none"
            ref={archRightRef}
            data-testid="origin-sticky-gallery"
          >
            <div className="origin-gallery-container relative w-full max-w-3xl h-[80vh]">
              {/* Desktop Stage HUD / Minimalist Editorial Indicator */}
              <div className="absolute -top-12 left-0 right-0 flex items-center justify-between z-20 px-2 pointer-events-auto select-none">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-bluePrimary tracking-wider">
                    0{activeSceneIndex + 1} / 0{contentBlocks.length}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs uppercase font-semibold tracking-[0.2em] text-white/70">
                    {ORIGIN_PARTICLE_STAGES[activeSceneIndex]?.name || ''}
                  </span>
                </div>

                {/* Minimalist Editorial Progress Bar */}
                <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bluePrimary transition-all duration-500 ease-out"
                    style={{ width: `${((activeSceneIndex + 1) / contentBlocks.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 3D Particle Scene - Morphs based on scroll progress */}
              <OriginParticleScene3D
                config={ORIGIN_PARTICLE_STAGES[activeSceneIndex]}
                isActive={true}
                fallbackImage={
                  contentBlocks[activeSceneIndex]?.img || `/site.assets/${ORIGIN_CONTENT[activeSceneIndex]?.fallback}`
                }
                priority={activeSceneIndex === 0}
                scrollProgress={scrollProgress}
              />

              {/* Accessibility: hidden role=img for test */}
              <div role="img" aria-label={`Composição visual ${ORIGIN_PARTICLE_STAGES[activeSceneIndex]?.name}`} className="sr-only" />

              {/* Bottom Contextual Caption */}
              <div className="absolute -bottom-9 left-2 right-2 flex items-center justify-between z-20 pointer-events-auto">
                <p className="text-xs text-white/50 italic truncate">
                  {ORIGIN_CONTENT[activeSceneIndex]?.caption || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
