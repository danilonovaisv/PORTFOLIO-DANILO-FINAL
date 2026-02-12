'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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

// Smart Polling Config
const POLLING_CONFIG = {
  activeInterval: 15000,   // 15 seconds when active
  backgroundInterval: 300000, // 5 minutes when background
  maxBackoff: 600000,      // 10 minutes max
};

export function useRealtimeAsset(assetKey: string) {
  const storeAsset = useContentStore((state) => state.assets[assetKey]);
  const upsertAsset = useContentStore((state) => state.upsertAsset);
  const [loading, setLoading] = useState(!storeAsset);
  const [error, setError] = useState<Error | null>(null);

  // Refs for polling management
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backoffCountRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Define fetchInitial outside useEffect for reuse
  const fetchInitial = useCallback(async (isMounted: () => boolean) => {
    // Only fetch if not in cache OR if we want to ensure freshness
    const supabase = createClientComponentClient();

    // Check if we should even fetch (e.g. if tab is hidden, skip unless forced)
    // But for initial load we always fetch.

    const { data, error: fetchError } = await supabase
      .from('site_assets')
      .select('*')
      .eq('key', assetKey)
      .maybeSingle();

    if (!isMounted()) return;

    if (fetchError) {
      setError(new Error(fetchError.message));
      // Increase backoff on error
      backoffCountRef.current++;
    }

    if (data) {
      upsertAsset(data as DbAsset);
      // Reset backoff on success
      backoffCountRef.current = 0;
    }

    setLoading(false);
  }, [assetKey, upsertAsset]);

  useEffect(() => {
    // 1. Optimistic Cache
    if (storeAsset) setLoading(false);

    const supabase = createClientComponentClient();
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let isDisposed = false;
    const isMounted = () => !isDisposed;

    // --- Polling Logic ---
    const scheduleNextPoll = () => {
      if (isDisposed) return;
      if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);

      let delay = POLLING_CONFIG.activeInterval;

      // Logic: If hidden, use long interval. If error backoff, increase.
      if (!isVisibleRef.current) {
        delay = POLLING_CONFIG.backgroundInterval;
      }

      // Add simple backoff factor (capped)
      if (backoffCountRef.current > 0) {
        delay = Math.min(delay * (backoffCountRef.current + 1), POLLING_CONFIG.maxBackoff);
      }

      pollingTimerRef.current = setTimeout(() => {
        void fetchInitial(isMounted).then(() => {
          scheduleNextPoll(); // Reschedule after complete
        });
      }, delay);
    };

    const stopPolling = () => {
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
    };

    // Visibility Handler
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';

      if (isVisibleRef.current) {
        // Came to foreground: Poll immediately if it's been a while, or just restart schedule
        // For simplicity: restart schedule with short delay to feel "responsive"
        stopPolling();
        backoffCountRef.current = 0; // Reset backoff on user interaction
        void fetchInitial(isMounted).then(() => scheduleNextPoll());
      } else {
        // Went to background: Stop current timer and switch to slow poll
        stopPolling();
        scheduleNextPoll();
      }
    };

    // Initial calls
    isVisibleRef.current = document.visibilityState === 'visible';
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange); // Extra responsiveness

    void fetchInitial(isMounted).then(() => {
      if (isDisposed) return;
      scheduleNextPoll();
    });

    // --- Realtime Subscription ---
    const initializeSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token && !isDisposed) {
          supabase.realtime.setAuth(session.access_token);
        }
      } catch (authError) {
        if (!isDisposed) console.error('[useRealtimeAsset] Auth config failed:', authError);
      }

      if (isDisposed) return;

      channel = supabase
        .channel(`site_assets_${assetKey}`) // Unique channel per asset to avoid conflicts? Or single channel? 'site_assets' is fine for broadcast if filtered.
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
            // If realtime works, we can relax polling even more?
            // For now, keep "activeInterval" as 15s is not too aggressive.
            // But if functionality assumes realtime is primary, we could stop polling.
            // The original code stopped polling on SUBSCRIBED.
            // Let's keep that optimization but maintain visibility check for "reconnect".
            // Actually, let's keep polling as backup/sync.
            // stopPolling(); // Removed to allow polling as backup
          }

          if (
            status === 'TIMED_OUT' ||
            status === 'CHANNEL_ERROR' ||
            status === 'CLOSED'
          ) {
            if (err && !isDisposed) {
              console.warn('[useRealtimeAsset] Subscription error:', err);
              // Don't set main Error state, just relying on polling
            }
            // Ensure polling is active
            if (!pollingTimerRef.current) scheduleNextPoll();
          }
        });
    };

    void initializeSubscription();

    return () => {
      isDisposed = true;
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [assetKey, upsertAsset, fetchInitial, storeAsset]); // Added missing deps

  const assetWithUrl = storeAsset
    ? {
      ...storeAsset,
      publicUrl: toPublicUrl(storeAsset) || '',
    }
    : null;

  return { asset: assetWithUrl, loading, error };
}
