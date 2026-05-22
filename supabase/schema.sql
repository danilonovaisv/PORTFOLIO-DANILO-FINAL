


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "api";


ALTER SCHEMA "api" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "api";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."bump_content_version"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
BEGIN
  UPDATE public.content_version
  SET version = version + 1,
      updated_at = now()
  WHERE id = true;
END;
$$;


ALTER FUNCTION "public"."bump_content_version"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."bump_on_publish_impact"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$
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
$$;


ALTER FUNCTION "public"."bump_on_publish_impact"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_old_data"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$BEGIN
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
END;$$;


ALTER FUNCTION "public"."cleanup_old_data"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."clear_cached_egress"() RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog', 'public'
    AS $_$
DECLARE v_orphan_files int;
v_freed_bytes bigint;
v_result jsonb;
BEGIN WITH raw_refs AS (
    -- site_assets table
    SELECT concat(
            COALESCE(bucket, ''),
            '/',
            COALESCE(file_path, '')
        ) AS raw_ref
    FROM public.site_assets
    WHERE COALESCE(bucket, '') <> ''
        AND COALESCE(file_path, '') <> ''
    UNION ALL
    -- portfolio_projects direct fields
    SELECT thumbnail_path
    FROM public.portfolio_projects
    WHERE thumbnail_path IS NOT NULL
    UNION ALL
    SELECT hero_image_path
    FROM public.portfolio_projects
    WHERE hero_image_path IS NOT NULL
    UNION ALL
    SELECT url_landscape
    FROM public.portfolio_projects
    WHERE url_landscape IS NOT NULL
    UNION ALL
    SELECT url_square
    FROM public.portfolio_projects
    WHERE url_square IS NOT NULL
    UNION ALL
    -- portfolio_projects gallery json
    SELECT (entry->>'path')
    FROM public.portfolio_projects p,
        LATERAL jsonb_array_elements(COALESCE(p.gallery, '[]'::jsonb)) AS entry
    WHERE COALESCE(entry->>'path', '') <> ''
    UNION ALL
    -- landing_pages content json strings (recursive)
    SELECT trim(
            both '"'
            from v::text
        )
    FROM public.landing_pages lp,
        LATERAL jsonb_path_query(
            COALESCE(lp.content, '{}'::jsonb),
            '$.** ? (@.type() == "string")'
        ) AS v
    WHERE trim(
            both '"'
            from v::text
        ) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
),
normalized_refs AS (
    SELECT DISTINCT regexp_replace(
            regexp_replace(
                regexp_replace(
                    COALESCE(raw_ref, ''),
                    '^https?://[^/]+/storage/v1/object/public/',
                    ''
                ),
                '^/storage/v1/object/public/',
                ''
            ),
            '^/',
            ''
        ) AS normalized
    FROM raw_refs
    WHERE COALESCE(raw_ref, '') <> ''
),
referenced_paths AS (
    SELECT split_part(normalized, '/', 1) AS bucket_id,
        substring(
            normalized
            FROM length(split_part(normalized, '/', 1)) + 2
        ) AS name
    FROM normalized_refs
    WHERE split_part(normalized, '/', 1) IN ('site-assets', 'portfolio-media')
        AND strpos(normalized, '/') > 0
),
doomed AS (
    SELECT o.id,
        COALESCE((o.metadata->>'size')::bigint, 0) AS size_bytes
    FROM storage.objects o
        LEFT JOIN referenced_paths r ON r.bucket_id = o.bucket_id
        AND r.name = o.name
    WHERE o.bucket_id IN ('site-assets', 'portfolio-media')
        AND r.name IS NULL
        AND o.created_at < now() - interval '14 days'
),
deleted_objects AS (
    DELETE FROM storage.objects o USING doomed d
    WHERE o.id = d.id
    RETURNING d.size_bytes
)
SELECT count(*),
    COALESCE(sum(size_bytes), 0) INTO v_orphan_files,
    v_freed_bytes
FROM deleted_objects;
v_result := jsonb_build_object(
    'deleted_files',
    v_orphan_files,
    'freed_bytes',
    v_freed_bytes,
    'timestamp',
    now()
);
RAISE NOTICE 'Cached Egress Cleanup: % files deleted, % bytes freed',
v_orphan_files,
v_freed_bytes;
RETURN v_result;
END;
$_$;


