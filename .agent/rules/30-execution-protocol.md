---
trigger: always_on
priority: critical
---

# 30-execution-protocol.md — The Workflow

## 🔄 Standard Operating Procedure

### Phase 1: Context & Plan

1. **Read**: `.context/active_state.md` and relevant Domain Rules.
2. **Plan**: For complex tasks, write an Artifact (Implementation Plan).
3. **Gate**: Wait for user approval if the plan involves major refactors.

### Phase 2: Execution (Atomic)

1. **Branch**: Not strictly required, but concept of "feature isolation" applies.
2. **Code**: Write code following `20-tech-stack.md`.
3. **Verify**: Run `npm run lint` and `npm run type-check` BEFORE saying "Done".

### Phase 3: Documentation & Handoff

1. **Log**: Update `.context/logs/adjustment_log.md`.
2. **Artifact**: Create a Walkthrough if the feature is visual.
3. **Self-Heal**: Update `README.md` if you changed how the app starts or builds.

## 🚨 Emergency Protocols

- **Build Fail**: STOP. Do not iterate blindly. Read the error. Fix the root cause.
- **Deploy Fail**: check `firebase-ssr-guard.md`. Check `package.json` engines.
