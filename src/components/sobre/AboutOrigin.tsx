'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/about-origin.module.css';
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

  return (
    <section
      className="relative w-full transition-colors duration-1000"
      ref={containerRef}
      aria-label="Origem Criativa"
    >
      <div className="std-grid py-24">
        <div className="mb-24 text-center select-none">
          <h2 className="text-h1 font-bold leading-none text-[#0048ff] tracking-[0.2em] uppercase">
            ORIGEM
          </h2>
        </div>

        <div
          className={`${styles.arch} relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12`}
          ref={archRef}
        >
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col">
            {contentBlocks.map((block) => (
              <OriginInfoBlock key={block.id} block={block} />
            ))}
          </div>

          {isClient ? (
            <OriginStickyGallery
              blocks={contentBlocks}
              archRightRef={archRightRef}
            />
          ) : (
            <div className="hidden lg:block lg:col-span-6 sticky top-24 h-fit space-y-10">
              {contentBlocks.map((block) => (
                <div key={block.id} className="overflow-hidden rounded-2xl">
                  <img
                    src={block.img}
                    alt={block.title}
                    width={1200}
                    height={1600}
                    className="w-full h-[420px] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutOrigin;
