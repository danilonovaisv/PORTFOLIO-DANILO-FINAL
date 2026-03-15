import type { PortfolioProject } from '@/types/project';
import { stableShuffle, stableShuffleByPriority } from '@/lib/utils/stable-shuffle';

function randomShuffle<T>(items: T[]) {
  if (items.length <= 1) return [...items];

  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[nextIndex]] = [
      shuffled[nextIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function randomShuffleByPriority<T>(
  items: T[],
  isPriority: (_item: T) => boolean
) {
  const priority = items.filter(isPriority);
  const regular = items.filter((item) => !isPriority(item));

  return [...randomShuffle(priority), ...randomShuffle(regular)];
}

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

export function shuffleHomeProjectsLive(projects: PortfolioProject[]) {
  return randomShuffle(projects);
}

export function shufflePortfolioProjectsLive(projects: PortfolioProject[]) {
  return randomShuffleByPriority(
    projects,
    (project) => Boolean(project.isFeatured)
  );
}
