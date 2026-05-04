---
description: Roteiro TDD e SDD guiando a implementação autônoma através das Fases Red-Green-Refactor.
---

# Desenvolvimento de Feature (TDD/SDD)

1. Assimile a constituição do projeto em `@.specify/memory/constitution.md` para internalizar regras de estilo, arquitetura e limites da nova funcionalidade.
2. **FASE RED:** Desenvolva testes unitários/integração usando o framework de testes. Crie mocks robustos para abstrair o Firebase Hosting e o Supabase.
3. Tente executar a suíte de testes (validação de falha exigida):
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/vitest run --passWithNoTests`
4. **FASE GREEN:** Codifique a lógica central dentro de `@src/app` e `@src/components`, respeitando o ecossistema Server-First do Next.js 15 e estilização responsiva via Tailwind CSS.
5. **FASE REFACTOR:** Re-execute os testes para certificar sucesso de ponta a ponta e refatore a legibilidade do código:
   `// turbo /Users/danilonovais/.local/bin/node node_modules/.bin/vitest run`
6. Ao finalizar o refactoring, chame `/performance` e avalie possíveis gargalos antes do stage de commit.
