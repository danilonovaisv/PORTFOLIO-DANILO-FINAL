---
description: Protocolo analítico do Antigravity para geração do mapa de dependências e documentação SDD (Implementation Plan).
---

# Spec-Driven Planning (BMAD/SDD)

1. Receba e interprete o briefing principal, realizando cruzamento técnico com as restrições da arquitetura base (Next.js, Three.js, Tailwind, Supabase).
2. Divida os requisitos em componentes lógicos coesos e desacoplados, distribuindo-os entre `@src/components`, `@src/app/api`, ou rotas frontend.
3. Se o escopo envolver cenas WebGL, planeje a gestão do estado e as texturas via `useLoader` e `@react-three/drei`.
4. Produza o arquivo final do plano (Artifact: `Implementation Plan`) categorizando Passo a Passo e dependências de terminal necessárias.
5. Suspenda a execução para revisão arquitetural do usuário. Após aprovação humana da spec, dispare a rotina de desenvolvimento com `/tdd-feature`.
