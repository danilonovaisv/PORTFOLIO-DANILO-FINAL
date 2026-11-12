import {
  buildSupabaseStorageUrl,
  isSignedOrPrivateStorageUrl,
} from '@/lib/supabase/urls';
import { getAssetUrl, getGhostAssetUrl, supabaseLoader } from '@/lib/utils';
import {
  resolveLandingAsset,
  resolveSupabaseUrl,
} from '@/lib/media/asset-contract';
import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';

const R2_CDN = 'https://assets.portfoliodanilo.com';
const GLAD_LEGACY_URL =
  'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp';
const GLAD_R2_URL = `${R2_CDN}/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp`;

describe('Cloudflare R2 Legacy URL Recovery (TDD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_R2_PUBLIC_URL: R2_CDN,
      NEXT_PUBLIC_SUPABASE_URL: 'https://umkmwbkwvulxtdodzmzf.supabase.co',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('buildSupabaseStorageUrl & signed guards', () => {
    it('extracts bucket from legacy Supabase object URL even when default bucket differs', () => {
      expect(buildSupabaseStorageUrl('site-assets', GLAD_LEGACY_URL)).toBe(
        GLAD_R2_URL
      );
    });

    it('converts legacy Supabase render/image URLs and strips transform query params', () => {
      const renderUrl =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/home/hero.webp?width=800&quality=85&format=webp';
      expect(buildSupabaseStorageUrl('site-assets', renderUrl)).toBe(
        `${R2_CDN}/site-assets/home/hero.webp`
      );
    });

    it('normalizes double slashes, URL-encoded segments, and repeated bucket prefixes', () => {
      const messy =
        'https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/site-assets/site-assets//landing-pages/folder%20name//file%201.webp';
      expect(buildSupabaseStorageUrl('site-assets', messy)).toBe(
        `${R2_CDN}/site-assets/landing-pages/folder%20name/file%201.webp`
      );
    });

    it('collapses repeated virtual bucket prefix on already-migrated R2 URLs', () => {
      const doubleR2 = `${R2_CDN}/portfolio-media/portfolio-media/swift/hero.mp4`;
      expect(buildSupabaseStorageUrl('portfolio-media', doubleR2)).toBe(
        `${R2_CDN}/portfolio-media/swift/hero.mp4`
      );
    });

    it('never rewrites signed or private URLs to public R2 CDN', () => {
      const signedSupabase =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/sign/site-assets/private/doc.pdf?token=secret-jwt';
      const signedS3 =
        'https://cdn.example.com/file.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=deadbeef';

      expect(isSignedOrPrivateStorageUrl(signedSupabase)).toBe(true);
      expect(isSignedOrPrivateStorageUrl(signedS3)).toBe(true);
      expect(buildSupabaseStorageUrl('site-assets', signedSupabase)).toBe(
        signedSupabase
      );
      expect(buildSupabaseStorageUrl('site-assets', signedS3)).toBe(signedS3);
    });

    it('preserves external HTTPS URLs untouched', () => {
      expect(
        buildSupabaseStorageUrl('site-assets', 'https://vimeo.com/123456')
      ).toBe('https://vimeo.com/123456');
      expect(
        buildSupabaseStorageUrl(
          'site-assets',
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        )
      ).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });
  });

  describe('getAssetUrl, getGhostAssetUrl, and supabaseLoader', () => {
    it('normalizes legacy full Supabase object URLs to R2 CDN', () => {
      expect(getAssetUrl(GLAD_LEGACY_URL)).toBe(GLAD_R2_URL);
    });

    it('normalizes legacy full Supabase render/image URLs to R2 CDN', () => {
      const renderUrl =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/swift/cover.webp?width=800&quality=85';
      expect(getAssetUrl(renderUrl)).toBe(
        `${R2_CDN}/portfolio-media/swift/cover.webp`
      );
    });

    it('keeps signed, external, local, data, and blob URLs untouched in getAssetUrl', () => {
      const signed =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/sign/site-assets/file.webp?token=abc';
      expect(getAssetUrl(signed)).toBe(signed);
      expect(getAssetUrl('https://cdn.example.com/a.webp')).toBe(
        'https://cdn.example.com/a.webp'
      );
      expect(getAssetUrl('/site.assets/3d/ghost-v1.glb')).toBe(
        '/site.assets/3d/ghost-v1.glb'
      );
      expect(getAssetUrl('/assets/placeholder.webp')).toBe(
        '/assets/placeholder.webp'
      );
      expect(getAssetUrl('data:image/png;base64,AAAA')).toBe(
        'data:image/png;base64,AAAA'
      );
      expect(getAssetUrl('blob:https://portfoliodanilo.com/123')).toBe(
        'blob:https://portfoliodanilo.com/123'
      );
    });

    it('normalizes legacy Supabase URLs in getGhostAssetUrl', () => {
      expect(getGhostAssetUrl(GLAD_LEGACY_URL)).toBe(GLAD_R2_URL);
    });

    it('normalizes legacy Supabase URLs in supabaseLoader when R2 is configured', () => {
      expect(supabaseLoader({ src: GLAD_LEGACY_URL, width: 1200 })).toBe(
        GLAD_R2_URL
      );
      expect(
        supabaseLoader({ src: 'https://cdn.example.com/a.webp', width: 800 })
      ).toBe('https://cdn.example.com/a.webp');
    });
  });

  describe('resolveSupabaseUrl & resolveLandingAsset', () => {
    it('preserves the URL bucket instead of double-prefixing site-assets', () => {
      expect(resolveSupabaseUrl(GLAD_LEGACY_URL)).toBe(GLAD_R2_URL);
    });

    it('does not rewrite signed URLs in resolveSupabaseUrl', () => {
      const signed =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/sign/site-assets/doc.webp?token=xyz';
      expect(resolveSupabaseUrl(signed)).toBe(signed);
    });

    it('resolves YouTube and external landing assets without corrupting them', () => {
      expect(
        resolveLandingAsset('https://youtu.be/dQw4w9WgXcQ', 'youtube')
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
  });

  describe('mapDbProjectToPortfolioProject', () => {
    it('converts legacy full Supabase URLs in project media fields to R2 CDN', () => {
      const dbProject = {
        id: 'proj-glad',
        slug: 'glad',
        title: 'GLAD',
        client_name: 'Down Química',
        brand_name: null,
        year: 2025,
        project_type: 'Brand & Campaign',
        short_label: 'Campaign',
        description: 'Campanha GLAD',
        thumbnail_path: GLAD_LEGACY_URL,
        hero_image_path: GLAD_LEGACY_URL,
        url_landscape:
          'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp',
        url_square: GLAD_LEGACY_URL,
        gallery: [
          {
            path: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp?width=1200',
          },
        ],
        featured_on_home: true,
        featured_on_portfolio: true,
        is_published: true,
        created_at: null,
        updated_at: null,
      };

      const mapped = mapDbProjectToPortfolioProject(dbProject as any, 0);
      expect(mapped.image).toBe(
        `${R2_CDN}/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp`
      );
      expect(mapped.imageLandscape).toBe(
        `${R2_CDN}/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp`
      );
      expect(mapped.imageSquare).toBe(GLAD_R2_URL);
      expect(mapped.detail?.gallery?.[0]).toBe(
        `${R2_CDN}/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp`
      );
    });
  });
});
