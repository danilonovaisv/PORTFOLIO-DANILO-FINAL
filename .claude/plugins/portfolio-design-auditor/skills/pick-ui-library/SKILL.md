---
name: pick-ui-library
description: Seleciona biblioteca de UI para uma necessidade frontend depois de inspecionar
  dependências e constraints do projeto. Use explicitamente quando uma nova dependência
  pode ser necessária; prefere o que já existe e documenta impacto. Não é um catálogo
  automático.
metadata:
  portfolio-design-auditor-role: decision-support
  adaptation-version: 0.1.0
  source: user-provided-skills-zip
---

# Picking The Right Library

## O que faz

Mapeia uma necessidade concreta de frontend para uma biblioteca adequada, primeiro verificando se o projeto já possui uma solução suficiente. No plugin, a skill serve à política de dependências do implementation planner, não à auditoria estética.

## Quando usar

Use somente quando um finding aprovado exigir capacidade que o stack atual não atende ou quando houver escolha explícita de biblioteca para toasts, charts, DnD, virtualization, primitives etc.

## Quando não usar

Não adicionar dependência durante auditoria read-only; não substituir solução existente sem análise; não escolher por popularidade isolada; não sugerir biblioteca fora da lista curada sem declarar que a necessidade não está coberta ou que o usuário pediu alternativas.

## Formato / contrato de uso

**Entrada:** task capability, stack, package manifest/dependências instaladas, bundle/runtime constraints e manutenção esperada.

**Saída:** `USE_EXISTING`, `ADD_LIBRARY` ou `NO_LIBRARY`; opção recomendada quando aplicável, justificativa, alternativas existentes consideradas, impacto e riscos.

**Pós-condição:** adicionar dependência requer aprovação quando alterar arquitetura, bundle ou manutenção.

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

## How to use this

1. **Identify the task**, not the library the user named. "I need to show a dropdown" is a UI-primitives task (base-ui), even if they asked about something else.
2. **Check what's already installed.** Look at `package.json` first. If the project already uses a listed library, use it. If it uses a competitor (e.g. react-window instead of Virtuoso), flag the recommendation but don't churn the dependency without being asked.
3. **Recommend one library**, state what it's for in one sentence, and install/wire it up if that's part of the request. Don't present a menu of options when the list has a clear answer.
4. If the task isn't covered by the list, say so explicitly and recommend from your own knowledge — but be clear you've left the curated list.

## The list

### UI components & primitives

| Task | Library |
| --- | --- |
| Unstyled, accessible UI components (dialogs, popovers, menus, selects…) | [base-ui](https://base-ui.com) |
| Command menus (⌘K palettes) | [cmdk](https://cmdk.paco.me) |
| Toasts / notifications | [Sonner](https://sonner.emilkowal.ski) |
| One-time password / verification code inputs | [input-otp](https://input-otp.rodz.dev) |
| Customizable GUIs / control panels | [Leva](https://github.com/pmndrs/leva) — [dialkit](https://joshpuckett.me/dialkit) is an alternative |

### Motion & visuals

| Task | Library |
| --- | --- |
| General-purpose animation (springs, layout animations, enter/exit) | [motion](https://motion.dev) (Framer Motion) |
| Animating numbers (counters, prices, stats) | [NumberFlow](https://number-flow.barvian.me) |
| Animated text components | [torph](https://torph.lochie.me/) |
| 3D globes | [Cobe](https://cobe.vercel.app) |
| Dynamic OG images (HTML/CSS → SVG/PNG) | [Satori](https://github.com/vercel/satori) |
| Syntax highlighting | [shiki](https://shiki.style) |

Reach for motion when you need springs, layout animations, exit animations, or gesture-driven values. A simple hover or fade doesn't need it — plain CSS transitions are the right tool there.

### Charts

| Task | Library |
| --- | --- |
| Real-time / streaming charts | [Liveline](https://github.com/benjitaylor/liveline) |
| General charts (static or interactive dashboards) | [recharts](https://recharts.org) |

The split: if data points arrive live and the chart scrolls with time, use Liveline. Everything else is recharts.

### Interaction & performance

| Task | Library |
| --- | --- |
| Drag and drop | [dnd kit](https://dndkit.com) |
| Virtualization (long lists, large tables) | [Virtuoso](https://virtuoso.dev) |

### State & styling

| Task | Library |
| --- | --- |
| State management | [zustand](https://zustand.docs.pmnd.rs) |
| Constructing `className` strings conditionally | [clsx](https://github.com/lukeed/clsx) |
| Type-safe, variant-driven styling for Tailwind | [cva](https://cva.style) |
| Theme switching / dark mode (no flash on load) | [next-themes](https://github.com/pacocoursey/next-themes) |

The styling split: clsx for ad-hoc conditional classes; cva when a component has real variants (size, intent, state) that deserve a typed API. They compose — cva uses clsx-style inputs internally.

## Common mismatches to catch

- **Toasts built by hand or with a modal library** → Sonner exists for exactly this.
- **A `<div>`-based dropdown/dialog with manual focus handling** → base-ui, which handles accessibility, focus trapping, and dismissal.
- **Animating a number by re-rendering text** → NumberFlow handles digit transitions properly.
- **Rendering a 1,000+ row list directly** → Virtuoso before reaching for pagination hacks.
- **A `useState`-per-component web of props for shared state** → zustand.
- **Template-literal className ternaries three conditions deep** → clsx (or cva if it's variant-shaped).
