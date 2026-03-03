import { describe, expect, it } from '@jest/globals';

import {
  FEATURED_PROJECT_BACKGROUND_POOL,
  buildFeaturedProjectBackgroundAssignment,
  getFeaturedProjectBackgroundVariant,
} from '@/components/home/featured-projects/animated-backgrounds';

describe('buildFeaturedProjectBackgroundAssignment', () => {
  it('maps each project to a valid variant from the fixed pool', () => {
    const projects = Array.from({ length: 4 }, (_, index) => ({
      id: `project-${index}`,
    }));

    const assignment = buildFeaturedProjectBackgroundAssignment(projects);

    expect(assignment).toHaveLength(4);
    expect(
      assignment.every((variant) =>
        FEATURED_PROJECT_BACKGROUND_POOL.includes(variant)
      )
    ).toBe(true);
  });

  it('is deterministic for the same project id', () => {
    expect(getFeaturedProjectBackgroundVariant('project-42')).toBe(
      getFeaturedProjectBackgroundVariant('project-42')
    );
  });

  it('matches the per-project helper output', () => {
    const projects = Array.from({ length: 5 }, (_, index) => ({
      id: `project-${index}`,
    }));

    expect(buildFeaturedProjectBackgroundAssignment(projects)).toEqual(
      projects.map((project) =>
        getFeaturedProjectBackgroundVariant(project.id)
      )
    );
  });
});
