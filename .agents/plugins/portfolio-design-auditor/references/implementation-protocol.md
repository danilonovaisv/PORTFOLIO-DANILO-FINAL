# Audit Implementation Protocol

## Boundary
- Audit is read-only.
- Implementation requires explicit instruction.

## Preflight
Before implementation verify:
1. Audit exists
2. Audit is approved
3. Target still exists
4. Relevant implementation has not materially changed
5. Required skills still exist
6. Recommended agents still exist or suitable alternatives are available

## Stale Audit
Mark an audit **STALE** when repository changes materially invalidate:
- target paths;
- component assumptions;
- architecture assumptions;
- design system assumptions;
- dependencies;
- task ordering.

Do not blindly implement a stale audit.

## Execution Model
Use:
`VERIFY → IMPLEMENT → VALIDATE → REPORT`
Repeat for each task.

## Task Isolation
- A task should not expand beyond its stated objective.
- Unexpected problems should be documented rather than silently expanding scope.

## Shared Component Protection
Before modifying a shared/global component identify:
- Consumers
- Potential regressions
- Whether a local override can solve the requirement
- Whether the audit explicitly justifies global change

## Dependency Policy
- Prefer existing project dependencies.
- Adding a new dependency requires explicit justification, bundle/runtime impact check, and review of existing alternatives.

## Motion Implementation
Always account for applicable:
- Desktop
- Touch
- Responsive
- Interruption
- Reduced Motion
- Performance (60 FPS mandate).

## Completion
Implementation is not complete because code was written.
It is complete when the relevant acceptance criteria have been validated.
