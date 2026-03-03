---
description: Project Management Loop
---

# 📅 Project Management Loop (PM)

**Objective**: High-level orchestration, state management, and roadmap alignment.

## 1. Inputs

- New User Requests
- Backlog items
- `task.md` status

## 2. Process (The Loop)

### Phase A: Intake

1. **Clarify**: Use Socratic questioning if vague.
2. **Category**: Classify as `feat`, `fix`, `chore`, `arch`.

### Phase B: Planning

1. **Breakdown**: Split into atomic tasks.
2. **Update**: `task.md` with new items.
3. **Roadmap**: Update `SITEMAP.md` or `ARCHITECTURE.md` if structural.

### Phase C: Handoff

1. **Assign**: Select Workflow (`dev.md`, `qa.md`).
2. **Boundary**: Set `task_boundary` for the agent.

## 3. Execution Layer Scripts

- `cat task.md`
- `ls -R docs/`

## 4. Exit Criteria

- [ ] `task.md` reflects reality.
- [ ] User understands the plan.

## 5. Artifacts

- Updated `task.md`.
- `docs/ARCH-DECISION-[ID].md` (if architectural change).

## 6. Logs

- Session Summary.
