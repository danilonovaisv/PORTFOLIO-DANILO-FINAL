import {
  getSupabaseBaseUrl,
  normalizeStoragePath,
  buildSupabaseStorageUrl,
  validateExternalUrl,
} from '@/lib/supabase/urls';

describe('Supabase URL Utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('getSupabaseBaseUrl', () => {
    it('returns NEXT_PUBLIC_SUPABASE_URL when set', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://primary.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL =
        'https://fallback.supabase.co';
      expect(getSupabaseBaseUrl()).toBe('https://primary.supabase.co');
    });

    it('returns NEXT_PUBLIC_SUPABASE_FALLBACK_URL when primary is missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL =
        'https://fallback.supabase.co';
      expect(getSupabaseBaseUrl()).toBe('https://fallback.supabase.co');
    });

    it('returns SUPABASE_URL when others are missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;
      process.env.SUPABASE_URL = 'https://legacy.supabase.co';
      expect(getSupabaseBaseUrl()).toBe('https://legacy.supabase.co');
    });

    it('returns null when no env vars are set', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;
      delete process.env.SUPABASE_URL;
      expect(getSupabaseBaseUrl()).toBeNull();
    });

    it('removes trailing slashes', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://slash.supabase.co///';
      expect(getSupabaseBaseUrl()).toBe('https://slash.supabase.co');
    });
  });

  describe('normalizeStoragePath', () => {
    it('returns null for empty input', () => {
      expect(normalizeStoragePath(undefined)).toBeNull();
      expect(normalizeStoragePath(null)).toBeNull();
    });

    it('removes bucket prefix', () => {
      expect(normalizeStoragePath('mybucket/folder/file.png', 'mybucket')).toBe(
        'folder/file.png'
      );
    });

    it('removes full Supabase URL prefix', () => {
      const url =
        'https://project.supabase.co/storage/v1/object/public/bucket/file.png';
      expect(normalizeStoragePath(url, 'bucket')).toBe('file.png');
    });

    it('removes local storage prefix', () => {
      expect(
        normalizeStoragePath(
          '/storage/v1/object/public/bucket/file.png',
          'bucket'
        )
      ).toBe('file.png');
    });

    it('cleans malformed prefixes like file_path:, key:, quotes', () => {
      expect(normalizeStoragePath('file_path: "folder/file.png"')).toBe(
        'folder/file.png'
      );
      expect(normalizeStoragePath("key: 'folder/file.png'")).toBe(
        'folder/file.png'
      );
    });

    it('trims whitespace and commas', () => {
      expect(normalizeStoragePath(' folder/file.png, ')).toBe(
        'folder/file.png'
      );
    });

    it('normalizes legacy extensions', () => {
      expect(normalizeStoragePath('folder/video/mp4')).toBe('folder/video.mp4');
      expect(normalizeStoragePath('image/jpeg')).toBe('image.jpeg');
    });

    it('handles path that matches bucket prefix check', () => {
      // If the path starts with the bucket name, it should be stripped if passed as bucket arg
      expect(normalizeStoragePath('videos/intro.mp4', 'videos')).toBe(
        'intro.mp4'
      );
    });

    describe('edge cases', () => {
      it('handles duplicate slashes', () => {
        expect(normalizeStoragePath('//folder//file.png')).toBe(
          'folder//file.png'
        );
        expect(normalizeStoragePath('folder///file.png')).toBe(
          'folder///file.png'
        );
      });

      it('preserves dot segments', () => {
        expect(normalizeStoragePath('folder/./file.png')).toBe(
          'folder/./file.png'
        );
        expect(normalizeStoragePath('folder/../file.png')).toBe(
          'folder/../file.png'
        );
      });

      it('handles special characters and unicode', () => {
        expect(normalizeStoragePath('folder/my file.png')).toBe(
          'folder/my file.png'
        );
        expect(normalizeStoragePath('folder/fílè.png')).toBe('folder/fílè.png');
        expect(normalizeStoragePath('folder/🚀.png')).toBe('folder/🚀.png');
      });

      it('handles mixed malformed inputs', () => {
        expect(normalizeStoragePath('file_path: key: "folder/file.png"')).toBe(
          'folder/file.png'
        );
        expect(normalizeStoragePath('"\'folder/file.png\'"')).toBe(
          'folder/file.png'
        );
      });

      it('handles bucket prefix collisions correctly', () => {
        // Should NOT strip if it's just a prefix match but not a folder match
        expect(normalizeStoragePath('testing/image.png', 'test')).toBe(
          'testing/image.png'
        );
        // Should strip if it matches bucket name + slash
        expect(normalizeStoragePath('test/image.png', 'test')).toBe(
          'image.png'
        );
      });

      it('normalizes legacy extensions case-insensitively', () => {
        expect(normalizeStoragePath('folder/image/JPG')).toBe(
          'folder/image.JPG'
        );
        expect(normalizeStoragePath('folder/video/MP4')).toBe(
          'folder/video.MP4'
        );
      });

      it('does not normalize extensions not in the list', () => {
        expect(normalizeStoragePath('folder/data/txt')).toBe('folder/data/txt');
      });

      it('removes render/image prefix', () => {
        const url =
          'https://project.supabase.co/storage/v1/render/image/public/bucket/file.png';
        expect(normalizeStoragePath(url, 'bucket')).toBe('file.png');
      });

      it('handles urls with query parameters', () => {
        const url =
          'https://project.supabase.co/storage/v1/object/public/bucket/file.png?width=100';
        expect(normalizeStoragePath(url, 'bucket')).toBe('file.png?width=100');
      });
    });
  });

  describe('buildSupabaseStorageUrl', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    });

    it('returns null for empty filePath', () => {
      expect(buildSupabaseStorageUrl('bucket', undefined)).toBeNull();
    });

    it('returns filePath for valid external non-Supabase https URL', () => {
      const url = 'https://example.com/image.png';
      expect(buildSupabaseStorageUrl('bucket', url)).toBe(url);
    });

    it('returns null for insecure external http URL', () => {
      const url = 'http://example.com/image.png';
      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      expect(buildSupabaseStorageUrl('bucket', url)).toBeNull();
      consoleSpy.mockRestore();
    });

    it('returns null for invalid external URL', () => {
      const url = 'https://[';
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(buildSupabaseStorageUrl('bucket', url)).toBeNull();
      consoleSpy.mockRestore();
    });

    it('preserves origin for full Supabase storage URLs', () => {
      const url =
        'https://other-project.supabase.co/storage/v1/object/public/bucket/file.png';
      expect(buildSupabaseStorageUrl('bucket', url)).toBe(url);
    });

    it('constructs URL for relative path using base URL', () => {
      expect(buildSupabaseStorageUrl('bucket', 'folder/file.png')).toBe(
        'https://test.supabase.co/storage/v1/object/public/bucket/folder/file.png'
      );
    });

    it('returns null if base URL is missing and path is relative', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;
      delete process.env.SUPABASE_URL;
      expect(buildSupabaseStorageUrl('bucket', 'folder/file.png')).toBeNull();
    });

    it('returns passed http path if base URL is missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_FALLBACK_URL;
      delete process.env.SUPABASE_URL;
      const url = 'https://example.com/image.png';
      expect(buildSupabaseStorageUrl('bucket', url)).toBe(url);
    });

    it('correctly handles bucket in constructed URL', () => {
      expect(buildSupabaseStorageUrl('my-bucket', 'file.png')).toBe(
        'https://test.supabase.co/storage/v1/object/public/my-bucket/file.png'
      );
    });
  });

  describe('validateExternalUrl', () => {
    it('returns null for empty url', () => {
      expect(validateExternalUrl('')).toBeNull();
    });

    it('returns valid https url', () => {
      expect(validateExternalUrl('https://example.com')).toBe(
        'https://example.com/'
      );
    });

    it('returns valid http url', () => {
      expect(validateExternalUrl('http://example.com')).toBe(
        'http://example.com/'
      );
    });

    it('returns null for javascript: protocol', () => {
      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      expect(validateExternalUrl('javascript:alert(1)')).toBeNull();
      consoleSpy.mockRestore();
    });

    it('returns input for relative paths', () => {
      expect(validateExternalUrl('/about')).toBe('/about');
      expect(validateExternalUrl('#section')).toBe('#section');
    });

    it('upgrades protocol-relative URLs (//) to https', () => {
      expect(validateExternalUrl('//example.com/script.js')).toBe(
        'https://example.com/script.js'
      );
    });

    it('returns null and logs error for invalid protocol-relative URLs (//)', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(validateExternalUrl('//')).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('URL externa inválida: //');
      consoleSpy.mockRestore();
    });

    it('returns null for invalid URL strings', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(validateExternalUrl('not-a-url')).toBeNull();
      consoleSpy.mockRestore();
    });
  });
});