ALTER FUNCTION "public"."clear_cached_egress"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_orphaned_storage_objects"() RETURNS TABLE("id" "uuid", "bucket_id" "text", "name" "text")
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'public', 'storage', 'auth', 'pg_temp'
    AS $_$
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
$_$;


ALTER FUNCTION "public"."get_orphaned_storage_objects"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$BEGIN 
  RETURN (
    auth.role() = 'authenticated'
    AND (
      COALESCE(auth.jwt()->>'role', '') IN ('admin', 'owner', 'super_admin')
      OR COALESCE(auth.jwt()->'app_metadata'->>'role', '') IN ('admin', 'owner', 'super_admin')
      OR COALESCE(auth.jwt()->'user_metadata'->>'role', '') IN ('admin', 'owner', 'super_admin')
    )
  );
END;$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."list_orphaned_storage_objects"() RETURNS TABLE("bucket_id" "text", "name" "text", "id" "uuid", "size_bytes" bigint)
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'pg_temp', 'pg_catalog', 'public', 'storage'
    AS $_$
WITH raw_refs AS (
    SELECT concat(COALESCE(bucket, ''), '/', COALESCE(file_path, '')) AS raw_ref
    FROM public.site_assets
    WHERE COALESCE(bucket, '') <> '' AND COALESCE(file_path, '') <> ''
    UNION ALL
    SELECT thumbnail_path FROM public.portfolio_projects WHERE thumbnail_path IS NOT NULL
    UNION ALL
    SELECT hero_image_path FROM public.portfolio_projects WHERE hero_image_path IS NOT NULL
    UNION ALL
    SELECT url_landscape FROM public.portfolio_projects WHERE url_landscape IS NOT NULL
    UNION ALL
    SELECT url_square FROM public.portfolio_projects WHERE url_square IS NOT NULL
    UNION ALL
    SELECT (entry->>'path')
    FROM public.portfolio_projects p,
         LATERAL jsonb_array_elements(COALESCE(p.gallery, '[]'::jsonb)) AS entry
    WHERE COALESCE(entry->>'path','') <> ''
    UNION ALL
    SELECT trim(both '"' from v::text)
    FROM public.landing_pages lp,
         LATERAL jsonb_path_query(COALESCE(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') AS v
    WHERE trim(both '"' from v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
),
normalized_refs AS (
    SELECT DISTINCT
      regexp_replace(
        regexp_replace(
          regexp_replace(COALESCE(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''),
          '^/storage/v1/object/public/', ''
        ),
        '^/', ''
      ) AS normalized
    FROM raw_refs
    WHERE COALESCE(raw_ref, '') <> ''
),
referenced_paths AS (
    SELECT split_part(normalized, '/', 1) AS bucket_id,
           substring(normalized FROM length(split_part(normalized, '/', 1)) + 2) AS name
    FROM normalized_refs
    WHERE split_part(normalized, '/', 1) IN ('site-assets', 'portfolio-media')
      AND strpos(normalized, '/') > 0
),
doomed AS (
    SELECT o.id, o.bucket_id, o.name, COALESCE((o.metadata->>'size')::bigint,0) AS size_bytes
    FROM storage.objects o
    LEFT JOIN referenced_paths r
      ON r.bucket_id = o.bucket_id AND r.name = o.name
    WHERE o.bucket_id IN ('site-assets','portfolio-media')
      AND r.name IS NULL
      AND o.created_at < now() - interval '14 days'
)
SELECT bucket_id, name, id, size_bytes FROM doomed;
$_$;


ALTER FUNCTION "public"."list_orphaned_storage_objects"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."notify_table_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$
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
$$;


ALTER FUNCTION "public"."notify_table_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."run_clear_cached_egress_wrapper"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'pg_catalog', 'public'
    AS $$
BEGIN
  -- Example: schema-qualify all references
  PERFORM public.run_clear_cached_egress(); -- if it calls another function
END;
$$;


ALTER FUNCTION "public"."run_clear_cached_egress_wrapper"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'pg_catalog', 'public'
    AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."slugify"("value" "text") RETURNS "text"
    LANGUAGE "plpgsql" IMMUTABLE
    SET "search_path" TO 'pg_catalog'
    AS $$
BEGIN
  RETURN lower(regexp_replace(
    translate(value, 
              'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ',
              'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'),
    '[^a-zA-Z0-9]+', '-', 'g'
  ));
END;
$$;


ALTER FUNCTION "public"."slugify"("value" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE FOREIGN DATA WRAPPER "firebase" HANDLER "extensions"."firebase_fdw_handler" VALIDATOR "extensions"."firebase_fdw_validator";




CREATE FOREIGN DATA WRAPPER "portfolio_assets_fdw" HANDLER "extensions"."iceberg_fdw_handler" VALIDATOR "extensions"."iceberg_fdw_validator";




CREATE SERVER "firebase_server" FOREIGN DATA WRAPPER "firebase" OPTIONS (
    "project_id" 'portfolio-danilo-novais',
    "sa_key_id" '3a66323e-8f14-4fcf-9cd3-b94aa40f4178'
);


ALTER SERVER "firebase_server" OWNER TO "postgres";


CREATE SERVER "portfolio_assets_fdw_server" FOREIGN DATA WRAPPER "portfolio_assets_fdw" OPTIONS (
    "catalog_uri" 'https://umkmwbkwvulxtdodzmzf.storage.supabase.co/storage/v1/iceberg',
    "s3.endpoint" 'https://umkmwbkwvulxtdodzmzf.storage.supabase.co/storage/v1/s3',
    "vault_aws_access_key_id" 'ebd157c7-ae69-412d-9c99-d72d9c74f671',
    "vault_aws_secret_access_key" '01b1e65c-de05-4829-8042-0b219fcdeb4d',
    "vault_token" '7e3ab267-2001-4597-815d-b2a242aea863',
    "warehouse" 'portfolio-assets'
);


ALTER SERVER "portfolio_assets_fdw_server" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admin_tokens" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "description" "text",
    "secret" "text" NOT NULL,
    "status" "text" DEFAULT 'active'::"text" NOT NULL,
    "environment" "text" DEFAULT 'production'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid",
    "updated_by" "uuid",
    CONSTRAINT "admin_tokens_environment_check" CHECK (("environment" = ANY (ARRAY['development'::"text", 'staging'::"text", 'production'::"text"]))),
    CONSTRAINT "admin_tokens_status_check" CHECK (("status" = ANY (ARRAY['active'::"text", 'inactive'::"text"])))
);


ALTER TABLE "public"."admin_tokens" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_users" (
    "user_id" "uuid" NOT NULL,
    "role" "text" DEFAULT 'editor'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "admin_users_role_check" CHECK (("role" = ANY (ARRAY['owner'::"text", 'editor'::"text", 'viewer'::"text"])))
);


ALTER TABLE "public"."admin_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."audit_log" (
    "id" bigint NOT NULL,
    "actor_user_id" "uuid",
    "action" "text" NOT NULL,
    "entity" "text" NOT NULL,
    "entity_id" "uuid",
    "details" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."audit_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."audit_log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."audit_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."audit_log_id_seq" OWNED BY "public"."audit_log"."id";



CREATE TABLE IF NOT EXISTS "public"."client_errors" (
    "id" bigint NOT NULL,
    "error_data" "jsonb" NOT NULL,
    "captured_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "severity" character varying(50) DEFAULT 'high'::character varying NOT NULL,
    "source" character varying(50) DEFAULT 'browser'::character varying NOT NULL
);


ALTER TABLE "public"."client_errors" OWNER TO "postgres";


COMMENT ON TABLE "public"."client_errors" IS 'Tabela de auditoria para capturar e centralizar falhas no client-side (Sentinel Prime).';



CREATE SEQUENCE IF NOT EXISTS "public"."client_errors_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."client_errors_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."client_errors_id_seq" OWNED BY "public"."client_errors"."id";



CREATE TABLE IF NOT EXISTS "public"."content_version" (
    "id" boolean DEFAULT true NOT NULL,
    "version" bigint DEFAULT 1 NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."content_version" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."experiences" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "company" "text" NOT NULL,
    "role" "text" NOT NULL,
    "start_date" "date",
    "end_date" "date",
    "description" "text",
    "content" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    "visibility" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "experiences_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'published'::"text", 'archived'::"text"])))
);


ALTER TABLE "public"."experiences" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."landing_pages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "cover" "text",
    "content" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."landing_pages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."portfolio_project_tags" (
    "project_id" "uuid" NOT NULL,
    "tag_id" "uuid" NOT NULL
);


ALTER TABLE "public"."portfolio_project_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."portfolio_projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "client_name" "text" NOT NULL,
    "brand_name" "text",
    "year" integer,
    "project_type" "text" NOT NULL,
    "short_label" "text",
    "description" "text",
    "thumbnail_path" "text",
    "hero_image_path" "text",
    "gallery" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "featured_on_home" boolean DEFAULT false NOT NULL,
    "featured_on_portfolio" boolean DEFAULT false NOT NULL,
    "featured_home_order" integer,
    "featured_portfolio_order" integer,
    "is_published" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "landing_page_id" "uuid",
    "url_landscape" "text",
    "url_square" "text",
    "client_slug" "text" NOT NULL,
    "destination" "jsonb" DEFAULT '{}'::"jsonb",
    "case_body" "text",
    "home_featured" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."portfolio_projects" OWNER TO "postgres";


COMMENT ON TABLE "public"."portfolio_projects" IS 'Table for portfolio projects. Schema fixed on 2026-02-24 to include missing columns and reload cache.';



COMMENT ON COLUMN "public"."portfolio_projects"."landing_page_id" IS 'ID da landing page dinâmica associada ao projeto.';



COMMENT ON COLUMN "public"."portfolio_projects"."url_landscape" IS 'Storage path or absolute URL for 16:9 cover variant.';



COMMENT ON COLUMN "public"."portfolio_projects"."url_square" IS 'Storage path or absolute URL for 1:1 cover variant.';



COMMENT ON COLUMN "public"."portfolio_projects"."home_featured" IS 'JSON config for HOME featured cards (layout style + optional inverted logo path). Background selection stays dynamic on the client.';



CREATE TABLE IF NOT EXISTS "public"."portfolio_tags" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "label" "text" NOT NULL,
    "kind" "text" DEFAULT 'category'::"text" NOT NULL,
    "description" "text",
    "sort_order" integer,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."portfolio_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_config" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "project_name" "text" NOT NULL,
    "project_description" "text",
    "project_domain" "text",
    "api_keys" "jsonb" DEFAULT '{}'::"jsonb",
    "public_env_vars" "jsonb" DEFAULT '{}'::"jsonb",
    "storage_buckets" "jsonb" DEFAULT '[]'::"jsonb",
    "storage_permissions" "jsonb" DEFAULT '{}'::"jsonb",
    "auth_providers" "jsonb" DEFAULT '[]'::"jsonb",
    "jwt_expiry" integer DEFAULT 3600,
    "is_active" boolean DEFAULT true,
    "environment" "text",
    "last_accessed" timestamp with time zone,
    "accessed_by" "uuid",
    "created_by" "uuid" DEFAULT "auth"."uid"(),
    CONSTRAINT "project_config_environment_check" CHECK (("environment" = ANY (ARRAY['development'::"text", 'staging'::"text", 'production'::"text"])))
);


ALTER TABLE "public"."project_config" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "summary" "text",
    "content" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "cover_asset_id" "uuid",
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    "visibility" boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "featured" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "projects_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'published'::"text", 'archived'::"text"])))
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_assets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "key" "text" NOT NULL,
    "bucket" "text" NOT NULL,
    "file_path" "text" NOT NULL,
    "asset_type" "text" NOT NULL,
    "page" "text",
    "description" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "sort_order" integer,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb"
);


