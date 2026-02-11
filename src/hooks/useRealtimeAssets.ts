'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';
import { useContentStore } from '@/store/content.store';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

// import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Helper to format URL
const toPublicUrl = (item: DbAsset) =>
  item.file_path?.startsWith('http')
    ? item.file_path
    : buildSupabaseStorageUrl(item.bucket || 'site-assets', item.file_path) ||
    null;

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
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let pollingId: ReturnType<typeof setInterval> | null = null;
    let isDisposed = false;

    const stopPolling = () => {
      if (pollingId) {
        clearInterval(pollingId);
        pollingId = null;
      }
    };

    const startPolling = () => {
      if (pollingId) return;
      pollingId = setInterval(() => {
        void fetchInitial();
      }, 15000);
    };

    // 2. Initial Fetch (if needed)
    async function fetchInitial() {
      // Only fetch if not in cache OR if we want to ensure freshness
      // Simple strategy: Always fetch to support "stale-while-revalidate"
      const { data, error: fetchError } = await supabase
        .from('site_assets')
        .select('*')
        .eq('key', assetKey)
        .maybeSingle();

      if (fetchError && !isDisposed) {
        setError(new Error(fetchError.message));
      }

      if (data && !isDisposed) {
        upsertAsset(data as DbAsset);
      }
      if (!isDisposed) {
        setLoading(false);
      }
    }

    startPolling();
    void fetchInitial();

    const initializeSubscription = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          supabase.realtime.setAuth(session.access_token);
        }
      } catch (authError) {
        console.error(
          '[useRealtimeAsset] Failed to configure realtime auth:',
          authError
        );
      }

      if (isDisposed) return;

      // 3. Subscription (Broadcast)
      // We listen to the 'site_assets' channel (TG_TABLE_NAME) and filter events.
      channel = supabase
        .channel('site_assets', {
          config: {
            broadcast: { self: false, ack: true },
          },
        })
        .on(
          'broadcast',
          { event: 'site_assets' },
          (payload: { payload?: { new?: DbAsset } }) => {
            const newData = payload.payload?.new;

            if (newData && newData.key === assetKey) {
              upsertAsset(newData);
              setLoading(false);
              setError(null);
            }
          }
        )
        .subscribe((status: string, err?: Error) => {
          if (status === 'SUBSCRIBED') {
            stopPolling();
            return;
          }

          if (
            status === 'TIMED_OUT' ||
            status === 'CHANNEL_ERROR' ||
            status === 'CLOSED'
          ) {
            if (err && !isDisposed) {
              setError(
                new Error(
                  err.message || 'Falha na subscription de assets em realtime.'
                )
              );
            }
            startPolling();
          }
        });
    };

    void initializeSubscription();

    return () => {
      isDisposed = true;
      stopPolling();
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [assetKey, upsertAsset]); // FIXED: Removed storeAsset from deps to avoid infinite loop

  const assetWithUrl = storeAsset
    ? {
      ...storeAsset,
      publicUrl: toPublicUrl(storeAsset) || '',
    }
    : null;

  return { asset: assetWithUrl, loading, error };
}
