import {
  getCanonicalSiteUrl,
  toCanonicalUrl,
  normalizeMetaTitle,
  normalizeMetaDescription,
} from '@/lib/seo';
import { BRAND } from '@/config/brand';

const ORIGINAL_ENV = process.env;

describe('SEO Utils', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('getCanonicalSiteUrl', () => {
    it('returns fallback domain when NEXT_PUBLIC_SITE_URL is missing', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('returns fallback domain when NEXT_PUBLIC_SITE_URL is empty', () => {
      process.env.NEXT_PUBLIC_SITE_URL = '   ';
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('returns configured URL when valid HTTPS URL is provided', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(getCanonicalSiteUrl()).toBe('https://example.com');
    });

    it('returns fallback when URL is localhost', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('returns fallback when URL is 127.0.0.1', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'http://127.0.0.1:3000';
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('returns fallback when protocol is not https', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'http://example.com';
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('returns fallback when URL is invalid', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'not-a-url';
      expect(getCanonicalSiteUrl()).toBe(`https://${BRAND.domain}`);
    });

    it('strips trailing slash from configured URL implicitly via URL parsing', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/some/path';
      expect(getCanonicalSiteUrl()).toBe('https://example.com');
    });
  });

  describe('toCanonicalUrl', () => {
    it('appends path to canonical URL', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(toCanonicalUrl('/blog/post')).toBe(
        'https://example.com/blog/post'
      );
    });

    it('handles path without leading slash', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(toCanonicalUrl('blog/post')).toBe('https://example.com/blog/post');
    });

    it('handles root path', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(toCanonicalUrl('/')).toBe('https://example.com/');
    });

    it('handles default parameter', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      expect(toCanonicalUrl()).toBe('https://example.com/');
    });

    it('falls back when NEXT_PUBLIC_SITE_URL is missing', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const base = getCanonicalSiteUrl();
      expect(toCanonicalUrl('/blog/post')).toBe(`${base}/blog/post`);
    });

    it('falls back when NEXT_PUBLIC_SITE_URL is blank', () => {
      process.env.NEXT_PUBLIC_SITE_URL = '';

      const base = getCanonicalSiteUrl();
      expect(toCanonicalUrl('/blog/post')).toBe(`${base}/blog/post`);
    });

    it('falls back when NEXT_PUBLIC_SITE_URL is invalid and normalizes slashes', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'not-a-url';

      const base = getCanonicalSiteUrl();
      expect(toCanonicalUrl('/blog/post')).toBe(`${base}/blog/post`);
      expect(toCanonicalUrl('blog/post')).toBe(`${base}/blog/post`);
    });
  });

  describe('normalizeMetaTitle', () => {
    it('collapses whitespace', () => {
      expect(normalizeMetaTitle('  Title  with   spaces  ')).toBe(
        'Title with spaces'
      );
    });

    it('truncates to default max length (60)', () => {
      const longTitle = 'A'.repeat(70);
      const result = normalizeMetaTitle(longTitle);
      expect(result.length).toBeLessThanOrEqual(60);
      expect(result.endsWith('.')).toBe(true);
    });

    // NOTE: The current implementation only truncates at word boundaries if the cut point is > 80 chars.
    // Since default max is 60, normalizeMetaTitle usually does NOT truncate at word boundaries.

    it('respects word boundaries when truncating (only if max is large enough)', () => {
      // We need a max > 80 to trigger the word boundary logic
      const title =
        'This is a very long title that should be truncated intelligently and not in the middle of a word like thisone';
      // 90 chars
      // "This is a very long title that should be truncated intelligently and not in the" (length 79)
      // "This is a very long title that should be truncated intelligently and not in the middle" (length 86)

      const max = 90;
      const result = normalizeMetaTitle(title, max);

      // Candidate: slice(0, 89)
      // "This is a very long title that should be truncated intelligently and not in the middle of"
      // lastSpace: 85 (after 'middle')
      // 85 > 80 -> True.
      // Trimmed: "This is a very long title that should be truncated intelligently and not in the middle"

      expect(result).toBe(
        'This is a very long title that should be truncated intelligently and not in the middle.'
      );
    });

    it('does not respect word boundaries when max is small (<= 80)', () => {
      const title = 'This is a very long title that should be truncated';
      const max = 30;
      // Candidate: slice(0, 29) -> "This is a very long title tha"
      // lastSpace: 26.
      // 26 > 80 -> False.
      // Returns candidate + '.'

      const result = normalizeMetaTitle(title, max);
      expect(result).toBe('This is a very long title tha.');
    });

    it('removes trailing punctuation', () => {
      // If we don't truncate, it should keep it? No, normalizeMetaTitle only cleans up if it truncates?
      // Wait, truncateAtWordBoundary is called unconditionally?
      // normalizeMetaTitle calls truncateAtWordBoundary(normalized, max)

      // truncateAtWordBoundary:
      // if (value.length <= max) return value;
      // ...

      // So if not truncated, punctuation is preserved.
      expect(normalizeMetaTitle('Title!')).toBe('Title!');

      // If truncated, punctuation is removed.
      // But only if logic allows.

      // Case 1: Hard truncation (max <= 80)
      // "This is a long title!" (21 chars)
      // max = 20.
      // candidate = "This is a long title" (20 chars? No max-1 = 19)
      // candidate = "This is a long titl"
      // replace handles trailing punctuation.

      // const text = 'This is a long title!!!!!';
      // normalizeMetaTitle(text, 20)
      // candidate = "This is a long titl"
      // no punctuation to remove.

      // What if we cut exactly at punctuation?
      // "This is a long." (15 chars)
      // max = 14.
      // candidate = "This is a long" (13 chars)
      // result "This is a long."

      // What if text: "This is a long!!!!!!! text"
      // max = 15.
      // candidate = "This is a long" (14 chars)
      // result "This is a long."

      const textWithPunct = 'This is a long!!!!!!!';
      const result = normalizeMetaTitle(textWithPunct, 15);
      // candidate "This is a long"
      expect(result).toBe('This is a long.');
    });
  });

  describe('normalizeMetaDescription', () => {
    it('collapses whitespace', () => {
      const desc = '  Description   with   spaces  ';
      const result = normalizeMetaDescription(desc);
      expect(result).toContain('Description with spaces');
    });

    it('pads with fallbackTail when too short', () => {
      const shortDesc = 'Short description.';
      const result = normalizeMetaDescription(shortDesc, { min: 50 });
      expect(result.length).toBeGreaterThanOrEqual(50);
      expect(result).toContain('Short description.');
      expect(result).toContain('Portfólio com foco em branding');
    });

    it('loops padding when very short', () => {
      const veryShort = 'A';
      const result = normalizeMetaDescription(veryShort, { min: 50, max: 100 });
      expect(result.length).toBeGreaterThanOrEqual(50);
      expect(result.length).toBeLessThanOrEqual(100);
    });

    it('truncates at max length', () => {
      const longDesc = 'A'.repeat(200);
      const result = normalizeMetaDescription(longDesc, { max: 150 });
      expect(result.length).toBeLessThanOrEqual(150);
      expect(result.endsWith('.')).toBe(true);
    });
  });
});
