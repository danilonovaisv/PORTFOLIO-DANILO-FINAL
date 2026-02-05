-- [AEE] Portfolio variants + zero-deploy realtime sync

alter table public.portfolio_projects
  add column if not exists url_landscape text,
  add column if not exists url_square text;

comment on column public.portfolio_projects.url_landscape is
  'Storage path or absolute URL for 16:9 cover variant.';

comment on column public.portfolio_projects.url_square is
  'Storage path or absolute URL for 1:1 cover variant.';

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_projects'
  ) then
    alter publication supabase_realtime add table public.portfolio_projects;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_project_tags'
  ) then
    alter publication supabase_realtime add table public.portfolio_project_tags;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'site_assets'
  ) then
    alter publication supabase_realtime add table public.site_assets;
  end if;
end $$;
