import supabaseLoader from '@/lib/supabase/image-loader';

describe('supabaseLoader', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: 'https://testproject.supabase.co',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns local paths as-is', () => {
    const src = '/logo.png';
    const width = 100;
    const result = supabaseLoader({ src, width });
    expect(result).toBe('/logo.png');
  });

  it('transforms a standard Supabase object URL to a render URL', () => {
    const src =
      'https://testproject.supabase.co/storage/v1/object/public/bucket/image.png';
    const width = 800;
    const quality = 80;

    const result = supabaseLoader({ src, width, quality });
    expect(result).toBe(
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png?width=800&quality=80'
    );
  });

  it('appends params to an existing render URL', () => {
    const src =
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png';
    const width = 500;

    const result = supabaseLoader({ src, width });
    expect(result).toBe(
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png?width=500&quality=75'
    );
  });

  it('handles relative paths if project ID is available via env', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://myproj.supabase.co';
    const src = 'bucket/image.png';
    const width = 300;

    const result = supabaseLoader({ src, width });
    expect(result).toBe(
      'https://myproj.supabase.co/storage/v1/render/image/public/bucket/image.png?width=300&quality=75'
    );
  });

  it('returns original src for non-Supabase URLs', () => {
    const src = 'https://example.com/image.png';
    const width = 300;

    const result = supabaseLoader({ src, width });
    expect(result).toBe('https://example.com/image.png');
  });

  it('correctly handles existing query params in render URL', () => {
    const src =
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png?foo=bar';
    const width = 100;

    const result = supabaseLoader({ src, width });
    expect(result).toBe(
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png?foo=bar&width=100&quality=75'
    );
  });

  it('correctly handles existing query params when transforming object URL', () => {
    const src =
      'https://testproject.supabase.co/storage/v1/object/public/bucket/image.png?v=1';
    const width = 100;

    const result = supabaseLoader({ src, width });
    expect(result).toBe(
      'https://testproject.supabase.co/storage/v1/render/image/public/bucket/image.png?v=1&width=100&quality=75'
    );
  });
});
