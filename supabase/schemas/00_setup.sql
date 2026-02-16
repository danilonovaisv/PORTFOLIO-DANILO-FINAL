-- 00_setup.sql: Extensions and utility functions

-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- Function to automatically update 'updated_at' timestamp
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;
