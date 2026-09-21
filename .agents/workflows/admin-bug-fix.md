---
name: admin-bug-fix
description: Reproduce, fix, and regression-test an Admin bug with evidence while preserving existing data and permissions.
---

# Workflow: Admin Bug Fix

Trigger: Admin malfunction.
Goal: evidence-based fix with regression coverage.

Agents:
- Admin Reliability Specialist
- Database Sentinel (conditional)
- Quality Verification Specialist

Steps:
1. Reproduce exact failure.
2. Trace route/auth/session.
3. Trace mutation/data/storage if applicable.
4. Identify root cause.
5. Produce delta spec.
6. Implement smallest safe fix.
7. Add/update regression test.
8. Re-run exact reproduction.
9. Run supported quality gates.
10. Report residual risk.

Validation Gates:
- reproduction no longer fails;
- authenticated/unauthenticated behavior remains correct;
- no RLS weakening;
- relevant tests/build pass.

Failure Handling:
If environment or permission blocks verification, return NOT VERIFIED with blocker.

Completion Criteria:
Root cause documented, fix applied, regression test present, verification evidence recorded.
