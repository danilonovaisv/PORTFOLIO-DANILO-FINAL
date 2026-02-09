-- 03_realtime.sql: Realtime Broadcast Setup

-- NOTE: We are intentionally NOT using 'supabase_realtime' publication for new features.
-- We are using database triggers to broadcast changes.

-- Function: notify_table_changes (Generic Broadcast)
create or replace function public.notify_table_changes()
returns trigger as $$
declare
  topic_name text;
begin
  -- Construct topic name: Just the table name (e.g., 'portfolio_projects')
  -- This allows clients to subscribe to the table channel and receive all updates.
  -- Client-side filtering can be used for specific rows.
  topic_name := TG_TABLE_NAME;

  perform realtime.broadcast_changes(
    topic_name,
    TG_OP,
    TG_OP,
    TG_TABLE_NAME,
    TG_TABLE_SCHEMA,
    NEW,
    OLD
  );
  return null;
end;
$$ language plpgsql security definer;

-- Triggers: Broadcast updates
-- Table: portfolio_projects
drop trigger if exists trg_broadcast_portfolio_projects on public.portfolio_projects;
create trigger trg_broadcast_portfolio_projects
  after insert or update or delete
  on public.portfolio_projects
  for each row execute procedure public.notify_table_changes();

-- Table: site_assets
drop trigger if exists trg_broadcast_site_assets on public.site_assets;
create trigger trg_broadcast_site_assets
  after insert or update or delete
  on public.site_assets
  for each row execute procedure public.notify_table_changes();

-- Table: portfolio_project_tags
drop trigger if exists trg_broadcast_project_tags on public.portfolio_project_tags;
create trigger trg_broadcast_project_tags
  after insert or update or delete
  on public.portfolio_project_tags
  for each row execute procedure public.notify_table_changes();
