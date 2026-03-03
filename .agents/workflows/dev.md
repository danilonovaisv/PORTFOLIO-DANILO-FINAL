---
description: Standard Development Loop
---

# 🛠️ Standard Development Loop (DEV)

**Objective**: Execute coding tasks with high determinism and adherence to the 3-Layer Architecture.

## 1. Inputs

- User Request / Issue ID
- `task.md` (Task Tracking)
- `.context/active_state.md` (Current State)

## 2. Process (The Loop)

### Phase A: Plan

1. **Context Loading**: Read `.agent/rules/` and `.context/`.
2. **Design**: Create `docs/PLAN-[ID].md` if task > 5 files.
3. **Approval**: Wait for user if "Complex" tag is present.

### Phase B: Execution (Deterministic)

1. **Branch**: `git checkout -b feature/[name]`
2. **Code**: Implement changes.
3. **Validation**:
   - `npm run lint` (Must pass)
   - `npm run type-check` (Must pass)
   - `npm run test` (Relevant units must pass)

### Phase C: Review

1. **Self-Correction**: Fix lint/type errors immediately.
2. **Docs**: Update `.context/` files to match new code.

## 3. Execution Layer Scripts

- `npm run dev` : Local Server
- `npm run lint` : Static Analysis
- `npm run type-check` : Type Safety
- `npm run build` : Production Build Verification

## 4. Exit Criteria

- [ ] No lint errors.
- [ ] No type errors.
- [ ] Build succeeds.
- [ ] `.context` updated.

## 5. Artifacts

- Source Code Changes
- `docs/PLAN-[ID].md` (Optional)
- Updated `task.md`

## 6. Logs

- Commit message following Protocol.
- `.context/logs/adjustment_log.md` entry.
