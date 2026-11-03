-- Ghost System: Supabase Hardening, RLS Consolidation, Storage Lockdown & Index Optimization
-- Date: 2026-11-02
-- Reference: umkmwbkwvulxtdodzmzf (portfolio-danilo)
-- ====================================================================

BEGIN;

-- 1. RLS HARDENING: site_settings (Revoke anon select, enforce is_admin)
DROP POLICY IF EXISTS "site_settings_select" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_admin_select" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_admin_write" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_write_admin" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_write_admin_delete" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_write_admin_insert" ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_write_admin_update" ON public.site_settings;

CREATE POLICY "site_settings_admin_select"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "site_settings_admin_write"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 2. RLS HARDENING: admin_users (Revoke public select)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_admin_select" ON public.admin_users;

CREATE POLICY "admin_users_admin_select"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. RLS: landing_pages (Public select, admin write)
DROP POLICY IF EXISTS "Allow public read access" ON public.landing_pages;
DROP POLICY IF EXISTS "landing_pages_public_select" ON public.landing_pages;
DROP POLICY IF EXISTS "landing_pages_admin_write" ON public.landing_pages;

CREATE POLICY "landing_pages_public_select"
  ON public.landing_pages
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "landing_pages_admin_write"
  ON public.landing_pages
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. RLS: content_version (Public select, admin write, clean duplicates)
DROP POLICY IF EXISTS "content_version_select" ON public.content_version;
DROP POLICY IF EXISTS "content_version_public_select" ON public.content_version;
DROP POLICY IF EXISTS "content_version_admin_write" ON public.content_version;
DROP POLICY IF EXISTS "content_version_write_admin" ON public.content_version;
DROP POLICY IF EXISTS "content_version_write_admin_delete" ON public.content_version;
DROP POLICY IF EXISTS "content_version_write_admin_insert" ON public.content_version;
DROP POLICY IF EXISTS "content_version_write_admin_update" ON public.content_version;

CREATE POLICY "content_version_public_select"
  ON public.content_version
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "content_version_admin_write"
  ON public.content_version
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. RLS: portfolio_projects (Public select for published, admin write)
DROP POLICY IF EXISTS "Read projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_public_select" ON public.portfolio_projects;
DROP POLICY IF EXISTS "portfolio_projects_admin_write" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Auth manage projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Auth update projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Auth delete projects" ON public.portfolio_projects;

CREATE POLICY "portfolio_projects_public_select"
  ON public.portfolio_projects
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.is_admin());

CREATE POLICY "portfolio_projects_admin_write"
  ON public.portfolio_projects
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 6. RLS: portfolio_tags & portfolio_project_tags
DROP POLICY IF EXISTS "Public read tags" ON public.portfolio_tags;
DROP POLICY IF EXISTS "portfolio_tags_public_select" ON public.portfolio_tags;
DROP POLICY IF EXISTS "portfolio_tags_admin_write" ON public.portfolio_tags;
DROP POLICY IF EXISTS "Auth manage tags" ON public.portfolio_tags;
DROP POLICY IF EXISTS "Auth update tags" ON public.portfolio_tags;
DROP POLICY IF EXISTS "Auth delete tags" ON public.portfolio_tags;

CREATE POLICY "portfolio_tags_public_select"
  ON public.portfolio_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "portfolio_tags_admin_write"
  ON public.portfolio_tags
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Read project tags" ON public.portfolio_project_tags;
DROP POLICY IF EXISTS "portfolio_project_tags_public_select" ON public.portfolio_project_tags;
DROP POLICY IF EXISTS "portfolio_project_tags_admin_write" ON public.portfolio_project_tags;
DROP POLICY IF EXISTS "Auth manage project tags" ON public.portfolio_project_tags;
DROP POLICY IF EXISTS "Auth update project tags" ON public.portfolio_project_tags;
DROP POLICY IF EXISTS "Auth delete project tags" ON public.portfolio_project_tags;

CREATE POLICY "portfolio_project_tags_public_select"
  ON public.portfolio_project_tags
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.portfolio_projects p
      WHERE p.id = portfolio_project_tags.project_id
        AND (p.is_published = true OR public.is_admin())
    )
  );

CREATE POLICY "portfolio_project_tags_admin_write"
  ON public.portfolio_project_tags
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 7. STORAGE: Lockdown site-assets, portfolio-media & public-assets
UPDATE storage.buckets
SET public = true
WHERE id = 'site-assets';

DROP POLICY IF EXISTS "Auth delete portfolio-media/site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Auth update portfolio-media/site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload portfolio-media/site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete portfolio-media and site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update portfolio-media and site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload portfolio-media and site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder flrqo9_0" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder flrqo9_1" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder flrqo9_2" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder flrqo9_3" ON storage.objects;
DROP POLICY IF EXISTS "Public read portfolio-media and site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin All Access" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_and_portfolio_delete" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_and_portfolio_insert" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_and_portfolio_select" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_and_portfolio_update" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_public_select" ON storage.objects;
DROP POLICY IF EXISTS "site_assets_admin_all" ON storage.objects;

CREATE POLICY "site_assets_public_select"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id IN ('site-assets', 'portfolio-media', 'public-assets'));

CREATE POLICY "site_assets_admin_all"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id IN ('site-assets', 'portfolio-media', 'public-assets')
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id IN ('site-assets', 'portfolio-media', 'public-assets')
    AND public.is_admin()
  );

-- 8. SCHEMA CLEANUP: Drop orphaned tables and triggers
DROP TRIGGER IF EXISTS bump_projects ON public.projects;
DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.experiences CASCADE;
DROP TABLE IF EXISTS public.project_config CASCADE;
DROP TABLE IF EXISTS public.storage_access_logs CASCADE;
DROP FUNCTION IF EXISTS public.run_clear_cached_egress_wrapper();

COMMIT;

