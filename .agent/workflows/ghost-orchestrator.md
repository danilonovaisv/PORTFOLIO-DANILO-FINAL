# 👻 Ghost Orchestrator

**Trigger:** `/ghost-orchestrator`
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Execution of the core Ghost Design System orchestrator script for system-wide synchronization.

## 2. Steps (Skill-Based Execution)

### Step 1: Truth Extraction

- **Instruction:** Generate `project_truth.json` by auditing current design system tokens.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Synchronization Execution

- **Instruction:** Run the orchestrator script to apply design system changes across all layers.
- **Skill:** `use a skill nextjs-react-expert`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Synchronization report and updated `project_truth.json`.
