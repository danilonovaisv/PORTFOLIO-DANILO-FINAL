# Prompt de Execução Orquestrada — Plano de Ajuste Motion & UX

> Use este prompt em uma nova execução com agentes para implementar o plano definido nos artefatos:
>
> - `.context/logs/2026-03-07-motion-ux-implementation-plan.md`
> - `.context/logs/2026-03-07-motion-ux-audit-report.md`

---

## PROMPT (copiar e colar)

Você é um orquestrador técnico no projeto Ghost.
Atue em modo **multi-agent** com a ordem obrigatória:

1. `@motion_choreographer` (corrigir motion/easing/offset/reduced-motion)
2. `@audit_sentinel` (validar grid, z-index, performance e acessibilidade)
3. `@ghost_architect` (garantir integridade de arquitetura, tipos e consistência final)

### Objetivo

Executar o plano de ajustes Motion & UX nas seções **Home** e **Sobre** com base no SOT:

- `.context/GHOST-DESIGN-SYSTEM.md`
- `.context/logs/2026-03-07-motion-ux-implementation-plan.md`
- `.context/logs/2026-03-07-motion-ux-audit-report.md`
- `.context/DOCS-PORTFOLIO-PAGES/01-HOME/*`
- `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/*`

### Regras mandatórias de implementação

- Easing padrão (Framer/CSS): `[0.22, 1, 0.36, 1]`.
- Propriedades permitidas em conteúdo/UI: `opacity`, `blur`, `translateY` (máx `18px`).
- Proibido em conteúdo/UI: `scale`, `rotate`, `bounce`, deslocamentos horizontais de reveal (`x`) e efeitos que quebrem “design invisível”.
- `prefers-reduced-motion` deve ser respeitado via `useMotionGate` (ou hook canônico equivalente).
- Parallax/reveal devem reduzir amplitude e custo por scroll.
- Hierarquia de camadas deve seguir Ghost DS (Canvas/R3F abaixo de overlays finais).
- Não adicionar bibliotecas novas sem justificativa técnica baseada no repositório atual.

### Escopo técnico obrigatório

Auditar, corrigir e validar no mínimo:

- `src/components/home/**`
- `src/components/sobre/**`

Com foco em:

1. Desvio de easing em `motion.*` e GSAP.
2. Propriedades proibidas (`scale/x/rotate/bounce`) em conteúdo/UI.
3. Offsets de `translateY` acima de 18px.
4. Gargalos em `useScroll/useTransform` por item e transições on-scroll.
5. Z-index entre Canvas R3F e DOM (especialmente sessão 06 da Sobre).
6. Cobertura de reduced motion (`useMotionGate` + `prefers-reduced-motion`).

### Estratégia de execução (fases)

#### FASE 01 — Crítica

- Corrigir bugs de sincronização de animação.
- Ajustar legibilidade de texto sobre vídeo/overlays.
- Corrigir acessibilidade de motion gate.
- Remover propriedades proibidas de conteúdo/UI.

#### FASE 02 — Refinamento

- Harmonizar tempos Fast/Normal/Slow.
- Ajustar stagger de listas e grids.
- Reduzir amplitude de parallax para comportamento sutil.

#### FASE 03 — Experiência

- Melhorar reveal de entrada por seção.
- Refinar transições entre blocos e páginas mantendo silêncio visual.

### Entregáveis obrigatórios

1. **Código ajustado** com mudanças mínimas e rastreáveis.
2. **Atualização documental em `.context/`** refletindo estado final.
3. **Registro de achados em `docs/AUDIT_PENTEST.md`**.
4. **Relatório final em Markdown** com:
   - inconformidades corrigidas por arquivo,
   - decisões de trade-off,
   - riscos remanescentes.

### QA obrigatório antes de concluir

- Rodar lint + typecheck sem erros.
- Validar acessibilidade de animação (reduced motion real).
- Validar performance de scroll (sem jank perceptível).
- Capturar screenshot mobile-first das seções alteradas.

### Formato da resposta final do agente executor

- **Resumo das mudanças** por arquivo.
- **Tabela de conformidade** (Antes vs Depois): easing, propriedades, offset, reduced motion, z-index.
- **Comandos executados** + status (pass/fail).
- **Checklist DoD** marcado item a item.

### Critérios de aceite

Só considerar concluído quando:

- Não houver `scale/x/rotate/bounce` em conteúdo UI.
- Não houver `translateY` > `18px` em reveals de conteúdo.
- Easing unificado no padrão Ghost.
- `useMotionGate` aplicado consistentemente.
- Z-index de Canvas/DOM alinhado ao Ghost DS.
- Documentação `.context` + `AUDIT_PENTEST.md` atualizados.
