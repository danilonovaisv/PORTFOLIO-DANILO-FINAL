import type {
  PortfolioProject,
  ProjectDestination,
  ProjectCategory,
  ProjectGridLayout,
  ProjectType,
} from '@/types/project';
import {
  buildSupabaseStorageUrl,
  normalizeStoragePath,
} from '@/lib/supabase/urls';
import { normalizeHomeFeaturedConfig } from '@/lib/portfolio/home-featured';
import { isLegacyProjectMediaAsset } from '@/lib/portfolio/card-media';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';
import { isVideo, isYouTubeUrl } from '@/lib/utils';

// Define a type for the static project from HOME_CONTENT
type StaticProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  img: string | null | undefined;
  description?: string;
  link?: string;
  landingPageSlug?: string | null;
  homeFeatured?: {
    enabled?: boolean;
    cardStyle?: 'ANIMATED_BG_INVERTED_LOGO' | 'ANIMATED_BG_THUMB_OVERLAY_5';
    logoPath?: string | null;
  };
  layout: {
    h: string;
    cols: string;
    sizes: string;
  };
};

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  'Brand & Campaigns': 'branding',
  'Videos & Motions': 'motion',
  'Websites & Tech': 'web',
  // keep legacy matches for old entries temporarily
  'Branding & Identity': 'branding',
  'Campanhas & Advertising': 'branding',
  'Web & Digital': 'web',
  'Motion & Video': 'motion',
  'Institucional & Retail': 'branding',
  Campanha: 'branding',
  Branding: 'branding',
  Packaging: 'branding',
};

const ACCENT_COLOR_MAP: Record<ProjectCategory, string> = {
  branding: '#0057ff',
  campanha: '#ff3366',
  web: '#4fe6ff',
  motion: '#8705f2',
  institucional: '#00a868',
  packaging: '#ffd700',
  all: '#ffffff',
  'Landing Page': '#6366f1', // Indigo for Landing Pages
};
const LOCAL_PUBLIC_ASSET_PATTERN = /^\/(site\.assets|images|videos|fonts|captions)\//i;
const STORAGE_PUBLIC_PATH_PATTERN =
  /^\/?storage\/v1\/object\/public\/([^/]+)\/(.+)$/i;
const EXPLICIT_BUCKET_PATTERN =
  /^(site-assets|portfolio-media)\/(.+)$/i;

