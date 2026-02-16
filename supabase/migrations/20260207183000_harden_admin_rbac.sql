-- Harden admin authorization policies (RBAC) for CMS tables.
-- Idempotent migration: safe to run multiple times.

do $$
begin
  -- Remove permissive policies (legacy and current names)
  drop policy if exists "Auth manage projects" on public.portfolio_projects;
  drop policy if exists "Auth manage tags" on public.portfolio_tags;
  drop policy if exists "Auth manage project tags" on public.portfolio_project_tags;
  drop policy if exists "Auth manage assets" on public.site_assets;
  drop policy if exists "Allow authenticated full access" on public.landing_pages;

  drop policy if exists "Authenticated can manage assets delete" on public.site_assets;
  drop policy if exists "Authenticated can manage assets insert" on public.site_assets;
  drop policy if exists "Authenticated can manage assets update" on public.site_assets;
end $$;

-- Keep public read policies for published/active resources.
-- Tighten write access to admin roles only.
create policy "Admin manage projects"
  on public.portfolio_projects
  for all
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin manage tags"
  on public.portfolio_tags
  for all
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin manage project tags"
  on public.portfolio_project_tags
  for all
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin manage assets"
  on public.site_assets
  for all
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

-- Landing pages should only be public when linked to at least one published project.
drop policy if exists "Allow public read access" on public.landing_pages;

create policy "Public read published landing pages only"
  on public.landing_pages
  for select
  using (
    exists (
      select 1
      from public.portfolio_projects p
      where p.landing_page_id = landing_pages.id
        and p.is_published = true
    )
  );

create policy "Admin manage landing pages"
  on public.landing_pages
  for all
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

-- Storage object policies for admin write access only.
drop policy if exists "Auth upload portfolio-media/site-assets" on storage.objects;
drop policy if exists "Auth update portfolio-media/site-assets" on storage.objects;
drop policy if exists "Auth delete portfolio-media/site-assets" on storage.objects;
drop policy if exists "Auth upload portfolio-media/site-assets" on storage.objects;
drop policy if exists "Auth update portfolio-media/site-assets" on storage.objects;
drop policy if exists "Auth delete portfolio-media/site-assets" on storage.objects;

create policy "Admin upload portfolio-media/site-assets"
  on storage.objects
  for insert
  with check (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin update portfolio-media/site-assets"
  on storage.objects
  for update
  using (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  )
  with check (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin delete portfolio-media/site-assets"
  on storage.objects
  for delete
  using (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );
