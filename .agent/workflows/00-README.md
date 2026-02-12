# Agent Workflows

Este diretório contém workflows automatizados para tarefas comuns do projeto.

## Estrutura

- Cada arquivo `.md` ou `.yaml` representa um workflow específico
- Workflows podem ser invocados pelo agente para automatizar tarefas repetitivas
- Organize workflows por funcionalidade (ex: `deployment.md`, `testing.md`, `code-review.md`)

## Exemplo de Uso

Crie arquivos markdown descrevendo workflows:

```markdown
# Deployment Workflow

1. Run tests: `pnpm test`
2. Build project: `pnpm build`
3. Verify build output
4. Deploy to production: `pnpm deploy`
```
