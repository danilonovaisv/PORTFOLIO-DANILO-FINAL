import type { PortfolioProject } from '@/types/project';

export const FEATURED_PROJECT_BACKGROUND_POOL = [
  'grainient',
  'ghost',
  'aurora',
] as const;

export type FeaturedProjectBackgroundVariant =
  (typeof FEATURED_PROJECT_BACKGROUND_POOL)[number];

function djb2Hash(input: string): number {
  let hash = 5381;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }

  return hash >>> 0;
}

export function getFeaturedProjectBackgroundVariant(
  projectId: string
): FeaturedProjectBackgroundVariant {
  const hash = djb2Hash(projectId);

  return FEATURED_PROJECT_BACKGROUND_POOL[
    hash % FEATURED_PROJECT_BACKGROUND_POOL.length
  ];
}

export function buildFeaturedProjectBackgroundAssignment(
  projects: Pick<PortfolioProject, 'id'>[]
): FeaturedProjectBackgroundVariant[] {
  return projects.map((project) =>
    getFeaturedProjectBackgroundVariant(project.id)
  );
}
