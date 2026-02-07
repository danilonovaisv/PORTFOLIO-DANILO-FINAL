'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import type { DbAsset } from '@/types/admin';
import type { RealtimeChannel } from '@supabase/supabase-js';

type AssetMetadata = {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: unknown;
};

export type RealtimeAsset = DbAsset & {
  publicUrl: string;
  metadata?: AssetMetadata | null;
};

/**
 * Hook to subscribe to real-time updates for a specific asset by key.
 * Automatically updates when the asset is modified in the database.
 */
export function useRealtimeAsset(assetKey: string) {
  const [asset, setAsset] = useState<RealtimeAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let supabase: ReturnType<typeof createClientComponentClient> | null = null;
    let channel: RealtimeChannel;

    const toPublicUrl = (item: DbAsset) =>
      item.file_path?.startsWith('http')
        ? item.file_path
        : buildSupabaseStorageUrl(item.bucket || 'site-assets', item.file_path) ||
          null;

    async function fetchInitial() {
      try {
        if (!supabase) {
          supabase = createClientComponentClient();
        }
        const { data, error: fetchError } = await supabase
          .from('site_assets')
          .select('*')
          .eq('key', assetKey)
          .eq('is_active', true)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            return;
          }
          throw fetchError;
        }

        if (data) {
          const publicUrl = toPublicUrl(data as DbAsset);
          if (publicUrl) {
            setAsset({ ...data, publicUrl } as RealtimeAsset);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch asset')
        );
      } finally {
        setLoading(false);
      }
    }

    function setupRealtimeSubscription() {
      try {
        if (!supabase) {
          supabase = createClientComponentClient();
        }
        channel = supabase
          .channel(`asset:${assetKey}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'site_assets',
              filter: `key=eq.${assetKey}`,
            },
            (payload: { eventType: string; new: DbAsset; old: DbAsset }) => {
              if (payload.eventType === 'DELETE') {
                setAsset(null);
                return;
              }

              const newData = payload.new as DbAsset;
              if (newData && newData.is_active) {
                const publicUrl = toPublicUrl(newData);
                if (publicUrl) {
                  setAsset({ ...newData, publicUrl } as RealtimeAsset);
                }
              } else if (payload.eventType === 'UPDATE' && !newData.is_active) {
                setAsset(null);
              }
            }
          )
          .subscribe((status: string, err?: Error) => {
            if (status === 'CHANNEL_ERROR') {
              console.error('[useRealtimeAsset] Subscription error:', err);
            }
          });
      } catch (subError) {
        console.error('[useRealtimeAsset] Failed to subscribe:', subError);
      }
    }

    fetchInitial();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [assetKey]);

  return { asset, loading, error };
}

/**
 * Hook to subscribe to all assets for a specific page.
 * Useful for loading multiple assets at once.
 */
export function useRealtimeAssets(page?: string) {
  const [assets, setAssets] = useState<RealtimeAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let supabase: ReturnType<typeof createClientComponentClient> | null = null;
    let channel: RealtimeChannel;

    const toPublicUrl = (item: DbAsset) =>
      item.file_path?.startsWith('http')
        ? item.file_path
        : buildSupabaseStorageUrl(item.bucket || 'site-assets', item.file_path) ||
          null;

    async function fetchInitial() {
      try {
        if (!supabase) {
          supabase = createClientComponentClient();
        }
        let query = supabase
          .from('site_assets')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true, nullsFirst: false });

        if (page) {
          query = query.eq('page', page);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        const assetsWithUrls = (data ?? [])
          .map((item: DbAsset) => {
            const publicUrl = toPublicUrl(item);
            return publicUrl ? ({ ...item, publicUrl } as RealtimeAsset) : null;
          })
          .filter(
            (item: RealtimeAsset | null): item is RealtimeAsset =>
              Boolean(item)
          );

        setAssets(assetsWithUrls);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch assets')
        );
      } finally {
        setLoading(false);
      }
    }

    function setupRealtimeSubscription() {
      try {
        if (!supabase) {
          supabase = createClientComponentClient();
        }
        const channelName = page ? `assets:${page}` : 'assets:all';

        const channelBuilder = supabase.channel(channelName).on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'site_assets',
            ...(page ? { filter: `page=eq.${page}` } : {}),
          },
          (payload: { eventType: string; new: DbAsset; old: DbAsset }) => {
            if (payload.eventType === 'INSERT') {
              const newData = payload.new as DbAsset;
              if (newData.is_active) {
                const publicUrl = toPublicUrl(newData);
                if (!publicUrl) return;

                setAssets((prev) => [
                  ...prev,
                  { ...newData, publicUrl } as RealtimeAsset,
                ]);
              }
            } else if (payload.eventType === 'UPDATE') {
              const updatedData = payload.new as DbAsset;
              setAssets((prev) => {
                if (!updatedData.is_active) {
                  return prev.filter((a) => a.id !== updatedData.id);
                }

                const publicUrl = toPublicUrl(updatedData);
                if (!publicUrl) return prev;

                return prev.map((a) =>
                  a.id === updatedData.id
                    ? ({ ...updatedData, publicUrl } as RealtimeAsset)
                    : a
                );
              });
            } else if (payload.eventType === 'DELETE') {
              const oldData = payload.old as DbAsset;
              setAssets((prev) => prev.filter((a) => a.id !== oldData.id));
            }
          }
        );

        channel = channelBuilder.subscribe((status: string, err?: Error) => {
          if (status === 'CHANNEL_ERROR') {
            console.error('[useRealtimeAssets] Subscription error:', err);
          }
        });
      } catch (subError) {
        console.error('[useRealtimeAssets] Failed to subscribe:', subError);
      }
    }

    fetchInitial();
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [page]);

  return { assets, loading, error };
}
