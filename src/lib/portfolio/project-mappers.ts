import type {
  PortfolioProject,
  ProjectCategory,
  ProjectGridLayout,
  ProjectType,
} from '@/types/project';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import type { DbProjectWithTags } from '@/lib/supabase/queries/projects';

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
  layout: {
    h: string;
    cols: string;
    sizes: string;
  };
};

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  'Branding & Identity': 'branding',
  'Campanhas & Advertising': 'campanha',
  Campanha: 'campanha',
  Branding: 'branding',
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

function getProjectCategory(projectType?: string): ProjectCategory {
  if (!projectType) return 'branding';
  const normalized = projectType.trim();
  return CATEGORY_MAP[normalized] ?? 'branding';
}

function determineProjectType(
  project: DbProjectWithTags | StaticProject
): ProjectType {
  if ('featured_on_home' in project) {
    // It's a DbProjectWithTags
    if (project.featured_on_home || project.featured_on_portfolio) {
      return 'A';
    }
  }
  // For StaticProject, or if not featured, default to 'B'
  // You might want to refine this logic based on your static data structure
  return 'B';
}

function buildLayout(
  projectType: ProjectType,
  index: number
): ProjectGridLayout {
  const featuredLayouts = [
    {
      cols: 'md:col-span-5',
      height: 'min-h-[400px] md:h-[500px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 1024px) 100vw, 42vw',
    },
    {
      cols: 'md:col-span-7',
      height: 'min-h-[400px] md:h-[500px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 1024px) 100vw, 58vw',
    },
    {
      cols: 'md:col-span-12',
      height: 'min-h-[400px] md:h-[600px]',
      aspectRatio: 'aspect-video',
      sizes: '100vw',
    },
    {
      cols: 'md:col-span-8',
      height: 'min-h-[400px] md:h-[400px]',
      aspectRatio: 'aspect-video',
      sizes: '(max-width: 1024px) 100vw, 66vw',
    },
  ];

  if (projectType === 'A') {
    const layoutIndex = index % featuredLayouts.length;
    return featuredLayouts[layoutIndex];
  }

  return {
    cols: 'md:col-span-4',
    height: 'min-h-[280px] md:h-[360px]',
    aspectRatio: 'aspect-[4/5]',
    sizes: '(max-width: 1024px) 100vw, 30vw',
  };
}

function toTagsList(tags?: DbProjectWithTags['tags'] | string[]): string[] {
  if (!tags) return [];
  if (typeof tags[0] === 'string') {
    return tags as string[];
  }
  return (
    (tags as DbProjectWithTags['tags'])
      ?.map((entry) => entry?.tag?.label ?? entry?.tag?.slug)
      .filter(Boolean)
      .map((value) => value as string) ?? []
  );
}

function createGallery(project: DbProjectWithTags) {
  const entries = project.gallery ?? [];
  return entries
    .map((entry) => entry?.path)
    .filter((path): path is string => !!path)
    .map((path) => buildSupabaseStorageUrl('portfolio-media', path));
}

function toVideoPreview(galleryUrls: string[]) {
  const videoExt = ['mp4', 'mov', 'webm', 'm4v'];
  return (
    galleryUrls.find((url) => {
      const extension = url.split('.').pop()?.toLowerCase();
      return extension ? videoExt.includes(extension) : false;
    }) ?? undefined
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
    buildSupabaseStorageUrl('portfolio-media', project.thumbnail_path ?? undefined) ||
    buildSupabaseStorageUrl('portfolio-media', project.hero_image_path ?? undefined);

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
    displayCategory: project.project_type ?? 'Web',
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
    landingPageSlug: project.landing_page?.slug,
  };
}

export function mapStaticProjectToPortfolioProject(
  project: StaticProject,
  index: number
): PortfolioProject {
  const type = determineProjectType(project);
  const layout = buildLayout(type, index);
  const category = getProjectCategory(project.category);
  const tags = toTagsList(project.tags);

  const detail = {
    description: project.title, // fallback
    highlights: tags.slice(0, 3),
    gallery: project.img ? [project.img] : [],
  };

  return {
    id: `static-${project.id}`,
    slug: project.slug,
    title: project.title,
    subtitle: project.client,
    client: project.client,
    category,
    displayCategory: project.category,
    tags,
    year: project.year,
    image: project.img || '',
    type,
    layout,
    detail,
    accentColor: ACCENT_COLOR_MAP[category] ?? undefined,
    isFeatured: true,
    featuredOnHome: true,
    featuredOnPortfolio: true,
    videoPreview: undefined,
    landingPageSlug: undefined,
  };
}
