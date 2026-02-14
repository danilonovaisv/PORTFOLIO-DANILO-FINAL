# 🎼 Multi-Agent Orchestration

**Trigger:** `/orchestrate`
**Agent:** `agents/agent-orchestrator-audit.md`

## 1. Setup & Context

- **MCP Required:** `github`, `supabase`, `firebase`
- **Context:** Coordinate multiple specialized agents for complex, multi-domain tasks.

## 2. Steps (Skill-Based Execution)

### Step 1: Task Decomposition

- **Instruction:** Break down the complex request into domain-specific sub-tasks.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 2: Agent Selection

- **Instruction:** Select a minimum of 3 specialized agents based on task requirements.
- **Skill:** `use a skill concise-planning`
- **MCP Action:** None

### Step 3: Execution Coordination

- **Instruction:** Orchestrate the agents in parallel or sequence as defined in the plan.
- **Skill:** `use a skill nextjs-react-expert`
- **MCP Action:** Coordinate tool usage across selected MCPs (GitHub, Supabase, Firebase).

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Unified Orchestration Report and complete implementation.