const uniqueStrings = (values: string[]): string[] => {
  const seen = new Set<string>();
  return values.filter((value) => {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
};

function getProjectCategory(projectType?: string): ProjectCategory {
  if (!projectType) return 'branding';
  const normalized = projectType.trim();
  return CATEGORY_MAP[normalized] ?? 'branding';
}

function determineProjectType(
  project: DbProjectWithTags | StaticProject
): ProjectType {
  // Conforme o Protótipo Interativo 3.2:
  // Tipo A (Zoom): Para projetos simples (uma imagem principal)
  // Tipo B (Case): Para projetos complexos (gallery ou descrição longa)

  const hasGallery = 'gallery' in project && Array.isArray(project.gallery) && project.gallery.length > 0;
  const description = 'description' in project ? project.description : project.title;
  const isComplex = hasGallery || (description && description.length > 200);

  return isComplex ? 'B' : 'A';
}

type PreferredSize = 'sm' | 'md' | 'lg' | 'wide';

function applyPreferredSize(preferred?: PreferredSize): ProjectGridLayout | null {
  if (!preferred) return null;

  const base = {
    height: 'min-h-[320px]',
    aspectRatio: 'aspect-[4/5]',
  };

  switch (preferred) {
    case 'sm':
    case 'md':
      return {
        ...base,
        cols: 'md:col-span-4 lg:col-span-4',
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
        size: preferred,
      };
    case 'lg':
      return {
        ...base,
        cols: 'md:col-span-6 lg:col-span-8',
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 66vw',
        size: 'lg',
      };
    case 'wide':
      return {
        ...base,
        cols: 'md:col-span-8 lg:col-span-12',
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw',
        size: 'wide',
      };
    default:
      return null;
  }
}

function buildLayout(
  _projectType: ProjectType,
  index: number,
  preferredSize?: PreferredSize
): ProjectGridLayout {
  // Preferred size from admin has priority.
  const override = applyPreferredSize(preferredSize);
  if (override) return override;

  const automaticLayouts: ProjectGridLayout[] = [
    // 2 cards row: 8 + 4
    {
      cols: 'md:col-span-8 lg:col-span-8',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw',
      size: 'lg',
    },
    {
      cols: 'md:col-span-4 lg:col-span-4',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
      size: 'sm',
    },
    // 3 cards row: 4 + 4 + 4
    {
      cols: 'md:col-span-4 lg:col-span-4',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
      size: 'sm',
    },
    {
      cols: 'md:col-span-4 lg:col-span-4',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
      size: 'sm',
    },
    {
      cols: 'md:col-span-4 lg:col-span-4',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
      size: 'sm',
    },
    // Additional editorial rhythm
    {
      cols: 'md:col-span-8 lg:col-span-8',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw',
      size: 'lg',
    },
    {
      cols: 'md:col-span-4 lg:col-span-4',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
      size: 'sm',
    },
    {
      cols: 'md:col-span-8 lg:col-span-12',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[16/7]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw',
      size: 'wide',
    },
  ];

  return automaticLayouts[index % automaticLayouts.length];
}

function toTagsList(tags?: DbProjectWithTags['tags'] | string[]): string[] {
  if (!tags) return [];
  if (typeof tags[0] === 'string') {
    return uniqueStrings(tags as string[]);
  }
  const extracted =
    (tags as DbProjectWithTags['tags'])
      ?.map((entry) => entry?.tag?.label ?? entry?.tag?.slug)
      .filter(Boolean)
      .map((value) => value as string) ?? [];
  return uniqueStrings(extracted);
}

function createGallery(project: DbProjectWithTags): string[] {
  const entries = project.gallery ?? [];
  const media = entries
    .filter((entry): entry is { path?: string; caption?: string; type?: 'image' | 'youtube' | 'video'; youtube_video_id?: string } => !!entry)
    .map((entry) => {
      if (entry.type === 'youtube' && entry.youtube_video_id) {
        return `https://www.youtube.com/watch?v=${entry.youtube_video_id}`;
      }
      return resolveProjectMedia(entry.path);
    })
    .filter((url): url is string => !!url);

  return uniqueStrings(media);
}

function toVideoPreview(galleryUrls: string[]) {
  return galleryUrls.find((url) => isVideo(url)) ?? undefined;
}

function toShortDescription(
  description?: string | null,
  fallback?: string | null
) {
  const normalized = description?.trim();
  if (normalized) return normalized.slice(0, 180);
  const fallbackNormalized = fallback?.trim();
  return fallbackNormalized ? fallbackNormalized.slice(0, 180) : undefined;
}

function getPortfolioPillarLabel(category: ProjectCategory) {
  if (category === 'motion') return 'Videos & Motions';
  if (category === 'web' || category === 'Landing Page') {
    return 'Websites & Tech';
  }
  return 'Brand & Campaigns';
}

function appendYouTubeMedia(gallery: string[], candidate?: string | null) {
  const normalized = candidate?.trim();
  if (!normalized || !isYouTubeUrl(normalized)) {
    return gallery;
  }
  return uniqueStrings([...gallery, normalized]);
}

function inferProjectDestination({
  landingSlug,
}: {
  landingSlug?: string | null;
}): ProjectDestination {
  const normalizedLandingSlug = landingSlug?.trim();
  if (normalizedLandingSlug) {
    return {
      type: 'internal_landing',
      landingSlug: normalizedLandingSlug,
    };
  }

  return {
    type: 'modal',
  };
}

/**
 * Normalize the destination payload persisted by the admin
 * (`portfolio_projects.destination`) to a strict ProjectDestination,
 * harmonising the historical `url` / `href` aliases used across the codebase.
 */
function normalizeStoredDestination(
  raw: unknown
): ProjectDestination | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as {
    type?: unknown;
    url?: unknown;
    href?: unknown;
    landingSlug?: unknown;
    openInNewTab?: unknown;
  };

  const type = candidate.type;
  if (
    type !== 'modal' &&
    type !== 'internal_landing' &&
    type !== 'external_url' &&
    type !== 'page'
  ) {
    return null;
  }

  const url = typeof candidate.url === 'string' ? candidate.url.trim() : '';
  const href = typeof candidate.href === 'string' ? candidate.href.trim() : '';
  const resolvedUrl = url || href || undefined;
  const landingSlug =
    typeof candidate.landingSlug === 'string'
      ? candidate.landingSlug.trim() || undefined
      : undefined;
  const openInNewTab =
    typeof candidate.openInNewTab === 'boolean'
      ? candidate.openInNewTab
      : undefined;

  const result: ProjectDestination = { type };
  if (resolvedUrl) {
    result.url = resolvedUrl;
    result.href = resolvedUrl;
  }
  if (landingSlug) result.landingSlug = landingSlug;
  if (openInNewTab !== undefined) result.openInNewTab = openInNewTab;
  return result;
}

function resolveProjectMedia(path?: string | null): string | undefined {
  if (!path) return undefined;

  const raw = path.trim();
  if (!raw) return undefined;

  if (
    raw.startsWith('http://') ||
    raw.startsWith('https://') ||
    raw.startsWith('blob:') ||
    raw.startsWith('data:')
  ) {
    return raw;
  }

  if (raw.startsWith('#') || LOCAL_PUBLIC_ASSET_PATTERN.test(raw)) {
    return raw;
  }

  const storageMatch = raw.match(STORAGE_PUBLIC_PATH_PATTERN);
  if (storageMatch) {
    const [, bucket, bucketPath] = storageMatch;
    return buildSupabaseStorageUrl(bucket, bucketPath) ?? undefined;
  }

  const noLeadingSlash = raw.replace(/^\/+/, '');
  const explicitBucketMatch = noLeadingSlash.match(EXPLICIT_BUCKET_PATTERN);
  if (explicitBucketMatch) {
    const [, bucket, bucketPath] = explicitBucketMatch;
    return buildSupabaseStorageUrl(bucket.toLowerCase(), bucketPath) ?? undefined;
  }

  const normalizedPath = normalizeStoragePath(noLeadingSlash) ?? noLeadingSlash;
  // Known site-level prefixes that belong in the site-assets bucket.
  // Everything else (brand folders, project folders, etc.) goes to portfolio-media.
  const SITE_ASSET_PREFIXES = ['about/', 'clients/', 'global/', 'home/', 'landing-pages/'];
  const isSiteAsset = SITE_ASSET_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix));
  const inferredBucket = isSiteAsset ? 'site-assets' : 'portfolio-media';

  return buildSupabaseStorageUrl(inferredBucket, normalizedPath) ?? undefined;
}

