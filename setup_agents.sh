#!/bin/bash
mkdir -p .agent/skills-archive
mv .agent/skills/* .agent/skills-archive/ 2>/dev/null || true

mkdir -p .agent/skills/ghost-r3f-optimization
cat << 'INNER' > .agent/skills/ghost-r3f-optimization/SKILL.md
---
name: ghost-r3f-optimization
description: Diretrizes absolutas de performance para WebGL e React Three Fiber no Ghost System (60FPS Mandate).
---
# Ghost R3F Optimization

## O Mandato de 60FPS
1. **Instancing**: Sempre use `InstancedMesh` para múltiplos objetos similares.
2. **Zero Alocação no useFrame**: NUNCA instancie vetores/matrizes dentro do loop.
3. **Gerenciamento de Texturas**: Otimize texturas, use potência de 2.
4. **Draw Calls**: Mantenha abaixo de 100.
INNER

mkdir -p .agent/skills/nextjs-app-router-caching
cat << 'INNER' > .agent/skills/nextjs-app-router-caching/SKILL.md
---
name: nextjs-app-router-caching
description: Estratégias de Server Components, Client Components e Caching agressivo para Next.js 16.
---
# Next.js App Router & Caching

1. **Server vs Client**: Use Server Components por padrão.
2. **Data Fetching**: Faça fetch no servidor.
3. **Caching**: Use `revalidate` com sabedoria para o Supabase.
4. **Suspense**: Use para streaming de UI.
INNER

mkdir -p .agent/skills/supabase-rls-auth
cat << 'INNER' > .agent/skills/supabase-rls-auth/SKILL.md
---
name: supabase-rls-auth
description: Autenticação unificada com @supabase/ssr e RLS.
---
# Supabase RLS & Auth

1. **SSR Client**: Use @supabase/ssr.
2. **Middleware Guard**: Proteja rotas em middleware.ts.
3. **RLS**: Ative RLS em todas as tabelas.
4. **Zero Trust**: Validação final sempre no Postgres.
INNER

mkdir -p .agent/skills/tailwind-motion-choreography
cat << 'INNER' > .agent/skills/tailwind-motion-choreography/SKILL.md
---
name: tailwind-motion-choreography
description: Animações e design system híbrido (Tailwind v4, Framer Motion, Lenis).
---
# Tailwind Motion Choreography

1. **Estética Ghost**: NUNCA use Placeholder. Use Void Black e Deep Blue.
2. **Smooth Scroll**: Use Lenis para scroll macio.
3. **Motion**: Framer Motion e GSAP para coreografia.
4. **Tailwind v4**: Utilize variáveis CSS e design system.
INNER

mkdir -p .agent/workflows
cat << 'INNER' > .agent/workflows/audit-3d.md
# Workflow: Audit 3D
Uso: `/audit-3d`
Objetivo: Varredura profunda nos componentes `<Canvas>` para detecção de jank, draw calls excessivas e alocações de memória indevidas.
Passos:
1. Analisar os componentes filhos de `Canvas`.
2. Reportar alocações dentro de `useFrame`.
3. Validar uso de `InstancedMesh`.
INNER

cat << 'INNER' > .agent/workflows/deploy.md
# Workflow: Deploy
Uso: `/deploy`
Objetivo: Validar e fazer o deploy da aplicação para produção.
Passos:
1. `npm run typecheck`
2. `npm run lint`
3. Executar testes vitais.
4. Realizar build (Next.js / Firebase Hosting).
INNER

cat << 'INNER' > .agent/workflows/tdd-feature.md
# Workflow: TDD Feature
Uso: `/tdd-feature [nome_da_feature]`
Objetivo: Desenvolver componentes sob a ótica Red-Green-Refactor.
Passos:
1. Criar o arquivo de teste `.test.tsx` com Playwright/Jest.
2. Criar a interface e os stubs do componente.
3. Escrever a implementação mínima para passar no teste.
4. Refatorar aplicando `ghost-r3f-optimization` ou `tailwind-motion-choreography`.
INNER

mkdir -p .agent/agents
cat << 'INNER' > .agent/agents/orchestrator.md
---
name: orchestrator
description: O Comandante da Orquestração. Coordena delegações, merge de arquivos e planejamento estratégico.
skills: plan-writing, system-update
---
# Orchestrator (@orchestrator)
Você é o Ghost Commander. Sua função é dividir tarefas complexas entre os outros agentes e garantir a integridade arquitetural (GEMINI.md).
INNER

cat << 'INNER' > .agent/agents/spectral-artist.md
---
name: spectral-artist
description: Especialista exclusivo em shaders, Three.js e interações WebGL complexas.
skills: ghost-r3f-optimization
---
# Spectral Artist (@spectral-artist)
Você constrói experiências 3D de alta performance. O seu código NUNCA pode bloquear a thread principal ou derrubar os 60FPS.
INNER

cat << 'INNER' > .agent/agents/database-sentinel.md
---
name: database-sentinel
description: Especialista focado em segurança, RLS do Supabase e Firebase Functions.
skills: supabase-rls-auth
---
# Database Sentinel (@database-sentinel)
Você assegura que o estado e os dados do projeto não sejam expostos. Seu código vive no Postgres via RLS e Functions backend.
INNER
