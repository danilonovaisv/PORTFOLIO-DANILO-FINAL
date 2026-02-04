export type DbProject = {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  brand_name: string | null;
  year: number | null;
  project_type: string;
  short_label: string | null;
  description: string | null;
  thumbnail_path: string | null;
  hero_image_path: string | null;
  gallery: Array<{ path: string; caption?: string }> | null;
  featured_on_home: boolean;
  featured_on_portfolio: boolean;
  featured_home_order: number | null;
  featured_portfolio_order: number | null;
  is_published: boolean;
  landing_page_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type DbLandingPage = {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  content: LandingPageBlock[] | null;
  created_at: string;
};

/** Block structure for landing page content */
export interface LandingPageBlock {
  id: string;
  type: string;
  config: Record<string, unknown>;
}

export type DbTag = {
  id: string;
  slug: string;
  label: string;
  kind: string;
  description: string | null;
  sort_order: number | null;
  created_at: string | null;
};

export type DbAsset = {
  id: string;
  key: string;
  bucket: string;
  file_path: string;
  asset_type: string;
  page: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number | null;
  href?: string | null;
  created_at: string | null;
  updated_at: string | null;
};