export function mapDbProjectToPortfolioProject(
  project: DbProjectWithTags,
  index: number
): PortfolioProject {
  const normalizedSlug = project.slug?.replace(/_/g, '-');
  const relationLandingSlug =
    (project as unknown as { landing_page?: { slug?: string | null } | null })
      .landing_page?.slug ?? null;
  const landingSlugSource = project.landing_page_slug ?? relationLandingSlug;
  const normalizedLandingSlug = landingSlugSource?.replace(/_/g, '-');
  const type = determineProjectType(project);
  const layout = buildLayout(type, index);
  const category = getProjectCategory(project.project_type);
  const tags = toTagsList(project.tags);
  const gallery = createGallery(project);
  const rawProjectLink =
    (project as DbProjectWithTags & { link?: string | null; external_url?: string | null })
      .link ??
    (project as DbProjectWithTags & { external_url?: string | null }).external_url ??
    null;
  const galleryWithYoutube = appendYouTubeMedia(gallery, rawProjectLink);
  const landscapeUrl = resolveProjectMedia(project.url_landscape);
  const squareUrl = resolveProjectMedia(project.url_square);
  const staticLandscapeUrl = !isVideo(landscapeUrl) ? landscapeUrl : undefined;
  const staticSquareUrl = !isVideo(squareUrl) ? squareUrl : undefined;
  const thumbnailMedia =
    resolveProjectMedia(project.thumbnail_path) ||
    resolveProjectMedia(project.hero_image_path);
  const thumbnailIsVideo = isVideo(thumbnailMedia);
  const heroMedia = resolveProjectMedia(project.hero_image_path);
  const shouldPreferStructuredCardMedia =
    Boolean(landscapeUrl || squareUrl) &&
    (isLegacyProjectMediaAsset(thumbnailMedia) ||
      isLegacyProjectMediaAsset(heroMedia));
  // Dedicated static hero fallback (never a video)
  const heroImageUrl = !isVideo(project.hero_image_path)
    ? resolveProjectMedia(project.hero_image_path)
    : undefined;
  const primaryImageCandidates = [
    !thumbnailIsVideo ? thumbnailMedia : undefined,
    staticLandscapeUrl,
    staticSquareUrl,
    heroImageUrl,
    // Filter gallery to only include non-video entries
    ...gallery.filter((url) => !isVideo(url)),
  ].filter(Boolean) as string[];

  const primaryImage = primaryImageCandidates[0] || '';
  const videoPreview =
    [
      shouldPreferStructuredCardMedia
        ? undefined
        : thumbnailIsVideo
          ? thumbnailMedia
          : undefined,
      shouldPreferStructuredCardMedia
        ? undefined
        : isVideo(heroMedia)
          ? heroMedia
          : undefined,
      isVideo(landscapeUrl) ? landscapeUrl : undefined,
      isVideo(squareUrl) ? squareUrl : undefined,
      toVideoPreview(galleryWithYoutube),
    ].find((entry): entry is string => Boolean(entry)) ?? undefined;

  const detail = {
    description: project.description ?? '',
    highlights: tags.length ? tags.slice(0, 4) : undefined,
    gallery: galleryWithYoutube,
  };
  // Prefer the admin-saved destination payload when present, falling back to
  // landing-slug-based inference. Admin saves `destination.url`; downstream
  // components (e.g. ProjectCard) historically read `destination.href`, so the
  // normalizer fills both aliases.
  const storedDestination = normalizeStoredDestination(
    (project as DbProjectWithTags & { destination?: unknown }).destination
  );
  const destination =
    storedDestination ??
    inferProjectDestination({
      landingSlug: normalizedLandingSlug ?? landingSlugSource,
    });

  return {
    id: project.id,
    slug: normalizedSlug ?? project.slug,
    title: project.title,
    subtitle: project.short_label ?? project.client_name,
    shortDescription: toShortDescription(project.description, project.short_label),
    client: project.client_name,
    category,
    displayCategory: getPortfolioPillarLabel(category),
    tags,
    year: project.year ?? 0,
    image: primaryImage,
    imageLandscape: landscapeUrl ?? undefined,
    imageSquare: squareUrl ?? undefined,
    thumbnailMedia: thumbnailMedia ?? undefined,
    type,
    layout,
    detail,
    accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
    isFeatured: project.featured_on_home || project.featured_on_portfolio,
    featuredOnHome: project.featured_on_home,
    featuredOnPortfolio: project.featured_on_portfolio,
    homeFeatured: normalizeHomeFeaturedConfig(
      (project as DbProjectWithTags & { home_featured?: unknown }).home_featured,
      project.featured_on_home
    ),
    videoPreview,
    landingPageSlug: normalizedLandingSlug ?? landingSlugSource,
    destination,
    caseBody: (project as DbProjectWithTags & { case_body?: string | null }).case_body ?? null,
  };
}

