/**
 * Stable Shuffle - Ghost Era v2.1
 *
 * Deterministic shuffle based on a time-windowed seed.
 * Same seed = same order. Prevents layout shift and "chaotic shuffle"
 * while ensuring content rotation over time.
 *
 * Usage:
 *   const shuffled = stableShuffle(projects, { window: 'daily', scope: 'home' });
 */

type TimeWindow = 'hourly' | 'daily' | 'weekly';

interface StableShuffleOptions {
  /** Time window for seed rotation. Default: 'daily' */
  window?: TimeWindow;
  /** Scope string to differentiate pages using same data. Default: '' */
  scope?: string;
  /** Custom seed (timestamp or date) to override current time. Useful for hydration safety. */
  customSeed?: number | string | Date;
}


/**
 * Generate a numeric seed from a string using DJB2 hash.
 * Consistent across server/client for the same input.
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure unsigned 32-bit
}

/**
 * Generate a time-based seed string for the given window.
 */
function getTimeSeed(
  window: TimeWindow,
  options: StableShuffleOptions
): string {
  const now = options.customSeed ? new Date(options.customSeed) : new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  const hour = now.getUTCHours();

  switch (window) {
    case 'hourly':
      return `${year}-${month}-${day}-${hour}`;
    case 'weekly': {
      // ISO week number
      const startOfYear = new Date(Date.UTC(year, 0, 1));
      const diff = now.getTime() - startOfYear.getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const weekNumber = Math.floor(diff / oneWeek);
      return `${year}-W${weekNumber}`;
    }
    case 'daily':
    default:
      return `${year}-${month}-${day}`;
  }
}

/**
 * Seeded PRNG (Linear Congruential Generator).
 * Returns a function that produces deterministic values 0..1.
 */
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

/**
 * Fisher-Yates shuffle with a seeded PRNG.
 * Does NOT mutate the original array.
 */
export function stableShuffle<T>(
  items: T[],
  options: StableShuffleOptions = {}
): T[] {
  if (items.length <= 1) return [...items];

  const { window = 'daily', scope = '' } = options;
  const timeSeed = getTimeSeed(window, options);
  const seedString = `${scope}:${timeSeed}`;
  const seed = djb2Hash(seedString);
  const random = seededRandom(seed);

  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

