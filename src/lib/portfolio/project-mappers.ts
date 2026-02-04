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
  // Conforme o Protótipo Interativo 3.2:
  // Tipo A (Zoom): Para projetos simples (uma imagem principal)
  // Tipo B (Case): Para projetos complexos (gallery ou descrição longa)

  const hasGallery = 'gallery' in project && Array.isArray(project.gallery) && project.gallery.length > 0;
  const description = 'description' in project ? project.description : project.title;
  const isComplex = hasGallery || (description && description.length > 200);

  return isComplex ? 'B' : 'A';
}

function buildLayout(
  projectType: ProjectType,
  index: number
): ProjectGridLayout {
  /**
   * Layout Pattern para Portfolio Grid:
   * - Rows devem sempre somar 12 colunas (edge-to-edge)
   * - Altura fixa no desktop para uniformidade visual
   * - Pattern: [5+7], [7+5], [4+4+4], [6+6], [8+4], [4+8]
   */
  const pairedLayouts: ProjectGridLayout[] = [
    // Row pattern: 6 + 6 = 12 (Ensures first row is full width)
    {
      cols: 'md:col-span-6 lg:col-span-6',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw',
      size: 'md',
    },
    {
      cols: 'md:col-span-6 lg:col-span-6',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw',
      size: 'md',
    },
    // Row pattern: 7 + 5 = 12
    {
      cols: 'md:col-span-5 lg:col-span-7',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 58vw',
      size: 'lg',
    },
    {
      cols: 'md:col-span-3 lg:col-span-5',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 42vw',
      size: 'md',
    },
    // Row pattern: 4 + 4 + 4 = 12 (3 cards per row)
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
    // Row pattern: 6 + 6 = 12 (2 equal cards)
    {
      cols: 'md:col-span-4 lg:col-span-6',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, 50vw',
      size: 'md',
    },
    {
      cols: 'md:col-span-4 lg:col-span-6',
      height: 'min-h-[320px]',
      aspectRatio: 'aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, 50vw',
      size: 'md',
    },
  ];

  // Para projetos do tipo A (featured), usar layouts variados
  // Para tipo B, usar grid uniforme de 4 colunas
  if (projectType === 'A') {
    const layoutIndex = index % pairedLayouts.length;
    return pairedLayouts[layoutIndex];
  }

  // Projetos tipo B: sempre 4 colunas (3 por linha no lg)
  return {
    cols: 'md:col-span-4 lg:col-span-4',
    height: 'min-h-[320px]',
    aspectRatio: 'aspect-[4/5]',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw',
    size: 'sm',
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

function createGallery(project: DbProjectWithTags): string[] {
  const entries = project.gallery ?? [];
  return entries
    .filter((entry): entry is { path: string; caption?: string } => !!entry)
    .map((entry) => entry.path)
    .filter((path): path is string => !!path)
    .map((path) => buildSupabaseStorageUrl('portfolio-media', path))
    .filter((url): url is string => !!url); // Additional filter to remove any null urls from buildSupabaseStorageUrl
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
    gallery, // Already filtered in createGallery function
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
