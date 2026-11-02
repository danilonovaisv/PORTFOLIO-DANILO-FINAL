---
name: plan-implementation
description: Convert an existing Portfolio design audit into an implementation plan for project IDE agents.
---

# /plan-implementation

Read the requested audit.

Before planning, verify that the target implementation still reasonably matches the context recorded by the audit.

Inspect current:
- source;
- relevant documentation;
- agents;
- skills.

If material changes make the audit unreliable, mark:
**AUDIT STATUS: STALE**

Explain the conflicting evidence and stop before producing unsafe implementation instructions.

Otherwise:
1. identify accepted findings;
2. identify dependencies;
3. discover relevant skills;
4. discover appropriate agents;
5. create implementation phases;
6. create independently executable tasks;
7. define acceptance criteria;
8. define validation procedures;
9. define rollback considerations.

Do not modify application code.
Never invent agents, skills, paths or components.
