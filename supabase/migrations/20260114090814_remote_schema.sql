


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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






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


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'pg_temp'
    AS $$BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


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
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."portfolio_projects" OWNER TO "postgres";


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
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."site_assets" OWNER TO "postgres";


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



ALTER TABLE ONLY "public"."site_assets"
    ADD CONSTRAINT "site_assets_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."site_assets"
    ADD CONSTRAINT "site_assets_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_portfolio_projects_featured_home" ON "public"."portfolio_projects" USING "btree" ("featured_home_order") WHERE "featured_on_home";



CREATE INDEX "idx_portfolio_projects_featured_portfolio" ON "public"."portfolio_projects" USING "btree" ("featured_portfolio_order") WHERE "featured_on_portfolio";



CREATE INDEX "idx_portfolio_projects_is_published" ON "public"."portfolio_projects" USING "btree" ("is_published");



CREATE INDEX "idx_portfolio_projects_project_type" ON "public"."portfolio_projects" USING "btree" ("project_type");



CREATE INDEX "idx_portfolio_tags_sort" ON "public"."portfolio_tags" USING "btree" ("sort_order");



CREATE INDEX "idx_site_assets_page" ON "public"."site_assets" USING "btree" ("page", "is_active", "sort_order");



CREATE OR REPLACE TRIGGER "trg_set_timestamp_portfolio_projects" BEFORE UPDATE ON "public"."portfolio_projects" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_set_timestamp_portfolio_tags" BEFORE UPDATE ON "public"."portfolio_tags" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_set_timestamp_site_assets" BEFORE UPDATE ON "public"."site_assets" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



ALTER TABLE ONLY "public"."portfolio_project_tags"
    ADD CONSTRAINT "portfolio_project_tags_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."portfolio_projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_project_tags"
    ADD CONSTRAINT "portfolio_project_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."portfolio_tags"("id") ON DELETE CASCADE;



CREATE POLICY "Auth manage assets" ON "public"."site_assets" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Auth manage project tags" ON "public"."portfolio_project_tags" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Auth manage projects" ON "public"."portfolio_projects" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Auth manage tags" ON "public"."portfolio_tags" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Authenticated can manage assets delete" ON "public"."site_assets" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Authenticated can manage assets insert" ON "public"."site_assets" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Authenticated can manage assets update" ON "public"."site_assets" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL)) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IS NOT NULL));



CREATE POLICY "Public can read active assets" ON "public"."site_assets" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public read active assets" ON "public"."site_assets" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public read published project tags" ON "public"."portfolio_project_tags" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."portfolio_projects" "p"
  WHERE (("p"."id" = "portfolio_project_tags"."project_id") AND ("p"."is_published" = true)))));



CREATE POLICY "Public read published projects" ON "public"."portfolio_projects" FOR SELECT USING (("is_published" = true));



CREATE POLICY "Public read tags" ON "public"."portfolio_tags" FOR SELECT USING (true);



ALTER TABLE "public"."portfolio_project_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_assets" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "anon";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_project_tags" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_projects" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_projects" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_tags" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_tags" TO "service_role";



GRANT ALL ON TABLE "public"."site_assets" TO "anon";
GRANT ALL ON TABLE "public"."site_assets" TO "authenticated";
GRANT ALL ON TABLE "public"."site_assets" TO "service_role";









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



































drop extension if exists "pg_net";


  create policy "Auth delete portfolio-media/site-assets"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = ANY (ARRAY['portfolio-media'::text, 'site-assets'::text])) AND (( SELECT auth.uid() AS uid) IS NOT NULL)));



  create policy "Auth update portfolio-media/site-assets"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = ANY (ARRAY['portfolio-media'::text, 'site-assets'::text])) AND (( SELECT auth.uid() AS uid) IS NOT NULL)))
with check (((bucket_id = ANY (ARRAY['portfolio-media'::text, 'site-assets'::text])) AND (( SELECT auth.uid() AS uid) IS NOT NULL)));



  create policy "Auth upload portfolio-media/site-assets"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = ANY (ARRAY['portfolio-media'::text, 'site-assets'::text])) AND (( SELECT auth.uid() AS uid) IS NOT NULL)));



  create policy "Public read portfolio-media/site-assets"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = ANY (ARRAY['portfolio-media'::text, 'site-assets'::text])));



