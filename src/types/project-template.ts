import type { LandingPageBlock } from '@/types/landing-page';

export const LEGACY_PROJECT_TEMPLATE = 'legacy-blocks' as const;
export const MASTER_PROJECT_TEMPLATE = 'master-project-v1' as const;

export type ProjectTemplateId =
  | typeof LEGACY_PROJECT_TEMPLATE
  | typeof MASTER_PROJECT_TEMPLATE;

export type MasterProjectMediaKind = 'image' | 'video';

export type MasterProjectGalleryLayout =
  | 'full'
  | 'quote-band'
  | 'feature'
  | 'split-left'
  | 'split-right';

export interface MasterProjectAsset {
  src: string;
  alt: string;
  kind?: MasterProjectMediaKind;
  poster?: string;
}

export interface MasterProjectGalleryItem extends MasterProjectAsset {
  id: string;
  layout: MasterProjectGalleryLayout;
  title?: string;
  eyebrow?: string;
  description?: string;
  quote?: string;
}

export interface MasterProjectTemplateNavigation {
  back_label?: string;
  next_label?: string;
  next_project_slug?: string;
}

export interface MasterProjectTemplateSeo {
  description?: string;
  og_image?: string;
}

export interface MasterProjectTemplateCta {
  label?: string;
  href?: string;
}

export interface MasterProjectTemplateData {
  schema_version: '1.0';
  template: typeof MASTER_PROJECT_TEMPLATE;
  project_slug: string;
  hero_cover_image: MasterProjectAsset;
  hero_logo_image?: MasterProjectAsset;
  project_title: string;
  project_subtitle?: string;
  project_client?: string;
  project_year?: number;
  project_tags: string[];
  project_services?: string[];
  project_summary?: string;
  intro_headline?: string;
  intro_body?: string[];
  highlight_color: string;
  gallery_grid: MasterProjectGalleryItem[];
  navigation?: MasterProjectTemplateNavigation;
  cta?: MasterProjectTemplateCta;
  seo?: MasterProjectTemplateSeo;
}

export type LandingPageStructuredContent =
  | LandingPageBlock[]
  | MasterProjectTemplateData;

export type ParsedLandingPageContent =
  | {
      template: typeof LEGACY_PROJECT_TEMPLATE;
      blocks: LandingPageBlock[];
    }
  | {
      template: typeof MASTER_PROJECT_TEMPLATE;
      data: MasterProjectTemplateData;
    };
