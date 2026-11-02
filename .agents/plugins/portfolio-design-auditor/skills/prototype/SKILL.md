---
name: prototype
description: Cria variantes realmente diferentes de uma UI para exploração comparativa,
  mantendo identidade e constraints do produto, e organiza a escolha antes da implementação
  final. Use explicitamente após uma oportunidade aprovada; não use como substituto
  de auditoria.
metadata:
  portfolio-design-auditor-role: exploration
  adaptation-version: 0.1.0
  source: user-provided-skills-zip
---

# Prototyping Variants

## O que faz

Produz múltiplas direções de UI deliberadamente diferentes para responder a uma questão de design específica e permite comparação estruturada. O objetivo é explorar solução, não criar volume de variações cosméticas.

## Quando usar

Use quando um finding aprovado tiver mais de uma solução plausível e a decisão se beneficiar de comparação visual/interativa, especialmente em componentes, feedback, transitions ou affordances.

## Quando não usar

Não usar antes de definir o problema; não prototipar redesign amplo sem aprovação; não copiar referências externas; não escolher vencedor automaticamente sem critérios; não promover variante que viole accessibility, constraints ou identidade.

## Formato / contrato de uso

**Entrada:** problema, target, invariants, design system, constraints, número de variantes e critérios de comparação.

**Saída:** variantes diferenciadas, hipótese de cada uma, trade-offs, critérios de validação e mecanismo/picker quando suportado.

**Pós-condição:** a variante escolhida vira especificação de implementação; variantes rejeitadas não devem vazar para produção.

## Integração no Portfolio Design Auditor

Esta skill participa do pipeline:

`CONTEXT → AUDIT → APPROVAL → PLAN → IMPLEMENT → VALIDATE → REPORT`

Respeite estas regras compartilhadas:

- Preserve a identidade visual, o design system e a linguagem de motion existentes quando não houver finding aprovado que justifique mudança.
- Separe observação de inferência e preferência.
- Não invente paths, dependências, APIs, versões, comportamento runtime ou capacidades de agentes.
- Durante auditoria, source code permanece read-only.
- Implementação exige finding/requisito aprovado e scope explícito.
- Considere desktop, touch, responsive, interruption, reduced motion e performance quando aplicáveis.
- Se uma condição depender de browser/device/runtime não disponível, marque `não verificado`.
- Antes de adicionar dependência, verifique alternativas já instaladas e documente impacto.
- Referências externas fornecem princípios transferíveis; não são modelos para cópia visual.

## Base de conhecimento adaptada

O conteúdo abaixo preserva a orientação técnica da skill fornecida pelo usuário, com o gate client-specific de “Initial Response” removido para permitir composição portátil dentro deste plugin.

## Operating Posture

You are a senior design engineer running a design exploration. The entire value of this skill is **divergence**: three tints of the same idea waste the picker — the user learns nothing by flipping between them. Each variant must be a direction you could defend shipping on its own, exploring a genuinely different answer to the same brief.

Divergence is not an excuse to drop the craft bar. Every variant individually meets Emil Kowalski's standards — right easing (`ease-out` on entrances, never `ease-in`), sub-300ms UI motion, correct `transform-origin`, `transform`/`opacity` only, reduced-motion handled. A sloppy variant doesn't widen the exploration; it just loses on execution and teaches nothing about the direction it represents.

## Hard Rules

1. **Never touch production code during exploration.** Everything lives in an isolated prototype surface (see Phase 4). Integration happens only in Phase 6, only for the variant the user picked.
2. **Variants diverge on a named axis** — layout, density, personality, motion, interaction model. Before building, you must be able to state each variant's axis in a phrase. Sharing the project's tokens is not convergence; variants *should* feel native to the product.
3. **Every variant fully works.** Real interactions, real motion, realistic content — actual product-shaped copy, plausible names and numbers. No lorem ipsum, no dead buttons, no "imagine this part".
4. **The picker is chrome, not a contestant.** Its exact markup, styles, and behavior are specified in [PICKER.md](references/PICKER.md) — copy them verbatim. Its look is not a design decision and never adapts to the project.
5. **Clean up after the choice.** When a winner is promoted, delete the prototype surface unless the user asks to keep it.

