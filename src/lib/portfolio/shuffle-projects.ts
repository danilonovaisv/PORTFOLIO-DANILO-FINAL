import type { PortfolioProject } from '@/types/project';

/**
 * Shuffles projects for the home page based on a seed or randomly.
 * This ensures the portfolio feels dynamic.
 */
export function shuffleHomeProjects(projects: PortfolioProject[], seed?: number): PortfolioProject[] {
  if (!projects || projects.length === 0) return [];
  
  // Simple deterministic shuffle if seed provided, else random
  const shuffled = [...projects];
  let currentSeed = seed ?? Math.floor(Math.random() * 1000000);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Basic LCG-like pseudo-random selection based on currentSeed
    const j = Math.floor(Math.abs(Math.sin(currentSeed++) * (i + 1)));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}


/**
 * Shuffles projects for the portfolio page.
 * Standardizes on the same logic as home shuffle.
 */
export const shufflePortfolioProjects = shuffleHomeProjects;
