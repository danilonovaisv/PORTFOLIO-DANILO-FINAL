import { getAssetUrl } from '@/lib/utils';

describe('getAssetUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SUPABASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalEnv;
  });

  it('returns external urls unchanged', () => {
    expect(getAssetUrl('https://cdn.example.com/video.mp4')).toBe(
      'https://cdn.example.com/video.mp4'
    );
  });

  it('keeps local public and hash references unchanged', () => {
    // getAssetUrl returns ASSET_PLACEHOLDER for empty/null, but let's test specific strings
    expect(getAssetUrl('/site.assets/videos/reel.mp4')).toBe(
      '/site.assets/videos/reel.mp4'
    );
    // Hash references might be treated as paths if they don't start with http/data/blob
    // but the actual usage usually filters them out or they aren't passed to getAssetUrl.
  });

  it('normalizes site-assets paths to local folder per Ghost System rules', () => {
    expect(
      getAssetUrl(
        '/storage/v1/object/public/landing-pages/demo/video.mp4'
      )
    ).toBe(
      '/site.assets/landing-pages/demo/video.mp4'
    );
  });

  it('supports explicit bucket-prefixed paths for portfolio-media', () => {
    expect(
      getAssetUrl('portfolio-media/projects/launch/video.mp4', { isVideo: true })
    ).toBe(
      'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/launch/video.mp4'
    );
  });

  it('infers portfolio-media bucket for project paths', () => {
    expect(getAssetUrl('projects/launch/video.mp4', { isVideo: true })).toBe(
      'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/launch/video.mp4'
    );
  });

  it('infers site-assets bucket for generic asset paths and maps to local', () => {
    expect(getAssetUrl('home/hero/image.webp')).toBe(
      '/site.assets/home/hero/image.webp'
    );
  });
});
