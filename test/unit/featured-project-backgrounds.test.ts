import { describe, expect, it } from '@jest/globals';

import {
  FEATURED_PROJECT_BACKGROUND_POOL,
  getFeaturedProjectBackgroundVariant,
  getNextFeaturedProjectBackgroundVariant,
  type FeaturedProjectBackgroundVariant,
} from '@/components/home/featured-projects/animated-backgrounds';

describe('animated-backgrounds helpers', () => {
  describe('getFeaturedProjectBackgroundVariant', () => {
    it('is deterministic for the same project id', () => {
      expect(getFeaturedProjectBackgroundVariant('project-42')).toBe(
        getFeaturedProjectBackgroundVariant('project-42')
      );
    });

    it('returns a valid variant from the fixed pool', () => {
      const variant = getFeaturedProjectBackgroundVariant('some-project-id');
      expect(FEATURED_PROJECT_BACKGROUND_POOL.includes(variant)).toBe(true);
    });
  });

  describe('getNextFeaturedProjectBackgroundVariant', () => {
    it('returns a valid variant different from the current one', () => {
      const current: FeaturedProjectBackgroundVariant = 'grainient';
      const next = getNextFeaturedProjectBackgroundVariant(current);
      expect(FEATURED_PROJECT_BACKGROUND_POOL.includes(next)).toBe(true);
      expect(next).not.toBe(current);
    });
  });
});