export function mapStaticProjectToPortfolioProject(
  project: StaticProject,
  index: number
): PortfolioProject {
  const normalizedSlug = project.slug?.replace(/_/g, '-');
  const type = determineProjectType(project);
  const layout = buildLayout(type, index);
  const category = getProjectCategory(project.category);
  const tags = toTagsList(project.tags);

  const detail = {
    description: project.description ?? project.title,
    highlights: tags.slice(0, 4),
    gallery: appendYouTubeMedia(project.img ? [project.img] : [], project.link),
  };
  const normalizedLandingSlug = project.landingPageSlug?.replace(/_/g, '-');
  const destination = inferProjectDestination({
    landingSlug: normalizedLandingSlug ?? project.landingPageSlug,
  });

  return {
    id: `static-${project.id}`,
    slug: normalizedSlug ?? project.slug,
    title: project.title,
    subtitle: project.client,
    shortDescription: toShortDescription(project.description, project.client),
    client: project.client,
    category,
    displayCategory: getPortfolioPillarLabel(category),
    tags,
    year: project.year,
    image: project.img || '',
    imageLandscape: project.img || undefined,
    imageSquare: project.img || undefined,
    thumbnailMedia: project.img || undefined,
    type,
    layout,
    detail,
    accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
    isFeatured: true,
    featuredOnHome: true,
    featuredOnPortfolio: true,
    homeFeatured: normalizeHomeFeaturedConfig(project.homeFeatured, true),
    videoPreview: undefined,
    landingPageSlug: normalizedLandingSlug ?? project.landingPageSlug,
    link: project.link,
    destination,
  };
}