ALTER TABLE "public"."site_assets" OWNER TO "postgres";


COMMENT ON COLUMN "public"."site_assets"."metadata" IS 'JSON metadata for the asset (width, height, format, etc).';



CREATE OR REPLACE VIEW "public"."public_assets_view" WITH ("security_invoker"='true') AS
 SELECT "id",
    "key",
    "bucket",
    "file_path",
    "asset_type",
    "page",
    "description",
    "metadata",
    "is_active",
    "sort_order",
    "created_at",
    "updated_at"
   FROM "public"."site_assets"
  WHERE ("is_active" = true);


ALTER VIEW "public"."public_assets_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."public_projects_view" WITH ("security_invoker"='true') AS
 SELECT "p"."id",
    "p"."slug",
    "p"."title",
    "p"."client_name",
    "p"."brand_name",
    "p"."client_slug",
    "p"."year",
    "p"."project_type",
    "p"."short_label",
    "p"."description",
    "p"."thumbnail_path",
    "p"."hero_image_path",
    "p"."url_landscape",
    "p"."url_square",
    "p"."gallery",
    "p"."featured_on_home",
    "p"."featured_on_portfolio",
    "p"."featured_home_order",
    "p"."featured_portfolio_order",
    "p"."home_featured",
    "p"."is_published",
    "p"."created_at",
    "p"."updated_at",
    "p"."landing_page_id",
    "lp"."slug" AS "landing_page_slug",
    "p"."destination",
    "p"."case_body"
   FROM ("public"."portfolio_projects" "p"
     LEFT JOIN "public"."landing_pages" "lp" ON (("lp"."id" = "p"."landing_page_id")))
  WHERE ("p"."is_published" = true);


