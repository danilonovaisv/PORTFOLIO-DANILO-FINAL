import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import {
  extractYoutubeId,
  normalizeYoutubeUrl,
  resolveLandingAsset,
  type AssetTypeHint,
} from '@/lib/media/asset-contract';
import {
  type MasterProjectAsset,
  type MasterProjectGalleryItem,
  type MasterProjectV2FeatureItem,
  type MasterProjectV2GalleryItem,
  type TemplateV3IntroBlock,
} from '@/types/project-template';

export const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov)$/i;
export const V3_BLOCK_TYPES: BlockType[] = [
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

export const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

export const asString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

export const asNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

export const asBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  const normalized = value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
  return Array.from(new Set(normalized));
};

export const asIntroParagraphs = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        const record = asRecord(item);
        if (!record) return undefined;
        return asString(record.value);
      })
      .filter((item): item is string => Boolean(item));
  }

  const text = asString(value);
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

export const asV3IntroBlocks = (
  value: unknown
): TemplateV3IntroBlock[] | undefined => {
  if (!Array.isArray(value)) return undefined;

  const blocks = value
    .map((item) => {
      if (typeof item === 'string') {
        const normalized = asString(item);
        if (!normalized) return null;
        return {
          type: 'text' as const,
          value: normalized,
          settings: { autoplay: false },
        };
      }

      const record = asRecord(item);
      if (!record) return null;

      const type = record.type === 'video_youtube' ? 'video_youtube' : 'text';
      const blockValue = asString(record.value);
      if (!blockValue) return null;

      const settingsRecord = asRecord(record.settings);
      const autoplaySetting = asBoolean(settingsRecord?.autoplay);

      return {
        type,
        value:
          type === 'video_youtube'
            ? normalizeYoutubeUrl(blockValue) || blockValue
            : blockValue,
        settings: {
          autoplay:
            type === 'video_youtube'
              ? (autoplaySetting ?? true)
              : (autoplaySetting ?? false),
        },
      };
    })
    .filter(Boolean) as TemplateV3IntroBlock[];

  return blocks.length > 0 ? blocks : undefined;
};

export const asMediaKind = (value: unknown): 'image' | 'video' =>
  value === 'video' ? 'video' : 'image';

