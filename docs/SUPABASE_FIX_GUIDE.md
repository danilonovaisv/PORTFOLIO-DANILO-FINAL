# Guia de Correção Supabase (Login & Assets)

Este guia documenta as correções aplicadas para resolver problemas de login no Admin, links de assets quebrados e reprodução de vídeos do YouTube.

## 1. Correção de Permissões (Crítico)

Foi criado um script SQL para corrigir as permissões de acesso aos arquivos (buckets).
**Ação Necessária:**

1. Acesse o [SQL Editor do Supabase](https://supabase.com/dashboard/project/_/sql).
2. Copie o conteúdo do arquivo localizado em:
   `supabase/migrations/20240320_fix_rls_and_storage.sql`
3. Cole no editor e execute (Run).

Isso irá:

- Habilitar RLS (segurança) no Storage.
- Criar os buckets `portfolio-media`, `site-assets` se não existirem.
- Permitir **Leitura Pública** para todos os visitantes (corrige imagens quebradas).
- Permitir **Upload/Delete** apenas para administradores logados.

## 2. Correção de Login (Middleware)

O middleware de autenticação (`src/lib/supabase/middleware.ts`) foi refatorado para seguir as práticas mais recentes do `@supabase/ssr`.

- **Mudança:** Simplificação da gestão de cookies.
- **Efeito:** Resolve loops de redirecionamento e perda de sessão ao recarregar a página.

## 3. Correção de Vídeos YouTube

O editor do Admin (`MasterProjectTemplateV3Editor`) foi atualizado para detectar links do YouTube.

- **Antes:** Tentava usar tag `<video>`, que não funciona com links do YouTube.
- **Agora:** Extrai o ID do vídeo e renderiza um `<iframe>` embed oficial.
- **Suporte:** Links `youtu.be`, `youtube.com/watch` e `youtube.com/embed`.

## 4. Verificação

Após aplicar o SQL:

1. Faça logout e login novamente no `/admin`.
2. Verifique se as imagens no dashboard carregam.
3. Edite um projeto e teste adicionar um link do YouTube (o preview deve aparecer).
