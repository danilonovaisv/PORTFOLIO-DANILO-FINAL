'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { SiteAsset } from '@/lib/supabase/site-assets';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
  validateExternalUrl,
} from '@/lib/supabase/urls';

type SiteAssetsContextValue = {
  getUrl: (_key: string) => string | undefined;
  getAssetsByPrefix: (_prefix: string) => SiteAsset[];
  getAssetWithValidation: (_key: string) => SiteAsset | undefined;
};

const SiteAssetsContext = createContext<SiteAssetsContextValue | null>(null);

export function SiteAssetsProvider({
  assets,
  children,
}: {
  assets: SiteAsset[];
  children: ReactNode;
}) {
  const assetsMap = useMemo(() => {
    const map: Record<string, SiteAsset> = {};
    assets.forEach((asset) => {
      // Validar href se existir
      if (asset.href) {
        const validatedHref = validateExternalUrl(asset.href);
        map[asset.key] = {
          ...asset,
          href: validatedHref,
        };
      } else {
        map[asset.key] = asset;
      }
    });
    return map;
  }, [assets]);

  const value = useMemo<SiteAssetsContextValue>(() => {
    const entries = Object.values(assetsMap);
    return {
      getUrl: (key: string) => assetsMap[key]?.publicUrl,
      getAssetsByPrefix: (prefix: string) =>
        entries.filter((asset) => asset.key.startsWith(prefix)),
      getAssetWithValidation: (key: string) => {
        const asset = assetsMap[key];
        if (asset?.href) {
          const validatedHref = validateExternalUrl(asset.href);
          return validatedHref ? { ...asset, href: validatedHref } : asset;
        }
        return asset;
      },
    };
  }, [assetsMap]);

  return (
    <SiteAssetsContext.Provider value={value}>
      {children}
    </SiteAssetsContext.Provider>
  );
}

export function useSiteAssetUrl(key: string, fallback?: string) {
  const context = useContext(SiteAssetsContext);

  // Fallbacks para vídeos conhecidos quando o asset não vem do Supabase (ex.: falha de fetch)
  const fallbackPaths: Record<string, string> = {
    'home.manifesto_video': 'site-assets/home/home.manifesto_video.mp4',
    'home.manifesto_video_mobile':
      'site-assets/home/home.manifesto_video_mobile.mp4',
    'home.manifesto_poster_desk': 'site-assets/home/video.manifesto.desk.webp',
    'home.manifesto_poster_mobile':
      'site-assets/home/video.manifesto.mobile.webp',
    'about.hero.desktop_video.mp4':
      'site-assets/about/about.hero.desktop_video.mp4',
    'about.hero.mobile_video.mp4':
      'site-assets/about/about.hero.mobile_video.mp4',
    'about.method_video': 'site-assets/about/about.method_video.mp4',
    'portfolio.hero_desktop_video':
      'site-assets/portfolio/portfolio.hero_desktop_video.mp4',
    'portfolio.hero_mobile_video':
      'site-assets/portfolio/portfolio.hero_mobile_video.mp4',
    'about.beliefs.VIDEO-SKILLS-FINAL_compressed.mp4':
      'site-assets/about/beliefs/VIDEO-SKILLS-FINAL_compressed.mp4',
    'about.beliefs.VIDEO-SKILLS-MOBILE-FINAL.mp4':
      'site-assets/about/beliefs/VIDEO-SKILLS-MOBILE-FINAL.mp4',
    'about.beliefs.ghost-transformed': 'site-assets/about/beliefs/ghost.glb',
  };

  if (context?.getUrl(key)) return context.getUrl(key);

  if (fallback) {
    if (fallback.startsWith('http://') || fallback.startsWith('https://')) {
      return fallback;
    }
    const normalizedFallback = normalizeStoragePath(fallback, 'site-assets');
    return buildSupabaseStorageUrl(
      'site-assets',
      normalizedFallback ?? fallback
    );
  }

  if (fallbackPaths[key]) {
    const normalizedFallback = normalizeStoragePath(
      fallbackPaths[key],
      'site-assets'
    );
    return (
      buildSupabaseStorageUrl(
        'site-assets',
        normalizedFallback ?? fallbackPaths[key]
      ) ?? undefined
    );
  }

  return undefined;
}

export function useSiteAssetsByPrefix(prefix: string) {
  const context = useContext(SiteAssetsContext);
  return context?.getAssetsByPrefix(prefix) ?? [];
}

export function useValidatedAsset(key: string) {
  const context = useContext(SiteAssetsContext);
  return context?.getAssetWithValidation(key);
}
