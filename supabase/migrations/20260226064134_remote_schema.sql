create extension if not exists "hypopg" with schema "extensions";

create extension if not exists "index_advisor" with schema "extensions";

create extension if not exists "wrappers" with schema "extensions";

create schema if not exists "api";

create extension if not exists "pg_net" with schema "api";

create sequence "public"."audit_log_id_seq";

create sequence "public"."storage_access_logs_id_seq";

drop policy "Admin read audit log" on "public"."admin_audit_log";

drop policy "Authenticated insert audit log" on "public"."admin_audit_log";

drop policy "Admin manage landing pages" on "public"."landing_pages";

drop policy "Public read published landing pages only" on "public"."landing_pages";

drop policy "Admin manage project tags" on "public"."portfolio_project_tags";

drop policy "Admin manage projects" on "public"."portfolio_projects";

drop policy "Admin manage tags" on "public"."portfolio_tags";

drop policy "Admin manage assets" on "public"."site_assets";

revoke delete on table "public"."admin_audit_log" from "anon";

revoke insert on table "public"."admin_audit_log" from "anon";

revoke references on table "public"."admin_audit_log" from "anon";

revoke select on table "public"."admin_audit_log" from "anon";

revoke trigger on table "public"."admin_audit_log" from "anon";

revoke truncate on table "public"."admin_audit_log" from "anon";

revoke update on table "public"."admin_audit_log" from "anon";

revoke delete on table "public"."admin_audit_log" from "authenticated";

revoke insert on table "public"."admin_audit_log" from "authenticated";

revoke references on table "public"."admin_audit_log" from "authenticated";

revoke select on table "public"."admin_audit_log" from "authenticated";

revoke trigger on table "public"."admin_audit_log" from "authenticated";

revoke truncate on table "public"."admin_audit_log" from "authenticated";

revoke update on table "public"."admin_audit_log" from "authenticated";

revoke delete on table "public"."admin_audit_log" from "service_role";

revoke insert on table "public"."admin_audit_log" from "service_role";

revoke references on table "public"."admin_audit_log" from "service_role";

revoke select on table "public"."admin_audit_log" from "service_role";

revoke trigger on table "public"."admin_audit_log" from "service_role";

revoke truncate on table "public"."admin_audit_log" from "service_role";

revoke update on table "public"."admin_audit_log" from "service_role";

alter table "public"."admin_audit_log" drop constraint "admin_audit_log_actor_user_id_fkey";

alter table "public"."admin_audit_log" drop constraint "admin_audit_log_status_check";

alter table "public"."admin_audit_log" drop constraint "admin_audit_log_pkey";

drop index if exists "public"."admin_audit_log_pkey";

drop index if exists "public"."idx_admin_audit_log_action";

drop index if exists "public"."idx_admin_audit_log_actor_user_id";

drop index if exists "public"."idx_admin_audit_log_created_at";

