---
name: squirrel-audit
description: Audita rotas do portfoliodanilo.com localmente e corrige problemas arquiteturais da stack (Next.js, R3F, Framer Motion, Supabase).
routing:
  frontend_media: portfolio-experience-specialist
  webgl_3d: spectral-artist
  storage_data: database-sentinel
skills: audit-website, review-project-media-card, review-project-case-page, superpower:systematic-debugging, superpower:verification-before-completion
---

# Workflow: Portfolio Stack Audit & Fix

## 1. Gatilho

Este workflow é ativado quando o usuário executa o comando `/squirrel-audit [ROUTE]`. Se `[ROUTE]` não for fornecido, assuma `todas`. Utiliza as capacidades da skill `.agents/skills/audit-website/` e ferramentas do MCP `squirrelscan` ou CLI local `squirrel`.

## 2. Execução de Coleta de Dados (Terminal)

Execute os comandos abaixo no terminal integrado, aguardando a conclusão:

```bash
ROUTE=${1:-sobre}
AUDIT_ID=$(squirrel audit "http://localhost:3000/$ROUTE" | tail -1)
squirrel report "$AUDIT_ID" --format llm > .agents/temp_audit.md
```

*(Ou utilize as tools equivalentes do MCP `squirrelscan`: `run_audit` e `get_report`).*

## 3. Análise Multi-Camada (Raciocínio)

Leia o arquivo `.agents/temp_audit.md`. Ignore falsos positivos comuns de WebGL e cruze os dados com a nossa stack:

- **Next.js App Router & Firebase Hosting:** Identifique componentes de cliente (`"use client"`) pesados que elevem o TBT (Total Blocking Time) ou CLS.
- **R3F & Three.js:** O crawler não inspeciona o interior do canvas. Inspecione o código da rota e garanta que geometrias e materiais utilizem `useMemo`, instanciamento e que o `<Canvas>` use `frameloop="demand"` ou visibilidade via IntersectionObserver.
- **Framer Motion:** Garanta que animações respeitem `prefers-reduced-motion` e que restrinjam as mutações de render a `transform` e `opacity` para evitar repaints no DOM.
- **Supabase Storage:** Imagens e vídeos apontados como pesados ou sem cache apropriado devem usar a API de transformação de imagens do Supabase ou `next/image` configurado.

## 4. Roteamento de Especialistas

| Área do Problema | Especialista Designado | Workflow / Skill |
| :--- | :--- | :--- |
| Cards de Projeto, Mídia, Vídeo/HTML Preview, TBT/CLS de UI | `portfolio-experience-specialist` | `/review-media-card`, `/review-case-page` |
| WebGL, Shaders, Queda de FPS (<60 FPS), Canvas R3F | `spectral-artist` | `ghost-r3f-optimization` |
| Storage Supabase, URLs de Assets, Políticas RLS | `database-sentinel` | `supabase-auth-storage-realtime-core` |

## 5. Etapas de Resolução (Superpowers Lifecycle)

### Fase A: Priorização e Plano
Apresente um plano estruturado focado em:
- Análise de Animações e Interações (Framer Motion + R3F)
- Estrutura de Layout e Estilo (Tailwind)
- Implementação Técnica e Execução (Next.js)
Aguarde aprovação humana antes de modificar código sensível.

### Fase B: Execução Sistemática (Root Cause First)
Aplique correções baseadas em `superpower:systematic-debugging`:
- Tratar a causa raiz antes de aplicar patches pontuais.
- Preservar a identidade do Ghost System (Ghost Blue `#0048ff`, Void Black `#040013`, TT Norms Pro).
- Documentar no código o motivo de refatorações de performance.

### Fase C: Verificação Antes do Fechamento (`verification-before-completion`)
- Re-executar a auditoria na rota para comprovar a resolução das falhas.
- Executar `pnpm run build-check` para garantir zero erros de lint/typecheck.

### Fase D: Tradução para Stakeholders
Gere um relatório executivo em `artifacts/audit-report-[ROUTE].md` sintetizando os problemas resolvidos (impacto em UX, Core Web Vitals e conversão).

