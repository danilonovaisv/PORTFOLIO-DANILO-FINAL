import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  type MasterProjectTemplateData,
  type MasterProjectTemplateV2Data,
  type MasterProjectTemplateV3Data,
} from '@/types/project-template';

export type TemplateFallback = {
  slug?: string;
  title?: string;
  cover?: string | null;
};

export const DEFAULT_HIGHLIGHT = '#0048ff';

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
