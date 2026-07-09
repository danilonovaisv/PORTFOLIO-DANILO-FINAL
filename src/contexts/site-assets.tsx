'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { SiteAsset } from '@/lib/supabase/site-assets';
import { validateExternalUrl } from '@/lib/supabase/urls';

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
    'global.logo_header_light': 'site-assets/global/logos/LogoLight.svg',
    'global.logo_header_dark': 'site-assets/global/logos/LogoDark.svg',
    'global.logos.global.logo_header_light':
      'site-assets/global/logos/LogoLight.svg',
    'global.logos.global.logo_header_dark':
      'site-assets/global/logos/LogoDark.svg',
    'home.manifesto_video': 'site-assets/home/video.manifesto.desk.mp4',
    'home.manifesto_video_mobile':
      'site-assets/home/video.manifesto.mobile.mp4',
    // Posters: intentionally omitted — browser auto-generates from first video frame.
    // Add real poster paths here when dedicated poster assets are available.
    // 'home.manifesto_poster_desk': 'site-assets/home/poster.desk.webp',
    // 'home.manifesto_poster_mobile': 'site-assets/home/poster.mobile.webp',
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
    '3d.ghost-v1': '/site.assets/3d/ghost-v1.glb',
    'about.beliefs.ghost': '/site.assets/3d/ghost-v1.glb',
    'about.beliefs.ghost_model': '/site.assets/3d/ghost-v1.glb',
    'about.beliefs.ghost-transformed': '/site.assets/3d/ghost-v1.glb',
    'video.closing.desk': 'site-assets/about/closing/video.closing.desk.mp4',
    'video.closing.mobile':
      'site-assets/about/closing/video.closing.mobile.mp4',
    'about.Closing.video.closing.desk':
      'site-assets/about/closing/video.closing.desk.mp4',
    'about.Closing.video.closing.mobile':
      'site-assets/about/closing/video.closing.mobile.mp4',
  };

  if (context?.getUrl(key)) return context.getUrl(key);

  const toLocalAssetPath = (path: string) => {
    if (!path) return '';

    // Se já começar com a URL de produção ou local do site.assets, retornar como está
    if (path.startsWith('/site.assets/')) return path;

    let cleanPath = path.replace(/^\/+/, '');

    // Remover prefixos redundantes repetidamente
    while (
      cleanPath.startsWith('site.assets/') ||
      cleanPath.startsWith('site-assets/')
    ) {
      if (cleanPath.startsWith('site.assets/')) {
        cleanPath = cleanPath.slice('site.assets/'.length);
      } else {
        cleanPath = cleanPath.slice('site-assets/'.length);
      }
      cleanPath = cleanPath.replace(/^\/+/, '');
    }

    return `/site.assets/${cleanPath}`;
  };

  if (fallback) {
    if (fallback.startsWith('http://') || fallback.startsWith('https://')) {
      return fallback;
    }
    return toLocalAssetPath(fallback);
  }

  if (fallbackPaths[key]) {
    // Serve from local public/site.assets/ — no Supabase DNS required
    return toLocalAssetPath(fallbackPaths[key]);
  }

  return undefined;
}
