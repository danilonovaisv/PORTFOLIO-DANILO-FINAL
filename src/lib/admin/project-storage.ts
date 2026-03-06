import { normalizeStoragePath } from '@/lib/supabase/urls';

type ProjectGalleryEntry = {
  path?: string | null;
};

type ProjectHomeFeatured = {
  logoPath?: string | null;
};

export type ProjectStorageSnapshot = {
  url_landscape?: string | null;
  url_square?: string | null;
  home_featured?: ProjectHomeFeatured | null;
  gallery?: ProjectGalleryEntry[] | null;
};

export type StoragePathRewrite = {
  from: string;
  to: string;
};

const HTTP_PROTOCOL_PATTERN = /^https?:\/\//i;

function normalizePortfolioMediaPath(path?: string | null) {
  const normalized = normalizeStoragePath(path, 'portfolio-media');

  if (!normalized) return null;
  if (HTTP_PROTOCOL_PATTERN.test(normalized)) return null;
  if (normalized.startsWith('site-assets/')) return null;

  return normalized;
}

function addPath(paths: Set<string>, path?: string | null) {
  const normalized = normalizePortfolioMediaPath(path);
  if (normalized) {
    paths.add(normalized);
  }
}

export function collectProjectStoragePaths(
  project?: ProjectStorageSnapshot | null
) {
  const paths = new Set<string>();

  addPath(paths, project?.url_landscape);
  addPath(paths, project?.url_square);
  addPath(paths, project?.home_featured?.logoPath);

  if (Array.isArray(project?.gallery)) {
    for (const item of project.gallery) {
      addPath(paths, item?.path);
    }
  }

  return Array.from(paths);
}

export function rewriteStoragePath(
  path: string,
  rewrites: StoragePathRewrite[] = []
) {
  const normalizedPath = normalizePortfolioMediaPath(path);
  if (!normalizedPath) return null;

  const orderedRewrites = [...rewrites].sort(
    (left, right) => right.from.length - left.from.length
  );

  let nextPath = normalizedPath;

  for (const rewrite of orderedRewrites) {
    if (nextPath === rewrite.from) {
      nextPath = rewrite.to;
      continue;
    }

    if (nextPath.startsWith(`${rewrite.from}/`)) {
      nextPath = `${rewrite.to}${nextPath.slice(rewrite.from.length)}`;
    }
  }

  return nextPath;
}

export function findRemovedProjectStoragePaths(
  previousProject?: ProjectStorageSnapshot | null,
  nextProject?: ProjectStorageSnapshot | null,
  rewrites: StoragePathRewrite[] = []
) {
  const previousPaths = collectProjectStoragePaths(previousProject)
    .map((path) => rewriteStoragePath(path, rewrites))
    .filter((path): path is string => Boolean(path));

  const nextPaths = new Set(collectProjectStoragePaths(nextProject));

  return Array.from(
    new Set(previousPaths.filter((path) => !nextPaths.has(path)))
  );
}
