---
name: implement-audit
description: Execute an approved Portfolio design audit through appropriate project agents and skills with staged validation.
---

# /implement-audit

Implement the requested approved audit.

## Preflight

Before editing:
1. read the complete audit;
2. inspect current source;
3. inspect relevant project documentation;
4. verify target components;
5. verify required skills;
6. verify recommended agents;
7. determine whether the audit remains current.

If the implementation has materially diverged from the audit:
**STOP.**
Return:
**AUDIT STATUS: STALE**
and explain what must be reconciled.

## Execution

Execute tasks according to their dependency graph.

For each task:
1. load required skills;
2. use the appropriate available agent;
3. verify target files before editing;
4. implement only the task scope;
5. satisfy acceptance criteria;
6. validate the change;
7. record completion information.

Do not perform unrelated refactors.
Do not change global primitives for local requirements without explicit impact analysis.
Prefer existing components, tokens, utilities and dependencies.

## Validation gates

A dependent task must not proceed when a blocking prerequisite failed validation.

## Completion report

For each task record:
- Status
- Files Changed
- Components Changed
- Implementation Summary
- Skills Used
- Agent Used
- Tests / Validation Performed
- Acceptance Criteria Results
- Deviations
- Issues
- Follow-up Required

After all tasks, run final audit validation.
