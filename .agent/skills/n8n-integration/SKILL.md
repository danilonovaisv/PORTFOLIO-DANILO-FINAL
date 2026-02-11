---
name: n8n-integration
description: Especialista em integração de workflows n8n com aplicações React/Next.js.
---

# n8n Integration Skill

## Contexto

O usuário (Danilo) possui um repositório de ferramentas para n8n (`n8n-workflow-builder-GPT`). Esta skill serve para conectar o portfólio a esses workflows.

## Capacidades

1. **Gerar Webhook Client:**
    - Ao receber a ID de um workflow n8n, crie um hook React (`useN8nWorkflow`) que encapsula a chamada `fetch` para o webhook.
    - Trate estados de `loading`, `error` e `success` automaticamente.

2. **Documentação Automática:**
    - Se o usuário fornecer um JSON de workflow do n8n, analise-o e gere uma página de documentação no portfólio explicando o que a automação faz.

3. **Integração Tweakpane:**
    - Se o workflow tiver inputs variáveis, sugira a criação de um painel de controle usando a biblioteca `tweakpane` para testar a automação diretamente do portfólio.
