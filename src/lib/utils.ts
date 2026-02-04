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

  const sanitized = value
    .replace(/[!]/g, '') // Remove exclamation marks
    .replace(/\.{2,}/g, '.') // Replace multiple dots with a single dot
    .replace(/[^a-zA-Z0-9_\-#%.()[\]]/g, ''); // Remove remaining invalid characters

  if (!sanitized) return '';
  if (hasUnsafeBracketContent(sanitized)) return '';

  return sanitized;
}

function hasUnsafeBracketContent(value: string): boolean {
  const bracketPattern = /\[([^\]]*)\]/g;
  let match: RegExpExecArray | null;

  while ((match = bracketPattern.exec(value)) !== null) {
    const inner = match[1].trim();
    if (!inner) return true;
    if (/^[.\d]/.test(inner)) return true;
    if (/^[0-9A-Fa-f]+$/.test(inner) && !inner.startsWith('#')) return true;
  }

  return false;
}
