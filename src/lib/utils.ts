import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes a string for safe use in Tailwind classes or dynamic styles.
 */
export function sanitizeTailwindValue(value: string): string {
  if (!value) return '';
  return value.replace(/[^a-zA-Z0-9\-_#]/g, '');
}