drop table "public"."admin_audit_log";


  create table "public"."admin_users" (
    "user_id" uuid not null,
    "role" text not null default 'editor'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."admin_users" enable row level security;


  create table "public"."audit_log" (
    "id" bigint not null default nextval('public.audit_log_id_seq'::regclass),
    "actor_user_id" uuid,
    "action" text not null,
    "entity" text not null,
    "entity_id" uuid,
    "details" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."audit_log" enable row level security;


  create table "public"."content_version" (
    "id" boolean not null default true,
    "version" bigint not null default 1,
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."content_version" enable row level security;


  create table "public"."experiences" (
    "id" uuid not null default gen_random_uuid(),
    "company" text not null,
    "role" text not null,
    "start_date" date,
    "end_date" date,
    "description" text,
    "content" jsonb not null default '{}'::jsonb,
    "status" text not null default 'draft'::text,
    "visibility" boolean not null default true,
    "order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."experiences" enable row level security;


  create table "public"."project_config" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "project_name" text not null,
    "project_description" text,
    "project_domain" text,
    "api_keys" jsonb default '{}'::jsonb,
    "public_env_vars" jsonb default '{}'::jsonb,
    "storage_buckets" jsonb default '[]'::jsonb,
    "storage_permissions" jsonb default '{}'::jsonb,
    "auth_providers" jsonb default '[]'::jsonb,
    "jwt_expiry" integer default 3600,
    "is_active" boolean default true,
    "environment" text,
    "last_accessed" timestamp with time zone,
    "accessed_by" uuid,
    "created_by" uuid default auth.uid()
      );


alter table "public"."project_config" enable row level security;


  create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "summary" text,
    "content" jsonb not null default '{}'::jsonb,
    "cover_asset_id" uuid,
    "status" text not null default 'draft'::text,
    "visibility" boolean not null default true,
    "order" integer not null default 0,
    "featured" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."projects" enable row level security;


  create table "public"."site_settings" (
    "key" text not null,
    "value" jsonb not null,
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."site_settings" enable row level security;


  create table "public"."storage_access_logs" (
    "id" bigint not null default nextval('public.storage_access_logs_id_seq'::regclass),
    "ts" timestamp with time zone not null,
    "bucket_id" text,
    "path" text not null,
    "bytes" bigint default 0,
    "method" text,
    "status" smallint,
    "ip" inet,
    "user_agent" text,
    "referer" text,
    "host" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."storage_access_logs" enable row level security;

alter sequence "public"."audit_log_id_seq" owned by "public"."audit_log"."id";

alter sequence "public"."storage_access_logs_id_seq" owned by "public"."storage_access_logs"."id";

CREATE UNIQUE INDEX admin_users_pkey ON public.admin_users USING btree (user_id, role, created_at);

CREATE INDEX audit_log_created_at_idx ON public.audit_log USING btree (created_at);

CREATE UNIQUE INDEX audit_log_pkey ON public.audit_log USING btree (id);

CREATE UNIQUE INDEX content_version_pkey ON public.content_version USING btree (id);

CREATE INDEX experiences_order_idx ON public.experiences USING btree ("order");

CREATE UNIQUE INDEX experiences_pkey ON public.experiences USING btree (id);

CREATE INDEX experiences_status_idx ON public.experiences USING btree (status);

CREATE INDEX idx_project_config_active ON public.project_config USING btree (is_active);

CREATE INDEX idx_project_config_env ON public.project_config USING btree (environment);

CREATE INDEX idx_project_config_name ON public.project_config USING btree (project_name);

CREATE INDEX idx_storage_access_logs_bucket ON public.storage_access_logs USING btree (bucket_id);

CREATE INDEX idx_storage_access_logs_ip ON public.storage_access_logs USING btree (ip);

CREATE INDEX idx_storage_access_logs_path ON public.storage_access_logs USING btree (path);

CREATE INDEX idx_storage_access_logs_referer ON public.storage_access_logs USING btree (referer);

CREATE INDEX idx_storage_access_logs_ts ON public.storage_access_logs USING btree (ts);

CREATE INDEX portfolio_projects_featured_home_order_idx ON public.portfolio_projects USING btree (featured_home_order);

CREATE INDEX portfolio_projects_updated_at_idx ON public.portfolio_projects USING btree (updated_at);

CREATE UNIQUE INDEX project_config_pkey ON public.project_config USING btree (id);

CREATE UNIQUE INDEX project_config_project_name_key ON public.project_config USING btree (project_name);

CREATE INDEX projects_order_idx ON public.projects USING btree ("order");

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX projects_slug_key ON public.projects USING btree (slug);

CREATE INDEX projects_status_idx ON public.projects USING btree (status);

CREATE INDEX site_assets_page_idx ON public.site_assets USING btree (page);

CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (key);

CREATE UNIQUE INDEX storage_access_logs_pkey ON public.storage_access_logs USING btree (id);

alter table "public"."admin_users" add constraint "admin_users_pkey" PRIMARY KEY using index "admin_users_pkey";

alter table "public"."audit_log" add constraint "audit_log_pkey" PRIMARY KEY using index "audit_log_pkey";

alter table "public"."content_version" add constraint "content_version_pkey" PRIMARY KEY using index "content_version_pkey";

alter table "public"."experiences" add constraint "experiences_pkey" PRIMARY KEY using index "experiences_pkey";

alter table "public"."project_config" add constraint "project_config_pkey" PRIMARY KEY using index "project_config_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."site_settings" add constraint "site_settings_pkey" PRIMARY KEY using index "site_settings_pkey";

alter table "public"."storage_access_logs" add constraint "storage_access_logs_pkey" PRIMARY KEY using index "storage_access_logs_pkey";

alter table "public"."admin_users" add constraint "admin_users_role_check" CHECK ((role = ANY (ARRAY['owner'::text, 'editor'::text, 'viewer'::text]))) not valid;

alter table "public"."admin_users" validate constraint "admin_users_role_check";

alter table "public"."admin_users" add constraint "admin_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users" validate constraint "admin_users_user_id_fkey";

alter table "public"."audit_log" add constraint "audit_log_actor_user_id_fkey" FOREIGN KEY (actor_user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."audit_log" validate constraint "audit_log_actor_user_id_fkey";

alter table "public"."experiences" add constraint "experiences_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text]))) not valid;

alter table "public"."experiences" validate constraint "experiences_status_check";

alter table "public"."project_config" add constraint "project_config_accessed_by_fkey" FOREIGN KEY (accessed_by) REFERENCES auth.users(id) not valid;

alter table "public"."project_config" validate constraint "project_config_accessed_by_fkey";

alter table "public"."project_config" add constraint "project_config_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."project_config" validate constraint "project_config_created_by_fkey";

alter table "public"."project_config" add constraint "project_config_environment_check" CHECK ((environment = ANY (ARRAY['development'::text, 'staging'::text, 'production'::text]))) not valid;

alter table "public"."project_config" validate constraint "project_config_environment_check";

alter table "public"."project_config" add constraint "project_config_project_name_key" UNIQUE using index "project_config_project_name_key";

alter table "public"."projects" add constraint "projects_slug_key" UNIQUE using index "projects_slug_key";

alter table "public"."projects" add constraint "projects_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text]))) not valid;

alter table "public"."projects" validate constraint "projects_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.bump_content_version()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  UPDATE public.content_version
  SET version = version + 1,
      updated_at = now()
  WHERE id = true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.bump_on_publish_impact()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$
DECLARE
  should_bump boolean := false;
BEGIN
  -- bump when rows that affect public site change
  IF (TG_TABLE_NAME IN ('projects','experiences','site_settings','assets')) THEN
    should_bump := true;
  END IF;

  IF should_bump THEN
    PERFORM public.bump_content_version();
  END IF;

  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cleanup_old_data()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$BEGIN
  -- 1) manter audit_log só por 90 dias (ajuste conforme sua necessidade)
  DELETE FROM public.audit_log
  WHERE created_at < NOW() - INTERVAL '90 days';

  -- 2) arquivar drafts muito antigos (ex.: 180 dias)
  UPDATE public.projects
  SET status = 'archived'
  WHERE status = 'draft'
    AND updated_at < NOW() - INTERVAL '180 days';

  UPDATE public.experiences
  SET status = 'archived'
  WHERE status = 'draft'
    AND updated_at < NOW() - INTERVAL '180 days';
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_orphaned_storage_objects()
 RETURNS TABLE(id uuid, bucket_id text, name text)
 LANGUAGE sql
 STABLE
AS $function$
WITH raw_refs AS (
  SELECT concat(coalesce(bucket, ''), '/', coalesce(file_path, '')) AS raw_ref
  FROM public.site_assets
  WHERE coalesce(bucket, '') <> '' AND coalesce(file_path, '') <> ''

  UNION ALL
  SELECT thumbnail_path FROM public.portfolio_projects WHERE thumbnail_path IS NOT NULL
  UNION ALL
  SELECT hero_image_path FROM public.portfolio_projects WHERE hero_image_path IS NOT NULL
  UNION ALL
  SELECT url_landscape FROM public.portfolio_projects WHERE url_landscape IS NOT NULL
  UNION ALL
  SELECT url_square FROM public.portfolio_projects WHERE url_square IS NOT NULL

  UNION ALL
  SELECT (entry ->> 'path')
  FROM public.portfolio_projects p,
       LATERAL jsonb_array_elements(coalesce(p.gallery, '[]'::jsonb)) AS entry
  WHERE coalesce(entry ->> 'path', '') <> ''

  UNION ALL
  SELECT trim(both '"' FROM v::text)
  FROM public.landing_pages lp,
       LATERAL jsonb_path_query(coalesce(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') AS v
  WHERE trim(both '"' FROM v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
), normalized_refs AS (
  SELECT DISTINCT
    regexp_replace(
      regexp_replace(
        regexp_replace(coalesce(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''),
        '^/storage/v1/object/public/',
        ''
      ),
      '^/',
      ''
    ) AS normalized
  FROM raw_refs
  WHERE coalesce(raw_ref, '') <> ''
), referenced_paths AS (
  SELECT
    split_part(normalized, '/', 1) AS bucket_id,
    substring(normalized FROM length(split_part(normalized, '/', 1)) + 2) AS name
  FROM normalized_refs
  WHERE split_part(normalized, '/', 1) IN ('site-assets', 'portfolio-media')
    AND strpos(normalized, '/') > 0
), doomed AS (
  SELECT o.id, o.bucket_id, o.name
  FROM storage.objects o
  LEFT JOIN referenced_paths r
    ON r.bucket_id = o.bucket_id
   AND r.name = o.name
  WHERE o.bucket_id IN ('site-assets', 'portfolio-media')
    AND r.name IS NULL
    AND o.created_at < now() - INTERVAL '14 days'
)
SELECT id, bucket_id, name FROM doomed;
$function$
;

CREATE OR REPLACE FUNCTION public.list_orphaned_storage_objects()
 RETURNS TABLE(bucket_id text, name text, id uuid, size_bytes bigint)
 LANGUAGE sql
 STABLE
AS $function$
WITH raw_refs AS (
    SELECT concat(COALESCE(bucket, ''), '/', COALESCE(file_path, '')) AS raw_ref FROM public.site_assets WHERE COALESCE(bucket, '') <> '' AND COALESCE(file_path, '') <> ''
    UNION ALL
    SELECT thumbnail_path FROM public.portfolio_projects WHERE thumbnail_path IS NOT NULL
    UNION ALL
    SELECT hero_image_path FROM public.portfolio_projects WHERE hero_image_path IS NOT NULL
    UNION ALL
    SELECT url_landscape FROM public.portfolio_projects WHERE url_landscape IS NOT NULL
    UNION ALL
    SELECT url_square FROM public.portfolio_projects WHERE url_square IS NOT NULL
    UNION ALL
    SELECT (entry->>'path') FROM public.portfolio_projects p, LATERAL jsonb_array_elements(COALESCE(p.gallery, '[]'::jsonb)) AS entry WHERE COALESCE(entry->>'path','') <> ''
    UNION ALL
    SELECT trim(both '"' from v::text) FROM public.landing_pages lp, LATERAL jsonb_path_query(COALESCE(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') AS v WHERE trim(both '"' from v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
),
normalized_refs AS (
    SELECT DISTINCT regexp_replace(regexp_replace(regexp_replace(COALESCE(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''), '^/storage/v1/object/public/', ''), '^/', '') AS normalized
    FROM raw_refs
    WHERE COALESCE(raw_ref, '') <> ''
),
referenced_paths AS (
    SELECT split_part(normalized, '/', 1) AS bucket_id, substring(normalized FROM length(split_part(normalized, '/', 1)) + 2) AS name
    FROM normalized_refs
    WHERE split_part(normalized, '/', 1) IN ('site-assets', 'portfolio-media') AND strpos(normalized, '/') > 0
),
doomed AS (
    SELECT o.id, o.bucket_id, o.name, COALESCE((o.metadata->>'size')::bigint,0) AS size_bytes
    FROM storage.objects o
    LEFT JOIN referenced_paths r ON r.bucket_id = o.bucket_id AND r.name = o.name
    WHERE o.bucket_id IN ('site-assets','portfolio-media') AND r.name IS NULL AND o.created_at < now() - interval '14 days'
)
SELECT bucket_id, name, id, size_bytes FROM doomed;
$function$
;

CREATE OR REPLACE FUNCTION public.notify_table_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_catalog'
AS $function$
declare
  topic_name text;
begin
  -- Construct topic name: Just the table name (e.g., 'portfolio_projects')
  topic_name := TG_TABLE_NAME;

  PERFORM realtime.broadcast_changes(
    topic_name,
    TG_OP,
    TG_OP,
    TG_TABLE_NAME,
    TG_TABLE_SCHEMA,
    NEW,
    OLD
  );
  RETURN NULL;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.run_clear_cached_egress_wrapper()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  PERFORM public.clear_cached_egress();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_catalog'
AS $function$
BEGIN
  RETURN (
    auth.role() = 'authenticated'
    AND (
      coalesce((auth.jwt() ->> 'role'), '') IN ('admin', 'owner', 'super_admin')
      OR coalesce((auth.jwt() -> 'app_metadata') ->> 'role', '') IN ('admin', 'owner', 'super_admin')
    )
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'pg_catalog', 'public'
AS $function$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."admin_users" to "anon";

grant insert on table "public"."admin_users" to "anon";

grant references on table "public"."admin_users" to "anon";

grant select on table "public"."admin_users" to "anon";

grant trigger on table "public"."admin_users" to "anon";

grant truncate on table "public"."admin_users" to "anon";

grant update on table "public"."admin_users" to "anon";

grant delete on table "public"."admin_users" to "authenticated";

grant insert on table "public"."admin_users" to "authenticated";

grant references on table "public"."admin_users" to "authenticated";

grant select on table "public"."admin_users" to "authenticated";

grant trigger on table "public"."admin_users" to "authenticated";

grant truncate on table "public"."admin_users" to "authenticated";

grant update on table "public"."admin_users" to "authenticated";

grant delete on table "public"."admin_users" to "service_role";

grant insert on table "public"."admin_users" to "service_role";

grant references on table "public"."admin_users" to "service_role";

grant select on table "public"."admin_users" to "service_role";

grant trigger on table "public"."admin_users" to "service_role";

grant truncate on table "public"."admin_users" to "service_role";

grant update on table "public"."admin_users" to "service_role";

grant delete on table "public"."audit_log" to "anon";

grant insert on table "public"."audit_log" to "anon";

grant references on table "public"."audit_log" to "anon";

grant select on table "public"."audit_log" to "anon";

grant trigger on table "public"."audit_log" to "anon";

grant truncate on table "public"."audit_log" to "anon";

grant update on table "public"."audit_log" to "anon";

grant delete on table "public"."audit_log" to "authenticated";

grant insert on table "public"."audit_log" to "authenticated";

grant references on table "public"."audit_log" to "authenticated";

grant select on table "public"."audit_log" to "authenticated";

grant trigger on table "public"."audit_log" to "authenticated";

grant truncate on table "public"."audit_log" to "authenticated";

grant update on table "public"."audit_log" to "authenticated";

grant delete on table "public"."audit_log" to "service_role";

grant insert on table "public"."audit_log" to "service_role";

grant references on table "public"."audit_log" to "service_role";

grant select on table "public"."audit_log" to "service_role";

grant trigger on table "public"."audit_log" to "service_role";

grant truncate on table "public"."audit_log" to "service_role";

grant update on table "public"."audit_log" to "service_role";

grant delete on table "public"."content_version" to "anon";

grant insert on table "public"."content_version" to "anon";

grant references on table "public"."content_version" to "anon";

grant select on table "public"."content_version" to "anon";

grant trigger on table "public"."content_version" to "anon";

grant truncate on table "public"."content_version" to "anon";

grant update on table "public"."content_version" to "anon";

grant delete on table "public"."content_version" to "authenticated";

grant insert on table "public"."content_version" to "authenticated";

grant references on table "public"."content_version" to "authenticated";

grant select on table "public"."content_version" to "authenticated";

grant trigger on table "public"."content_version" to "authenticated";

grant truncate on table "public"."content_version" to "authenticated";

grant update on table "public"."content_version" to "authenticated";

grant delete on table "public"."content_version" to "service_role";

grant insert on table "public"."content_version" to "service_role";

grant references on table "public"."content_version" to "service_role";

grant select on table "public"."content_version" to "service_role";

grant trigger on table "public"."content_version" to "service_role";

grant truncate on table "public"."content_version" to "service_role";

grant update on table "public"."content_version" to "service_role";

grant delete on table "public"."experiences" to "anon";

grant insert on table "public"."experiences" to "anon";

grant references on table "public"."experiences" to "anon";

grant select on table "public"."experiences" to "anon";

grant trigger on table "public"."experiences" to "anon";

grant truncate on table "public"."experiences" to "anon";

grant update on table "public"."experiences" to "anon";

grant delete on table "public"."experiences" to "authenticated";

grant insert on table "public"."experiences" to "authenticated";

grant references on table "public"."experiences" to "authenticated";

grant select on table "public"."experiences" to "authenticated";

grant trigger on table "public"."experiences" to "authenticated";

grant truncate on table "public"."experiences" to "authenticated";

grant update on table "public"."experiences" to "authenticated";

grant delete on table "public"."experiences" to "service_role";

grant insert on table "public"."experiences" to "service_role";

grant references on table "public"."experiences" to "service_role";

grant select on table "public"."experiences" to "service_role";

grant trigger on table "public"."experiences" to "service_role";

grant truncate on table "public"."experiences" to "service_role";

grant update on table "public"."experiences" to "service_role";

grant delete on table "public"."project_config" to "anon";

grant insert on table "public"."project_config" to "anon";

grant references on table "public"."project_config" to "anon";

grant select on table "public"."project_config" to "anon";

grant trigger on table "public"."project_config" to "anon";

grant truncate on table "public"."project_config" to "anon";

grant update on table "public"."project_config" to "anon";

grant delete on table "public"."project_config" to "authenticated";

grant insert on table "public"."project_config" to "authenticated";

grant references on table "public"."project_config" to "authenticated";

grant select on table "public"."project_config" to "authenticated";

grant trigger on table "public"."project_config" to "authenticated";

grant truncate on table "public"."project_config" to "authenticated";

grant update on table "public"."project_config" to "authenticated";

grant delete on table "public"."project_config" to "service_role";

grant insert on table "public"."project_config" to "service_role";

grant references on table "public"."project_config" to "service_role";

grant select on table "public"."project_config" to "service_role";

grant trigger on table "public"."project_config" to "service_role";

grant truncate on table "public"."project_config" to "service_role";

grant update on table "public"."project_config" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."site_settings" to "anon";

grant insert on table "public"."site_settings" to "anon";

grant references on table "public"."site_settings" to "anon";

grant select on table "public"."site_settings" to "anon";

grant trigger on table "public"."site_settings" to "anon";

grant truncate on table "public"."site_settings" to "anon";

grant update on table "public"."site_settings" to "anon";

grant delete on table "public"."site_settings" to "authenticated";

grant insert on table "public"."site_settings" to "authenticated";

grant references on table "public"."site_settings" to "authenticated";

grant select on table "public"."site_settings" to "authenticated";

grant trigger on table "public"."site_settings" to "authenticated";

grant truncate on table "public"."site_settings" to "authenticated";

grant update on table "public"."site_settings" to "authenticated";

grant delete on table "public"."site_settings" to "service_role";

grant insert on table "public"."site_settings" to "service_role";

grant references on table "public"."site_settings" to "service_role";

grant select on table "public"."site_settings" to "service_role";

grant trigger on table "public"."site_settings" to "service_role";

grant truncate on table "public"."site_settings" to "service_role";

grant update on table "public"."site_settings" to "service_role";

grant delete on table "public"."storage_access_logs" to "anon";

grant insert on table "public"."storage_access_logs" to "anon";

grant references on table "public"."storage_access_logs" to "anon";

grant select on table "public"."storage_access_logs" to "anon";

grant trigger on table "public"."storage_access_logs" to "anon";

grant truncate on table "public"."storage_access_logs" to "anon";

grant update on table "public"."storage_access_logs" to "anon";

grant delete on table "public"."storage_access_logs" to "authenticated";

grant insert on table "public"."storage_access_logs" to "authenticated";

grant references on table "public"."storage_access_logs" to "authenticated";

grant select on table "public"."storage_access_logs" to "authenticated";

grant trigger on table "public"."storage_access_logs" to "authenticated";

grant truncate on table "public"."storage_access_logs" to "authenticated";

grant update on table "public"."storage_access_logs" to "authenticated";

grant delete on table "public"."storage_access_logs" to "service_role";

grant insert on table "public"."storage_access_logs" to "service_role";

grant references on table "public"."storage_access_logs" to "service_role";

grant select on table "public"."storage_access_logs" to "service_role";

grant trigger on table "public"."storage_access_logs" to "service_role";

grant truncate on table "public"."storage_access_logs" to "service_role";

grant update on table "public"."storage_access_logs" to "service_role";


  create policy "Enable read access for all users"
  on "public"."admin_users"
  as permissive
  for select
  to public
using (true);



  create policy "replace_with_policy_name"
  on "public"."admin_users"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow public read access"
  on "public"."landing_pages"
  as permissive
  for select
  to public
using (true);



  create policy "Auth manage project tags"
  on "public"."portfolio_project_tags"
  as permissive
  for all
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Auth manage projects"
  on "public"."portfolio_projects"
  as permissive
  for all
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Auth manage tags"
  on "public"."portfolio_tags"
  as permissive
  for all
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Admin full access"
  on "public"."project_config"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM auth.users
  WHERE ((users.id = auth.uid()) AND ((users.raw_user_meta_data ->> 'role'::text) = 'admin'::text)))));



  create policy "Users can insert own project config"
  on "public"."project_config"
  as permissive
  for insert
  to public
with check ((auth.uid() = created_by));



  create policy "Users can update own project config"
  on "public"."project_config"
  as permissive
  for update
  to public
using ((auth.uid() = created_by));



  create policy "Users can view own project config"
  on "public"."project_config"
  as permissive
  for select
  to public
using (((auth.uid() = created_by) OR (EXISTS ( SELECT 1
   FROM auth.users
  WHERE ((users.id = auth.uid()) AND ((users.raw_user_meta_data ->> 'role'::text) = 'admin'::text))))));



  create policy "Auth manage assets"
  on "public"."site_assets"
  as permissive
  for all
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Authenticated can manage assets delete"
  on "public"."site_assets"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) IS NOT NULL));



  create policy "Authenticated can manage assets insert"
  on "public"."site_assets"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) IS NOT NULL));



  create policy "Authenticated can manage assets update"
  on "public"."site_assets"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) IS NOT NULL))
