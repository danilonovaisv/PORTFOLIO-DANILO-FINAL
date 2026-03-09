export const storageMarker = '/site-assets/';
export const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov)$/i;
export const YOUTUBE_URL_PATTERN =
  /(youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i;

import type {
  MasterProjectTemplateData,
  MasterProjectTemplateV2Data,
  MasterProjectTemplateV3Data,
} from '@/types/project-template';

import type { MasterProjectTemplateDraft } from '@/components/admin/MasterProjectTemplateEditor';
import type { MasterProjectTemplateV2Draft } from '@/components/admin/MasterProjectTemplateV2Editor';
import type { MasterProjectTemplateV3Draft } from '@/components/admin/MasterProjectTemplateV3Editor';
import type { LandingPageBlockContent } from '@/types/landing-page';

const normalizeOptionalText = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

export function sanitizeMasterV3BlockContent(
  content?: LandingPageBlockContent | null
): LandingPageBlockContent {
  const source = { ...(content ?? {}) };
  const media = normalizeOptionalText(source.media ?? source.media1);
  const media2 = normalizeOptionalText(source.media2);
  const alt = normalizeOptionalText(source.alt ?? source.alt1);
  const alt2 = normalizeOptionalText(source.alt2);
  const poster = normalizeOptionalText(source.poster ?? source.poster1);
  const poster2 = normalizeOptionalText(source.poster2);

  delete source.media1;
  delete source.alt1;
  delete source.poster1;
  delete source.file;
  delete source.file1;
  delete source.file2;
  delete source.previewUrl;
  delete source.previewUrl1;
  delete source.previewUrl2;

  return {
    ...source,
    media,
    media2,
    alt,
    alt2,
    poster,
    poster2,
  };
}

export const toStoragePath = (value?: string): string => {
  if (!value) return '';

  if (value.includes(storageMarker)) {
    return value.split(storageMarker).pop() || '';
  }

  return value
    .replace(/^\/?storage\/v1\/object\/public\/site-assets\//, '')
    .replace(/^\/?site-assets\//, '')
    .replace(/^\//, '');
};

export const toMasterDraft = (
  value: MasterProjectTemplateData
): MasterProjectTemplateDraft => ({
  ...value,
  hero_cover_image: {
    ...value.hero_cover_image,
    file: null,
    previewUrl: '',
  },
  hero_logo_image: value.hero_logo_image
    ? {
      ...value.hero_logo_image,
      file: null,
      previewUrl: '',
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    ...item,
    file: null,
    previewUrl: '',
  })),
});

export const stripMasterDraft = (
  value: MasterProjectTemplateDraft
): MasterProjectTemplateData => ({
  ...value,
  hero_cover_image: {
    src: value.hero_cover_image.src,
    alt: value.hero_cover_image.alt,
    kind: value.hero_cover_image.kind,
    poster: value.hero_cover_image.poster,
  },
  hero_logo_image: value.hero_logo_image
    ? {
      src: value.hero_logo_image.src,
      alt: value.hero_logo_image.alt,
      kind: value.hero_logo_image.kind,
      poster: value.hero_logo_image.poster,
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    kind: item.kind,
    layout: item.layout,
    poster: item.poster,
    title: item.title,
    eyebrow: item.eyebrow,
    description: item.description,
    quote: item.quote,
  })),
});

export const toMasterV2Draft = (
  value: MasterProjectTemplateV2Data
): MasterProjectTemplateV2Draft => ({
  ...value,
  hero_cover_image: {
    ...value.hero_cover_image,
    file: null,
    previewUrl: '',
  },
  hero_logo_image: value.hero_logo_image
    ? {
      ...value.hero_logo_image,
      file: null,
      previewUrl: '',
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    ...item,
    file: null,
    previewUrl: '',
  })),
});

export const stripMasterV2Draft = (
  value: MasterProjectTemplateV2Draft
): MasterProjectTemplateV2Data => ({
  ...value,
  hero_cover_image: {
    src: value.hero_cover_image.src,
    alt: value.hero_cover_image.alt,
    kind: value.hero_cover_image.kind,
    poster: value.hero_cover_image.poster,
  },
  hero_logo_image: value.hero_logo_image
    ? {
      src: value.hero_logo_image.src,
      alt: value.hero_logo_image.alt,
      kind: value.hero_logo_image.kind,
      poster: value.hero_logo_image.poster,
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    kind: item.kind,
    layout_type: item.layout_type,
    poster: item.poster,
    title: item.title,
    eyebrow: item.eyebrow,
    description: item.description,
    quote: item.quote,
    media_align: item.media_align,
    features: item.features?.map((feature, index) => ({
      id: feature.id || `${item.id}-feature-${index + 1}`,
      title: feature.title,
      description: feature.description,
    })),
  })),
});

export const toMasterV3Draft = (
  value: MasterProjectTemplateV3Data
): MasterProjectTemplateV3Draft => ({
  ...value,
  hero_cover_image: value.hero_cover_image
    ? {
      ...value.hero_cover_image,
      file: null,
      previewUrl: '',
    }
    : undefined,
  hero_logo_image: value.hero_logo_image
    ? {
      ...value.hero_logo_image,
      file: null,
      previewUrl: '',
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((block) => ({
    ...block,
    content: sanitizeMasterV3BlockContent(block.content),
    file: null,
    file2: null,
    previewUrl: '',
    previewUrl2: '',
  })),
});

export const stripMasterV3Draft = (
  value: MasterProjectTemplateV3Draft
): MasterProjectTemplateV3Data => ({
  ...value,
  hero_cover_image: value.hero_cover_image
    ? {
      src: value.hero_cover_image.src,
      alt: value.hero_cover_image.alt,
      kind: value.hero_cover_image.kind,
      poster: value.hero_cover_image.poster,
    }
    : undefined,
  hero_logo_image: value.hero_logo_image
    ? {
      src: value.hero_logo_image.src,
      alt: value.hero_logo_image.alt,
      kind: value.hero_logo_image.kind,
      poster: value.hero_logo_image.poster,
    }
    : undefined,
  gallery_grid: value.gallery_grid.map((block) => ({
    id: block.id,
    type: block.type,
    content: sanitizeMasterV3BlockContent(block.content),
    order: block.order,
  })),
});
