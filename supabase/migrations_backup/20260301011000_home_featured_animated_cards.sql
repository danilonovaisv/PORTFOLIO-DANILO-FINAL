-- HOME featured cards: persist only layout metadata for the HOME highlight area.
-- The animated background variant itself remains client-side and non-persistent.

ALTER TABLE public.portfolio_projects
ADD COLUMN IF NOT EXISTS home_featured jsonb DEFAULT '{}'::jsonb NOT NULL;

COMMENT ON COLUMN public.portfolio_projects.home_featured IS
  'JSON config for HOME featured cards (layout style + optional inverted logo path). Background selection stays dynamic on the client.';

UPDATE public.portfolio_projects
SET home_featured = jsonb_strip_nulls(
  jsonb_build_object(
    'enabled',
    featured_on_home,
    'cardStyle',
    CASE
      WHEN featured_on_home THEN 'ANIMATED_BG_THUMB_OVERLAY_50'
      ELSE NULL
    END
  )
)
WHERE coalesce(home_featured, '{}'::jsonb) = '{}'::jsonb;

DROP VIEW IF EXISTS public.public_projects_view;

CREATE VIEW public.public_projects_view WITH (security_invoker = true) AS
SELECT
  p.id,
  p.slug,
  p.title,
  p.client_name,
  p.brand_name,
  p.client_slug,
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
  p.home_featured,
  p.is_published,
  p.created_at,
  p.updated_at,
  p.landing_page_id,
  lp.slug AS landing_page_slug,
  p.destination,
  p.case_body
FROM public.portfolio_projects p
LEFT JOIN public.landing_pages lp ON lp.id = p.landing_page_id
WHERE p.is_published = true;

GRANT SELECT ON public.public_projects_view TO anon, authenticated, service_role;
