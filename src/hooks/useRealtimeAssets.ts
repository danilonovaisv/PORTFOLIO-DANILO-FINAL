'use client';

import { useEffect, useState } from 'react';
import type { DbAsset } from '@/types/admin';
import { useContentStore } from '@/store/content.store';
import { getAssetUrl } from '@/lib/utils';

let assetsFetchPromise: Promise<void> | null = null;

async function ensureSiteAssetsHydrated(): Promise<void> {
  const existingAssets = useContentStore.getState().assets;
  if (Object.keys(existingAssets).length > 0) {
    return;
  }

  if (!assetsFetchPromise) {
    assetsFetchPromise = fetch('/api/site-assets')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch /api/site-assets (${res.status})`);
        }
        const data = (await res.json()) as DbAsset[];
        if (Array.isArray(data)) {
          useContentStore.getState().setAssets(data);
        }
      })
      .finally(() => {
        assetsFetchPromise = null;
      });
  }

  return assetsFetchPromise;
}

const toPublicUrl = (item: DbAsset) => {
  const candidateFileUrl = (item as DbAsset & { file_url?: string | null })
    .file_url;
  if (candidateFileUrl) {
    return getAssetUrl(candidateFileUrl);
  }
  const bucket = item.bucket || 'site-assets';
  const filePath = item.file_path || '';
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath) || filePath.startsWith('/')) {
    return getAssetUrl(filePath);
  }
  const prefixed = filePath.startsWith(`${bucket}/`)
    ? filePath
    : `${bucket}/${filePath.replace(/^\/+/, '')}`;
  return getAssetUrl(prefixed);
};

export interface RealtimeAssetResult {
  asset: (DbAsset & { publicUrl: string }) | null;
  loading: boolean;
  error: Error | null;
}

export function useRealtimeAsset(
  assetKey: string,
  options?: { enabled?: boolean }
): RealtimeAssetResult {
  const enabled = options?.enabled ?? true;
  const storeAsset = useContentStore((state) => state.assets[assetKey]);
  const [loading, setLoading] = useState<boolean>(enabled && !storeAsset);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !assetKey) {
      setLoading(false);
      return;
    }

    if (storeAsset) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void ensureSiteAssetsHydrated()
      .then(() => {
        if (!cancelled) {
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [assetKey, enabled, storeAsset]);

  const assetWithUrl = storeAsset
    ? {
        ...storeAsset,
        publicUrl: toPublicUrl(storeAsset) || '',
      }
    : null;

  return { asset: assetWithUrl, loading, error };
}
