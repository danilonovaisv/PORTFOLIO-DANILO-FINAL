import crypto from 'crypto';

export function normalizeBrand(brand: string): string {
  return brand
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeProject(project: string): string {
  return project
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function hashContent(buffer: ArrayBuffer | Buffer): string {
  const hash = crypto.createHash('sha256');
  hash.update(Buffer.from(buffer as ArrayBuffer));
  return hash.digest('hex').slice(0, 16);
}

export interface BuildV4PathParams {
  brand: string;
  project: string;
  kind?: string; // Optional subfolder like 'thumbs', 'posters', etc.
  filename: string;
  ext: string;
  hash: string;
}

export function buildV4Path({
  brand,
  project,
  kind,
  filename,
  ext,
  hash,
}: BuildV4PathParams): string {
  const normalizedBrand = normalizeBrand(brand);
  const normalizedProject = normalizeProject(project);

  // Clean filename: remove existing extension if present, replace non-alphanumeric with dash
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const normalizedFilename =
    nameWithoutExt
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'file';
  const normalizedExt = ext.replace(/^\./, '').toLowerCase().trim();

  const parts = ['v4', normalizedBrand, normalizedProject];
  if (kind) {
    const normalizedKind = kind
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (normalizedKind) {
      parts.push(normalizedKind);
    }
  }

  parts.push(`${normalizedFilename}.${hash}.${normalizedExt}`);

  return parts.join('/');
}

// Ensure the standard immutable cache control is used across the project to prevent double egress
export const CACHE_CONTROL_IMMUTABLE = 'public, max-age=31536000, immutable';
