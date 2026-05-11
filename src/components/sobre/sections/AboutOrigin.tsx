'use client';

import { useRef } from 'react';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import { ORIGIN_CONTENT, FallbackImage } from '@/components/sobre/origin/data';
import {
  OriginInfoBlock,
  OriginStickyGallery,
} from '@/components/sobre/origin/OriginComponents';
import { useOriginAnimations } from '@/components/sobre/origin/useOriginAnimations';
import { useMotionGate } from '@/hooks/useMotionGate';

function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();

  const resolveFallbackHost = (path: FallbackImage) =>
    buildSupabaseStorageUrl('site-assets', path) ?? undefined;

  // Resolver cada imagem separadamente para seguir as regras de hooks
  const originImage1 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[0],
      resolveFallbackHost(ORIGIN_CONTENT[0].fallback)
    ) ?? resolveFallbackHost(ORIGIN_CONTENT[0].fallback);

  const originImage2 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[1],
      resolveFallbackHost(ORIGIN_CONTENT[1].fallback)
    ) ?? resolveFallbackHost(ORIGIN_CONTENT[1].fallback);

  const originImage3 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[2],
      resolveFallbackHost(ORIGIN_CONTENT[2].fallback)
    ) ?? resolveFallbackHost(ORIGIN_CONTENT[2].fallback);

  const originImage4 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[3],
      resolveFallbackHost(ORIGIN_CONTENT[3].fallback)
    ) ?? resolveFallbackHost(ORIGIN_CONTENT[3].fallback);

  const contentBlocks = [
    { ...ORIGIN_CONTENT[0], img: originImage1 },
    { ...ORIGIN_CONTENT[1], img: originImage2 },
    { ...ORIGIN_CONTENT[2], img: originImage3 },
    { ...ORIGIN_CONTENT[3], img: originImage4 },
  ];

  useOriginAnimations({
    isClient: true,
    archRef,
    archRightRef,
    contentCount: contentBlocks.length,
    prefersReducedMotion: !!prefersReducedMotion,
  });

  return (
    <section
      className="relative w-full transition-colors duration-bg"
      ref={containerRef}
      aria-labelledby="origin-heading"
    >
      <div className="std-grid py-16 md:py-24">
        <div className="mb-12 md:mb-24 text-center select-none">
          <h2 id="origin-heading" className="text-h1 font-bold leading-none text-bluePrimary tracking-[0.1em] md:tracking-[0.2em] uppercase">
            ORIGEM
          </h2>
        </div>

        <div
          className="relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8"
          ref={archRef}
        >
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col">
            {contentBlocks.map((block) => (
              <OriginInfoBlock key={block.id} block={block} />
            ))}
          </div>

          <OriginStickyGallery
            blocks={contentBlocks}
            archRightRef={archRightRef}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutOrigin;
