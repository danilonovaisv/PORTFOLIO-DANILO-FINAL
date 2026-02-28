import type { LandingPageBlock } from '@/types/landing-page';

export const LEGACY_PROJECT_TEMPLATE = 'legacy-blocks' as const;
export const MASTER_PROJECT_TEMPLATE = 'master-project-v1' as const;
export const MASTER_PROJECT_TEMPLATE_V2 = 'master-project-v2' as const;
export const MASTER_PROJECT_TEMPLATE_V3 = 'master-project-v3-alpa' as const;

export type MasterProjectTemplateId =
  | typeof MASTER_PROJECT_TEMPLATE
  | typeof MASTER_PROJECT_TEMPLATE_V2
  | typeof MASTER_PROJECT_TEMPLATE_V3;

export type ProjectTemplateId =
  | typeof LEGACY_PROJECT_TEMPLATE
  | MasterProjectTemplateId;

export type MasterProjectMediaKind = 'image' | 'video';

export type MasterProjectGalleryLayout =
  | 'grid'
  | 'full-highlight'
  | 'full'
  | 'quote-band'
  | 'feature'
  | 'split-left'
  | 'split-right';

export type MasterProjectV2GalleryLayoutType =
  | 'grid_2_col'
  | 'grid_1_col'
  | 'grid_feat'
  | 'grid_features_3'
  | 'grid_quote'
  | 'grid_split';

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

export interface MasterProjectV2FeatureItem {
  id?: string;
  title: string;
  description?: string;
}

export interface MasterProjectV2GalleryItem extends MasterProjectAsset {
  id: string;
  layout_type: MasterProjectV2GalleryLayoutType;
  title?: string;
  eyebrow?: string;
  description?: string;
  quote?: string;
  media_align?: 'left' | 'right';
  features?: MasterProjectV2FeatureItem[];
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

export interface MasterProjectTemplateV2Data {
  schema_version: '2.0';
  template: typeof MASTER_PROJECT_TEMPLATE_V2;
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
  theme_color?: string;
  gallery_grid: MasterProjectV2GalleryItem[];
  navigation?: MasterProjectTemplateNavigation;
  cta?: MasterProjectTemplateCta;
  seo?: MasterProjectTemplateSeo;
}

export interface MasterProjectTemplateV3Data {
  schema_version: '3.0';
  template: typeof MASTER_PROJECT_TEMPLATE_V3;
  project_slug: string;
  hero_cover_image?: MasterProjectAsset;
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
  theme_color?: string;
  gallery_grid: LandingPageBlock[];
  navigation?: MasterProjectTemplateNavigation;
  cta?: MasterProjectTemplateCta;
  seo?: MasterProjectTemplateSeo;
}

export type LandingPageStructuredContent =
  | LandingPageBlock[]
  | MasterProjectTemplateData
  | MasterProjectTemplateV2Data
  | MasterProjectTemplateV3Data;

export type ParsedLandingPageContent =
  | {
      template: typeof LEGACY_PROJECT_TEMPLATE;
      blocks: LandingPageBlock[];
    }
  | {
      template: typeof MASTER_PROJECT_TEMPLATE;
      data: MasterProjectTemplateData;
    }
  | {
      template: typeof MASTER_PROJECT_TEMPLATE_V2;
      data: MasterProjectTemplateV2Data;
    }
  | {
      template: typeof MASTER_PROJECT_TEMPLATE_V3;
      data: MasterProjectTemplateV3Data;
    };
