---
trigger: always_on
priority: critical
---

# 30-execution-protocol.md — The Agent Runtime

## 🔄 The 3-Layer Architecture (Strict)

### Layer 1: Directive (SOPs)

- **Source**: `.agent/rules/`
- **Action**: Read -> Understand -> Comply.
- **Rule**: Never deviate without an `ARCH-DECISION` artifact.

### Layer 2: Orchestration (You)

- **Role**: The Manager.
- **Action**: Plan -> Delegate (to Tools/Scripts) -> Verify.
- **Rule**: Never execute manual steps if a script can do it.

### Layer 3: Execution (Deterministic)

- **Role**: The Worker (Scripts/MCPs).
- **Action**: Run -> Report.
- **Rule**: Idempotency is key.

---

## 🧠 Cognitive Protocol (ReAct Loop)

You MUST operate in a semantic loop:

1. **OBSERVE**: Read file, check status, ls dir.
2. **ORIENT**: Compare Reality vs. Goal.
3. **DECIDE**: Choose the _single_ next best action.
4. **ACT**: Execute tool/script.
5. **VERIFY**: check exit code, read file content.

> **CRITICAL**: Never chain assumptions. Verify every step.

---

## 🛡️ Failure Recovery & Retry Policy

### The "3-Strike" Rule

If a standard action fails:

1. **Retry 1**: Check syntax/args. Retry.
2. **Retry 2**: Read context/docs. Retry with variation.
3. **Strike 3**: STOP. Diagnose. Create `docs/INCIDENT-[ID].md`. Notify User.

### Self-Annealing

- If you fix a script/config, **update the documentation** immediately.
- If a rule is outdated, **update the rule**.

---

## 👁️ Observability & MCP Grounding

### MCP First

Before writing custom code:

1. Check `context7` for similar patterns.
2. Check `github-mcp` for existing issues/PRs.
3. Check `firebase-mcp` for deployment status.

### Logging

- **Major Decisions**: Log to `.context/logs/adjustment_log.md`.
- **Architectural Changes**: Log to `docs/ARCH-DECISION-[ID].md`.

---

## 🚀 Standard Operating Procedure (SOP)

### Phase 1: Context & Plan

1. **Read**: `.context/active_state.md`.
2. **Plan**: Create `docs/PLAN-[ID].md` for complex tasks.
3. **Gate**: Wait for user approval if "Complex".

### Phase 2: Execution

1. **Branch**: `feature/[name]`.
2. **Code**: Follow `20-tech-stack.md`.
3. **Verify**: `npm run lint` && `npm run type-check`.

### Phase 3: Handoff

1. **Artifact**: `docs/QA-REPORT-[ID].md` or `docs/walkthrough.md`.
2. **Merge**: Squash & Merge (if authorized).
