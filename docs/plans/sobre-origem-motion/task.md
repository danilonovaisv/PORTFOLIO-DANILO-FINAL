# Task List — /sobre Text Animations + 03-ORIGEM Image Entrance

“A task list is an artifact that the agent uses to approach complex tasks and monitor progress on various action items...”

> Granular tasks ≤ 1h. Status: **awaiting approval (Aprovado / Proceed).** Do not start until approved.
> Sequence respects: create primitive → integrate mobile text → refactor image entrance → validate.

## Phase 0 — Pré-flight (read-only, já parcialmente feito)
- [ ] T0.1 Reconfirmar nenhuma classe Tailwind dinâmica string-concat na seção Origem (Oxide safety). (~20m)
- [ ] T0.2 Confirmar `MOTION_TOKENS.offset`/`duration` keys usados pelo refator existem. (~15m)

## Phase 1 — TextReveal primitive (CRIAR)
- [ ] T1.1 Criar `src/components/ui/motion/TextReveal.tsx`: client, `useScroll` + per-word `useTransform` (opacity + blur), props `text/highlight/as/className`. (~50m)
- [ ] T1.2 Implementar preservação de `highlight` (grupo contíguo `text-bluePrimary`, reusar lógica de `renderParagraph`). (~40m)
- [ ] T1.3 Reduced-motion fallback via `useMotionGate` (texto plano, sem split). (~20m)
- [ ] T1.4 Tipografia herdada (sem font hardcode); easing/tokens Ghost. (~20m)

## Phase 2 — Integração texto (mobile Origem)
- [ ] T2.1 `OriginComponents.tsx`: trocar `whileInView` fade do `<m.p>` mobile por `<TextReveal text paragraph highlight={block.highlight} />`. (~40m)
- [ ] T2.2 Garantir desktop `data-origin-copy` **inalterado** (GSAP intacto, sem word-reveal). (~15m)
- [ ] T2.3 Checar ritmo/offsets responsivos mobile vs tablet. (~30m)

## Phase 3 — Image entrance refactor (03-ORIGEM, desktop)
- [ ] T3.1 `useOriginAnimations.ts`: substituir entrance `clipPath inset` por stacked **translateY + opacity + blur** (rise/settle); manter pin sticky + triggers discretos. (~55m)
- [ ] T3.2 Remover qualquer `scale`/`rotate` herdado da referência scroll-cards (não introduzir). (~15m)
- [ ] T3.3 Ajustar `.origin-mask`/parallax p/ coerência com novo entrance. (~40m)
- [ ] T3.4 Mobile: confirmar stack inline sem scroll-trap / sem blank height. (~25m)
- [ ] T3.5 `next/image` via `DynamicAssetImage` correto, alt real `block.title`. (~15m)

## Phase 4 — Validação
- [ ] T4.1 `pnpm typecheck` + `pnpm lint` limpos. (~20m)
- [ ] T4.2 `pnpm build` — `/sobre` static, sem Oxide regression. (~30m)
- [ ] T4.3 Preview `/sobre`: word reveal mobile + entrada imagem desktop; console zero erros. (~40m)
- [ ] T4.4 Scroll mobile + desktop; reduced-motion fallback; sem motion proibido. (~30m)
- [ ] T4.5 Capturar evidência (snapshot/screenshot) dos itens do Approval. (~30m)

## Phase 5 — Handoff
- [ ] T5.1 `walkthrough.md`: arquivos mudados, decisões, validação, riscos restantes. (~30m)
- [ ] T5.2 Avaliar update em `.context/DOCS-PORTFOLIO-PAGES/02-SOBRE/` se mudança estrutural. (~20m)

## Out of Scope (não fazer)
- Criar `scroll-cards.tsx` genérico (refatorar existente).
- Word-reveal no desktop pinned copy (conflito GSAP).
- Install shadcn/Magic registry; mudar Tailwind config; assets remotos Unsplash.
