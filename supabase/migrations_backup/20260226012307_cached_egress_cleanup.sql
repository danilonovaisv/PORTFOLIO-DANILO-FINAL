-- =============================================================
-- AUTOMATED CACHED EGRESS CLEANUP
-- =============================================================
-- 1) Create the PostgreSQL function to encapsulate cleanup logic
CREATE OR REPLACE FUNCTION public.clear_cached_egress() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER AS $$
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
$$;
-- 2) Enable pg_cron (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
-- 3) Schedule the weekly cleanup job (Sunday at midnight)
DO $$ BEGIN -- Unschedule if it exists to avoid duplications during migrations
PERFORM cron.unschedule('cleanup-cached-egress-job');
EXCEPTION
WHEN OTHERS THEN -- Ignore error if unschedule fails
END $$;
SELECT cron.schedule(
        'cleanup-cached-egress-job',
        '0 0 * * 0',
        'SELECT public.clear_cached_egress();'
    );