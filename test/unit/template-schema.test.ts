import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';

describe('resolveSiteAssetUrl', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  it('returns external urls unchanged', () => {
    expect(resolveSiteAssetUrl('https://cdn.example.com/video.mp4')).toBe(
      'https://cdn.example.com/video.mp4'
    );
  });

  it('keeps local public and hash references unchanged', () => {
    expect(resolveSiteAssetUrl('/site.assets/videos/reel.mp4')).toBe(
      '/site.assets/videos/reel.mp4'
    );
    expect(resolveSiteAssetUrl('#contact')).toBe('#contact');
  });

  it('normalizes /storage/v1/object/public paths with explicit bucket', () => {
    expect(
      resolveSiteAssetUrl(
        '/storage/v1/object/public/landing-pages/demo/video.mp4'
      )
    ).toBe(
      'https://test.supabase.co/storage/v1/object/public/landing-pages/demo/video.mp4'
    );
  });

  it('supports explicit bucket-prefixed paths', () => {
    expect(
      resolveSiteAssetUrl('portfolio-media/projects/launch/video.mp4')
    ).toBe(
      'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/launch/video.mp4'
    );
  });

  it('infers portfolio-media bucket for project paths', () => {
    expect(resolveSiteAssetUrl('projects/launch/video.mp4')).toBe(
      'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/launch/video.mp4'
    );
  });

  it('infers site-assets bucket for generic asset paths', () => {
    expect(resolveSiteAssetUrl('home/hero/image.webp')).toBe(
      'https://test.supabase.co/storage/v1/object/public/site-assets/home/hero/image.webp'
    );
  });
});
