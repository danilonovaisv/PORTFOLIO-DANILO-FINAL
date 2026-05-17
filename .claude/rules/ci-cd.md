# CI/CD Guidelines & Automation

## Descrição

Regras e diretrizes para o comportamento e a configuração das automações de Integração Contínua e Deploy Contínuo (CI/CD), com foco no GitHub Actions e Firebase Hosting.

## Diretrizes

- ✅ Sempre inclua a variável de ambiente `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` no escopo global do job (`env:`). Isso garante que o runner execute ações desatualizadas (como `actions/checkout@v4` ou `actions/setup-node@v4` no Node.js 20) forçadamente sob a engine do Node 24, mitigando os avisos de depreciação do GitHub Actions e garantindo compatibilidade futura.
- ✅ Sempre adicione a flag experiemental `FIREBASE_CLI_EXPERIMENTS: webframeworks` como variável de ambiente no step de execução do comando `firebase-tools deploy`.
- ✅ Sem essa flag experimental do Firebase CLI, os deploys de Next.js (App Router) falharão em ambientes headless ou de CI/CD que não suportam _prompts_ interativos, gerando `exit code 1`.

## Exemplos

### Workflow Deploy Firebase (GitHub Actions)

```yaml
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    env:
      # Mitiga avisos de depreciação do Node.js 20 nas Actions, forçando uso do Node 24
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

    steps:
      # ... passos anteriores ...

      - name: Deploy to Firebase Hosting
        env:
          FIREBASE_PROJECT_ID: portfolio-danilo-novais
          FIREBASE_CLI_EXPERIMENTS: webframeworks
          # ... outras credenciais ...
        run: |
          pnpm dlx firebase-tools deploy --only hosting --project "$FIREBASE_PROJECT_ID"
```
