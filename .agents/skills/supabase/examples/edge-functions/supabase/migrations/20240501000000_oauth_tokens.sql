create table oauth_tokens (
  id uuid primary key default gen_random_uuid(),
  access_token text not null,
  refresh_token text,
  expires_in int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table oauth_tokens enable row level security;
