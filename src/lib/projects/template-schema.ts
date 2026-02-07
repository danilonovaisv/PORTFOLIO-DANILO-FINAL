import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  type MasterProjectAsset,
  type MasterProjectGalleryItem,
  type MasterProjectTemplateData,
  type MasterProjectTemplateV2Data,
  type MasterProjectTemplateV3Data,
  type MasterProjectV2FeatureItem,
  type MasterProjectV2GalleryItem,
  type ParsedLandingPageContent,
} from '@/types/project-template';

type TemplateFallback = {
  slug?: string;
  title?: string;
  cover?: string | null;
};

const DEFAULT_HIGHLIGHT = '#0048ff';
const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov)$/i;
const YOUTUBE_PATTERN =
  /(youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i;
const V3_BLOCK_TYPES: BlockType[] = [
  'text',
  'image',
  'video',
  'video-autoplay',
  'image-text',
  'text-image',
  'image-image',
  'image-video',
  'video-text',
  'quote-band',
];

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

const asBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
};

const asIntroParagraphs = (value: unknown): string[] => {
  if (Array.isArray(value)) return asStringArray(value);
  const text = asString(value);
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

const asMediaKind = (value: unknown): 'image' | 'video' =>
  value === 'video' ? 'video' : 'image';

const asGalleryLayout = (
  value: unknown
): MasterProjectGalleryItem['layout'] => {
  switch (value) {
    case 'grid':
    case 'full-highlight':
    case 'full':
    case 'quote-band':
    case 'feature':
    case 'split-left':
    case 'split-right':
      return value;
    default:
      return 'full';
  }
};

const normalizeLegacyLayoutToV2 = (
  value: unknown
): MasterProjectV2GalleryItem['layout_type'] => {
  switch (value) {
    case 'grid':
      return 'grid_2_col';
    case 'full':
      return 'grid_1_col';
    case 'full-highlight':
    case 'feature':
      return 'grid_feat';
    case 'quote-band':
      return 'grid_quote';
    case 'split-left':
    case 'split-right':
      return 'grid_split';
    default:
      return 'grid_1_col';
  }
};

const asGalleryLayoutV2 = (
  value: unknown
): MasterProjectV2GalleryItem['layout_type'] => {
  switch (value) {
    case 'grid_2_col':
    case 'grid_1_col':
    case 'grid_feat':
    case 'grid_features_3':
    case 'grid_quote':
    case 'grid_split':
      return value;
    default:
      return normalizeLegacyLayoutToV2(value);
  }
};

const asMediaAlign = (value: unknown): 'left' | 'right' =>
  value === 'right' ? 'right' : 'left';

const asBlockType = (value: unknown): BlockType =>
  V3_BLOCK_TYPES.includes(value as BlockType) ? (value as BlockType) : 'text';

const inferMediaType = (
  src?: string,
  fallback?: unknown
): LandingPageBlock['content']['mediaType'] => {
  if (fallback === 'image' || fallback === 'video' || fallback === 'youtube') {
    return fallback;
  }

  if (!src) return undefined;
  if (YOUTUBE_PATTERN.test(src)) return 'youtube';
  if (VIDEO_FILE_PATTERN.test(src)) return 'video';
  return 'image';
};

const asTextAlign = (
  value: unknown
): 'left' | 'center' | 'right' | 'justify' | undefined => {
  if (value === 'left') return 'left';
  if (value === 'center') return 'center';
  if (value === 'right') return 'right';
  if (value === 'justify') return 'justify';
  return undefined;
};

const normalizeTextConfig = (
  value: unknown
): LandingPageBlock['content']['textConfig'] | undefined => {
  const record = asRecord(value);
  if (!record) return undefined;

  return {
    fontSize: asString(record.fontSize),
    fontWeight: asString(record.fontWeight),
    color: asString(record.color),
    textAlign: asTextAlign(record.textAlign),
  };
};

const blockNeedsPrimaryMedia = (type: BlockType): boolean =>
  type === 'image' ||
  type === 'video' ||
  type === 'video-autoplay' ||
  type === 'image-text' ||
  type === 'text-image' ||
  type === 'image-image' ||
  type === 'image-video' ||
  type === 'video-text';

const blockNeedsSecondaryMedia = (type: BlockType): boolean =>
  type === 'image-image' || type === 'image-video';

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

  const layout = asGalleryLayout(record.layout);
  const src = asString(record.src) ?? '';
  const requiresMedia = layout !== 'quote-band';
  if (requiresMedia && !src) return null;

  return {
    id: asString(record.id) ?? `grid-item-${index + 1}`,
    src,
    alt: asString(record.alt) ?? fallbackAlt,
    kind: asMediaKind(record.kind),
    layout,
    poster: asString(record.poster),
    title: asString(record.title),
    eyebrow: asString(record.eyebrow),
    description: asString(record.description),
    quote: asString(record.quote),
  };
};

