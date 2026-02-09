-- Storage Security & Helper Functions
-- Part of Mission Control (Zero Deploy)

-- =====================================================
-- 1. HELPER: is_admin()
-- Centralizes admin check logic (Role-based + Claims)
-- =====================================================
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );
end;
$$;

-- Grant execute to authenticated users (logic handles return value)
grant execute on function public.is_admin to authenticated;

-- =====================================================
-- 2. STORAGE RLS: RESET & APPLY
-- =====================================================

-- Ensure RLS is enabled
alter table storage.objects enable row level security;

-- Drop ALL existing policies to prevent conflicts/leaks
do $$
declare
  pol record;
begin
  for pol in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
  loop
    execute format(
      'drop policy if exists %I on storage.objects;',
      pol.policyname
    );
  end loop;
end;
$$;

-- =====================================================
-- 3. PUBLIC-ASSETS (CDN SAVER RULE)
-- Read: Anon + Auth
-- Write: Admin Only
-- =====================================================

-- SELECT
create policy "public_assets_select"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'public-assets'
);

-- INSERT (admin)
create policy "public_assets_insert_admin"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'public-assets'
  and public.is_admin()
);

-- UPDATE (admin)
create policy "public_assets_update_admin"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'public-assets'
  and public.is_admin()
)
with check (
  bucket_id = 'public-assets'
  and public.is_admin()
);

-- DELETE (admin)
create policy "public_assets_delete_admin"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'public-assets'
  and public.is_admin()
);

-- =====================================================
-- 4. PRIVATE-ASSETS (RESTRICTED)
-- Read/Write: Admin Only
-- =====================================================

-- SELECT (admin)
create policy "private_assets_select_admin"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'private-assets'
  and public.is_admin()
);

-- INSERT (admin)
create policy "private_assets_insert_admin"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'private-assets'
  and public.is_admin()
);

-- UPDATE (admin)
create policy "private_assets_update_admin"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'private-assets'
  and public.is_admin()
)
with check (
  bucket_id = 'private-assets'
  and public.is_admin()
);

-- DELETE (admin)
create policy "private_assets_delete_admin"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'private-assets'
  and public.is_admin()
);

-- =====================================================
-- 5. PORTFOLIO-MEDIA & SITE-ASSETS (Legacy buckets compatibility)
-- Maintain access for existing buckets until migration is complete
-- =====================================================

-- Read: Public
create policy "legacy_buckets_select"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id in ('portfolio-media', 'site-assets')
);

-- Write: Admin
create policy "legacy_buckets_write_admin"
on storage.objects
for all
to authenticated
using (
  bucket_id in ('portfolio-media', 'site-assets')
  and public.is_admin()
)
with check (
  bucket_id in ('portfolio-media', 'site-assets')
  and public.is_admin()
);
