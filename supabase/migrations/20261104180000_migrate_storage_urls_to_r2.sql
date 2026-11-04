-- ====================================================================
-- Ghost System Migration: Storage URL Migration to Cloudflare R2
-- Reference: umkmwbkwvulxtdodzmzf (portfolio-danilo)
-- Bucket Origem: site-assets / portfolio-media
-- Bucket Destino: portfolio-assets (Cloudflare R2 CDN)
-- ====================================================================

BEGIN;

DO $$
DECLARE
    v_supabase_base TEXT := 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/';
    v_r2_base TEXT := 'https://assets.portfoliodanilo.com/';
    v_projects_updated INT := 0;
    v_landing_updated INT := 0;
BEGIN
    -- 1. Atualizar campos diretos na tabela portfolio_projects
    UPDATE public.portfolio_projects
    SET 
        thumbnail_path = replace(thumbnail_path, v_supabase_base, v_r2_base),
        hero_image_path = replace(hero_image_path, v_supabase_base, v_r2_base),
        url_landscape = replace(url_landscape, v_supabase_base, v_r2_base),
        url_square = replace(url_square, v_supabase_base, v_r2_base)
    WHERE 
        thumbnail_path LIKE v_supabase_base || '%'
        OR hero_image_path LIKE v_supabase_base || '%'
        OR url_landscape LIKE v_supabase_base || '%'
        OR url_square LIKE v_supabase_base || '%';
    
    GET DIAGNOSTICS v_projects_updated = ROW_COUNT;

    -- 2. Atualizar galeria JSONB em portfolio_projects
    UPDATE public.portfolio_projects
    SET gallery = (
        SELECT jsonb_agg(
            CASE 
                WHEN item->>'path' LIKE v_supabase_base || '%' THEN
                    jsonb_set(item, '{path}', to_jsonb(replace(item->>'path', v_supabase_base, v_r2_base)))
                ELSE item
            END
        )
        FROM jsonb_array_elements(gallery) AS item
    )
    WHERE gallery::text LIKE '%' || v_supabase_base || '%';

    -- 3. Atualizar landing_pages (JSONB content recursivo)
    UPDATE public.landing_pages
    SET content = replace(content::text, v_supabase_base, v_r2_base)::jsonb
    WHERE content::text LIKE '%' || v_supabase_base || '%';

    GET DIAGNOSTICS v_landing_updated = ROW_COUNT;

    RAISE NOTICE 'Ghost R2 Migration: % projects and % landing pages updated to R2 URLs.', 
        v_projects_updated, v_landing_updated;
END $$;

COMMIT;