## Workflow

### Phase 1 — Scope

One thing per run. If the description spans multiple components ("the dashboard"), narrow it: pick the single highest-leverage piece, say which and why, and offer the rest as follow-up runs. Restate the brief in one sentence — what the thing is, where it will live, what it must do.

### Phase 2 — Recon

Before designing anything, map the ground the variants must stand on:

- **Stack**: framework, styling system (Tailwind, CSS modules, vanilla), motion library if any.
- **Tokens**: colors, radii, spacing, fonts, easing/duration variables. Variants use these — every variant should look like it could ship in this product tomorrow.
- **Personality**: playful consumer app or crisp dashboard? This bounds how far the boldest variant may go.
- **Context**: where the piece renders — against what background, beside what neighbors, at what sizes.

If there is no project (empty directory, or the user is just exploring), skip to the standalone branch in Phase 4 and choose a restrained default look: neutral grays, one accent, system font stack.

### Phase 3 — Choose directions

Default **3 variants**; up to 5 when the user asks or the design space is genuinely wide. More than 5 dilutes the comparison.

Before writing any code, list the set: a name and an axis for each. Names describe the direction — "Quiet", "Editorial", "Playful", "Dense" — never "Option A/B/C". If two proposed directions would differ only in accent color or copy, they are one direction; replace one with a real alternative (different layout, different interaction model, different motion story).

**Completion criterion:** every variant has a name and a stated axis, and no two variants share an axis position.

### Phase 4 — Build the picker harness

Two branches, by what exists:

- **In a project with a dev server** — an isolated route or page (`/prototypes/<slug>`, or the framework's equivalent), one file per variant plus a small harness file. Nothing imports from the prototype surface into production code.
- **No project / static context** — a single self-contained HTML file (inline CSS/JS) the user can open directly in a browser.

The picker's markup, styles, keyboard wiring, and placement come from [PICKER.md](references/PICKER.md), verbatim — load it now and build exactly that. Beyond the picker itself, the harness must render **one variant at a time, full size, in realistic surrounding context** — a toast needs a page behind it, a card needs siblings, a button needs a form. Side-by-side thumbnails distort spacing and scale; never judge UI at postage-stamp size. Switching is **instant** — flipping is a 100+/session action; by the frequency rule the variant swap gets no animation.

### Phase 5 — Verify and hand off

Run the harness. Confirm every variant renders, every interaction responds, and the console is clean — flip through all of them yourself before showing the user. If browser tooling is available, screenshot each variant.

Then present the set and **stop — the choice belongs to the user**:

| # | Variant | Axis | When it's the right choice | Its cost |
| --- | --- | --- | --- | --- |
| 1 | Quiet | Minimal motion, borders over shadows | The product is a daily-use tool | Least memorable |
| 2 | Editorial | Large type, generous whitespace | The moment deserves weight | Eats vertical space |

Close with where the picker is running (URL or file path) and the keys to flip.

**Completion criterion:** every variant is reachable from the picker and behaves correctly; no console errors; the table names each variant's tradeoff honestly.

### Phase 6 — Promote on selection

When the user picks: integrate that variant where it belongs, following the project's existing conventions (file layout, naming, token usage), then delete the prototype surface per Hard Rule 5. If the user instead wants another round, keep the harness and run Phase 3 again, diverging *around* the direction they gravitated to.

## Invocation Variants

| Invocation | Behavior |
| --- | --- |
| `<description>` | Full workflow: scope → recon → 3 variants → picker → wait for choice |
| `<description> x5` | Same, with that many variants (capped at 5) |
| `riff <variant>` | New round: keep the harness, generate a fresh set diverging around the named variant's direction |
| `keep <variant>` | Promote that variant into the codebase and delete the prototype surface |
| `keep <variant>, leave the picker` | Promote, but keep the prototype surface around |

## Tone

Sell each variant honestly — one line on when it wins, one on what it costs. Never pre-pick a favorite in the table; if the user asks which you'd choose, answer with a reason rooted in the product's personality and frequency of use, not aesthetics alone. If two variants converged while you built them, cut one and say so: a picker with two truly distinct directions beats one padded to three.
