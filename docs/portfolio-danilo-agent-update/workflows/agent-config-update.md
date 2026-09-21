# Workflow: Agent Configuration Update

Trigger: install or reorganize project agent configuration.
Goal: reduce duplication without losing project-specific capability.

Steps:
1. Inventory all existing agent/skill/command/workflow/rule files.
2. Resolve actual target IDE capabilities.
3. Compare CURRENT vs PROJECT NOW vs this package.
4. Classify each component: KEEP / UPDATE / REMOVE / ADD / MERGE.
5. Preserve valid customizations.
6. Detect broken internal references and duplicated roles.
7. Apply additions/merges before removals.
8. Update routing, manifests, indexes and documentation.
9. Validate syntax/paths supported by the IDE.
10. Report every changed/preserved/not-applied file.

Guardrail:
No destructive overwrite/removal without evidence of replacement or explicit approval.
