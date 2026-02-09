# Layer 2: WORKSPACE RULES (Operations & Tech Stack)

> **MANDATORY**: Follow these technical constraints for every file you touch.

## 🏗️ The Stack (Standard)

- **Framework:** Next.js 15 (App Router). Prioritize Server Components.
- **Language:** TypeScript 5 (Strict Mode). No `any`. Use `interface` over `type`.
- **Styling:** Tailwind CSS 4. No arbitrary values if tokens exist in `design-tokens.md`.
- **State:** Zustand (Global), React Context (Compound Components).
- **Backend:** Firebase Functions (Node 20) + Supabase (Postgres/Realtime).

## 📂 File Structure Protocols

- **Components:** `src/components/[feature]/[Name].tsx`. Named exports only.
- **Hooks:** Custom hooks for logic > 10 lines. Prefix `use`.
- **Imports:** Absolute paths (`@/components/...`).
- **Assets:** `public/models/` (.glb), `public/textures/` (.ktx2/.webp).

## 🧠 Memory & Artifacts

- **Knowledge Graph:** Update `.context/knowledge-graph.md` if you add a store or major component.
- **Logs:** Append to `.context/logs/adjustment_log.md` after every task.
- **Plans:** Create `docs/plans/[feature].md` for complex tasks before coding.
- **Walkthroughs:** Create after feature completion.

## 🔒 Security & Environment

- **Secrets:** NEVER commit `.env`.
- **Validation:** Use Zod for all inputs and API schemas.
- **Sanitization:** DOMPurify for `dangerouslySetInnerHTML`.
