-- ADMIN audit trail (LGPD + ASVS accountability)
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  actor_user_id uuid null references auth.users (id) on delete set null,
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

create index if not exists idx_admin_audit_log_created_at
  on public.admin_audit_log (created_at desc);

create index if not exists idx_admin_audit_log_actor_user_id
  on public.admin_audit_log (actor_user_id);

create index if not exists idx_admin_audit_log_action
  on public.admin_audit_log (action);

alter table public.admin_audit_log enable row level security;

drop policy if exists "Admin read audit log" on public.admin_audit_log;
create policy "Admin read audit log"
  on public.admin_audit_log
  for select
  using (
    auth.role() = 'authenticated'
    and (
      coalesce(auth.jwt() ->> 'role', '') in ('admin', 'owner', 'super_admin')
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') in ('admin', 'owner', 'super_admin')
    )
  );

drop policy if exists "Authenticated insert audit log" on public.admin_audit_log;
create policy "Authenticated insert audit log"
  on public.admin_audit_log
  for insert
  with check (
    auth.role() = 'authenticated'
    and actor_user_id = auth.uid()
  );
