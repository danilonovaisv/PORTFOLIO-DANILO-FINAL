-- Backfill admin claim in JWT app metadata to satisfy hardened RLS policies.
-- Idempotent: safe to run multiple times.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('role', 'admin')
where lower(email) in (
  lower('danilo_novais@yahoo.com.br')
)
and coalesce(raw_app_meta_data ->> 'role', '') <> 'admin';
