import type { PortfolioProject, ProjectCategory, ProjectGridLayout, ProjectType } from '@/types/project';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  'Branding & Identity': 'branding',
  'Campanhas & Advertising': 'campanha',
  'Campanha': 'campanha',
  'Branding': 'branding',
  'Web & Digital': 'web',
  'Motion & Video': 'motion',
  'Institucional & Retail': 'institucional',
  Packaging: 'packaging',
};

const ACCENT_COLOR_MAP: Record<ProjectCategory, string> = {
  branding: '#0057ff',
  campanha: '#ff3366',
  web: '#4fe6ff',
  motion: '#8705f2',
  institucional: '#00a868',
  packaging: '#ffd700',
  all: '#ffffff',
};

const LAYOUT_PRESETS: Record<ProjectType, ProjectGridLayout> = {
  A: {
    cols: 'md:col-span-6',
    height: 'min-h-[400px] md:h-[500px]',
    aspectRatio: 'aspect-[4/5]',
  },
  B: {
    cols: 'md:col-span-4',
    height: 'min-h-[300px] md:h-[420px]',
    aspectRatio: 'aspect-[4/5]',
  },
};

function getProjectCategory(projectType?: string) {
  if (!projectType) return 'branding';
  const normalized = projectType.trim();
  return CATEGORY_MAP[normalized] ?? 'branding';
}

function determineProjectType(project: DbProjectWithTags): ProjectType {
  if (project.featured_on_home || project.featured_on_portfolio) {
    return 'A';
  }
  return 'B';
}

function buildLayout(projectType: ProjectType, index: number): ProjectGridLayout {
  return {
    ...LAYOUT_PRESETS[projectType],
    cols:
      projectType === 'A'
        ? index % 2 === 0
          ? 'md:col-span-6'
          : 'md:col-span-7'
        : 'md:col-span-4',
    height:
      projectType === 'A' ? 'min-h-[400px] md:h-[520px]' : 'min-h-[280px] md:h-[360px]',
    sizes:
      projectType === 'A'
        ? '(max-width: 1024px) 100vw, 42vw'
        : '(max-width: 1024px) 100vw, 30vw',
  };
}

function toTagsList(tags?: DbProjectWithTags['tags']) {
  return (
    tags
      ?.map((entry) => entry?.tag?.label ?? entry?.tag?.slug)
      .filter(Boolean)
      .map((value) => value as string) ?? []
  );
}

function createGallery(project: DbProjectWithTags) {
  const entries = project.gallery ?? [];
  return entries
    .map((entry) => entry?.path)
    .filter(Boolean)
    .map((path) => buildSupabaseStorageUrl('portfolio-media', path!));
}

function toVideoPreview(galleryUrls: string[]) {
  const videoExt = ['mp4', 'mov', 'webm', 'm4v'];
  return (
    galleryUrls.find((url) => {
      const extension = url.split('.').pop()?.toLowerCase();
      return extension ? videoExt.includes(extension) : false;
    }) ??
    undefined
  );
}

export function mapDbProjectToPortfolioProject(
  project: DbProjectWithTags,
  index: number
): PortfolioProject {
  const type = determineProjectType(project);
  const layout = buildLayout(type, index);
  const category = getProjectCategory(project.project_type);
  const tags = toTagsList(project.tags);
  const gallery = createGallery(project);
  const thumbnailUrl =
    buildSupabaseStorageUrl(
      'portfolio-media',
      project.thumbnail_path ?? undefined
    ) ||
    buildSupabaseStorageUrl(
      'portfolio-media',
      project.hero_image_path ?? undefined
    );
  const detail = {
    description: project.description ?? '',
    highlights: tags.length ? tags.slice(0, 3) : undefined,
    gallery,
  };

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    subtitle: project.short_label ?? project.client_name,
    client: project.client_name,
    category,
    displayCategory: project.project_type,
    tags,
    year: project.year ?? 0,
    image: thumbnailUrl || '',
    type,
    layout,
    detail,
    accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
    isFeatured: project.featured_on_portfolio,
    featuredOnHome: project.featured_on_home,
    featuredOnPortfolio: project.featured_on_portfolio,
    videoPreview: toVideoPreview(gallery),
  };
}
