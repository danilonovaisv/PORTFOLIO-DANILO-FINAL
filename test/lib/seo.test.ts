import { normalizeMetaTitle, normalizeMetaDescription, toCanonicalUrl } from '@/lib/seo';
import { BRAND } from '@/config/brand';

describe('SEO Utilities', () => {
    describe('normalizeMetaTitle', () => {
        it('should truncate titles longer than 60 characters', () => {
            const longTitle = 'a'.repeat(70);
            const normalized = normalizeMetaTitle(longTitle);
            expect(normalized.length).toBeLessThanOrEqual(60);
            expect(normalized.endsWith('...')).toBe(true);
        });

        it('should keep short titles as is', () => {
            const shortTitle = 'Danilo Novais';
            expect(normalizeMetaTitle(shortTitle)).toBe(shortTitle);
        });
    });

    describe('normalizeMetaDescription', () => {
        it('should truncate descriptions longer than 160 characters', () => {
            const longDesc = 'a'.repeat(200);
            const normalized = normalizeMetaDescription(longDesc);
            expect(normalized.length).toBeLessThanOrEqual(160);
            expect(normalized.endsWith('...')).toBe(true);
        });

        it('should keep short descriptions as is', () => {
            const shortDesc = 'Creative Developer Portfolio';
            expect(normalizeMetaDescription(shortDesc)).toBe(shortDesc);
        });
    });

    describe('toCanonicalUrl', () => {
        it('should join paths with the brand domain', () => {
            expect(toCanonicalUrl('/portfolio')).toBe(`https://${BRAND.domain}/portfolio`);
        });

        it('should handle paths without leading slash', () => {
            expect(toCanonicalUrl('about')).toBe(`https://${BRAND.domain}/about`);
        });

        it('should return homepage URL for empty path or /', () => {
            expect(toCanonicalUrl('/')).toBe(`https://${BRAND.domain}/`);
            expect(toCanonicalUrl('')).toBe(`https://${BRAND.domain}/`);
        });
    });
});
