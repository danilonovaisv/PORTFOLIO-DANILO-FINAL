---
name: audit
description: Audit an existing Portfolio Danilo page, section, component, interaction or animation without requiring an external reference.
---

# /audit

Perform a read-only Portfolio Design Audit.

1. Determine the target from the user’s request.
2. Inspect:
   - relevant `.context/DOCS-PORTFOLIO-PAGES` documentation;
   - actual implementation;
   - available agents and skills under `.agents`.
3. Load `apple-design` when available and relevant.
4. Use additional skills only when supported by the task.
5. Analyze relevant:
   - design;
   - UX;
   - UI;
   - interaction;
   - motion;
   - responsive behavior;
   - accessibility;
   - implementation quality.
6. Generate evidence-based findings.
7. Do not use arbitrary numeric scores.
8. Do not modify application code.

## Output

Generate:
- Current Experience
- Context Map
- Findings (with ID, target, priority P0-P3, observation, evidence, recommendation)
- Proposed Experience
- Technical Impact
- Selected Skills
- Selected Agents
- Implementation Plan
- Agent Tasks
- Acceptance Criteria
- Validation Plan
- Risks
- Rollback Considerations

Save or propose the resulting audit under `.context/audits/`.
