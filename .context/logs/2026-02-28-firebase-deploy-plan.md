# Implementation Plan — Firebase Deploy Permission Failure

## Contexto
Pipeline falhando no step de deploy com erro de acesso ao projeto Firebase.

## Plano de implementação
1. Remover acoplamento ao project id hardcoded no workflow de deploy.
2. Resolver `project_id` dinamicamente (secret explícito -> service account autenticada -> `.firebaserc`).
3. Adicionar validação prévia de acesso da Service Account ao projeto resolvido.
4. Usar o mesmo project id resolvido no comando `firebase deploy` e mensagem de sucesso.
5. Registrar achado em `AUDIT_PENTEST.md` para rastreabilidade operacional.

## Critérios de validação
- Workflow YAML válido.
- Fluxo falha cedo com mensagem acionável quando não houver permissão.
- Deploy usa o mesmo projeto autenticado para evitar mismatch de credenciais.
