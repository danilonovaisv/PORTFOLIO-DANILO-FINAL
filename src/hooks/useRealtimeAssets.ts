'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
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
    const supabase = createClientComponentClient();
    let channel: RealtimeChannel;

    async function fetchInitial() {
      try {
        const { data, error: fetchError } = await supabase
          .from('site_assets')
          .select('*')
          .eq('key', assetKey)
          .eq('is_active', true)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          const publicUrl = data.file_path?.startsWith('http')
            ? data.file_path
            : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.bucket}/${data.file_path}`;

          setAsset({ ...data, publicUrl } as RealtimeAsset);
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
              const publicUrl = newData.file_path?.startsWith('http')
                ? newData.file_path
                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${newData.bucket}/${newData.file_path}`;

              setAsset({ ...newData, publicUrl } as RealtimeAsset);
            } else if (payload.eventType === 'UPDATE' && !newData.is_active) {
              setAsset(null);
            }
          }
        )
        .subscribe();
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
    const supabase = createClientComponentClient();
    let channel: RealtimeChannel;

    async function fetchInitial() {
      try {
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

        const assetsWithUrls = (data ?? []).map((item: DbAsset) => {
          const publicUrl = item.file_path?.startsWith('http')
            ? item.file_path
            : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.bucket}/${item.file_path}`;

          return { ...item, publicUrl } as RealtimeAsset;
        });

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
              const publicUrl = newData.file_path?.startsWith('http')
                ? newData.file_path
                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${newData.bucket}/${newData.file_path}`;

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

              const publicUrl = updatedData.file_path?.startsWith('http')
                ? updatedData.file_path
                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${updatedData.bucket}/${updatedData.file_path}`;

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

      channel = channelBuilder.subscribe();
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
