import { buildSupabaseStorageUrl, getR2PublicUrl } from '@/lib/supabase/urls';
import { getAssetUrl, supabaseLoader } from '@/lib/utils';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';
import { BRAND } from '@/config/brand';

describe('Cloudflare R2 Migration Verification Suite', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('R2 Environment Configuration & URL Generation', () => {
    it('returns R2 base URL when NEXT_PUBLIC_R2_PUBLIC_URL is configured', () => {
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.portfoliodanilo.com';
      expect(getR2PublicUrl()).toBe('https://assets.portfoliodanilo.com');
    });

    it('builds standard R2 CDN URLs for site-assets without Supabase transform endpoints', () => {
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.portfoliodanilo.com';
      const url = buildSupabaseStorageUrl('site-assets', 'global/logos/LogoDark.svg');
      expect(url).toBe('https://assets.portfoliodanilo.com/site-assets/global/logos/LogoDark.svg');
      expect(url).not.toContain('supabase.co');
      expect(url).not.toContain('/storage/v1/');
    });

    it('converts legacy full Supabase URLs into R2 CDN URLs with Zero Egress', () => {
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.portfoliodanilo.com';
      const legacySupabaseUrl =
        'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4';
      const url = buildSupabaseStorageUrl('site-assets', legacySupabaseUrl);
      expect(url).toBe('https://assets.portfoliodanilo.com/site-assets/home/video.manifesto.desk.mp4');
    });

    it('getAssetUrl prioritizes R2 CDN when NEXT_PUBLIC_R2_PUBLIC_URL is set', () => {
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.portfoliodanilo.com';
      const url = getAssetUrl('portfolio-media/swift/hero.webp');
      expect(url).toBe('https://assets.portfoliodanilo.com/portfolio-media/swift/hero.webp');
      expect(url).not.toContain('render/image');
    });

    it('supabaseLoader does not append broken transform parameters to R2 URLs', () => {
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL = 'https://assets.portfoliodanilo.com';
      const r2Url = 'https://assets.portfoliodanilo.com/site-assets/hero.webp';
      const loaded = supabaseLoader({ src: r2Url, width: 1200, quality: 80 });
      expect(loaded).toBe(r2Url);
    });

    it('preserves local fallback when R2 env is absent for offline/build resilience', () => {
      delete process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      delete process.env.R2_PUBLIC_URL;
      const url = getAssetUrl('site-assets/global/logos/LogoDark.svg');
      expect(url).toBe('/site.assets/global/logos/LogoDark.svg');
    });
  });

  describe('Critical Video Assets Integrity', () => {
    it('validates responsive video assets structure and containment policies', () => {
      expect(RESPONSIVE_VIDEOS.homeManifesto).toBeDefined();
      expect(RESPONSIVE_VIDEOS.aboutHero).toBeDefined();
      expect(RESPONSIVE_VIDEOS.aboutClosing).toBeDefined();
      expect(RESPONSIVE_VIDEOS.aboutMethod).toBeDefined();
      expect(RESPONSIVE_VIDEOS.portfolioHero).toBeDefined();

      expect(RESPONSIVE_VIDEOS.homeManifesto.desktop).toMatch(/\.mp4$/);
      expect(RESPONSIVE_VIDEOS.homeManifesto.mobile).toMatch(/\.mp4$/);
      expect(RESPONSIVE_VIDEOS.homeManifesto.fitPolicy).toBe('contain');
    });
  });
});

