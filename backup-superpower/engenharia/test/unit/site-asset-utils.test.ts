import { randomUUID } from 'crypto';
import type { DbAsset } from '@/types/admin';
import {
  normalizeAssetList,
  normalizeAssetRecord,
} from '@/lib/supabase/site-asset-utils';

describe('normalizeAssetRecord', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  const baseAsset: DbAsset = {
    id: 'asset-1',
    key: 'home.hero_video',
    bucket: 'site-assets',
    file_path: 'site-assets/home/home.hero_video.mp4',
    asset_type: 'video',
    page: null,
    description: null,
    is_active: true,
    sort_order: null,
    created_at: null,
    updated_at: null,
  };

  it('normalizes bucket, path and page, and builds public URL', () => {
    const normalized = normalizeAssetRecord(baseAsset);
    expect(normalized.bucket).toBe('site-assets');
    expect(normalized.file_path).toBe('home/home.hero_video.mp4');
    expect(normalized.page).toBe('home');
    expect(normalized.resolvedPage).toBe('home');
    expect(normalized.publicUrl).toBe(
      'https://test.supabase.co/storage/v1/object/public/site-assets/home/home.hero_video.mp4'
    );
  });

  it('sanitizes noisy keys', () => {
    const noisy: DbAsset = {
      ...baseAsset,
      key: 'key: about.hero.about.hero.desktop_video',
      file_path: 'about/hero/about.hero.desktop_video.mp4',
      page: 'about.hero.about.hero.desktop_video.mp4',
    };
    const normalized = normalizeAssetRecord(noisy);
    expect(normalized.key).toBe('about.hero.about.hero.desktop_video');
    expect(normalized.page).toBe('about');
  });
});

describe('normalizeAssetList', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  const asset = (overrides: Partial<DbAsset> = {}): DbAsset => ({
    id: randomUUID(),
    key: 'hero',
    bucket: 'site-assets',
    file_path: 'home/hero.mp4',
    asset_type: 'video',
    page: 'home',
    description: null,
    is_active: true,
    sort_order: null,
    created_at: null,
    updated_at: null,
    ...overrides,
  });

  it('filters invalid rows and prefers active entries when deduping', () => {
    const results = normalizeAssetList([
      asset({ key: 'updated_at: 2026-01-14' }),
      asset({ key: 'hero', is_active: false }),
      asset({ key: 'hero', id: 'hero-active' }),
      asset({ key: 'missing-path', file_path: '', id: 'no-path' }),
    ]);

    expect(results.find((item) => item.key === 'hero')?.id).toBe('hero-active');
    expect(results.find((item) => item.key.startsWith('updated_at'))).toBe(
      undefined
    );
    expect(results.find((item) => item.id === 'no-path')).toBeUndefined();
  });
});