export const asGalleryLayout = (
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

export const normalizeLegacyLayoutToV2 = (
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

export const asGalleryLayoutV2 = (
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

export const asMediaAlign = (value: unknown): 'left' | 'right' =>
  value === 'right' ? 'right' : 'left';

export const asBlockType = (value: unknown): BlockType =>
  V3_BLOCK_TYPES.includes(value as BlockType) ? (value as BlockType) : 'text';

export const inferMediaType = (
  src?: string,
  fallback?: unknown
): LandingPageBlock['content']['mediaType'] => {
  if (src && extractYoutubeId(src)) return 'youtube';
  if (src && VIDEO_FILE_PATTERN.test(src)) return 'video';

  if (fallback === 'image' || fallback === 'video' || fallback === 'youtube') {
    return fallback;
  }

  if (!src) return undefined;
  return 'image';
};

export const normalizeAssetReadValue = (
  value: string | undefined,
  hint?: AssetTypeHint
): string | undefined => {
  if (!value) return undefined;
  const resolved = resolveLandingAsset(value, hint);
  return resolved.ok ? resolved.asset.url : value;
};

export const asTextAlign = (
  value: unknown
): 'left' | 'center' | 'right' | 'justify' | undefined => {
  if (value === 'left' || value === 'text-left') return 'left';
  if (value === 'center' || value === 'text-center') return 'center';
  if (value === 'right' || value === 'text-right') return 'right';
  if (value === 'justify' || value === 'text-justify') return 'justify';
  return undefined;
};

export const normalizeTextConfig = (
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

export const normalizeAsset = (
  value: unknown,
  fallbackAlt: string,
  fallbackSrc?: string
): MasterProjectAsset => {
  const record = asRecord(value);

  return {
    src:
      normalizeAssetReadValue(
        asString(record?.src) ?? fallbackSrc,
        asMediaKind(record?.kind)
      ) ?? '',
    alt: asString(record?.alt) ?? fallbackAlt,
    kind: asMediaKind(record?.kind),
    poster: normalizeAssetReadValue(asString(record?.poster), 'image'),
  };
};

export const normalizeGalleryItem = (
  value: unknown,
  index: number,
  fallbackAlt: string
): MasterProjectGalleryItem | null => {
  const record = asRecord(value);
  if (!record) return null;

  const layout = asGalleryLayout(record.layout);
  const rawSrc = asString(record.src) ?? '';
  const kind = asMediaKind(record.kind);
  const src = normalizeAssetReadValue(rawSrc, kind) ?? rawSrc;
  const requiresMedia = layout !== 'quote-band';
  if (requiresMedia && !src) return null;

  return {
    id: asString(record.id) ?? `grid-item-${index + 1}`,
    src,
    alt: asString(record.alt) ?? fallbackAlt,
    kind,
    layout,
    poster: normalizeAssetReadValue(asString(record.poster), 'image'),
    title: asString(record.title),
    eyebrow: asString(record.eyebrow),
    description: asString(record.description),
    quote: asString(record.quote),
  };
};

export const normalizeFeatureItems = (
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

export const normalizeGalleryItemV2 = (
  value: unknown,
  index: number,
  fallbackAlt: string
): MasterProjectV2GalleryItem | null => {
  const record = asRecord(value);
  if (!record) return null;

  const legacyLayout = asString(record.layout);
  const layout_type = asGalleryLayoutV2(record.layout_type ?? legacyLayout);
  const rawSrc = asString(record.src) ?? '';
  const kind = asMediaKind(record.kind);
  const src = normalizeAssetReadValue(rawSrc, kind) ?? rawSrc;
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
    kind,
    poster: normalizeAssetReadValue(asString(record.poster), 'image'),
    title: asString(record.title),
    eyebrow: asString(record.eyebrow),
    description: asString(record.description),
    quote: asString(record.quote),
    media_align,
    features: normalizeFeatureItems(record.features),
  };
};

export const normalizeLandingBlock = (
  value: unknown,
  index: number,
  fallbackAlt: string
): LandingPageBlock | null => {
  const record = asRecord(value);
  if (!record) return null;

  const type = asBlockType(record.type);
  const contentRecord = asRecord(record.content) ?? {};

  const rawMedia = asString(
    contentRecord.media ?? contentRecord.media1 ?? record.src
  );
  const rawMedia2 = asString(contentRecord.media2 ?? record.src2);
  const mediaType = inferMediaType(rawMedia, contentRecord.mediaType);
  const mediaType2 = inferMediaType(rawMedia2, contentRecord.mediaType2);
  const media = normalizeAssetReadValue(rawMedia, mediaType) ?? rawMedia;
  const media2 = normalizeAssetReadValue(rawMedia2, mediaType2) ?? rawMedia2;

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
      alt:
        asString(contentRecord.alt ?? contentRecord.alt1 ?? record.alt) ??
        fallbackAlt,
      alt2: asString(contentRecord.alt2 ?? record.alt2),
      poster: normalizeAssetReadValue(
        asString(
          contentRecord.poster ?? contentRecord.poster1 ?? record.poster
        ),
        'image'
      ),
      poster2: normalizeAssetReadValue(
        asString(contentRecord.poster2 ?? record.poster2),
        'image'
      ),
      mediaType,
      mediaType2,
      autoplay: asBoolean(contentRecord.autoplay),
      bandColor: asString(contentRecord.bandColor ?? record.bandColor),
    },
  };

  return normalized;
};

export const hasV3BlockType = (value: unknown): boolean => {
  if (!Array.isArray(value)) return false;

  return value.some((item) => {
    const record = asRecord(item);
    if (!record) return false;
    const type = asString(record.type);
    return type ? V3_BLOCK_TYPES.includes(type as BlockType) : false;
  });
};
