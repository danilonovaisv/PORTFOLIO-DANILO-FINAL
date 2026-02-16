-- 01_tables.sql: Core tables for the portfolio

-- Table: portfolio_projects
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
  url_landscape text,
  url_square text,
  gallery jsonb not null default '[]'::jsonb,
  featured_on_home boolean not null default false,
  featured_on_portfolio boolean not null default false,
  featured_home_order int,
  featured_portfolio_order int,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Table: portfolio_tags
create table if not exists public.portfolio_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  kind text not null default 'category',
  description text,
  sort_order int,
  created_at timestamptz not null default timezone('utc', now())
);

-- Table: portfolio_project_tags (Join table)
create table if not exists public.portfolio_project_tags (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  tag_id uuid not null references public.portfolio_tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

-- Table: site_assets
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

-- Table: admin_audit_log
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  actor_user_id uuid null references auth.users(id) on delete set null,
  actor_email text null,
  action text not null,
  resource text not null,
  resource_id text null,
  status text not null check (status in ('success', 'denied', 'error')),
  ip_address text null,
  user_agent text null,
  metadata jsonb not null default '{}'::jsonb,
  error_code text null,
  error_message text null
);

-- Triggers: set_updated_at
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

-- Indexes
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

create index if not exists idx_admin_audit_log_created_at
  on public.admin_audit_log (created_at desc);

create index if not exists idx_admin_audit_log_actor_user_id
  on public.admin_audit_log (actor_user_id);

create index if not exists idx_admin_audit_log_action
  on public.admin_audit_log (action);
