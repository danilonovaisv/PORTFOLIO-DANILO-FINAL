/**
 * @file useRealtimeAssets.test.ts
 * @description Unit tests for useRealtimeAsset hook hydrating from /api/site-assets (D1/R2) with zero Supabase dependency.
 */

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, jest, beforeEach, afterEach } from '@jest/globals';
import { useContentStore } from '@/store/content.store';
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';

describe('useRealtimeAsset Hook (D1 / R2 API Hydration)', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    useContentStore.getState().clearCache();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns cached asset immediately from store with R2 URL without fetching', () => {
    const fetchSpy = jest.fn();
    globalThis.fetch = fetchSpy as unknown as typeof fetch;

    useContentStore.getState().upsertAsset({
      id: 'test-1',
      key: 'clients.clients.strip.1',
      bucket: 'site-assets',
      file_path: 'clients/clients.strip.1.svg',
      asset_type: 'image',
      page: 'clients',
      description: null,
      is_active: true,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const { result } = renderHook(() =>
      useRealtimeAsset('clients.clients.strip.1')
    );

    expect(result.current.asset).not.toBeNull();
    expect(result.current.asset?.key).toBe('clients.clients.strip.1');
    expect(result.current.asset?.publicUrl).toContain('clients/clients.strip.1.svg');
    expect(result.current.asset?.publicUrl).not.toContain('supabase.co');
    expect(result.current.loading).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('hydrates store from /api/site-assets when uncached and resolves errors safely', async () => {
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 503,
    } as never) as unknown as typeof fetch;

    const { result } = renderHook(() =>
      useRealtimeAsset('non-cached-asset-key')
    );

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toContain('/api/site-assets (503)');
  });
});
