import { extractYouTubeId } from '@/lib/utils';

describe('extractYouTubeId', () => {
  // --- Happy Paths ---

  it('extracts ID from standard watch URL', () => {
    expect(
      extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('http://youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts ID from short URL (youtu.be)', () => {
    expect(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
    expect(extractYouTubeId('http://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from embed URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts ID from shorts URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts ID from /v/ URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/v/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('handles URLs without protocol', () => {
    expect(extractYouTubeId('www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
    expect(extractYouTubeId('youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
    expect(extractYouTubeId('youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('handles direct ID input', () => {
    expect(extractYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('ignores extra query parameters', () => {
    expect(
      extractYouTubeId(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be'
      )
    ).toBe('dQw4w9WgXcQ');
    expect(
      extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=123s')
    ).toBe('dQw4w9WgXcQ');
  });

  it('handles whitespace', () => {
    expect(
      extractYouTubeId('  https://www.youtube.com/watch?v=dQw4w9WgXcQ  ')
    ).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('  dQw4w9WgXcQ  ')).toBe('dQw4w9WgXcQ');
  });

  // --- Edge Cases / Invalid Inputs ---

  it('returns null for null/undefined/empty input', () => {
    expect(extractYouTubeId(null)).toBeNull();
    expect(extractYouTubeId(undefined)).toBeNull();
    expect(extractYouTubeId('')).toBeNull();
    expect(extractYouTubeId('   ')).toBeNull();
  });

  it('returns null for invalid ID format (length/chars)', () => {
    expect(extractYouTubeId('dQw4w9WgXc')).toBeNull(); // 10 chars
    expect(extractYouTubeId('dQw4w9WgXcQa')).toBeNull(); // 12 chars
    expect(extractYouTubeId('dQw4w9WgX!Q')).toBeNull(); // Invalid char
  });

  it('returns null for non-YouTube URLs', () => {
    expect(extractYouTubeId('https://vimeo.com/123456789')).toBeNull();
    expect(extractYouTubeId('https://www.google.com')).toBeNull();
    expect(extractYouTubeId('not a url')).toBeNull();
  });

  it('returns null for malformed YouTube URLs', () => {
    expect(extractYouTubeId('https://www.youtube.com/watch')).toBeNull(); // Missing v param
    expect(extractYouTubeId('https://www.youtube.com/watch?v=')).toBeNull(); // Empty v param
    expect(extractYouTubeId('https://youtu.be/')).toBeNull(); // Empty path
    expect(extractYouTubeId('https://www.youtube.com/embed/')).toBeNull(); // Empty embed ID
  });

  // Potential tricky case: `v` param is empty but path has something else?
  it('prioritizes v param over path for youtube.com', () => {
    // If v param is present but invalid, it should probably return null, or fallback?
    // Current implementation: check v param first. If valid, return. If not, check path.
    // So:
    expect(
      extractYouTubeId(
        'https://www.youtube.com/watch?v=INVALID&other=dQw4w9WgXcQ'
      )
    ).toBeNull();
  });

  it('falls back to path if v param is invalid', () => {
    // v param is invalid, but path has a valid ID (embed)
    expect(
      extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ?v=INVALID')
    ).toBe('dQw4w9WgXcQ');
  });
});

describe('getGhostAssetUrl', () => {
  const originalEnv = process.env;
  let getGhostAssetUrl: (_path?: string | null) => string;
  let ASSET_PLACEHOLDER: string;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: 'https://test-project.supabase.co',
    };

    // Import the module again so it picks up the new env var in config/brand
    const utils = await import('@/lib/utils');
    getGhostAssetUrl = utils.getGhostAssetUrl;
    ASSET_PLACEHOLDER = utils.ASSET_PLACEHOLDER;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns placeholder for null/undefined/empty path', () => {
    expect(getGhostAssetUrl(null)).toBe('/assets/placeholder.webp');
    expect(getGhostAssetUrl(undefined)).toBe('/assets/placeholder.webp');
    expect(getGhostAssetUrl('')).toBe('/assets/placeholder.webp');
  });

  it('returns valid absolute URLs as is', () => {
    expect(getGhostAssetUrl('https://example.com/image.png')).toBe(
      'https://example.com/image.png'
    );
    expect(getGhostAssetUrl('http://example.com/image.png')).toBe(
      'http://example.com/image.png'
    );
  });

  it('constructs Supabase URL for relative paths', () => {
    const path = 'folder/image.png';
    const result = getGhostAssetUrl(path);
    // Note: getAssetUrl uses normalized path logic
    expect(result).toBe(
      'https://test-project.supabase.co/storage/v1/object/public/folder/image.png'
    );
  });

  it('handles exception during processing and returns placeholder', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Pass an invalid input that causes an error (e.g. invalid object)
    // to trigger the catch block. casting to any to bypass TS.
    const invalidInput = {
      toString: () => {
        throw new Error('Simulated error');
      },
      startsWith: () => {
        throw new Error('Simulated error');
      },
    } as any;

    const result = getGhostAssetUrl(invalidInput);

    expect(result).toBe(ASSET_PLACEHOLDER);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('URL do asset'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
