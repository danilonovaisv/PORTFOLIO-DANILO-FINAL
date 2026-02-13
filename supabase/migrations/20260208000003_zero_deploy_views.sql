-- Secure Views for "Zero Deploy" Content System
-- Enforces RLS and filters published content automatically
-- 0. Fix Schema Drift (Missing columns from v2.0 spec)
alter table public.portfolio_projects
add column if not exists url_landscape text,
  add column if not exists url_square text;
comment on column public.portfolio_projects.url_landscape is 'Storage path or absolute URL for 16:9 cover variant.';
comment on column public.portfolio_projects.url_square is 'Storage path or absolute URL for 1:1 cover variant.';
-- 0b. Fix Schema Drift (Missing columns in site_assets)
alter table public.site_assets
add column if not exists metadata jsonb default '{}'::jsonb;
comment on column public.site_assets.metadata is 'JSON metadata for the asset (width, height, format, etc).';
-- 1. Public Projects View
-- Filters: is_published = true
-- Security: security_invoker = true (Respects RLS of underlying table)
create or replace view public.public_projects_view with (security_invoker = true) as
select id,
  slug,
  title,
  client_name,
  brand_name,
  year,
  project_type,
  short_label,
  description,
  thumbnail_path,
  hero_image_path,
  url_landscape,
  url_square,
  gallery,
  featured_on_home,
  featured_on_portfolio,
  featured_home_order,
  featured_portfolio_order,
  is_published,
  created_at,
  updated_at
from public.portfolio_projects
where is_published = true;
-- 2. Public Assets View
-- Filters: is_active = true
-- Security: security_invoker = true
create or replace view public.public_assets_view with (security_invoker = true) as
select id,
  key,
  bucket,
  file_path,
  asset_type,
  page,
  description,
  metadata,
  is_active,
  sort_order,
  created_at,
  updated_at
from public.site_assets
where is_active = true;
-- 3. Public Tags View (Optional but good for consistency)
create or replace view public.public_tags_view with (security_invoker = true) as
select id,
  slug,
  label,
  kind,
  description,
  sort_order
from public.portfolio_tags;
-- Grant access to anonymous and authenticated users
grant select on public.public_projects_view to anon,
  authenticated;
grant select on public.public_assets_view to anon,
  authenticated;
grant select on public.public_tags_view to anon,
  authenticated;