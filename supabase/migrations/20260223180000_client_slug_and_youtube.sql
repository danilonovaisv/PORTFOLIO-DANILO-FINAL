-- 20260223180000_client_slug_and_youtube.sql
-- 1. Add client_slug to portfolio_projects
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS client_slug text;

-- Helper to slugify
CREATE OR REPLACE FUNCTION slugify(value text)
RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(
    translate(value, 
              'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ',
              'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'),
    '[^a-zA-Z0-9]+', '-', 'g'
  ));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. Backfill existing rows
UPDATE public.portfolio_projects
SET client_slug = trim(both '-' from slugify(client_name))
WHERE client_slug IS NULL;

-- 3. Make it NOT NULL for future stability (fallback if needed)
-- Se algum estiver vazio, definimos unknown-client fallback
UPDATE public.portfolio_projects
SET client_slug = 'unknown-client'
WHERE client_slug = '' OR client_slug IS NULL;

ALTER TABLE public.portfolio_projects ALTER COLUMN client_slug SET NOT NULL;

-- 4. recreate view to include the missing fields plus client_slug
drop view if exists public.public_projects_view;
create view public.public_projects_view with (security_invoker = true) as
select 
  p.id,
  p.slug,
  p.client_slug,
  p.title,
  p.client_name,
  p.brand_name,
  p.year,
  p.project_type,
  p.short_label,
  p.description,
  p.thumbnail_path,
  p.hero_image_path,
  p.url_landscape,
  p.url_square,
  p.gallery,
  p.featured_on_home,
  p.featured_on_portfolio,
  p.featured_home_order,
  p.featured_portfolio_order,
  p.is_published,
  p.created_at,
  p.updated_at,
  p.landing_page_id,
  p.destination,
  p.case_body,
  l.slug as landing_page_slug
from public.portfolio_projects p
left join public.landing_pages l on l.id = p.landing_page_id
where p.is_published = true;

grant select on public.public_projects_view to anon, authenticated;
