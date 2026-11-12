-- ====================================================================
-- Ghost System Migration: Add Missing Columns to D1 Schema
-- Adds destination and case_body columns that exist in Supabase/PostgreSQL
-- but are missing from the Cloudflare D1 schema
-- ====================================================================

BEGIN;

-- Add destination JSONB column for project navigation destination
ALTER TABLE public.portfolio_projects 
ADD COLUMN IF NOT EXISTS destination JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.portfolio_projects.destination IS 
'Navigation destination configuration: modal (default), internal_landing, external_url, or page';

-- Add case_body column for long-form case study markdown
ALTER TABLE public.portfolio_projects 
ADD COLUMN IF NOT EXISTS case_body TEXT;

COMMENT ON COLUMN public.portfolio_projects.case_body IS 
'Long-form case study narrative in Markdown format';

-- Update the public_projects_view to include the new columns
DROP VIEW IF EXISTS public.public_projects_view;
CREATE VIEW public.public_projects_view WITH (security_invoker = true) AS
SELECT
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
FROM public.portfolio_projects p
LEFT JOIN public.landing_pages l ON l.id = p.landing_page_id
WHERE p.is_published = true;

-- Permissions
GRANT SELECT ON public.public_projects_view TO anon, authenticated, service_role;

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';

COMMIT;