with check ((( SELECT auth.uid() AS uid) IS NOT NULL));


CREATE TRIGGER bump_experiences AFTER INSERT OR DELETE OR UPDATE ON public.experiences FOR EACH STATEMENT EXECUTE FUNCTION public.bump_on_publish_impact();

CREATE TRIGGER set_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_broadcast_project_tags AFTER INSERT OR DELETE OR UPDATE ON public.portfolio_project_tags FOR EACH ROW EXECUTE FUNCTION public.notify_table_changes();

CREATE TRIGGER trg_broadcast_portfolio_projects AFTER INSERT OR DELETE OR UPDATE ON public.portfolio_projects FOR EACH ROW EXECUTE FUNCTION public.notify_table_changes();

CREATE TRIGGER update_project_config_updated_at BEFORE UPDATE ON public.project_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER bump_projects AFTER INSERT OR DELETE OR UPDATE ON public.projects FOR EACH STATEMENT EXECUTE FUNCTION public.bump_on_publish_impact();

CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_broadcast_site_assets AFTER INSERT OR DELETE OR UPDATE ON public.site_assets FOR EACH ROW EXECUTE FUNCTION public.notify_table_changes();

CREATE TRIGGER bump_site_settings AFTER INSERT OR DELETE OR UPDATE ON public.site_settings FOR EACH STATEMENT EXECUTE FUNCTION public.bump_on_publish_impact();


  create policy "Enable read access for all users"
  on "storage"."buckets"
  as permissive
  for select
  to public
using (true);



