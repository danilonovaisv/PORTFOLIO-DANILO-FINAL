# Task Plan

## Goal

Corrigir integralmente a seção `/sobre` -> `O Que Me Move` para restaurar:

- intro cronológica correta;
- visibilidade do `BeliefFixedHeader`;
- visibilidade real do `Ghost 3D`;
- sincronização entre texto e background;
- cobertura de teste para as regressões centrais.

## Acceptance Criteria

1. Ao entrar na seção, apenas a frase 1 aparece.
2. O `BeliefFixedHeader` fica legível na intro.
3. O Ghost 3D aparece visualmente em desktop e mobile.
4. O background muda em sincronia com a frase ativa.
5. O teste E2E cobre intro, header e Ghost.
6. Documentação espelho e log de auditoria permanecem atualizados.

## Phases

### Phase 1 - Root cause
- [ ] Confirmar causa do skip da intro
- [ ] Confirmar causa da invisibilidade do Ghost
- [ ] Confirmar causa do header apagado

### Phase 2 - Implementation
- [ ] Unificar timeline da seção
- [ ] Corrigir header fixo
- [ ] Corrigir renderer do Ghost
- [ ] Reconciliar z-index e camadas

### Phase 3 - Tests
- [ ] Atualizar E2E da seção
- [ ] Rodar E2E alvo
- [ ] Fazer captura visual desktop/mobile

### Phase 4 - Wrap-up
- [ ] Atualizar progress/findings
- [ ] Consolidar resultado final

## Notes

- Não repetir tentativas cegas no renderer 3D.
- Se o renderer customizado continuar invisível, usar o renderer estável baseado em `primitive(scene)`.
