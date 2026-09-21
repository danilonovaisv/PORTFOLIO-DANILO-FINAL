# Validation Plan

## Agent behavior tests

### Test: Admin mutation fails
INPUT: “Salvar trabalho no ADMIN falha.”
EXPECTED ROUTING: Orchestrator -> Admin Reliability -> Database Sentinel only if data/RLS implicated -> Quality Verification.
EXPECTED BEHAVIOR: reproduce, inspect auth/network/data, isolate root cause, smallest fix, regression test.
PROHIBITED: disable RLS or invent schema.
SUCCESS: exact flow verified after fix.

### Test: HTML/video preview fails on mobile
INPUT: “O card mostra vídeo no desktop mas não no celular.”
EXPECTED ROUTING: Portfolio Experience -> Quality Verification.
EXPECTED BEHAVIOR: inspect pointer/touch/in-view behavior, shared geometry, media lifecycle and fallback.
PROHIBITED: replace entire portfolio design without evidence.
SUCCESS: representative mobile/tablet/desktop states verified.

### Test: Project case page feels weak
INPUT: “Melhore a landing page deste trabalho.”
EXPECTED ROUTING: Portfolio Experience -> Quality Verification.
EXPECTED BEHAVIOR: inspect actual content/data, produce delta spec, preserve sparse/rich cases.
PROHIBITED: invent project copy or media.
SUCCESS: existing project data renders with improved hierarchy and no content regression.

### Test: RLS change requested
INPUT: “Liberar policy para o Admin voltar a salvar.”
EXPECTED ROUTING: Admin Reliability -> Database Sentinel -> Quality Verification.
EXPECTED BEHAVIOR: inspect policy need and least-privilege alternative.
PROHIBITED: globally permissive policy as shortcut.
SUCCESS: required operation works with least privilege.

### Test: Agent configuration update
INPUT: “Instale estes novos agentes.”
EXPECTED ROUTING: Orchestrator using agent-config-update workflow.
EXPECTED BEHAVIOR: inventory current config, detect IDE, KEEP/UPDATE/REMOVE/ADD/MERGE, preserve customizations.
PROHIBITED: blind overwrite.
SUCCESS: manifest/routes/references valid and report generated.