ALTER VIEW "public"."public_projects_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."public_tags_view" WITH ("security_invoker"='true') AS
 SELECT "id",
    "slug",
    "label",
    "kind",
    "description",
    "sort_order"
   FROM "public"."portfolio_tags";


ALTER VIEW "public"."public_tags_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_settings" (
    "key" "text" NOT NULL,
    "value" "jsonb" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."site_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."storage_access_logs" (
    "id" bigint NOT NULL,
    "ts" timestamp with time zone NOT NULL,
    "bucket_id" "text",
    "path" "text" NOT NULL,
    "bytes" bigint DEFAULT 0,
    "method" "text",
    "status" smallint,
    "ip" "inet",
    "user_agent" "text",
    "referer" "text",
    "host" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."storage_access_logs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."storage_access_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."storage_access_logs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."storage_access_logs_id_seq" OWNED BY "public"."storage_access_logs"."id";



ALTER TABLE ONLY "public"."audit_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."audit_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."client_errors" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."client_errors_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."storage_access_logs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."storage_access_logs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."admin_tokens"
    ADD CONSTRAINT "admin_tokens_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("user_id", "role", "created_at");



ALTER TABLE ONLY "public"."audit_log"
    ADD CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."client_errors"
    ADD CONSTRAINT "client_errors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."content_version"
    ADD CONSTRAINT "content_version_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."experiences"
    ADD CONSTRAINT "experiences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."landing_pages"
    ADD CONSTRAINT "landing_pages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."landing_pages"
    ADD CONSTRAINT "landing_pages_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."portfolio_project_tags"
    ADD CONSTRAINT "portfolio_project_tags_pkey" PRIMARY KEY ("project_id", "tag_id");



ALTER TABLE ONLY "public"."portfolio_projects"
    ADD CONSTRAINT "portfolio_projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."portfolio_projects"
    ADD CONSTRAINT "portfolio_projects_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."portfolio_tags"
    ADD CONSTRAINT "portfolio_tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."portfolio_tags"
    ADD CONSTRAINT "portfolio_tags_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."project_config"
    ADD CONSTRAINT "project_config_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_config"
    ADD CONSTRAINT "project_config_project_name_key" UNIQUE ("project_name");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."site_assets"
    ADD CONSTRAINT "site_assets_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."site_assets"
    ADD CONSTRAINT "site_assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."site_settings"
    ADD CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."storage_access_logs"
    ADD CONSTRAINT "storage_access_logs_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "admin_tokens_provider_environment_name_key" ON "public"."admin_tokens" USING "btree" ("lower"("provider"), "lower"("environment"), "lower"("name"));



CREATE INDEX "admin_tokens_provider_status_idx" ON "public"."admin_tokens" USING "btree" ("lower"("provider"), "status", "environment");



CREATE INDEX "audit_log_created_at_idx" ON "public"."audit_log" USING "btree" ("created_at");



CREATE INDEX "experiences_order_idx" ON "public"."experiences" USING "btree" ("order");



CREATE INDEX "experiences_status_idx" ON "public"."experiences" USING "btree" ("status");



CREATE INDEX "idx_portfolio_projects_featured_home" ON "public"."portfolio_projects" USING "btree" ("featured_home_order") WHERE "featured_on_home";



CREATE INDEX "idx_portfolio_projects_featured_portfolio" ON "public"."portfolio_projects" USING "btree" ("featured_portfolio_order") WHERE "featured_on_portfolio";



CREATE INDEX "idx_portfolio_projects_is_published" ON "public"."portfolio_projects" USING "btree" ("is_published");



CREATE INDEX "idx_portfolio_projects_project_type" ON "public"."portfolio_projects" USING "btree" ("project_type");



CREATE INDEX "idx_portfolio_tags_sort" ON "public"."portfolio_tags" USING "btree" ("sort_order");



CREATE INDEX "idx_project_config_active" ON "public"."project_config" USING "btree" ("is_active");



CREATE INDEX "idx_project_config_env" ON "public"."project_config" USING "btree" ("environment");



CREATE INDEX "idx_project_config_name" ON "public"."project_config" USING "btree" ("project_name");



CREATE INDEX "idx_site_assets_page" ON "public"."site_assets" USING "btree" ("page", "is_active", "sort_order");



CREATE INDEX "idx_storage_access_logs_bucket" ON "public"."storage_access_logs" USING "btree" ("bucket_id");



CREATE INDEX "idx_storage_access_logs_ip" ON "public"."storage_access_logs" USING "btree" ("ip");



CREATE INDEX "idx_storage_access_logs_path" ON "public"."storage_access_logs" USING "btree" ("path");



CREATE INDEX "idx_storage_access_logs_referer" ON "public"."storage_access_logs" USING "btree" ("referer");



CREATE INDEX "idx_storage_access_logs_ts" ON "public"."storage_access_logs" USING "btree" ("ts");



CREATE INDEX "portfolio_projects_featured_home_order_idx" ON "public"."portfolio_projects" USING "btree" ("featured_home_order");



CREATE INDEX "portfolio_projects_updated_at_idx" ON "public"."portfolio_projects" USING "btree" ("updated_at");



CREATE INDEX "projects_order_idx" ON "public"."projects" USING "btree" ("order");



CREATE INDEX "projects_status_idx" ON "public"."projects" USING "btree" ("status");



CREATE INDEX "site_assets_page_idx" ON "public"."site_assets" USING "btree" ("page");



CREATE OR REPLACE TRIGGER "bump_experiences" AFTER INSERT OR DELETE OR UPDATE ON "public"."experiences" FOR EACH STATEMENT EXECUTE FUNCTION "public"."bump_on_publish_impact"();



CREATE OR REPLACE TRIGGER "bump_projects" AFTER INSERT OR DELETE OR UPDATE ON "public"."projects" FOR EACH STATEMENT EXECUTE FUNCTION "public"."bump_on_publish_impact"();



CREATE OR REPLACE TRIGGER "bump_site_settings" AFTER INSERT OR DELETE OR UPDATE ON "public"."site_settings" FOR EACH STATEMENT EXECUTE FUNCTION "public"."bump_on_publish_impact"();



CREATE OR REPLACE TRIGGER "set_admin_tokens_updated_at" BEFORE UPDATE ON "public"."admin_tokens" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_experiences_updated_at" BEFORE UPDATE ON "public"."experiences" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_projects_updated_at" BEFORE UPDATE ON "public"."projects" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_broadcast_portfolio_projects" AFTER INSERT OR DELETE OR UPDATE ON "public"."portfolio_projects" FOR EACH ROW EXECUTE FUNCTION "public"."notify_table_changes"();



CREATE OR REPLACE TRIGGER "trg_broadcast_project_tags" AFTER INSERT OR DELETE OR UPDATE ON "public"."portfolio_project_tags" FOR EACH ROW EXECUTE FUNCTION "public"."notify_table_changes"();



CREATE OR REPLACE TRIGGER "trg_broadcast_site_assets" AFTER INSERT OR DELETE OR UPDATE ON "public"."site_assets" FOR EACH ROW EXECUTE FUNCTION "public"."notify_table_changes"();



CREATE OR REPLACE TRIGGER "trg_set_timestamp_portfolio_projects" BEFORE UPDATE ON "public"."portfolio_projects" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_set_timestamp_portfolio_tags" BEFORE UPDATE ON "public"."portfolio_tags" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_set_timestamp_site_assets" BEFORE UPDATE ON "public"."site_assets" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "update_project_config_updated_at" BEFORE UPDATE ON "public"."project_config" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."admin_tokens"
    ADD CONSTRAINT "admin_tokens_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."admin_tokens"
    ADD CONSTRAINT "admin_tokens_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."audit_log"
    ADD CONSTRAINT "audit_log_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."portfolio_project_tags"
    ADD CONSTRAINT "portfolio_project_tags_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."portfolio_projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_project_tags"
    ADD CONSTRAINT "portfolio_project_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."portfolio_tags"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_projects"
    ADD CONSTRAINT "portfolio_projects_landing_page_id_fkey" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."project_config"
    ADD CONSTRAINT "project_config_accessed_by_fkey" FOREIGN KEY ("accessed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."project_config"
    ADD CONSTRAINT "project_config_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



CREATE POLICY "Admin manage admin_tokens" ON "public"."admin_tokens" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text")))));



CREATE POLICY "Allow anonymous insert for errors" ON "public"."client_errors" FOR INSERT TO "authenticated", "anon" WITH CHECK (((("source")::"text" = 'browser'::"text") AND ("jsonb_typeof"("error_data") = 'object'::"text") AND ("char_length"((COALESCE("severity", ''::character varying))::"text") > 0)));



CREATE POLICY "Allow public read access" ON "public"."landing_pages" FOR SELECT USING (true);



CREATE POLICY "Auth delete project tags" ON "public"."portfolio_project_tags" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth delete projects" ON "public"."portfolio_projects" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth delete tags" ON "public"."portfolio_tags" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth manage project tags" ON "public"."portfolio_project_tags" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth manage projects" ON "public"."portfolio_projects" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth manage tags" ON "public"."portfolio_tags" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth update project tags" ON "public"."portfolio_project_tags" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text")) WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth update projects" ON "public"."portfolio_projects" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text")) WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Auth update tags" ON "public"."portfolio_tags" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text")) WITH CHECK ((( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"));



