-- ===========================================================================
-- Supabase Storage: CORS + RLS Audit & Fix
-- Run via: Supabase Dashboard → SQL Editor
-- Project: portfolio-danilo (umkmwbkwvulxtdodzmzf)
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. VERIFICAR configuração CORS atual
-- ---------------------------------------------------------------------------
-- Execute no SQL Editor e verifique o output antes de alterar.
SELECT * FROM storage.buckets;

-- ---------------------------------------------------------------------------
-- 2. GARANTIR que os buckets existem e são públicos
-- ---------------------------------------------------------------------------
-- site-assets: logos, imagens UI, vídeos da home
UPDATE storage.buckets
SET public = true
WHERE id = 'site-assets';

-- portfolio-media: imagens e vídeos dos projetos
UPDATE storage.buckets
SET public = true
WHERE id = 'portfolio-media';

-- ---------------------------------------------------------------------------
-- 3. RLS POLICIES — leitura anônima nos buckets públicos
-- ---------------------------------------------------------------------------
-- Dropar políticas antigas se existirem para evitar conflito
DROP POLICY IF EXISTS "Public read site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read portfolio-media" ON storage.objects;

-- site-assets: qualquer pessoa pode ler (SELECT)
CREATE POLICY "Public read site-assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'site-assets');

-- portfolio-media: qualquer pessoa pode ler (SELECT)
CREATE POLICY "Public read portfolio-media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-media');

-- ---------------------------------------------------------------------------
-- 4. CORS — configurar origens permitidas
-- ---------------------------------------------------------------------------
-- O Supabase Storage CORS é configurado via API REST ou Dashboard.
-- NÃO há uma tabela SQL para isso — use o painel ou a API abaixo.
--
-- Passos no painel:
--   1. Acesse: https://supabase.com/dashboard/project/umkmwbkwvulxtdodzmzf/storage/buckets
--   2. Clique em "site-assets" → "Edit bucket"
--   3. Em "Allowed MIME types" e "Additional allowed origins", adicione:
--      https://portfoliodanilo.com
--      https://portfolio-danilo-novais.web.app
--      https://portfolio-danilo-novais.firebaseapp.com
--   4. Repita para "portfolio-media"
--
-- Ou via API (substitua SUPABASE_SERVICE_KEY):
--   curl -X PUT \
--     https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/bucket/site-assets \
--     -H "Authorization: Bearer SUPABASE_SERVICE_KEY" \
--     -H "Content-Type: application/json" \
--     -d '{"allowed_mime_types": null, "public": true}'
--
-- CORS específico de origem é gerenciado no painel em:
-- Settings → API → CORS Allowed Origins:
--   https://portfoliodanilo.com
--   https://portfolio-danilo-novais.web.app
--   https://portfolio-danilo-novais.firebaseapp.com
--   http://localhost:3000

-- ---------------------------------------------------------------------------
-- 5. VERIFICAR policies criadas
-- ---------------------------------------------------------------------------
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

-- ---------------------------------------------------------------------------
-- 6. VERIFICAR estado final dos buckets
-- ---------------------------------------------------------------------------
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id IN ('site-assets', 'portfolio-media');
