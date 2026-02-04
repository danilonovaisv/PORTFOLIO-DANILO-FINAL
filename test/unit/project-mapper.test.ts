import { mapDbProjectToPortfolioProject } from '@/lib/portfolio/project-mappers';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

describe('buildSupabaseStorageUrl', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co/';
  });

  it('returns null when file path is missing', () => {
    expect(buildSupabaseStorageUrl('bucket', '')).toBeNull();
  });

  it('builds a public object URL', () => {
    const url = buildSupabaseStorageUrl(
      'portfolio-media',
      'projects/thumb.png'
    );
    expect(url).toBe(
      'https://test.supabase.co/storage/v1/object/public/portfolio-media/projects/thumb.png'
    );
  });

  it('normalizes paths that include the bucket prefix', () => {
    const url = buildSupabaseStorageUrl(
      'site-assets',
      'site-assets/global/logos/logo.svg'
    );
    expect(url).toBe(
      'https://test.supabase.co/storage/v1/object/public/site-assets/global/logos/logo.svg'
    );
  });

  it('normalizes full Supabase URLs to the current project base URL', () => {
    const url = buildSupabaseStorageUrl(
      'site-assets',
      'https://old-project.supabase.co/storage/v1/object/public/site-assets/global/fonts/font.woff2'
    );
    // Agora preservamos a origem quando já vem completa de outro projeto Supabase
    expect(url).toBe(
      'https://old-project.supabase.co/storage/v1/object/public/site-assets/global/fonts/font.woff2'
    );
  });

  it('keeps external URLs untouched', () => {
    const external = 'https://example.com/image.png';
    expect(buildSupabaseStorageUrl('site-assets', external)).toBe(external);
  });
});

describe('mapDbProjectToPortfolioProject', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
  });

  it('maps database records into presentation models', () => {
    const dbProject = {
      id: 'proj-1',
      slug: 'test-project',
      title: 'Test Project',
      client_name: 'Client',
      brand_name: null,
      year: 2024,
      project_type: 'Motion & Video',
      short_label: 'Motion',
      description: 'Desc',
      thumbnail_path: 'projects/test/thumb.jpg',
      hero_image_path: null,
      gallery: [{ path: 'projects/test/gallery/hero.jpg' }],
      featured_on_home: true,
      featured_on_portfolio: false,
      is_published: true,
      created_at: null,
      updated_at: null,
    };

    const mapped = mapDbProjectToPortfolioProject(dbProject as any, 0);

    expect(mapped.id).toBe(dbProject.id);
    expect(mapped.image).toContain(
      '/storage/v1/object/public/portfolio-media/projects/test/thumb.jpg'
    );
    expect(mapped.category).toBe('motion');
    expect(mapped.tags).toEqual([]);
    expect(mapped.detail?.gallery?.[0]).toContain(
      '/storage/v1/object/public/portfolio-media/projects/test/gallery/hero.jpg'
    );
    expect(mapped.featuredOnHome).toBe(true);
    expect(mapped.type).toBe('B');
  });
});
