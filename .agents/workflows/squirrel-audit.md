---
description: Audita rotas do portfoliodanilo.com localmente e corrige problemas
---

---
name: squirrel-audit
description: Audita rotas do portfoliodanilo.com localmente e corrige problemas arquiteturais da stack (Next.js, R3F, Framer Motion, Supabase).
---

# Workflow: Portfolio Stack Audit & Fix

## 1. Gatilho
Este workflow é ativado quando o usuário executa o comando `/squirrel-audit [ROUTE]`. Se `[ROUTE]` não for fornecido, assuma `sobre`.

## 2. Execução de Coleta de Dados (Terminal)
Execute estritamente os comandos abaixo no terminal integrado, aguardando a conclusão de cada um:
1. Execute a auditoria alvo: `AUDIT_ID=$(squirrel audit http://localhost:3000/[ROUTE] | tail -1)`
2. Gere o relatório em formato LLM e leia o output: `squirrel report $AUDIT_ID --format llm > .agent/temp_audit.md`

## 3. Análise Multi-Camada (Raciocínio)
Leia o arquivo `.agent/temp_audit.md`. Ignore falsos positivos comuns de WebGL e cruze os dados com a nossa stack:
- **Next.js App Router & Firebase Hosting:** Procure por componentes de cliente (`"use client"`) muito pesados que afetem o TBT (Total Blocking Time).
- **R3F & Three.js:** O relatório não verá o canvas. Vasculhe o código dos componentes da `[ROUTE]` e garanta que geometrias/materiais estão usando `useMemo` e que o `<Canvas>` usa `frameloop="demand"` (ou validação via Intersection Observer).
- **Framer Motion:** Verifique se as animações respeitam a *flag* `prefers-reduced-motion` e se não usam propriedades que causam *repaint* excessivo no DOM (limite-se a `transform` e `opacity`).
- **Supabase Storage:** Imagens e vídeos listados no relatório como não otimizados devem ser reescritos para usar a API de transformação de imagens do Supabase ou `next/image` com o *loader* correto.

## 4. Etapas de Resolução

### Fase A: Priorização e Plano
Apresente um plano estruturado focado em:
- Análise de Animações e Interações (Framer + R3F)
- Estrutura de Layout e Estilo (Tailwind)
- Implementação Técnica e Execução (Next.js)
Aguarde a minha aprovação para prosseguir.

### Fase B: Execução (High-Severity)
Após a aprovação, implemente as correções diretamente nos arquivos. Adicione comentários no código explicando o porquê da refatoração de performance.

### Fase C: Tradução para Stakeholders
Gere um arquivo `artifacts/audit-report-[ROUTE].md` contendo um resumo executivo dos problemas encontrados e resolvidos, escrito em termos simples (ROI, impacto no SEO, taxa de conversão e acessibilidade).

´´´´
#!/bin/bash
# file: scripts/audit-route.sh
ROUTE=${1:-sobre}
echo "Auditing http://localhost:3000/$ROUTE..."

AUDIT_ID=$(squirrel audit "http://localhost:3000/$ROUTE" | tail -1)
squirrel report "$AUDIT_ID" --format llm > temp_report.md

# Envia para a CLI do agente (ex: Claude Code / Antigravity CLI)
ag-ask "Leia o temp_report.md. Priorize os problemas de Next.js, R3F e Framer Motion. Crie um plano de correção e aguarde."
´´´´´´
