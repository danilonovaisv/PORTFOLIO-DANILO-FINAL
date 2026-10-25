---
name: validate-audit
description: Validate Portfolio implementation work against an approved design audit and its acceptance criteria.
---

# /validate-audit

Read:
- original audit;
- implementation plan;
- completion information;
- current implementation.

Validate every implemented task independently.

Check applicable:
- visual result;
- UX behavior;
- interaction;
- motion;
- responsive behavior;
- keyboard behavior;
- accessibility;
- reduced motion;
- regressions;
- performance-sensitive behavior.

Compare actual results against the written acceptance criteria.
Do not mark an item complete solely because code exists.

Return per-task status:
- **PASS**
- **PASS WITH NOTES**
- **REQUIRES REVISION**
- **BLOCKED**

When revision is required, create a focused correction specification.
Do not introduce new design scope during validation.
Produce a final validation summary.
