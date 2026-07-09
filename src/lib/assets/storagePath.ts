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

export async function hashContent(
  buffer: ArrayBuffer | Buffer
): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    buffer as ArrayBuffer
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex.slice(0, 16);
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

  const parts = [normalizedBrand, normalizedProject, 'assets-do-projeto'];
  if (kind) {
    let normalizedKind = kind
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Requisito estrito TASK-08: landing page assets vão para o subpath LANDIN-PAGE
    if (normalizedKind === 'landing-page' || normalizedKind === 'landing') {
      normalizedKind = 'landin-page';
    }

    if (normalizedKind) {
      parts.push(normalizedKind);
    }
  }

  parts.push(`${normalizedFilename}.${hash}.${normalizedExt}`);

  return parts.join('/');
}

// Ensure the standard immutable cache control is used across the project to prevent double egress
export const CACHE_CONTROL_IMMUTABLE = 'public, max-age=31536000, immutable';
