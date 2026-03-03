import { describe, expect, it } from '@jest/globals';

import {
  FEATURED_PROJECT_BACKGROUND_POOL,
  buildFeaturedProjectBackgroundAssignment,
} from '@/components/home/featured-projects/animated-backgrounds';

describe('buildFeaturedProjectBackgroundAssignment', () => {
  it('uses the full pool before repeating variants', () => {
    const projects = Array.from({ length: 4 }, (_, index) => ({
      id: `project-${index}`,
    }));

    const assignment = buildFeaturedProjectBackgroundAssignment(projects, 42);
    const counts = FEATURED_PROJECT_BACKGROUND_POOL.map(
      (variant) => assignment.filter((item) => item === variant).length
    );

    expect(assignment).toHaveLength(4);
    expect(new Set(assignment)).toEqual(
      new Set(FEATURED_PROJECT_BACKGROUND_POOL)
    );
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('is deterministic for the same seed', () => {
    const projects = Array.from({ length: 5 }, (_, index) => ({
      id: `project-${index}`,
    }));

    expect(buildFeaturedProjectBackgroundAssignment(projects, 99)).toEqual(
      buildFeaturedProjectBackgroundAssignment(projects, 99)
    );
  });
});
