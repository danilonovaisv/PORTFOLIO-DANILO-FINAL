# Layer 4: EXECUTION RULES (Workflow & Process)

> **MANDATORY**: Follow this lifecycle for every task.

## Phase 1: Planning (Architect Mode)

1. **Read Context:** `.context/active_state.md`, `task.md`.
2. **Plan:** If complex, write `implementation_plan.md`.
3. **Verify:** Ask user approval for destructive changes.

## Phase 2: Execution (Engineer Mode)

1. **Atomic Steps:** Edit 1 file -> Verify -> Edit next.
2. **Loki Mode:** If autonomous, update `task.md` continuously.
3. **Lint:** Run `npm run lint` before finishing.

## Phase 3: Verification (Sentinel Mode)

1. **Build:** Run `npm run build` for structural changes.
2. **Visual:** Check localhost.
3. **Artifact:** Create `walkthrough.md` to prove work.

## 🚨 Emergency Protocols

- **Build Fail:** Stop. Read error. Fix root cause. Do not guess.
- **Type Error:** Do not use `ts-ignore`. Fix the type.
