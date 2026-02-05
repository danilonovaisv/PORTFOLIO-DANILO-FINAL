import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  type MasterProjectAsset,
  type MasterProjectGalleryItem,
  type MasterProjectTemplateData,
  type ParsedLandingPageContent,
} from '@/types/project-template';
import type { LandingPageBlock } from '@/types/landing-page';

type TemplateFallback = {
  slug?: string;
  title?: string;
  cover?: string | null;
};

const DEFAULT_HIGHLIGHT = '#0048ff';

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

const asString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const asNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
};

const asMediaKind = (value: unknown): 'image' | 'video' =>
  value === 'video' ? 'video' : 'image';

const asGalleryLayout = (
  value: unknown
): MasterProjectGalleryItem['layout'] => {
  switch (value) {
    case 'quote-band':
    case 'feature':
    case 'split-left':
    case 'split-right':
      return value;
    case 'full':
    default:
      return 'full';
  }
};

const normalizeAsset = (
  value: unknown,
  fallbackAlt: string,
  fallbackSrc?: string
): MasterProjectAsset => {
  const record = asRecord(value);

  return {
    src: asString(record?.src) ?? fallbackSrc ?? '',
    alt: asString(record?.alt) ?? fallbackAlt,
    kind: asMediaKind(record?.kind),
    poster: asString(record?.poster),
  };
};

const normalizeGalleryItem = (
  value: unknown,
  index: number,
  fallbackAlt: string
): MasterProjectGalleryItem | null => {
  const record = asRecord(value);
  if (!record) return null;

  const src = asString(record.src);
  if (!src) return null;

  return {
    id: asString(record.id) ?? `grid-item-${index + 1}`,
    src,
    alt: asString(record.alt) ?? fallbackAlt,
    kind: asMediaKind(record.kind),
    layout: asGalleryLayout(record.layout),
    poster: asString(record.poster),
    title: asString(record.title),
    eyebrow: asString(record.eyebrow),
    description: asString(record.description),
    quote: asString(record.quote),
  };
};

