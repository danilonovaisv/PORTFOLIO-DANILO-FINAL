---
name: loki-orchestrator
description: Skill to enable deep reasoning and plan-first execution.
---

# Loki Orchestrator Skill

Trigger: "Loki Mode", "Full Feature", "Plan and Execute"

## Objectives

1. Enable deep reasoning mode for complex tasks.
2. Force creation of a `PLAN.md` artifact before writing any code.

## Action Steps

1. **Analyze Request**: deeply understand the user's intent and the complexity of the task.
2. **Create Plan Artifact**:
    - Create or update a plan file (e.g., `docs/plans/[feature_name].md` or `PLAN.md`).
    - The plan MUST include:
        - **Goal**: Clear objective of the feature/refactor.
        - **Architecture**: Description of components and data flow.
        - **Steps**: detailed, step-by-step checklist of implementation tasks.
        - **Verification**: How to test/verify the changes (e.g., "Check 60fps", "Verify mobile layout").
3. **Review**: Present the plan to the user.
4. **Wait**: Do NOT proceed with code implementation until the plan is approved (or implicitely agreed to by the user asking to proceed).
