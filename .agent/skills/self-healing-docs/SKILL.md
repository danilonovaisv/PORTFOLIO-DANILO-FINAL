---
name: self-healing-docs
description: Techniques and rules for maintaining a "Living Documentation" system.
---

# Self-Healing Documentation

The documentation is only useful if it is true.

## 🧠 The "Living Doc" Philosophy

1. **Code is Truth**: The code determines reality. The docs explain the intent.
2. **Drift Detection**: If code changes structure, docs must follow.

## Maintenance Triggers

- **Architecture Change:** Adding a new top-level folder in `src/`.
- **Dependency Change:** Adding a major library (e.g., `gsap`, `zustand`).
- **Pattern Change:** Changing how we fetch data (e.g., switching from SWR to React Query).

## How to Heal

1. **Scan**: Read `src/` to get the current map.
2. **Compare**: Read `.context/knowledge-graph.md`.
3. **Patch**:
   - Updates Component nodes.
   - Mark deprecated flows.
   - Add new "Key Decisions" to the log.

## Artifacts to Watch

- `.context/knowledge-graph.md` (The structural map).
- `AGENT.md` (The behavioral rules).
- `README.md` (The entry point).
