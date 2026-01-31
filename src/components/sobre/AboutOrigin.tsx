'use client';

import { useEffect, useRef, useState } from 'react';
import '@/styles/about-origin.css';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

import { ORIGIN_CONTENT, FallbackImage } from './origin/data';
import {
  OriginInfoBlock,
  OriginStickyGallery,
} from './origin/OriginComponents';
import { useOriginAnimations } from './origin/useOriginAnimations';

function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    isClient,
    archRef,
    archRightRef,
    contentCount: contentBlocks.length,
  });

  if (!isClient) {
    return (
      <section className="relative w-full overflow-hidden transition-colors duration-1000">
        <div className="max-w-420 mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
          <div className="mb-24 text-center select-none">
            <h1 className="text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase">
              LOADING...
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-1000"
      ref={containerRef}
    >
      <div className="max-w-420 mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
        <div className="mb-24 text-center select-none">
          <h1 className="text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase">
            ORIGEM
          </h1>
        </div>

        <div
          className="arch relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 max-w-360 mx-auto"
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