CREATE POLICY "Authenticated can manage assets delete" ON "public"."site_assets" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Authenticated can manage assets insert" ON "public"."site_assets" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Authenticated can manage assets update" ON "public"."site_assets" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL)) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Enable read access for all users" ON "public"."admin_users" FOR SELECT USING (true);



CREATE POLICY "Project config insert" ON "public"."project_config" FOR INSERT TO "authenticated" WITH CHECK (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text"))))));



CREATE POLICY "Project config select" ON "public"."project_config" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text"))))));



CREATE POLICY "Project config update" ON "public"."project_config" FOR UPDATE TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text")))))) WITH CHECK (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR (EXISTS ( SELECT 1
   FROM "auth"."users" "u"
  WHERE (("u"."id" = ( SELECT "auth"."uid"() AS "uid")) AND (("u"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text"))))));



CREATE POLICY "Public read active assets" ON "public"."site_assets" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public read tags" ON "public"."portfolio_tags" FOR SELECT USING (true);



CREATE POLICY "Read project tags" ON "public"."portfolio_project_tags" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."portfolio_projects" "p"
  WHERE (("p"."id" = "portfolio_project_tags"."project_id") AND (("p"."is_published" = true) OR (( SELECT "auth"."role"() AS "role") = 'authenticated'::"text"))))));



CREATE POLICY "Read projects" ON "public"."portfolio_projects" FOR SELECT USING ((("is_published" = true) OR (( SELECT "auth"."role"() AS "role") = 'authenticated'::"text")));



ALTER TABLE "public"."admin_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."audit_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."client_errors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."content_version" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."experiences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."landing_pages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_project_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_config" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_assets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."storage_access_logs" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."admin_tokens";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."admin_users";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."audit_log";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."client_errors";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."content_version";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."experiences";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."landing_pages";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."portfolio_project_tags";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."portfolio_projects";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."portfolio_tags";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."project_config";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."projects";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."site_assets";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."site_settings";



GRANT USAGE ON SCHEMA "api" TO "anon";
GRANT USAGE ON SCHEMA "api" TO "authenticated";









REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";














































































































































































































































































































































































REVOKE ALL ON FUNCTION "public"."bump_content_version"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."bump_content_version"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."bump_on_publish_impact"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."bump_on_publish_impact"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."cleanup_old_data"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."cleanup_old_data"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."clear_cached_egress"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."clear_cached_egress"() TO "service_role";
GRANT ALL ON FUNCTION "public"."clear_cached_egress"() TO "supabase_admin";
GRANT ALL ON FUNCTION "public"."clear_cached_egress"() TO "supabase_read_only_user";



REVOKE ALL ON FUNCTION "public"."get_orphaned_storage_objects"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_orphaned_storage_objects"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_admin"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."list_orphaned_storage_objects"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."list_orphaned_storage_objects"() TO "anon";
GRANT ALL ON FUNCTION "public"."list_orphaned_storage_objects"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."list_orphaned_storage_objects"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."notify_table_changes"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."notify_table_changes"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."rls_auto_enable"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."run_clear_cached_egress_wrapper"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."run_clear_cached_egress_wrapper"() TO "anon";
GRANT ALL ON FUNCTION "public"."run_clear_cached_egress_wrapper"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."run_clear_cached_egress_wrapper"() TO "service_role";
GRANT ALL ON FUNCTION "public"."run_clear_cached_egress_wrapper"() TO "supabase_read_only_user";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."slugify"("value" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."slugify"("value" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."slugify"("value" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."slugify"("value" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."update_updated_at_column"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";

































GRANT ALL ON TABLE "public"."admin_tokens" TO "anon";
GRANT ALL ON TABLE "public"."admin_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_tokens" TO "service_role";



GRANT ALL ON TABLE "public"."admin_users" TO "anon";
GRANT ALL ON TABLE "public"."admin_users" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_users" TO "service_role";



GRANT ALL ON TABLE "public"."audit_log" TO "anon";
GRANT ALL ON TABLE "public"."audit_log" TO "authenticated";
GRANT ALL ON TABLE "public"."audit_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."audit_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."audit_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."audit_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."client_errors" TO "anon";
GRANT ALL ON TABLE "public"."client_errors" TO "authenticated";
GRANT ALL ON TABLE "public"."client_errors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."client_errors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."client_errors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."client_errors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."content_version" TO "anon";
GRANT ALL ON TABLE "public"."content_version" TO "authenticated";
GRANT ALL ON TABLE "public"."content_version" TO "service_role";



GRANT ALL ON TABLE "public"."experiences" TO "anon";
GRANT ALL ON TABLE "public"."experiences" TO "authenticated";
GRANT ALL ON TABLE "public"."experiences" TO "service_role";



GRANT ALL ON TABLE "public"."landing_pages" TO "anon";
GRANT ALL ON TABLE "public"."landing_pages" TO "authenticated";
GRANT ALL ON TABLE "public"."landing_pages" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_projects" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_projects" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_tags" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_tags" TO "service_role";



GRANT ALL ON TABLE "public"."project_config" TO "anon";
GRANT ALL ON TABLE "public"."project_config" TO "authenticated";
GRANT ALL ON TABLE "public"."project_config" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON TABLE "public"."site_assets" TO "anon";
GRANT ALL ON TABLE "public"."site_assets" TO "authenticated";
GRANT ALL ON TABLE "public"."site_assets" TO "service_role";



GRANT ALL ON TABLE "public"."public_assets_view" TO "anon";
GRANT ALL ON TABLE "public"."public_assets_view" TO "authenticated";
GRANT ALL ON TABLE "public"."public_assets_view" TO "service_role";



GRANT ALL ON TABLE "public"."public_projects_view" TO "anon";
GRANT ALL ON TABLE "public"."public_projects_view" TO "authenticated";
GRANT ALL ON TABLE "public"."public_projects_view" TO "service_role";



GRANT ALL ON TABLE "public"."public_tags_view" TO "anon";
GRANT ALL ON TABLE "public"."public_tags_view" TO "authenticated";
GRANT ALL ON TABLE "public"."public_tags_view" TO "service_role";



GRANT ALL ON TABLE "public"."site_settings" TO "anon";
GRANT ALL ON TABLE "public"."site_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."site_settings" TO "service_role";



GRANT ALL ON TABLE "public"."storage_access_logs" TO "anon";
GRANT ALL ON TABLE "public"."storage_access_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."storage_access_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."storage_access_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."storage_access_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."storage_access_logs_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";



































