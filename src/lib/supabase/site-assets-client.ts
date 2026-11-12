'use client';

import type { DbAsset } from '@/types/admin';
import {
  normalizeAssetList,
  type NormalizedSiteAsset,
} from '@/lib/supabase/site-asset-utils';

export type SiteAsset = NormalizedSiteAsset;

export async function getClientSiteAssets(): Promise<SiteAsset[]> {
  const response = await fetch('/api/site-assets');
  if (!response.ok) {
    throw new Error(`Failed to load site assets (${response.status})`);
  }

  const records = (await response.json()) as DbAsset[];
  return normalizeAssetList(records ?? [], { onlyActive: true }) as SiteAsset[];
}
