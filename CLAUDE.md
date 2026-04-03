# Claude Code Configuration — Ghost System Portfolio

> **Projeto:** Portfolio institucional de Danilo Novais  
> **Codinome:** Ghost Era / Ghost System  
> **URL:** https://portfoliodanilo.com  
> **Stack:** Next.js 16 · React 19 · TypeScript · Three.js/R3F · Supabase · Firebase

---

## Behavioral Rules (Always Enforced)

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested
- NEVER save working files, text/mds, or tests to the root folder
- Never continuously check status after spawning a swarm — wait for results
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files

---

## Project Architecture

### Tech Stack
- **Framework:** Next.js 16.2.2 (App Router, standalone output, Turbopack)
- **Language:** TypeScript 6.0.2 (strict mode)
- **Runtime:** Node.js >=20, pnpm 10.33.0
- **UI:** React 19, Tailwind CSS 4, Framer Motion 12, GSAP 3, Lenis 1
- **3D/WebGL:** React Three Fiber 9, Three.js 0.183, OGL, custom GLSL shaders
- **Backend:** Supabase (PostgreSQL, Storage), Firebase (Hosting, Functions, Firestore, Realtime DB)
- **AI/External:** OpenAI, Google ADK, Genkit
- **State:** Zustand 5, React Context
- **Components:** Radix UI, shadcn/ui

### Design System — Ghost System Constants
- **Primary color:** Ghost Blue `#0048ff`
- **Standard easing:** `[0.22, 1, 0.36, 1]`
- **Grid system:** `.std-grid` (all layouts must comply)
- **Z-index hierarchy:** defined in `.context/GHOST-DESIGN-SYSTEM.md`
- **Performance target:** FPS > 50 on WebGL scenes

### File Organization
- `/src` — Next.js app, components, lib, hooks, styles, types
- `/test` — Unit tests (Jest) and E2E tests (Playwright)
- `/docs` — Documentation, ADRs, audit reports, plans
- `/scripts` — 70+ automation scripts (TS, JS, Python, bash)
- `/functions` — Firebase Cloud Functions
- `/supabase` — DB schema, migrations, seed
- `/dataconnect` — Firebase Data Connect schema
- NEVER save to root folder

### Architecture Principles
- Follow Domain-Driven Design with bounded contexts
- Keep files under 500 lines
- Use typed interfaces for all public APIs
- Prefer TDD London School (mock-first) for new code
- Ensure input validation at system boundaries
- After editing `src/`, update the corresponding doc in `.context/`

---

## Agent Governance — Single Source of Truth Order

```
docs/blueprints_project/ → .agent/rules/ → .agent/workflows/ → .agents/ → .context/
```

### Agent-Context Separation
| Directory | Access | Purpose |
|-----------|--------|---------|
| `.agents/` | READ-ONLY | Skill library — 385 skills, 30+ personas, 80+ workflows, 15+ rule files |
| `.agent/` | READ-ONLY | Lightweight rules and workflows (Gemini/Cursor) |
| `.context/` | READ-WRITE | Source of truth for current project state; sync after every code change |

### Orchestrated Agents (Ghost System)
| Agent | Skill | Responsibility |
|-------|-------|---------------|
| `@ghost_architect` | `ghost-architect` | Next.js architecture, folder integrity, TypeScript types |
| `@spectral_artist` | `spectral-artist` | Ghost Blue shaders, WebGL materials, visual aesthetics |
| `@motion_choreographer` | `motion-choreographer` | Framer Motion, Lenis, scroll sync |
| `@audit_sentinel` | `audit-sentinel` | Grid compliance `.std-grid`, Lighthouse, z-index |

### Reference Documents (Single Source of Truth)
- **Architecture:** `.context/ARCHITECTURE.md`
- **Design System:** `.context/GHOST-DESIGN-SYSTEM.md`
- **Sitemap:** `.context/SITEMAP.md`
- **Active State:** `.context/active_state.md`
- **Page Specs:** `.context/DOCS-PORTFOLIO-PAGES/`
- **Governance:** `AGENTS.md`

---

## Build & Test

```bash
# Install
pnpm install

# Dev server
pnpm run dev

# Build
pnpm run build

# Start (standalone)
pnpm start

# Type check
pnpm run typecheck

# Lint
pnpm run lint

# Full check (typecheck + lint)
pnpm run build-check

# Unit tests (Jest)
pnpm test

# E2E tests (Playwright)
pnpm test:e2e

# Deploy
pnpm run deploy
```

- ALWAYS use `pnpm`, NOT `npm` or `yarn`
- ALWAYS run tests after making code changes
- ALWAYS verify build succeeds before committing
- TypeScript `ignoreBuildErrors: true` is set for deploy stability — still fix type errors

---

## Claude Flow V3 — Swarm Config

### Project Config
- **Topology:** hierarchical-mesh
- **Max Agents:** 15 (use 6-8 for tight coding swarms)
- **Memory:** hybrid (HNSW + learning bridge + memory graph)
- **Neural:** Enabled
- **Consensus:** raft (for hive-mind leader state)

