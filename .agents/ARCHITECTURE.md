# Antigravity Kit Architecture

> Comprehensive AI Agent Capability Expansion Toolkit

---

## 📋 Overview

Antigravity Kit is a modular system consisting of:

- **5 Specialist Agents** - Role-based AI personas
- **4 Master Skills** - Specialized knowledge domains
- **18 Workflows** - Slash command procedures

---

## 🏗️ Directory Structure

```plaintext
.agent/
├── ARCHITECTURE.md          # This file
├── CONCEPTS.md              # Rule, Skill, Workflow definitions
├── agents/                  # 5 Specialist Agents
├── skills/                  # 4 Master Skills
├── workflows/               # 18 Slash Commands
├── rules/                   # 28 Global Rules
└── plugins/                 # System Plugins
```

---

## 🤖 Agents (5 Master Specialists)

| Agent                 | Role             | Responsibility                   |
| --------------------- | ---------------- | -------------------------------- |
| `orchestrator`        | **The Director** | Strategic flow & Final Operation |
| `frontend-specialist` | **Worker**       | UI, UX & Web Performance         |
| `mobile-developer`    | **Worker**       | Full-stack Mobile Development    |
| `spectral-artist`     | **Artist**       | WebGL, Shaders & Visual Motion   |
| `database-sentinel`   | **Sentinel**     | DB Schema & Supabase RLS         |

---

### 🔄 4-Step Management Cycle (PDCA)

System operates on the classic management framework to ensure continuous quality:

1.  **PLAN**: Defines MVP, PRD, and creates the execution blueprint.
2.  **DO**: Worker Agents build the features according to the plan.
3.  **CHECK**: Independent audit, running tests, and quality gate.
4.  **ACT**: Refines the output and finalizes operation.

---

## 🧩 Skills (4)

Modular knowledge domains that agents can load on-demand based on task context.

| Skill                          | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `ghost-r3f-optimization`       | R3F & WebGL performance (60FPS Mandate)       |
| `nextjs-app-router-caching`    | Next.js 16 caching & server components        |
| `supabase-rls-auth`            | Auth & RLS with @supabase/ssr                 |
| `tailwind-motion-choreography` | Hybrid animation (Tailwind 4 + Framer Motion) |

---

## 🔄 Workflows (18)

Slash command procedures. Invoke with `/command`.

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `/api`               | API Design & Documentation       |
| `/audit`             | Comprehensive project audit      |
| `/compliance`        | Legal & Data Privacy compliance  |
| `/deploy`            | Deployment procedures            |
| `/document`          | Documentation automation         |
| `/log-error`         | Error tracking & logging         |
| `/monitor`           | Server & Pipeline monitoring     |
| `/onboard`           | Team onboarding automation       |
| `/performance`       | Speed & Performance optimization |
| `/plan`              | Task breakdown & Planning        |
| `/release-version`   | Version sync & Documentation     |
| `/scroll-experience` | Immersive scroll-driven design   |
| `/security`          | Security scan & audit            |
| `/status`            | Project status dashboard         |
| `/tdd-feature`       | Test-driven development flow     |
| `/test`              | Automated testing                |
| `/update-docs`       | Documentation sync               |
| `/orchestrate`       | Multi-agent coordination         |

---

## 🎯 Skill Loading Protocol

```plaintext
User Request → Skill Description Match → Load SKILL.md
                                            ↓
                                    Read references/
                                            ↓
                                    Read scripts/
```

### Skill Structure

```plaintext
skill-name/
├── SKILL.md           # (Required) Metadata & instructions
├── scripts/           # (Optional) Python/Bash scripts
├── references/        # (Optional) Templates, docs
└── assets/            # (Optional) Images, logos
```

### Enhanced Skills (with scripts/references)

| Skill               | Files | Coverage                            |
| ------------------- | ----- | ----------------------------------- |
| `typescript-expert` | 5     | Utility types, tsconfig, cheatsheet |
| `ui-ux-pro-max`     | 27    | 50 styles, 21 palettes, 50 fonts    |
| `app-builder`       | 20    | Full-stack scaffolding              |

---

## � Scripts (2)

Master validation scripts that orchestrate skill-level scripts.

### Master Scripts

| Script          | Purpose                                 | When to Use              |
| --------------- | --------------------------------------- | ------------------------ |
| `checklist.py`  | Priority-based validation (Core checks) | Development, pre-commit  |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

### Usage

```bash
# Quick validation during development
python .agent/scripts/checklist.py .

# Full verification before deployment
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

### What They Check

**checklist.py** (Core checks):

- Security (vulnerabilities, secrets)
- Code Quality (lint, types)
- Schema Validation
- Test Suite
- UX Audit
- SEO Check

**verify_all.py** (Full suite):

- Everything in checklist.py PLUS:
- Lighthouse (Core Web Vitals)
- Playwright E2E
- Bundle Analysis
- Mobile Audit
- i18n Check

For details, see [scripts/README.md](scripts/README.md)

---

## 📊 Statistics

| Metric                  | Value                       |
| ----------------------- | --------------------------- |
| **Total Agents**        | 5                           |
| **Total Master Skills** | 4                           |
| **Total Workflows**     | 18                          |
| **Total Global Rules**  | 28                          |
| **Coverage**            | 100% Ghost System Standards |

---

## 🔗 Quick Reference

| Need           | Agent                 | Skills                               |
| -------------- | --------------------- | ------------------------------------ |
| Web App        | `frontend-specialist` | nextjs-react-expert, frontend-design |
| API            | `backend-specialist`  | api-patterns, nodejs-best-practices  |
| Mobile         | `mobile-developer`    | mobile-design                        |
| Database       | `database-architect`  | database-design, prisma-expert       |
| Security       | `security-auditor`    | vulnerability-scanner                |
| Testing        | `test-engineer`       | testing-patterns, webapp-testing     |
| Debug          | `debugger`            | systematic-debugging                 |
| Plan           | `project-planner`     | brainstorming, plan-writing          |
| Recon/Scraping | `browser-subagent`    | browser-subagent-core                |
