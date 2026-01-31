import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes a value before using it in a Tailwind class to prevent invalid CSS generation
 * Removes characters that are invalid in CSS class names
 */
export function sanitizeTailwindValue(value: string): string {
  if (!value) return '';

  // Handle specific problematic patterns from the error:
  // - Remove any standalone '!' characters
  // - Remove sequences like '...'
  // - Replace invalid characters with safe alternatives
  return value
    .replace(/[!]/g, '') // Remove exclamation marks
    .replace(/\.{2,}/g, '.') // Replace multiple dots with a single dot
    .replace(/[^a-zA-Z0-9_\-#%.()[\]]/g, ''); // Remove remaining invalid characters
}
