# Implementation Plan — Auditoria Orquestrada (Home, Sobre, Portfólio)

A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...

## Pipeline
1. Intake
2. MCP Context Layer
3. Orchestration
4. Execution (posterior, após aprovação)
5. Verification

## Prioridades
- P0: semântica estrutural e acessibilidade crítica (skip link/main landmark, heading base por rota, estados de erro sem violação de token de identidade).
- P1: SEO técnico por rota (canonical/OG específicos, consistência de JSON-LD, indexabilidade controlada por query).
- P1: performance percebida (preload estratégico, evitar preload excessivo de vídeo, proteção de render 3D em reduced motion/mobile).
- P2: consistência UX entre breakpoints e estados empty/loading/error.

## Ajustes planejados (sem implementação nesta fase)
- Introduzir `<main id="main-content">` nas 3 rotas alvo mantendo App Router e layout atual.
- Validar/normalizar hierarquia de headings em componentes-chave (hero, seções, galerias).
- Revisar metadados OG/Twitter por página para evitar reutilização indevida de imagem/copy.
- Uniformizar estados de fallback para integração Supabase (loading/empty/error) com mensagens e CTA de recuperação.
- Garantir conformidade motion: apenas opacity/blur/translateY e respeito a prefers-reduced-motion em toda superfície crítica.

## Approval Gate
Nenhuma correção será aplicada até comando explícito: `Aprovado` ou `Proceed`.
