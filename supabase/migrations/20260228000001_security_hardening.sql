-- =============================================================
-- SECURITY HARDENING MIGRATION
-- Date: 2026-02-28
-- Fixes: SEC-01 SEC-02 SEC-03 SEC-04 SET-02 (P0/P1)
-- =============================================================

-- ============================================================
-- P0.1 — site_settings: Enable RLS (blocks anon key reads)
-- The GRANT ALL TO anon remains at DB level; RLS enforces row-level restriction.
-- Service role bypasses RLS so getOpenAIKey() via admin client still works.
-- ============================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manage site_settings" ON public.site_settings;
CREATE POLICY "Admin manage site_settings"
  ON public.site_settings
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- P0.2 — admin_users: Remove public read policy
-- ============================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
DROP POLICY IF EXISTS "replace_with_policy_name"         ON public.admin_users;

DROP POLICY IF EXISTS "Admin read admin_users"    ON public.admin_users;
DROP POLICY IF EXISTS "Admin manage admin_users"  ON public.admin_users;

CREATE POLICY "Admin read admin_users"
  ON public.admin_users
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin manage admin_users"
  ON public.admin_users
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- P0.3 — portfolio_projects: Remove permissive/conflicting policies
-- Keeps only "Admin manage projects" (role-checked).
-- ============================================================
DROP POLICY IF EXISTS "Auth manage projects"              ON public.portfolio_projects;
DROP POLICY IF EXISTS "authenticated_admin_full_access"   ON public.portfolio_projects;

-- Ensure the hardened policy from migration 20260207183000 exists
-- (idempotent create with IF NOT EXISTS workaround via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy
    WHERE polname = 'Admin manage projects'
      AND polrelid = 'public.portfolio_projects'::regclass
  ) THEN
    EXECUTE $p$
      CREATE POLICY "Admin manage projects"
        ON public.portfolio_projects
        FOR ALL
        USING (public.is_admin())
        WITH CHECK (public.is_admin());
    $p$;
  END IF;
END $$;

-- ============================================================
-- P0.4a — experiences: Add missing RLS policies
-- ============================================================
DROP POLICY IF EXISTS "Admin manage experiences"          ON public.experiences;
DROP POLICY IF EXISTS "Public read published experiences" ON public.experiences;

CREATE POLICY "Admin manage experiences"
  ON public.experiences
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public read published experiences"
  ON public.experiences
  FOR SELECT
  USING (status = 'published');

-- ============================================================
-- P0.4b — content_version: Add missing RLS policies
-- bump_on_publish_impact() runs as SECURITY DEFINER — bypasses RLS.
-- ============================================================
DROP POLICY IF EXISTS "Admin manage content_version"  ON public.content_version;
DROP POLICY IF EXISTS "Public read content_version"   ON public.content_version;

CREATE POLICY "Admin manage content_version"
  ON public.content_version
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public read content_version"
  ON public.content_version
  FOR SELECT
  USING (true);

-- ============================================================
-- P0.4c — projects (legacy table): Add missing RLS policies
-- ============================================================
DROP POLICY IF EXISTS "Admin manage legacy projects"            ON public.projects;
DROP POLICY IF EXISTS "Public read published legacy projects"   ON public.projects;

CREATE POLICY "Admin manage legacy projects"
  ON public.projects
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Public read published legacy projects"
  ON public.projects
  FOR SELECT
  USING (visibility = true AND status = 'published');

-- ============================================================
-- P0.4d — audit_log: Add missing RLS policies
-- Service role (used in audit.ts) bypasses RLS so inserts always work.
-- ============================================================
DROP POLICY IF EXISTS "Admin read audit_log"     ON public.audit_log;
DROP POLICY IF EXISTS "System insert audit_log"  ON public.audit_log;

CREATE POLICY "Admin read audit_log"
  ON public.audit_log
  FOR SELECT
  USING (public.is_admin());

-- Allow authenticated users to insert their own audit records
-- (fallback when service_role is unavailable)
CREATE POLICY "System insert audit_log"
  ON public.audit_log
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND (actor_user_id = auth.uid() OR actor_user_id IS NULL)
  );

-- ============================================================
-- P1.6 — Update is_admin() to include 'editor' role
-- admin_users table allows 'editor' role; is_admin() must match.
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
  LANGUAGE plpgsql SECURITY DEFINER
  SET search_path TO 'public', 'auth', 'pg_catalog'
  AS $$
BEGIN
  RETURN (
    auth.role() = 'authenticated'
    AND (
      COALESCE(auth.jwt() ->> 'role', '') IN ('admin', 'owner', 'super_admin', 'editor')
      OR COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('admin', 'owner', 'super_admin', 'editor')
    )
  );
END;
$$;

-- Update admin_audit_log SELECT policy to use is_admin() (centralised role list)
DROP POLICY IF EXISTS "Admin read audit log" ON public.admin_audit_log;
CREATE POLICY "Admin read audit log"
  ON public.admin_audit_log
  FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- Reload PostgREST schema cache
-- ============================================================
NOTIFY pgrst, 'reload schema';
