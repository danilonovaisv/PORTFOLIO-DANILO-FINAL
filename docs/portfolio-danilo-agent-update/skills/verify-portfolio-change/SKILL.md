# Verify Portfolio Change

## Purpose
Run evidence-based validation after a project change.

## Use When
Any Admin, public portfolio, project page, media, publishing, or agent-config change is claimed complete.

## Required Context
Change summary, expected behavior, supported project scripts/tests.

## Procedure
1. Map each requirement to at least one verification.
2. Run targeted checks first.
3. Run repository-supported type/lint/unit/E2E/build gates appropriate to scope.
4. For visual changes, verify mobile/tablet/desktop and interactive states.
5. For Admin changes, verify authenticated and unauthenticated paths.
6. Record commands/checks actually executed.
7. Report PASS, FAIL, or NOT VERIFIED — never infer PASS.
8. List residual risks.

## Output
Verification matrix with evidence.

## Failure Conditions
Environment unavailable, missing credentials, unsupported browser/test runner, or pre-existing unrelated failure.

## Security
Do not expose test secrets or production credentials.
