-- 02_security.sql: RLS Policies and Bucket Security

-- Enable RLS
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_tags enable row level security;
alter table public.portfolio_project_tags enable row level security;
alter table public.site_assets enable row level security;
alter table public.admin_audit_log enable row level security;

-- Policies: portfolio_projects
create policy "Public read published projects"
  on public.portfolio_projects for select
  using (is_published = true);

create policy "Admin manage projects"
  on public.portfolio_projects for all
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

-- Policies: portfolio_tags
create policy "Public read tags"
  on public.portfolio_tags for select
  using (true);

create policy "Admin manage tags"
  on public.portfolio_tags for all
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

-- Policies: portfolio_project_tags
create policy "Public read published project tags"
  on public.portfolio_project_tags for select
  using (
    exists (
      select 1 from public.portfolio_projects p
      where p.id = project_id and p.is_published = true
    )
  );

create policy "Admin manage project tags"
  on public.portfolio_project_tags for all
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

-- Policies: site_assets
create policy "Public read active assets"
  on public.site_assets for select
  using (is_active = true);

create policy "Admin manage assets"
  on public.site_assets for all
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

-- Policies: admin_audit_log
create policy "Admin read audit log"
  on public.admin_audit_log for select
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Authenticated insert audit log"
  on public.admin_audit_log for insert
  with check (
    auth.role() = 'authenticated'
    and actor_user_id = auth.uid()
  );

-- Storage Buckets Setup
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Policies: storage.objects
create policy "Public read portfolio-media/site-assets"
  on storage.objects for select
  using (bucket_id in ('portfolio-media', 'site-assets'));

create policy "Admin upload portfolio-media/site-assets"
  on storage.objects for insert
  with check (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

create policy "Admin update portfolio-media/site-assets"
  on storage.objects for update
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
  on storage.objects for delete
  using (
    bucket_id in ('portfolio-media', 'site-assets')
    and auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );
