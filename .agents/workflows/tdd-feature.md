---
description: Protocolo de desenvolvimento orientado a testes (TDD) para novas funcionalidades ou correção de bugs críticos.
---

# Desenvolvimento Orientado a Testes (TDD)

1. Defina a interface do componente ou função em `@src/` antes de iniciar a implementação.
2. Crie o arquivo de teste unitário correspondente em `@tests/` (Jest/Vitest).
3. Execute o teste para confirmar a falha (Red phase):
   `// turbo pnpm test [path/to/test]`
4. Implemente o código mínimo necessário para fazer o teste passar (Green phase).
5. Refatore o código garantindo que os testes continuem passando e a cobertura mínima de 80% seja mantida.
6. Atualize `@.context/logs/adjustment_log.md` com a nova implementação validada.
