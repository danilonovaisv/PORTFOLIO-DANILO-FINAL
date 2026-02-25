-- Migration: 20260224030000_fix_projects_schema_integrity.sql
-- Description: Adds missing columns to portfolio_projects and recreates the view.

-- 1. Add missing columns to public.portfolio_projects
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS client_slug text;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS destination jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS case_body text;

-- 2. Helper to slugify (Ensure it exists or update it)
CREATE OR REPLACE FUNCTION public.slugify(value text)
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

-- 3. Backfill existing rows for client_slug
UPDATE public.portfolio_projects
SET client_slug = trim(both '-' from public.slugify(client_name))
WHERE client_slug IS NULL OR client_slug = '';

-- Backfill with fallback if still empty (use title or id)
UPDATE public.portfolio_projects
SET client_slug = 'client-' || lower(id::text)
WHERE client_slug IS NULL OR client_slug = '';

-- 4. Set constraints
ALTER TABLE public.portfolio_projects ALTER COLUMN client_slug SET NOT NULL;

-- 5. Recreate public_projects_view to include all fields
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

-- 6. Permissions
GRANT SELECT ON public.public_projects_view TO anon, authenticated;

-- 8. Refresh Schema Cache
NOTIFY pgrst, 'reload schema';

-- 9. Ensure RLS Policies for Admin (Security Hardening)
DO $$ 
BEGIN
    -- Only add policies if RLS is enabled
    IF EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' 
        AND c.relname = 'portfolio_projects' 
        AND c.relrowsecurity = true
    ) THEN
        -- Add policy for authenticated users (CMS Admins) if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM pg_policy 
            WHERE polname = 'authenticated_admin_full_access'
            AND polrelid = 'public.portfolio_projects'::regclass
        ) THEN
            EXECUTE 'CREATE POLICY "authenticated_admin_full_access" ON public.portfolio_projects FOR ALL TO authenticated USING (true) WITH CHECK (true)';
        END IF;
    END IF;
END $$;

-- 10. Audit log (Self-Healing)
COMMENT ON TABLE public.portfolio_projects IS 'Table for portfolio projects. Schema fixed on 2026-02-24 to include missing columns and reload cache.';