export function resolveSiteAssetUrl(value?: string | null): string {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  if (!baseUrl) return value;

  const cleanPath = value
    .replace(/^\/?storage\/v1\/object\/public\/site-assets\//, '')
    .replace(/^\/?site-assets\//, '')
    .replace(/^\//, '');

  return `${baseUrl}/storage/v1/object/public/site-assets/${cleanPath}`;
}

export function createDefaultMasterProjectTemplate(
  fallback: TemplateFallback = {}
): MasterProjectTemplateData {
  const title = fallback.title ?? 'Novo Projeto';

  return {
    schema_version: '1.0',
    template: MASTER_PROJECT_TEMPLATE,
    project_slug: fallback.slug ?? '',
    hero_cover_image: {
      src: fallback.cover ?? '',
      alt: `Capa do projeto ${title}`,
      kind: 'image',
    },
    project_title: title,
    project_subtitle: '',
    project_client: '',
    project_year: undefined,
    project_tags: [],
    project_services: [],
    project_summary: '',
    intro_headline: '',
    intro_body: [],
    highlight_color: DEFAULT_HIGHLIGHT,
    gallery_grid: [],
    navigation: {
      back_label: 'voltar',
      next_label: 'próximo projeto',
      next_project_slug: '',
    },
    cta: {
      label: 'vamos trabalhar juntos →',
      href: '/#contact',
    },
    seo: {
      description: '',
      og_image: fallback.cover ?? '',
    },
  };
}

export function isMasterProjectTemplateData(
  value: unknown
): value is MasterProjectTemplateData {
  const record = asRecord(value);
  if (!record) return false;

  return (
    asString(record.template) === MASTER_PROJECT_TEMPLATE &&
    asString(record.project_title) !== undefined &&
    asRecord(record.hero_cover_image) !== null &&
    Array.isArray(record.gallery_grid)
  );
}

function normalizeMasterTemplate(
  value: unknown,
  fallback: TemplateFallback = {}
): MasterProjectTemplateData | null {
  const record = asRecord(value);
  if (!record) return null;

  const template = asString(record.template);
  const hasMasterFields =
    template === MASTER_PROJECT_TEMPLATE ||
    asRecord(record.hero_cover_image) !== null ||
    Array.isArray(record.gallery_grid);

  if (!hasMasterFields) return null;

  const defaults = createDefaultMasterProjectTemplate(fallback);
  const fallbackAlt = `Capa do projeto ${fallback.title ?? defaults.project_title}`;

  const galleryGrid = Array.isArray(record.gallery_grid)
    ? record.gallery_grid
        .map((item, index) => normalizeGalleryItem(item, index, fallbackAlt))
        .filter((item): item is MasterProjectGalleryItem => item !== null)
    : defaults.gallery_grid;

  const navigationRecord = asRecord(record.navigation);
  const ctaRecord = asRecord(record.cta);
  const seoRecord = asRecord(record.seo);

  return {
    schema_version: '1.0',
    template: MASTER_PROJECT_TEMPLATE,
    project_slug:
      asString(record.project_slug) ?? fallback.slug ?? defaults.project_slug,
    hero_cover_image: normalizeAsset(
      record.hero_cover_image,
      fallbackAlt,
      fallback.cover ?? defaults.hero_cover_image.src
    ),
    hero_logo_image: asRecord(record.hero_logo_image)
      ? normalizeAsset(record.hero_logo_image, `${defaults.project_title} logo`)
      : undefined,
    project_title:
      asString(record.project_title) ??
      fallback.title ??
      defaults.project_title,
    project_subtitle:
      asString(record.project_subtitle) ?? defaults.project_subtitle,
    project_client: asString(record.project_client) ?? defaults.project_client,
    project_year: asNumber(record.project_year) ?? defaults.project_year,
    project_tags: asStringArray(record.project_tags),
    project_services: asStringArray(record.project_services),
    project_summary:
      asString(record.project_summary) ?? defaults.project_summary,
    intro_headline: asString(record.intro_headline) ?? defaults.intro_headline,
    intro_body: asStringArray(record.intro_body),
    highlight_color:
      asString(record.highlight_color) ?? defaults.highlight_color,
    gallery_grid: galleryGrid,
    navigation: {
      back_label:
        asString(navigationRecord?.back_label) ??
        defaults.navigation?.back_label,
      next_label:
        asString(navigationRecord?.next_label) ??
        defaults.navigation?.next_label,
      next_project_slug:
        asString(navigationRecord?.next_project_slug) ??
        defaults.navigation?.next_project_slug,
    },
    cta: {
      label: asString(ctaRecord?.label) ?? defaults.cta?.label,
      href: asString(ctaRecord?.href) ?? defaults.cta?.href,
    },
    seo: {
      description:
        asString(seoRecord?.description) ?? defaults.seo?.description,
      og_image: asString(seoRecord?.og_image) ?? defaults.seo?.og_image,
    },
  };
}

export function parseLandingPageContent(
  content: unknown,
  fallback: TemplateFallback = {}
): ParsedLandingPageContent {
  const masterData = normalizeMasterTemplate(content, fallback);
  if (masterData) {
    return {
      template: MASTER_PROJECT_TEMPLATE,
      data: masterData,
    };
  }

  const blocks = Array.isArray(content)
    ? (content as LandingPageBlock[])
    : ([] as LandingPageBlock[]);

  return {
    template: LEGACY_PROJECT_TEMPLATE,
    blocks,
  };
}

export function getProjectOgImage(
  parsed: ParsedLandingPageContent,
  fallbackCover?: string | null
): string | null {
  if (parsed.template === MASTER_PROJECT_TEMPLATE) {
    return (
      parsed.data.seo?.og_image ||
      parsed.data.hero_cover_image.src ||
      fallbackCover ||
      null
    );
  }

  return fallbackCover ?? null;
}

export function getProjectSeoDescription(
  parsed: ParsedLandingPageContent,
  fallbackTitle: string
): string {
  if (parsed.template === MASTER_PROJECT_TEMPLATE) {
    return (
      parsed.data.seo?.description ||
      parsed.data.project_summary ||
      `Projeto ${parsed.data.project_title} por Danilo Novais.`
    );
  }

  return `Landing page do projeto ${fallbackTitle} por Danilo Novais, com visão criativa, direção de arte e foco em narrativa visual e performance digital.`;
}