const normalizeFeatureItems = (
  value: unknown
): MasterProjectV2FeatureItem[] | undefined => {
  if (!Array.isArray(value)) return undefined;

  const items = value.reduce<MasterProjectV2FeatureItem[]>(
    (acc, item, index) => {
      const record = asRecord(item);
      if (!record) return acc;

      const title = asString(record.title);
      if (!title) return acc;

      acc.push({
        id: asString(record.id) ?? `feature-${index + 1}`,
        title,
        description: asString(record.description),
      });
      return acc;
    },
    []
  );

  return items.length > 0 ? items : undefined;
};

const normalizeGalleryItemV2 = (
  value: unknown,
  index: number,
  fallbackAlt: string
): MasterProjectV2GalleryItem | null => {
  const record = asRecord(value);
  if (!record) return null;

  const legacyLayout = asString(record.layout);
  const layout_type = asGalleryLayoutV2(record.layout_type ?? legacyLayout);
  const src = asString(record.src) ?? '';
  const requiresMedia = layout_type !== 'grid_quote';
  if (requiresMedia && !src) return null;

  const media_align =
    legacyLayout === 'split-right'
      ? 'right'
      : legacyLayout === 'split-left'
        ? 'left'
        : asMediaAlign(record.media_align);

  return {
    id: asString(record.id) ?? `grid-item-${index + 1}`,
    layout_type,
    src,
    alt:
      asString(record.alt) ?? (layout_type === 'grid_quote' ? '' : fallbackAlt),
    kind: asMediaKind(record.kind),
    poster: asString(record.poster),
    title: asString(record.title),
    eyebrow: asString(record.eyebrow),
    description: asString(record.description),
    quote: asString(record.quote),
    media_align,
    features: normalizeFeatureItems(record.features),
  };
};

