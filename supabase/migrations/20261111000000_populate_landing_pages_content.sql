-- ====================================================================
-- Ghost System Migration: Populate Landing Pages Content
-- Populates landing_pages.content from portfolio_projects data
-- using MasterProjectTemplateV3 defaults
-- ====================================================================

BEGIN;

-- First, let's see what we have
DO $$
DECLARE
    v_project_count INT;
    v_lp_count INT;
    v_empty_count INT;
BEGIN
    SELECT COUNT(*) INTO v_project_count FROM public.portfolio_projects WHERE landing_page_id IS NOT NULL;
    SELECT COUNT(*) INTO v_lp_count FROM public.landing_pages;
    SELECT COUNT(*) INTO v_empty_count FROM public.landing_pages 
        WHERE content IS NULL OR content = '[]' OR content = '{}' OR jsonb_typeof(content) != 'object';
    RAISE NOTICE 'Projects with landing_page_id: %', v_project_count;
    RAISE NOTICE 'Total landing_pages: %', v_lp_count;
    RAISE NOTICE 'Empty landing_pages: %', v_empty_count;
END $$;

-- Update landing_pages content from portfolio_projects
-- Using a CTE to aggregate tags from portfolio_project_tags
WITH project_tags AS (
    SELECT 
        ppt.project_id,
        jsonb_agg(to_jsonb(t)) AS tags_json
    FROM public.portfolio_project_tags ppt
    JOIN public.portfolio_tags t ON t.id = ppt.tag_id
    GROUP BY ppt.project_id
)
UPDATE public.landing_pages lp
SET content = jsonb_build_object(
    'schema_version', '3.0',
    'template', 'master-project-v3',
    'project_slug', p.slug,
    'hero_cover_image', jsonb_build_object(
        'src', COALESCE(lp.cover, p.hero_image_path, p.thumbnail_path, ''),
        'alt', 'Capa de ' || p.title,
        'kind', 'image'
    ),
    'hero_logo_image', jsonb_build_object(
        'src', '',
        'alt', 'Logo de ' || p.title,
        'kind', 'image'
    ),
    'client_logo_image', jsonb_build_object(
        'src', '',
        'alt', 'Logo de ' || p.title,
        'kind', 'image'
    ),
    'hero_media_type', 'none',
    'hero_top_media', jsonb_build_object(
        'src', '',
        'alt', 'Hero media de ' || p.title,
        'kind', 'image',
        'html', ''
    ),
    'project_title', p.title,
    'project_subtitle', COALESCE(p.short_label, p.client_name, ''),
    'project_client', p.client_name,
    'project_year', p.year,
    'project_tags', COALESCE(pt.tags_json, '[]'::jsonb),
    'project_services', '[]'::jsonb,
    'project_summary', COALESCE(p.description, p.short_label, ''),
    'intro_headline', '',
    'intro_body', '[]'::jsonb,
    'highlight_color', '#0048ff',
    'theme_color', '#0048ff'
)
FROM public.portfolio_projects p
LEFT JOIN project_tags pt ON pt.project_id = p.id
WHERE lp.id = p.landing_page_id
  AND (lp.content IS NULL OR lp.content = '[]' OR lp.content = '{}' OR jsonb_typeof(lp.content) != 'object');

-- Verify results
DO $$
DECLARE
    v_updated INT;
    v_still_empty INT;
BEGIN
    GET DIAGNOSTICS v_updated = ROW_COUNT;
    SELECT COUNT(*) INTO v_still_empty FROM public.landing_pages 
        WHERE content IS NULL OR content = '[]' OR content = '{}' OR jsonb_typeof(content) != 'object';
    RAISE NOTICE 'Landing pages updated: %', v_updated;
    RAISE NOTICE 'Still empty: %', v_still_empty;
END $$;

COMMIT;
