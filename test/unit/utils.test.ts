import { extractYouTubeId } from '@/lib/utils';

describe('extractYouTubeId', () => {
  // --- Happy Paths ---

  it('extracts ID from standard watch URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('http://youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from short URL (youtu.be)', () => {
    expect(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('http://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from embed URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from shorts URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from /v/ URL', () => {
    expect(extractYouTubeId('https://www.youtube.com/v/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('handles URLs without protocol', () => {
    expect(extractYouTubeId('www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('handles direct ID input', () => {
    expect(extractYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('ignores extra query parameters', () => {
    expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=123s')).toBe('dQw4w9WgXcQ');
  });

  it('handles whitespace', () => {
    expect(extractYouTubeId('  https://www.youtube.com/watch?v=dQw4w9WgXcQ  ')).toBe('dQw4w9WgXcQ');
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
     expect(extractYouTubeId('https://www.youtube.com/watch?v=INVALID&other=dQw4w9WgXcQ')).toBeNull();
  });

  it('falls back to path if v param is invalid', () => {
    // v param is invalid, but path has a valid ID (embed)
    expect(extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ?v=INVALID')).toBe('dQw4w9WgXcQ');
  });
});
