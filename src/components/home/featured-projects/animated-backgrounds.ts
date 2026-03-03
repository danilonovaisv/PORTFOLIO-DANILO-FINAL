import type { PortfolioProject } from '@/types/project';

export const FEATURED_PROJECT_BACKGROUND_POOL = [
  'grainient',
  'ghost',
  'aurora',
] as const;

export type FeaturedProjectBackgroundVariant =
  (typeof FEATURED_PROJECT_BACKGROUND_POOL)[number];

function mulberry32(seed: number) {
  let next = seed >>> 0;

  return () => {
    next += 0x6d2b79f5;
    let value = next;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildFeaturedProjectBackgroundAssignment(
  projects: Pick<PortfolioProject, 'id'>[],
  seed: number
): FeaturedProjectBackgroundVariant[] {
  if (projects.length === 0) return [];

  const variants = Array.from({ length: projects.length }, (_, index) => {
    return FEATURED_PROJECT_BACKGROUND_POOL[
      index % FEATURED_PROJECT_BACKGROUND_POOL.length
    ];
  });

  const rng = mulberry32(seed ^ projects.length);

  for (let index = variants.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    const current = variants[index];
    variants[index] = variants[swapIndex];
    variants[swapIndex] = current;
  }

  return variants;
}