### Concurrency: 1 MESSAGE = ALL RELATED OPERATIONS
- All operations MUST be concurrent/parallel in a single message
- ALWAYS batch ALL todos in ONE TodoWrite call (5-10+ minimum)
- ALWAYS spawn ALL agents in ONE message with full instructions via Task tool
- ALWAYS batch ALL file reads/writes/edits in ONE message
- ALWAYS batch ALL Bash commands in ONE message

### Swarm Orchestration Rules
- MUST initialize the swarm using CLI tools when starting complex tasks
- MUST spawn concurrent agents using Claude Code's Task tool
- Never use CLI tools alone for execution — Task tool agents do the actual work
- ALWAYS use `run_in_background: true` for all agent Task calls
- After spawning, STOP — do NOT add more tool calls or check status
- Never poll TaskOutput or check swarm status — trust agents to return

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

### 3-Tier Model Routing (ADR-026)

| Tier | Handler | Latency | Cost | Use Cases |
|------|---------|---------|------|-----------|
| **1** | Agent Booster (WASM) | <1ms | $0 | Simple transforms (var→const, add types) — Skip LLM |
| **2** | Haiku | ~500ms | $0.0002 | Simple tasks, low complexity (<30%) |
| **3** | Sonnet/Opus | 2-5s | $0.003-0.015 | Complex reasoning, architecture, security (>30%) |

- Always check for `[AGENT_BOOSTER_AVAILABLE]` or `[TASK_MODEL_RECOMMENDATION]` before spawning agents
- Use Edit tool directly when `[AGENT_BOOSTER_AVAILABLE]`

### Available Agent Types (60+)

**Core Development:** `coder`, `reviewer`, `tester`, `planner`, `researcher`  
**Specialized:** `security-architect`, `security-auditor`, `memory-specialist`, `performance-engineer`  
**Swarm Coordination:** `hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`  
**GitHub & Repo:** `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`  
**SPARC Methodology:** `sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`

---

## Security Rules

- NEVER hardcode API keys, secrets, or credentials in source files
- NEVER commit .env files or any file containing secrets
- Always validate user input at system boundaries
- Always sanitize file paths to prevent directory traversal
- Firebase Security Rules: `firestore.rules`, `storage.rules`, `database.rules.json`
- Run `npx @claude-flow/cli@latest security scan` after security-related changes

---

## Multi-Agent Ecosystem

This project supports 7 AI systems simultaneously. Each has its own config directory:

| Directory | AI System | Key Feature |
|-----------|-----------|------------|
| `.claude/` + `CLAUDE.md` | Claude Code (claude-flow V3) | 15-agent swarm, HNSW memory, neural, hooks |
| `.mcp.json` / `mcp_servers.json` | MCP servers | context7, github, postgres, brave-search, memory |
| `.cursorrules` | Cursor IDE | Ghost System architect, @-triggered personas |
| `AGENTS.md` | All agents | Master governance, Ghost System orchestration |
| `GEMINI.md` | Gemini / Google AI | Antigravity identity, 13 shared modules |
| `.agents/` | Shared skill library | 385 skills, 80+ workflows, rule files |
| `.codex/` | OpenAI Codex | Multi-agent (6 threads), 3 agent types |
| `.windsurf/` | Windsurf IDE | Agents + skills |
| `.max/` | Max AI | Model routing, project context |
| `.jules/` | Jules/Bolt | Bolt.md config |
| `.qwen/` | Qwen (Alibaba) | Skills |

---

## V3 CLI Quick Reference

```bash
# Setup
claude mcp add claude-flow -- npx -y @claude-flow/cli@latest
npx @claude-flow/cli@latest daemon start
npx @claude-flow/cli@latest doctor --fix

# Agents
npx @claude-flow/cli@latest agent spawn -t coder --name my-coder
npx @claude-flow/cli@latest swarm init --v3-mode

# Memory
npx @claude-flow/cli@latest memory store --key "ghost-blue" --value "#0048ff" --namespace design
npx @claude-flow/cli@latest memory search --query "ghost system patterns"
npx @claude-flow/cli@latest memory list --namespace design --limit 10
npx @claude-flow/cli@latest memory retrieve --key "ghost-blue" --namespace design
```

---

## Mission Lifecycle (per AGENTS.md)

1. **Scanning** — Map files, identify dependencies in `assets.json` or `site-assets.ts`
2. **Compliance Analysis** — Validate grid (`.std-grid`), Ghost Blue tokens, easing `[0.22, 1, 0.36, 1]`
3. **Implementation** — Generate Implementation Plan → structural → visual → micro-interactions
4. **QA / Vetting** — FPS >50, accessibility (ARIA + AAA contrast), mobile-first screenshot

### Definition of Done
1. Code runs without TypeScript/Lint errors
2. Bugs reported in `AUDIT_PENTEST.md`
3. Corresponding `.context/` document updated with new state

---

## Support

- Claude Flow Docs: https://github.com/ruvnet/claude-flow
- Claude Flow Issues: https://github.com/ruvnet/claude-flow/issues
