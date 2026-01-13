-- Supabase schema for portfolio CMS

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

-- Tabelas principais
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text not null,
  brand_name text,
  year int,
  project_type text not null,
  short_label text,
  description text,
  thumbnail_path text,
  hero_image_path text,
  gallery jsonb not null default '[]'::jsonb,
  featured_on_home boolean not null default false,
  featured_on_portfolio boolean not null default false,
  featured_home_order int,
  featured_portfolio_order int,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  kind text not null default 'category',
  description text,
  sort_order int,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_project_tags (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  tag_id uuid not null references public.portfolio_tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

create table if not exists public.site_assets (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  bucket text not null,
  file_path text not null,
  asset_type text not null,
  page text,
  description text,
  is_active boolean not null default true,
  sort_order int,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Triggers de atualização
drop trigger if exists trg_set_timestamp_portfolio_projects on public.portfolio_projects;
create trigger trg_set_timestamp_portfolio_projects
  before update on public.portfolio_projects
  for each row execute procedure public.set_updated_at();

drop trigger if exists trg_set_timestamp_portfolio_tags on public.portfolio_tags;
create trigger trg_set_timestamp_portfolio_tags
  before update on public.portfolio_tags
  for each row execute procedure public.set_updated_at();

drop trigger if exists trg_set_timestamp_site_assets on public.site_assets;
create trigger trg_set_timestamp_site_assets
  before update on public.site_assets
  for each row execute procedure public.set_updated_at();

-- Índices
create index if not exists idx_portfolio_projects_featured_home
  on public.portfolio_projects (featured_home_order nulls last)
  where featured_on_home;

create index if not exists idx_portfolio_projects_featured_portfolio
  on public.portfolio_projects (featured_portfolio_order nulls last)
  where featured_on_portfolio;

create index if not exists idx_portfolio_projects_is_published
  on public.portfolio_projects (is_published);

create index if not exists idx_portfolio_projects_project_type
  on public.portfolio_projects (project_type);

create index if not exists idx_portfolio_tags_sort
  on public.portfolio_tags (sort_order nulls last);

create index if not exists idx_site_assets_page
  on public.site_assets (page, is_active, sort_order);

-- RLS
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_tags enable row level security;
alter table public.portfolio_project_tags enable row level security;
alter table public.site_assets enable row level security;

create policy "Public read published projects"
  on public.portfolio_projects for select
  using (is_published = true);

create policy "Auth manage projects"
  on public.portfolio_projects for all
  using (auth.role() = 'authenticated');

create policy "Public read tags"
  on public.portfolio_tags for select
  using (true);

create policy "Auth manage tags"
  on public.portfolio_tags for all
  using (auth.role() = 'authenticated');

create policy "Public read published project tags"
  on public.portfolio_project_tags for select
  using (
    exists (
      select 1 from public.portfolio_projects p
      where p.id = project_id and p.is_published = true
    )
  );

create policy "Auth manage project tags"
  on public.portfolio_project_tags for all
  using (auth.role() = 'authenticated');

create policy "Public read active assets"
  on public.site_assets for select
  using (is_active = true);

create policy "Auth manage assets"
  on public.site_assets for all
  using (auth.role() = 'authenticated');

-- Buckets de storage
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Policies de storage.objects
create policy "Public read portfolio-media/site-assets"
  on storage.objects for select
  using (bucket_id in ('portfolio-media', 'site-assets'));

create policy "Auth upload portfolio-media/site-assets"
  on storage.objects for insert
  with check (bucket_id in ('portfolio-media', 'site-assets') and auth.role() = 'authenticated');

create policy "Auth update portfolio-media/site-assets"
  on storage.objects for update
  using (bucket_id in ('portfolio-media', 'site-assets') and auth.role() = 'authenticated')
  with check (bucket_id in ('portfolio-media', 'site-assets') and auth.role() = 'authenticated');

create policy "Auth delete portfolio-media/site-assets"
  on storage.objects for delete
  using (bucket_id in ('portfolio-media', 'site-assets') and auth.role() = 'authenticated');
