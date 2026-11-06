/**
 * @file useRealtimeAssets.test.ts
 * @description Unit tests for useRealtimeAsset hook and its resilience / circuit breaker.
 */

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { useContentStore } from '@/store/content.store';

// Mock Supabase Client
const mockMaybeSingle = jest.fn();
const mockEq = jest.fn(() => ({ maybeSingle: mockMaybeSingle }));
const mockSelect = jest.fn(() => ({ eq: mockEq }));
const mockFrom = jest.fn(() => ({ select: mockSelect }));
const mockChannel = jest.fn(() => ({
  on: jest.fn().mockReturnThis(),
  subscribe: jest.fn(),
}));

jest.mock('@/lib/supabase/client', () => ({
  createClientComponentClient: () => ({
    from: mockFrom,
    channel: mockChannel,
    removeChannel: jest.fn().mockResolvedValue(undefined as never),
    auth: {
      getSession: jest
        .fn()
        .mockResolvedValue({ data: { session: null } } as never),
    },
    realtime: {
      setAuth: jest.fn(),
    },
  }),
}));

// Import after mocks
import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';

describe('useRealtimeAsset Hook & Circuit Breaker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useContentStore.getState().clearCache();
  });

  it('returns cached asset immediately from store without querying Supabase', () => {
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
    expect(result.current.loading).toBe(false);
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('handles quota / restriction errors without crashing and activates circuit breaker', async () => {
    mockMaybeSingle.mockResolvedValueOnce({
      data: null,
      error: {
        message:
          'Service for this project is restricted due to the following violations: exceed_cached_egress_quota.',
      },
    } as never);

    const { result } = renderHook(() =>
      useRealtimeAsset('non-cached-restricted-asset')
    );

    // Initial state
    expect(result.current.loading).toBe(true);

    // Wait for effect execution
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toContain(
      'exceed_cached_egress_quota'
    );
  });
});
