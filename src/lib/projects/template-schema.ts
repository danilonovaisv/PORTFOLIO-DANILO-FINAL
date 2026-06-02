import type { LandingPageBlock } from '@/types/landing-page';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  type MasterProjectGalleryItem,
  type MasterProjectTemplateData,
  type MasterProjectTemplateV2Data,
  type MasterProjectTemplateV3Data,
  type MasterProjectV2GalleryItem,
  type ParsedLandingPageContent,
} from '@/types/project-template';

import {
  createDefaultMasterProjectTemplate,
  createDefaultMasterProjectTemplateV2,
  createDefaultMasterProjectTemplateV3,
  type TemplateFallback,
} from './template-schema-defaults';

export {
  createDefaultMasterProjectTemplate,
  createDefaultMasterProjectTemplateV2,
  createDefaultMasterProjectTemplateV3,
  type TemplateFallback,
};

import {
  asRecord,
  asString,
  asNumber,
  asStringArray,
  asIntroParagraphs,
  asV3IntroBlocks,
  normalizeAsset,
  normalizeGalleryItem,
  normalizeGalleryItemV2,
  normalizeLandingBlock,
  hasV3BlockType,
} from './template-schema-utils';

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
    intro_body:
      asV3IntroBlocks(record.intro_body ?? record.intro_paragraphs) ??
      asIntroParagraphs(record.intro_body ?? record.intro_paragraphs),
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
    const defaultDesc = `Conheça o projeto ${parsed.data.project_title} de Danilo Novais. Uma experiência de ${parsed.data.project_services?.join(', ') || 'design e desenvolvimento'} com foco em narrativa visual e performance.`;
    return (
      parsed.data.seo?.description?.trim() ||
      parsed.data.project_summary?.trim() ||
      defaultDesc
    );
  }

  return `Landing page do projeto ${fallbackTitle} por Danilo Novais. Creative Development especializado em WebGL, Motion Design e branding editorial de alta performance.`;
}
