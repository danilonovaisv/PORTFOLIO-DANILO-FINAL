---
description: Protocolo analítico do Antigravity para geração do mapa de dependências e documentação SDD (Implementation Plan).
---

# Spec-Driven Planning (BMAD/SDD)

1. Receba e interprete o briefing principal, realizando cruzamento técnico com as restrições da arquitetura base (Next.js 15+, Three.js, Tailwind v4, Supabase/Firebase).
2. Analise o estado atual lendo `@.context/active_state.md` e o grafo de conhecimento em `@.context/knowledge-graph.md`.
3. Divida os requisitos em componentes lógicos coesos e desacoplados, distribuindo-os entre `@src/components`, `@src/app/`, ou `@src/lib/`.
4. Se o escopo envolver cenas WebGL, planeje a gestão do estado via Zustand e a otimização de geometria em `@src/components/canvas/`.
5. Produza o arquivo final do plano (Artifact: `Implementation Plan`) categorizando Passo a Passo e as dependências de terminal necessárias.
6. Suspenda a execução para revisão arquitetural do usuário. Após aprovação, dispare a rotina de desenvolvimento com `/tdd-feature`.
