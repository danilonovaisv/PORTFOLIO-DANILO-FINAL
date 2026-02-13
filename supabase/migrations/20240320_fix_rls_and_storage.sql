-- ATENÇÃO: Comandos de 'alter table' foram removidos para evitar erros de permissão (42501).
-- O RLS já vem habilitado por padrão no Supabase Storage.
-- 1. Garantir que os Buckets existam e sejam públicos
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true) on conflict (id) do
update
set public = true;
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true) on conflict (id) do
update
set public = true;
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true) on conflict (id) do
update
set public = true;
-- 2. Limpeza segura de políticas antigas
-- Usamos um bloco DO para evitar erros se as policies não existirem ou tiverem nomes diferentes
do $$ begin -- Tenta remover policies comuns que podem causar conflito
drop policy if exists "Public Access to Media" on storage.objects;
drop policy if exists "Authenticated Upload Media" on storage.objects;
drop policy if exists "Authenticated Update Media" on storage.objects;
drop policy if exists "Authenticated Delete Media" on storage.objects;
drop policy if exists "Give public access to portfolio-media" on storage.objects;
drop policy if exists "Allow public viewing of portfolio-media" on storage.objects;
exception
when others then null;
-- Ignora erros de remoção
end $$;
-- 3. Criar Novas Políticas (RLS)
-- Política 1: Leitura Pública (SELECT) - Permite que qualquer um veja as imagens
create policy "Public Access to Media" on storage.objects for
select using (
        bucket_id in (
            'portfolio-media',
            'site-assets',
            'portfolio-assets'
        )
    );
-- Política 2: Upload Autenticado (INSERT) - Apenas admins logados podem fazer upload
create policy "Authenticated Upload Media" on storage.objects for
insert to authenticated with check (
        bucket_id in (
            'portfolio-media',
            'site-assets',
            'portfolio-assets'
        )
    );
-- Política 3: Update Autenticado (UPDATE) - Apenas admins logados podem atualizar
create policy "Authenticated Update Media" on storage.objects for
update to authenticated using (
        bucket_id in (
            'portfolio-media',
            'site-assets',
            'portfolio-assets'
        )
    );
-- Política 4: Delete Autenticado (DELETE) - Apenas admins logados podem deletar
create policy "Authenticated Delete Media" on storage.objects for delete to authenticated using (
    bucket_id in (
        'portfolio-media',
        'site-assets',
        'portfolio-assets'
    )
);