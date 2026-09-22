---
name: deploy-manager
description: Instruções de auditoria de bundles, validação de preflight, invalidação de cache e deploys no ecossistema Firebase/Supabase.
---

# Deploy Manager Skill

Esta skill fornece instruções e diretrizes detalhadas para o gerenciamento de deploys, auditoria de bundles gerados e controle de cache no ecossistema do Danilo Novais Portfolio (Ghost Era).

## 1. Auditoria de Bundles (Pre-flight Checks)

Antes de executar qualquer deploy, o agente deve garantir a conformidade do bundle:
- Executar `pnpm run build-check` para validar se existem erros de tipagem TypeScript ou de Lint.
- Executar `pnpm run predeploy` para rodar o preflight script (`scripts/firebase-preflight.sh`) e auditar assets ausentes ou quebrados.
- **Atenção:** Em ambientes de produção, o build deve ser testado com `pnpm run build` localmente para garantir que o Next.js gere a pasta `.next/standalone` com sucesso.

## 2. Invalidação de Cache & Configuração do CDN

- O Firebase Hosting utiliza caches de CDN globais.
- Static assets (imagens do Supabase Storage, fontes locais, arquivos 3D `.glb` ou `.gltf`) são configurados com cabeçalhos `Cache-Control` longos e imutáveis em `firebase.json` e `next.config.mjs` para otimização de performance.
- Se houver alteração em assets estáticos já armazenados em cache, utilize técnicas de cache busting (ex: alterar a hash da query na URL) ou execute invalidação manual se necessário.
- Chamadas de API (`/api/**`) **devem** ser configuradas com `Cache-Control: no-store` para evitar caching indevido.

## 3. Estratégia de Cookie "__session"

- O Firebase Hosting remove cookies padrão das requisições direcionadas para Cloud Functions (SSR do Next.js).
- Para manter a sessão do Supabase ativa entre cliente e servidor, a autenticação deve usar estritamente o cookie `__session`.
- Certifique-se de que a criação do cliente no Supabase (`src/lib/supabase/server.ts` e `src/lib/supabase/client.ts`) contenha a propriedade:
  ```typescript
  cookieOptions: {
    name: '__session',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
  ```

## 4. Auditoria Automatizada do Deploy

Você pode executar scripts de auditoria automatizados no repositório antes do deploy:
- `pnpm run audit:firebase-hosting` para rodar o script de auditoria do Firebase.
- `pnpm run audit:supabase-storage` para auditar a integridade de links de assets do Supabase.
- `pnpm run audit:fullstack-config` para rodar uma análise de sanidade de toda a configuração integrada.
