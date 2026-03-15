# Implementation Plan — Ajustes Orquestrados (Ghost)

Data: 2026-03-15
Workflow base: `.agents/workflows/ajustes-orquestrados.md`
Fonte de verdade: `docs/AUDIT_EXECUTION_PLAN.md`

## Escopo desta execução
- Global: root único para overlays (`#modal-root`) e lock de scroll seguro para múltiplos modais.
- Home: endurecer motion pesado em coarse/touch nos cards destaque e reforçar semântica do Video Manifesto.
- Portfolio: continuidade de modal acessível preservada sem acoplamento direto a `document.body`.
- Governança: sincronizar `.context` e registrar evidência em `docs/AUDIT_PENTEST.md`.

## Fase 1 — Escaneamento técnico
- Mapear os componentes reais envolvidos em modal, lightbox, manifesto e backgrounds animados.
- Validar o estado atual da stack: Next.js `16.1.6`, React `19.2.4`, Framer Motion `12.36.0`.
- Cruzar a documentação local em `.context` com o comportamento efetivo do código.
- Validar via Context7 padrões oficiais de App Router para modal/parallel routes e reduced motion no Motion.

## Fase 2 — Conformidade
- Modal Root: remover dependência implícita de `document.body` como destino único de portal e padronizar um root dedicado.
- Body Lock: impedir unlock prematuro quando mais de um overlay estiver aberto na mesma sessão.
- Motion: desligar fundos/cursor WebGL quando `prefers-reduced-motion` estiver ativo ou o dispositivo não tiver `hover/pointer: fine`.
- Semântica: adicionar heading técnico à seção `VideoManifesto`.

## Fase 3 — Implementação
- Criar `usePortalRoot()` e mover `PortfolioModal` e `ImageLightbox` para `#modal-root`.
- Inserir `#modal-root` em `src/app/layout.tsx`.
- Reescrever `useBodyLock` com contador global e snapshot/restauração única de estilos.
- Desligar `FeaturedProjectAnimatedBackground` quando o dispositivo for coarse/touch.
- Desligar `CustomCursor` fora de cenários `hover: hover` + `pointer: fine`.
- Adicionar `aria-labelledby` e `h2.sr-only` ao `VideoManifesto`.

## Fase 4 — Vetagem (QA)
- Rodar lint/typecheck focado nos arquivos alterados.
- Confirmar que os imports ficaram limpos e sem regressão de hidratação.
- Atualizar `.context` para refletir modal root dedicado e motion gating em touch.
- Consolidar achados, falsos positivos e correções em `docs/AUDIT_PENTEST.md`.
