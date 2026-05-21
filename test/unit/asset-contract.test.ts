import {
  buildYoutubeEmbedUrl,
  extractYoutubeId,
  normalizeYoutubeUrl,
  resolveLandingAsset,
  resolveSupabaseUrl,
} from '@/lib/media/asset-contract';

describe('asset contract', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  describe('youtube normalization', () => {
    it.each([
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      'dQw4w9WgXcQ',
    ])('extracts id from %s', (input) => {
      expect(extractYoutubeId(input)).toBe('dQw4w9WgXcQ');
      expect(normalizeYoutubeUrl(input)).toBe(
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      );
    });

    it('builds stable embed URL params', () => {
      expect(buildYoutubeEmbedUrl('dQw4w9WgXcQ', { autoplay: false })).toBe(
        'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&loop=0&playlist=dQw4w9WgXcQ&controls=1&rel=0&modestbranding=1&playsinline=1'
      );
    });

    it('rejects invalid youtube values', () => {
      expect(resolveLandingAsset('https://vimeo.com/123', 'youtube')).toEqual({
        ok: false,
        reason: 'invalid-youtube',
      });
    });
  });

  describe('supabase normalization', () => {
    it('resolves raw site-assets path to public URL', () => {
      expect(resolveSupabaseUrl('landing-pages/demo/hero.webp')).toBe(
        'https://test.supabase.co/storage/v1/object/public/site-assets/landing-pages/demo/hero.webp'
      );
    });

    it('resolves explicit bucket paths', () => {
      expect(resolveSupabaseUrl('portfolio-media/projects/demo/hero.mp4')).toBe(
        'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/demo/hero.mp4'
      );
    });

    it('keeps existing supabase public URL as canonical public URL', () => {
      expect(
        resolveSupabaseUrl(
          'https://other.supabase.co/storage/v1/object/public/site-assets/landing-pages/demo/hero.webp'
        )
      ).toBe(
        'https://other.supabase.co/storage/v1/object/public/site-assets/landing-pages/demo/hero.webp'
      );
    });

    it('rejects insecure external URL', () => {
      expect(
        resolveLandingAsset('http://example.com/image.png', 'image')
      ).toEqual({ ok: false, reason: 'invalid-url' });
    });
  });

  describe('landing asset resolution', () => {
    it('returns image asset for legacy path', () => {
      expect(
        resolveLandingAsset('landing-pages/demo/hero.webp', 'image')
      ).toEqual({
        ok: true,
        source: 'legacy',
        asset: {
          type: 'image',
          url: 'https://test.supabase.co/storage/v1/object/public/site-assets/landing-pages/demo/hero.webp',
          provider: 'supabase',
        },
      });
    });

    it('returns youtube video asset for watch URL', () => {
      expect(
        resolveLandingAsset(
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          'youtube'
        )
      ).toEqual({
        ok: true,
        source: 'legacy',
        asset: {
          type: 'video',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          provider: 'youtube',
        },
      });
    });

    it('returns empty failure for blank legacy value', () => {
      expect(resolveLandingAsset('', 'image')).toEqual({
        ok: false,
        reason: 'empty',
      });
    });
  });
});