const normalizeLandingBlock = (
  value: unknown,
  index: number,
  fallbackAlt: string
): LandingPageBlock | null => {
  const record = asRecord(value);
  if (!record) return null;

  const type = asBlockType(record.type);
  const contentRecord = asRecord(record.content) ?? {};

  const media = asString(contentRecord.media ?? record.src);
  const media2 = asString(contentRecord.media2 ?? record.src2);

  if (blockNeedsPrimaryMedia(type) && !media) return null;
  if (blockNeedsSecondaryMedia(type) && !media2) return null;

  const normalized: LandingPageBlock = {
    id: asString(record.id) ?? `block-${index + 1}`,
    type,
    content: {
      text: asString(contentRecord.text ?? record.title),
      text2: asString(contentRecord.text2),
      textConfig: normalizeTextConfig(contentRecord.textConfig),
      textConfig2: normalizeTextConfig(contentRecord.textConfig2),
      media,
      media2,
      alt: asString(contentRecord.alt ?? record.alt) ?? fallbackAlt,
      alt2: asString(contentRecord.alt2 ?? record.alt2),
      poster: asString(contentRecord.poster ?? record.poster),
      poster2: asString(contentRecord.poster2 ?? record.poster2),
      mediaType: inferMediaType(media, contentRecord.mediaType),
      mediaType2: inferMediaType(media2, contentRecord.mediaType2),
      autoplay: asBoolean(contentRecord.autoplay),
      bandColor: asString(contentRecord.bandColor ?? record.bandColor),
    },
  };

  return normalized;
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

export function createDefaultMasterProjectTemplateV2(
  fallback: TemplateFallback = {}
): MasterProjectTemplateV2Data {
  const title = fallback.title ?? 'Novo Projeto';

  return {
    schema_version: '2.0',
    template: MASTER_PROJECT_TEMPLATE_V2,
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
    theme_color: DEFAULT_HIGHLIGHT,
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

export function createDefaultMasterProjectTemplateV3(
  fallback: TemplateFallback = {}
): MasterProjectTemplateV3Data {
  const title = fallback.title ?? 'Novo Projeto';

  return {
    schema_version: '3.0',
    template: MASTER_PROJECT_TEMPLATE_V3,
    project_slug: fallback.slug ?? '',
    hero_cover_image: {
      src: fallback.cover ?? '',
      alt: `Capa do projeto ${title}`,
      kind: 'image',
    },
    hero_logo_image: {
      src: '',
      alt: `Logo do projeto ${title}`,
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
    theme_color: DEFAULT_HIGHLIGHT,
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

export function isMasterProjectTemplateV2Data(
  value: unknown
): value is MasterProjectTemplateV2Data {
  const record = asRecord(value);
  if (!record) return false;

  return (
    asString(record.template) === MASTER_PROJECT_TEMPLATE_V2 &&
    asString(record.project_title) !== undefined &&
    asRecord(record.hero_cover_image) !== null &&
    Array.isArray(record.gallery_grid)
  );
}

export function isMasterProjectTemplateV3Data(
  value: unknown
): value is MasterProjectTemplateV3Data {
  const record = asRecord(value);
  if (!record) return false;

  return (
    asString(record.template) === MASTER_PROJECT_TEMPLATE_V3 &&
    asString(record.project_title) !== undefined &&
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
    template === MASTER_PROJECT_TEMPLATE || Array.isArray(record.gallery_grid);

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
      asString(record.project_summary) ??
      asString(record.summary) ??
      defaults.project_summary,
    intro_headline: asString(record.intro_headline) ?? defaults.intro_headline,
    intro_body: asIntroParagraphs(record.intro_body ?? record.intro_paragraphs),
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

function normalizeMasterTemplateV2(
  value: unknown,
  fallback: TemplateFallback = {}
): MasterProjectTemplateV2Data | null {
  const record = asRecord(value);
  if (!record) return null;

  const template = asString(record.template);
  const hasMasterFields =
    template === MASTER_PROJECT_TEMPLATE_V2 ||
    Array.isArray(record.gallery_grid);

  if (!hasMasterFields) return null;

  const defaults = createDefaultMasterProjectTemplateV2(fallback);
  const fallbackAlt = `Capa do projeto ${fallback.title ?? defaults.project_title}`;

  const galleryGrid = Array.isArray(record.gallery_grid)
    ? record.gallery_grid
        .map((item, index) => normalizeGalleryItemV2(item, index, fallbackAlt))
        .filter((item): item is MasterProjectV2GalleryItem => item !== null)
    : defaults.gallery_grid;

  const navigationRecord = asRecord(record.navigation);
  const ctaRecord = asRecord(record.cta);
  const seoRecord = asRecord(record.seo);

  return {
    schema_version: '2.0',
    template: MASTER_PROJECT_TEMPLATE_V2,
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
      asString(record.project_summary) ??
      asString(record.summary) ??
      defaults.project_summary,
    intro_headline: asString(record.intro_headline) ?? defaults.intro_headline,
    intro_body: asIntroParagraphs(record.intro_body ?? record.intro_paragraphs),
    highlight_color:
      asString(record.highlight_color) ?? defaults.highlight_color,
    theme_color: asString(record.theme_color) ?? defaults.theme_color,
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

const hasV3BlockType = (value: unknown): boolean => {
  if (!Array.isArray(value)) return false;

  return value.some((item) => {
    const record = asRecord(item);
    if (!record) return false;
    const type = asString(record.type);
    return type ? V3_BLOCK_TYPES.includes(type as BlockType) : false;
  });
};

function normalizeMasterTemplateV3(
  value: unknown,
  fallback: TemplateFallback = {}
): MasterProjectTemplateV3Data | null {
  const record = asRecord(value);
  if (!record) return null;

  const template = asString(record.template);
  const hasMasterFields =
    template === MASTER_PROJECT_TEMPLATE_V3 ||
    Array.isArray(record.gallery_grid);

  if (!hasMasterFields) return null;

  const defaults = createDefaultMasterProjectTemplateV3(fallback);
  const fallbackAlt = `Capa do projeto ${fallback.title ?? defaults.project_title}`;
  const heroCoverRecord = asRecord(record.hero_cover_image);
  const heroLogoRecord = asRecord(record.hero_logo_image);

  const galleryGrid = Array.isArray(record.gallery_grid)
    ? record.gallery_grid
        .map((item, index) => normalizeLandingBlock(item, index, fallbackAlt))
        .filter((item): item is LandingPageBlock => item !== null)
    : defaults.gallery_grid;

  const navigationRecord = asRecord(record.navigation);
  const ctaRecord = asRecord(record.cta);
  const seoRecord = asRecord(record.seo);

  return {
    schema_version: '3.0',
    template: MASTER_PROJECT_TEMPLATE_V3,
    project_slug:
      asString(record.project_slug) ?? fallback.slug ?? defaults.project_slug,
    hero_cover_image: heroCoverRecord
      ? normalizeAsset(
          heroCoverRecord,
          fallbackAlt,
          fallback.cover ?? defaults.hero_cover_image?.src
        )
      : defaults.hero_cover_image,
    hero_logo_image: heroLogoRecord
      ? normalizeAsset(heroLogoRecord, `${defaults.project_title} logo`)
      : defaults.hero_logo_image,
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
      asString(record.project_summary) ??
      asString(record.summary) ??
      defaults.project_summary,
    intro_headline: asString(record.intro_headline) ?? defaults.intro_headline,
    intro_body: asIntroParagraphs(record.intro_body ?? record.intro_paragraphs),
    highlight_color:
      asString(record.highlight_color) ?? defaults.highlight_color,
    theme_color: asString(record.theme_color) ?? defaults.theme_color,
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

const hasV2LayoutType = (value: unknown): boolean => {
  if (!Array.isArray(value)) return false;
  return value.some((item) => Boolean(asString(asRecord(item)?.layout_type)));
};

export function parseLandingPageContent(
  content: unknown,
  fallback: TemplateFallback = {}
): ParsedLandingPageContent {
  const record = asRecord(content);
  const template = asString(record?.template);

  if (
    template === MASTER_PROJECT_TEMPLATE_V3 ||
    (template !== MASTER_PROJECT_TEMPLATE &&
      template !== MASTER_PROJECT_TEMPLATE_V2 &&
      hasV3BlockType(record?.gallery_grid))
  ) {
    const masterV3 = normalizeMasterTemplateV3(content, fallback);
    if (masterV3) {
      return {
        template: MASTER_PROJECT_TEMPLATE_V3,
        data: masterV3,
      };
    }
  }

  if (
    template === MASTER_PROJECT_TEMPLATE_V2 ||
    (template !== MASTER_PROJECT_TEMPLATE &&
      hasV2LayoutType(record?.gallery_grid))
  ) {
    const masterV2 = normalizeMasterTemplateV2(content, fallback);
    if (masterV2) {
      return {
        template: MASTER_PROJECT_TEMPLATE_V2,
        data: masterV2,
      };
    }
  }

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
  if (
    parsed.template === MASTER_PROJECT_TEMPLATE ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V2 ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V3
  ) {
    return (
      parsed.data.seo?.og_image ||
      parsed.data.hero_cover_image?.src ||
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
  if (
    parsed.template === MASTER_PROJECT_TEMPLATE ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V2 ||
    parsed.template === MASTER_PROJECT_TEMPLATE_V3
  ) {
    return (
      parsed.data.seo?.description ||
      parsed.data.project_summary ||
      `Projeto ${parsed.data.project_title} por Danilo Novais.`
    );
  }

  return `Landing page do projeto ${fallbackTitle} por Danilo Novais, com visão criativa, direção de arte e foco em narrativa visual e performance digital.`;
}
