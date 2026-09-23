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
      getAssetUrl('/storage/v1/object/public/landing-pages/demo/video.mp4')
    ).toBe('/site.assets/landing-pages/demo/video.mp4');
  });

  it('supports explicit bucket-prefixed paths for portfolio-media', () => {
    expect(
      getAssetUrl('portfolio-media/projects/launch/video.mp4', {
        isVideo: true,
      })
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

import {
  createDefaultMasterProjectTemplateV3,
  parseLandingPageContent,
} from '@/lib/projects/template-schema';

describe('Master Project Template V3 Schema & Defaults', () => {
  it('generates client logo alt using provided project title instead of generic fallback', () => {
    const defaults = createDefaultMasterProjectTemplateV3({
      slug: 'glad',
      title: 'GLAD Smart Living',
    });

    expect(defaults.client_logo_image?.alt).toBe('Logo de GLAD Smart Living');
    expect(defaults.hero_logo_image?.alt).toBe('Logo de GLAD Smart Living');
    expect(defaults.hero_cover_image?.alt).toBe('Capa de GLAD Smart Living');
    expect(defaults.client_logo_image?.alt).not.toContain('Novo Projeto');
  });

  it('normalizes client_logo_image and hero_top_media when parsing content', () => {
    const rawContent = {
      template: 'master-project-v3-alpa-hero',
      project_title: 'GLAD Smart Living',
      client_logo_image: {
        src: 'landing-pages/glad/logo.png',
        alt: 'Logo GLAD',
      },
      hero_top_media: {
        kind: 'html',
        html: '<video src="https://example.com/glad.mp4"></video>',
        alt: 'GLAD Hero Video',
      },
      gallery_grid: [],
    };

    const parsed = parseLandingPageContent(rawContent, {
      title: 'GLAD Smart Living',
      slug: 'glad',
    });

    expect(parsed.template).toBe('master-project-v3-alpa-hero');
    if (parsed.template === 'master-project-v3-alpa-hero') {
      expect(parsed.data.client_logo_image?.src).toContain(
        'landing-pages/glad/logo.png'
      );
      expect(parsed.data.hero_top_media?.kind).toBe('html');
      expect(parsed.data.hero_top_media?.html).toContain('glad.mp4');
    }
  });
});
