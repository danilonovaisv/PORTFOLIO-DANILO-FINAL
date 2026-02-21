-- =============================================================
-- ADMIN CLAIM + CACHED EGRESS CLEANUP (MANUAL MAINTENANCE)
-- Date: 2026-02-20
-- =============================================================
-- Objetivo:
-- 1) Corrigir erro de RLS no Admin para upload/salvamento (claims de admin).
-- 2) Limpar objetos órfãos em Storage para reduzir egress futuro.
--
-- IMPORTANTE:
-- - "Cached Egress Exceeded" é métrica de billing/CDN e não zera via SQL.
-- - Este script reduz consumo futuro removendo assets não referenciados.
-- - Execute em janela de manutenção.

-- =============================================================
-- PARTE A — GARANTIR CLAIM DE ADMIN NO AUTH
-- =============================================================
-- Ajuste os e-mails abaixo conforme necessário.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('role', 'admin')
where lower(email) in (
  lower('danilo_novais@yahoo.com.br')
);

-- Verificação rápida:
select
  id,
  email,
  raw_app_meta_data ->> 'role' as app_role
from auth.users
where lower(email) in (lower('danilo_novais@yahoo.com.br'));

-- Observação: após setar claim, faça logout/login para renovar o JWT no browser.


-- =============================================================
-- PARTE B — DRY RUN DE OBJETOS ÓRFÃOS (SEM DELETAR)
-- =============================================================
with raw_refs as (
  -- site_assets table
  select
    concat(coalesce(bucket, ''), '/', coalesce(file_path, '')) as raw_ref
  from public.site_assets
  where coalesce(bucket, '') <> ''
    and coalesce(file_path, '') <> ''

  union all

  -- portfolio_projects direct fields
  select thumbnail_path from public.portfolio_projects where thumbnail_path is not null
  union all
  select hero_image_path from public.portfolio_projects where hero_image_path is not null
  union all
  select url_landscape from public.portfolio_projects where url_landscape is not null
  union all
  select url_square from public.portfolio_projects where url_square is not null

  union all

  -- portfolio_projects gallery json
  select (entry ->> 'path')
  from public.portfolio_projects p,
       lateral jsonb_array_elements(coalesce(p.gallery, '[]'::jsonb)) as entry
  where coalesce(entry ->> 'path', '') <> ''

  union all

  -- landing_pages content json strings (recursive)
  select trim(both '"' from v::text)
  from public.landing_pages lp,
       lateral jsonb_path_query(coalesce(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') as v
  where trim(both '"' from v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
), normalized_refs as (
  select distinct
    regexp_replace(
      regexp_replace(
        regexp_replace(coalesce(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''),
        '^/storage/v1/object/public/',
        ''
      ),
      '^/',
      ''
    ) as normalized
  from raw_refs
  where coalesce(raw_ref, '') <> ''
), referenced_paths as (
  select
    split_part(normalized, '/', 1) as bucket_id,
    substring(normalized from length(split_part(normalized, '/', 1)) + 2) as name
  from normalized_refs
  where split_part(normalized, '/', 1) in ('site-assets', 'portfolio-media')
    and strpos(normalized, '/') > 0
), orphan_candidates as (
  select
    o.id,
    o.bucket_id,
    o.name,
    o.created_at,
    coalesce((o.metadata ->> 'size')::bigint, 0) as size_bytes
  from storage.objects o
  left join referenced_paths r
    on r.bucket_id = o.bucket_id
   and r.name = o.name
  where o.bucket_id in ('site-assets', 'portfolio-media')
    and r.name is null
    and o.created_at < now() - interval '14 days'
)
select
  count(*) as orphan_files,
  pg_size_pretty(coalesce(sum(size_bytes), 0)) as estimated_space,
  coalesce(sum(size_bytes), 0) as estimated_space_bytes
from orphan_candidates;

-- Inspeção amostral dos candidatos (antes de deletar):
with raw_refs as (
  select concat(coalesce(bucket, ''), '/', coalesce(file_path, '')) as raw_ref
  from public.site_assets
  where coalesce(bucket, '') <> '' and coalesce(file_path, '') <> ''

  union all
  select thumbnail_path from public.portfolio_projects where thumbnail_path is not null
  union all
  select hero_image_path from public.portfolio_projects where hero_image_path is not null
  union all
  select url_landscape from public.portfolio_projects where url_landscape is not null
  union all
  select url_square from public.portfolio_projects where url_square is not null

  union all
  select (entry ->> 'path')
  from public.portfolio_projects p,
       lateral jsonb_array_elements(coalesce(p.gallery, '[]'::jsonb)) as entry
  where coalesce(entry ->> 'path', '') <> ''

  union all
  select trim(both '"' from v::text)
  from public.landing_pages lp,
       lateral jsonb_path_query(coalesce(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') as v
  where trim(both '"' from v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
), normalized_refs as (
  select distinct
    regexp_replace(
      regexp_replace(
        regexp_replace(coalesce(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''),
        '^/storage/v1/object/public/',
        ''
      ),
      '^/',
      ''
    ) as normalized
  from raw_refs
  where coalesce(raw_ref, '') <> ''
), referenced_paths as (
  select
    split_part(normalized, '/', 1) as bucket_id,
    substring(normalized from length(split_part(normalized, '/', 1)) + 2) as name
  from normalized_refs
  where split_part(normalized, '/', 1) in ('site-assets', 'portfolio-media')
    and strpos(normalized, '/') > 0
)
select
  o.bucket_id,
  o.name,
  o.created_at,
  pg_size_pretty(coalesce((o.metadata ->> 'size')::bigint, 0)) as size
from storage.objects o
left join referenced_paths r
  on r.bucket_id = o.bucket_id
 and r.name = o.name
where o.bucket_id in ('site-assets', 'portfolio-media')
  and r.name is null
  and o.created_at < now() - interval '14 days'
order by o.created_at asc
limit 200;


-- =============================================================
-- PARTE C — DELETE DE ÓRFÃOS (EXECUTAR APENAS APÓS VALIDAR DRY RUN)
-- =============================================================
-- Remova os comentários abaixo para aplicar.

-- begin;
 with raw_refs as (
 select concat(coalesce(bucket, ''), '/', coalesce(file_path, '')) as raw_ref
 from public.site_assets
 where coalesce(bucket, '') <> '' and coalesce(file_path, '') <> ''-

 union all
 select thumbnail_path from public.portfolio_projects where thumbnail_path is not null
 union all
 select hero_image_path from public.portfolio_projects where hero_image_path is not null
 union all
 select url_landscape from public.portfolio_projects where url_landscape is not null
union all
 select url_square from public.portfolio_projects where url_square is not null

 union all
 select (entry ->> 'path')
 from public.portfolio_projects p,
      lateral jsonb_array_elements(coalesce(p.gallery, '[]'::jsonb)) as entry
 where coalesce(entry ->> 'path', '') <> ''

union all
 select trim(both '"' from v::text)
 from public.landing_pages lp,
        lateral jsonb_path_query(coalesce(lp.content, '{}'::jsonb), '$.** ? (@.type() == "string")') as v
 where trim(both '"' from v::text) ~ '^(https?://[^ ]+/storage/v1/object/public/|/?(site-assets|portfolio-media)/)'
 ), normalized_refs as (
   select distinct
     regexp_replace(
       regexp_replace(
         regexp_replace(coalesce(raw_ref, ''), '^https?://[^/]+/storage/v1/object/public/', ''),
         '^/storage/v1/object/public/',
         ''
       ),

       '^/',
       ''
     ) as normalized
   from raw_refs
   where coalesce(raw_ref, '') <> ''
 ), referenced_paths as (
   select
     split_part(normalized, '/', 1) as bucket_id,
     substring(normalized from length(split_part(normalized, '/', 1)) + 2) as name
   from normalized_refs
   where split_part(normalized, '/', 1) in ('site-assets', 'portfolio-media')
     and strpos(normalized, '/') > 0
 ), doomed as (
   select o.id
   from storage.objects o
   left join referenced_paths r
     on r.bucket_id = o.bucket_id
    and r.name = o.name
   where o.bucket_id in ('site-assets', 'portfolio-media')
     and r.name is null
     and o.created_at < now() - interval '14 days'
 )
 delete from storage.objects o
 using doomed d
 where o.id = d.id;
 commit;

-- =============================================================
-- FIM
-- =============================================================
