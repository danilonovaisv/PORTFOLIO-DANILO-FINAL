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
          href: validatedHref
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
          return validatedHref ? {...asset, href: validatedHref} : asset;
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
  return context?.getUrl(key) ?? fallback;
}

export function useSiteAssetsByPrefix(prefix: string) {
  const context = useContext(SiteAssetsContext);
  return context?.getAssetsByPrefix(prefix) ?? [];
}

export function useValidatedAsset(key: string) {
  const context = useContext(SiteAssetsContext);
  return context?.getAssetWithValidation(key);
}