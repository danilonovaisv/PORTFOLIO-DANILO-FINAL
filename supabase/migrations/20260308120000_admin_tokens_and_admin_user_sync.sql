-- =============================================================
-- ADMIN TOKENS + ADMIN USER SYNC
-- Date: 2026-03-08
-- Fixes: token registry, admin user backfill, safer admin settings flows
-- =============================================================

CREATE TABLE IF NOT EXISTS public.admin_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text NOT NULL,
  description text,
  secret text NOT NULL,
  status text NOT NULL DEFAULT 'active'
    CHECK (status = ANY (ARRAY['active'::text, 'inactive'::text])),
  environment text NOT NULL DEFAULT 'production'
    CHECK (
      environment = ANY (
        ARRAY['development'::text, 'staging'::text, 'production'::text]
      )
    ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS admin_tokens_provider_environment_name_key
  ON public.admin_tokens (lower(provider), lower(environment), lower(name));

CREATE INDEX IF NOT EXISTS admin_tokens_provider_status_idx
  ON public.admin_tokens (lower(provider), status, environment);

DROP TRIGGER IF EXISTS set_admin_tokens_updated_at ON public.admin_tokens;
CREATE TRIGGER set_admin_tokens_updated_at
  BEFORE UPDATE ON public.admin_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.admin_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin read admin_tokens" ON public.admin_tokens;
DROP POLICY IF EXISTS "Admin manage admin_tokens" ON public.admin_tokens;

CREATE POLICY "Admin read admin_tokens"
  ON public.admin_tokens
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin manage admin_tokens"
  ON public.admin_tokens
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_tokens TO authenticated;
GRANT ALL ON public.admin_tokens TO service_role;

INSERT INTO public.admin_tokens (
  name,
  provider,
  description,
  secret,
  status,
  environment
)
SELECT
  'OpenAI API Key',
  'openai',
  'Migrated from legacy site_settings.openai_api_key',
  CASE
    WHEN jsonb_typeof(value) = 'string' THEN trim(both '"' FROM value::text)
    WHEN jsonb_typeof(value) = 'object' THEN COALESCE(value ->> 'key', value ->> 'value', value ->> 'token', '')
    ELSE ''
  END,
  'active',
  'production'
FROM public.site_settings
WHERE key = 'openai_api_key'
  AND COALESCE(
    CASE
      WHEN jsonb_typeof(value) = 'string' THEN trim(both '"' FROM value::text)
      WHEN jsonb_typeof(value) = 'object' THEN COALESCE(value ->> 'key', value ->> 'value', value ->> 'token', '')
      ELSE ''
    END,
    ''
  ) <> ''
ON CONFLICT DO NOTHING;

INSERT INTO public.admin_users (user_id, role)
SELECT
  id,
  CASE lower(COALESCE(raw_app_meta_data ->> 'role', ''))
    WHEN 'editor' THEN 'editor'
    ELSE 'owner'
  END
FROM auth.users
WHERE lower(COALESCE(raw_app_meta_data ->> 'role', '')) IN (
  'admin',
  'owner',
  'super_admin',
  'editor'
)
ON CONFLICT ON CONSTRAINT admin_users_pkey DO UPDATE
SET role = EXCLUDED.role;

NOTIFY pgrst, 'reload schema';
