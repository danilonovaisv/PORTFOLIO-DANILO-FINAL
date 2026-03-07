import {
  extractYouTubeId,
  getAssetUrl,
  getGhostAssetUrl,
  isVideo,
  isYouTubeUrl,
  ASSET_PLACEHOLDER,
} from '@/lib/utils';
import { SUPABASE_STORAGE_URL } from '@/config/brand';

describe('YouTube Utilities', () => {
  describe('extractYouTubeId', () => {
    it('extracts ID from standard watch URL', () => {
      expect(
        extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      ).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from short URL (youtu.be)', () => {
      expect(extractYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe(
        'dQw4w9WgXcQ'
      );
    });

    it('extracts ID from embed URL', () => {
      expect(
        extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')
      ).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from shorts URL', () => {
      expect(
        extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')
      ).toBe('dQw4w9WgXcQ');
    });

    it('handles direct 11-char ID', () => {
      expect(extractYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('returns null for invalid inputs', () => {
      expect(extractYouTubeId('')).toBeNull();
      expect(extractYouTubeId(null)).toBeNull();
      expect(extractYouTubeId('too-short')).toBeNull();
      expect(extractYouTubeId('https://vimeo.com/123')).toBeNull();
    });
  });

  describe('isYouTubeUrl', () => {
    it('identifies valid YouTube URLs', () => {
      expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
      expect(isYouTubeUrl('dQw4w9WgXcQ')).toBe(true);
    });

    it('rejects invalid YouTube URLs', () => {
      expect(isYouTubeUrl('https://google.com')).toBe(false);
      expect(isYouTubeUrl('')).toBe(false);
    });
  });
});

describe('Asset Utilities', () => {
  describe('getAssetUrl', () => {
    it('returns placeholder for empty path', () => {
      expect(getAssetUrl('')).toBe(ASSET_PLACEHOLDER);
      expect(getAssetUrl(null)).toBe(ASSET_PLACEHOLDER);
    });

    it('identity for absolute URLs', () => {
      const url = 'https://example.com/asset.png';
      expect(getAssetUrl(url)).toBe(url);
    });

    it('normalizes and prepends Supabase URL with optimization by default', () => {
      const path = 'projects/hero.jpg';
      const expected = SUPABASE_STORAGE_URL.replace('/object/public', '/render/image/public') +
        `/${path}?width=800&quality=85&format=webp`;
      expect(getAssetUrl(path)).toBe(expected);
    });

    it('removes redundant storage paths during normalization', () => {
      const complexPath = 'storage/v1/object/public/test/image.png';
      const expected = SUPABASE_STORAGE_URL.replace('/object/public', '/render/image/public') +
        `/test/image.png?width=800&quality=85&format=webp`;
      expect(getAssetUrl(complexPath)).toBe(expected);
    });

    it('returns direct URL for videos when explicitly requested', () => {
      const path = 'projects/presentation.mp4';
      expect(getAssetUrl(path, { isVideo: true })).toBe(`${SUPABASE_STORAGE_URL}/${path}`);
    });
  });

  describe('getGhostAssetUrl', () => {
    it('uses specific ghost fallback for empty path', () => {
      expect(getGhostAssetUrl('')).toBe('/assets/placeholder.webp');
      expect(getGhostAssetUrl(null)).toBe('/assets/placeholder.webp');
    });

    it('delegates to getAssetUrl for relative paths (uses optimized render API)', () => {
      const path = 'ghost/texture.png';
      const expected = SUPABASE_STORAGE_URL.replace('/object/public', '/render/image/public') +
        `/${path}?width=800&quality=85&format=webp`;
      expect(getGhostAssetUrl(path)).toBe(expected);
    });
  });

  describe('isVideo', () => {
    it('detects common video extensions', () => {
      expect(isVideo('video.mp4')).toBe(true);
      expect(isVideo('movie.webm')).toBe(true);
      expect(isVideo('clip.mov')).toBe(true);
    });

    it('handles query parameters and encoded chars', () => {
      expect(isVideo('https://xyz.com/video.mp4?token=123')).toBe(true);
      expect(isVideo('video.MP4')).toBe(true);
    });

    it('rejects non-video paths', () => {
      expect(isVideo('image.jpg')).toBe(false);
      expect(isVideo('')).toBe(false);
      expect(isVideo(null)).toBe(false);
    });
  });
});
