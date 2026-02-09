'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';
import { useContentStore } from '@/store/content.store';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Helper to format URL
const toPublicUrl = (item: DbAsset) =>
  item.file_path?.startsWith('http')
    ? item.file_path
    : buildSupabaseStorageUrl(item.bucket || 'site-assets', item.file_path) || null;

export function useRealtimeAsset(assetKey: string) {
  const storeAsset = useContentStore((state) => state.assets[assetKey]);
  const upsertAsset = useContentStore((state) => state.upsertAsset);
  const [loading, setLoading] = useState(!storeAsset);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 1. If we have it in cache, we are good (optimistic). 
    // But we still subscribe for updates.
    if (storeAsset) setLoading(false);

    const supabase = createClientComponentClient();

    // 2. Initial Fetch (if needed)
    async function fetchInitial() {
      // Only fetch if not in cache OR if we want to ensure freshness
      // Simple strategy: Always fetch to support "stale-while-revalidate"
      const { data, error: fetchError } = await supabase
        .from('site_assets')
        .select('*')
        .eq('key', assetKey)
        .maybeSingle();

      if (fetchError) {
        setError(new Error(fetchError.message));
      }

      if (data) {
        upsertAsset(data as DbAsset);
      }
      setLoading(false);
    }

    fetchInitial();

    // 3. Subscription
    const channel = supabase
      .channel(`asset-${assetKey}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'site_assets',
        filter: `key=eq.${assetKey}`
      }, (payload: RealtimePostgresChangesPayload<DbAsset>) => {
        if (payload.eventType === 'DELETE') {
          // Handle delete if needed, or just keep stale
        } else {
          upsertAsset(payload.new as DbAsset);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [assetKey, upsertAsset, storeAsset]); // Added storeAsset dep to ensure we are reactive if needed

  const assetWithUrl = storeAsset ? {
    ...storeAsset,
    publicUrl: toPublicUrl(storeAsset) || ''
  } : null;

  return { asset: assetWithUrl, loading, error };
}
