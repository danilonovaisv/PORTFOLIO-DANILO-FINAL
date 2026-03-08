import type { PortfolioProject } from '@/types/project';
import { stableShuffle, stableShuffleByPriority } from '@/lib/utils/stable-shuffle';

export function shuffleHomeProjects(projects: PortfolioProject[]) {
  return stableShuffle(projects, {
    window: 'daily',
    scope: 'home',
  });
}

export function shufflePortfolioProjects(projects: PortfolioProject[]) {
  return stableShuffleByPriority(projects, {
    window: 'daily',
    scope: 'portfolio',
    isPriority: (project) => Boolean(project.isFeatured),
  });
}
