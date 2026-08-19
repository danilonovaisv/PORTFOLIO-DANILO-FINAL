'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';
import { useContentStore } from '@/store/content.store';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

// --- Singleton Subscription Manager ---
let globalChannel: ReturnType<
  ReturnType<typeof createClientComponentClient>['channel']
> | null = null;
let subscribersCount = 0;
let unsubscribeTimeout: ReturnType<typeof setTimeout> | null = null;
let isConnecting = false;

const subscribeToAssets = async () => {
  if (unsubscribeTimeout) {
    clearTimeout(unsubscribeTimeout);
    unsubscribeTimeout = null;
  }

  subscribersCount++;

  if (!globalChannel && !isConnecting) {
    isConnecting = true;
    const supabase = createClientComponentClient();

    try {
      // Setup Auth if available
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        supabase.realtime.setAuth(session.access_token);
      }
    } catch (e) {
      console.warn('[useRealtimeAssets] Auth setup optional check failed', e);
    }

    // Double check if still needed (in case all unmounted during await)
    if (subscribersCount <= 0) {
      isConnecting = false;
      return;
    }

    globalChannel = supabase
      .channel('site_assets_global')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_assets' },
        (payload: any) => {
          const newItem = payload.new as DbAsset;
          // Only process valid updates
          if (newItem && typeof newItem === 'object') {
            useContentStore.getState().upsertAsset(newItem);
          }
        }
      )
      .subscribe((status: string, err?: Error | undefined) => {
        if (
          status === 'CHANNEL_ERROR' ||
          status === 'TIMED_OUT' ||
          status === 'CLOSED'
        ) {
          console.warn(
            `[useRealtimeAssets] Global subscription status: ${status}`,
            err
          );
        }
      });

    isConnecting = false;
  }
};

const unsubscribeFromAssets = () => {
  subscribersCount = Math.max(0, subscribersCount - 1);
  if (subscribersCount <= 0) {
    if (unsubscribeTimeout) clearTimeout(unsubscribeTimeout);

    unsubscribeTimeout = setTimeout(async () => {
      if (subscribersCount <= 0 && globalChannel) {
        const supabase = createClientComponentClient();
        await supabase.removeChannel(globalChannel);
        globalChannel = null;
      }
    }, 5000); // 5s debounce
  }
};

// Helper to format URL
const toPublicUrl = (item: DbAsset) => {
  const isExternal = item.file_path?.startsWith('http');
  if (isExternal) return item.file_path;

  const generatedUrl = buildSupabaseStorageUrl(
    item.bucket || 'site-assets',
    item.file_path
  );
  if (!generatedUrl) return null;

  // v4 paths use hashes in the filename and are immutable. No cache buster needed.
  if (item.file_path?.startsWith('v4/')) {
    return generatedUrl;
  }

  // Legacy paths or site-assets without hash still need cache busting for upserts
  return `${generatedUrl}?t=${new Date(item.updated_at || Date.now()).getTime()}`;
};

// Smart Polling Config
const POLLING_CONFIG = {
  activeInterval: 15000, // 15 seconds when active
  backgroundInterval: 300000, // 5 minutes when background
  maxBackoff: 600000, // 10 minutes max
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
  const upsertAsset = useContentStore((state) => state.upsertAsset);
  const [loading, setLoading] = useState(enabled && !storeAsset);
  const [error, setError] = useState<Error | null>(null);

  // Refs for polling management
  const pollingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backoffCountRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Define fetchInitial outside useEffect for reuse
  const fetchInitial = useCallback(
    async (isMounted: () => boolean, force = false) => {
      // Guarda: se já existe no store com bucket e file_path e não é chamada forçada, evita re-fetch desnecessário
      if (!force) {
        const cached = useContentStore.getState().assets[assetKey];
        if (cached && cached.bucket && cached.file_path) {
          if (isMounted()) {
            setLoading(false);
          }
          return;
        }
      }

      const supabase = createClientComponentClient();

      const { data, error: fetchError } = await supabase
        .from('site_assets')
        .select('key, bucket, file_path, updated_at')
        .eq('key', assetKey)
        .maybeSingle();

      if (!isMounted()) return;

      if (fetchError) {
        setError(new Error(fetchError.message));
        // Increase backoff on error
        backoffCountRef.current++;
      }

      if (data) {
        setError(null);
        upsertAsset(data as DbAsset);
        // Reset backoff on success
        backoffCountRef.current = 0;
      }

      setLoading(false);
    },
    [assetKey, upsertAsset]
  );

  // 1. State Sync Effect: Handle loading state based on store presence
  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    if (storeAsset) {
      setLoading(false);
    }
  }, [enabled, storeAsset]);

  // 2. Polling & Subscription Effect: Manage lifecycle independent of store updates
  useEffect(() => {
    if (!enabled || !assetKey) {
      setLoading(false);
      return;
    }

    let isDisposed = false;
    const isMounted = () => !isDisposed;

    // --- Polling Logic ---
    const scheduleNextPoll = () => {
      if (isDisposed) return;
      if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);

      // Se o asset já está em cache com dados válidos, não precisa de polling ativo agressivo
      const cached = useContentStore.getState().assets[assetKey];
      if (cached && cached.bucket && cached.file_path) {
        return;
      }

      let delay = POLLING_CONFIG.activeInterval;

      // Logic: If hidden, use long interval. If error backoff, increase.
      if (!isVisibleRef.current) {
        delay = POLLING_CONFIG.backgroundInterval;
      }

      // Add simple backoff factor (capped)
      if (backoffCountRef.current > 0) {
        delay = Math.min(
          delay * (backoffCountRef.current + 1),
          POLLING_CONFIG.maxBackoff
        );
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
        // Se ainda não temos o asset em cache, tenta buscar
        const cached = useContentStore.getState().assets[assetKey];
        if (!cached || !cached.bucket || !cached.file_path) {
          stopPolling();
          backoffCountRef.current = 0; // Reset backoff on user interaction
          void fetchInitial(isMounted).then(() => scheduleNextPoll());
        }
      } else {
        stopPolling();
      }
    };

    // Initial calls
    isVisibleRef.current = document.visibilityState === 'visible';
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange); // Extra responsiveness

    const initialCached = useContentStore.getState().assets[assetKey];
    if (!initialCached || !initialCached.bucket || !initialCached.file_path) {
      void fetchInitial(isMounted).then(() => {
        if (isDisposed) return;
        scheduleNextPoll();
      });
    } else {
      setLoading(false);
    }

    // --- Join Global Subscription ---
    void subscribeToAssets();

    return () => {
      isDisposed = true;
      stopPolling();
      unsubscribeFromAssets();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [assetKey, enabled, fetchInitial]); // Removed storeAsset to prevent re-execution on updates

  const assetWithUrl = storeAsset
    ? {
        ...storeAsset,
        publicUrl: toPublicUrl(storeAsset) || '',
      }
    : null;

  return { asset: assetWithUrl, loading, error };
}
