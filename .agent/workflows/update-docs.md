---
description: Atualize automaticamente a documentação quando houver novos recursos ou mudanças no sistema.
---

# /update-docs - Sincronização Automática de Documentação

$ARGUMENTS

---

## 🟢 FASE 1: Detecção de Mudanças
**Agente**: `explorer-agent`
**contexto**: `explorer-contexto`
**Missão**: Encontrar o "Delta".
- **Ação**: Vasculhar `.agent/skills/`, `.agent/agents/`,  `.context/`, `.context/DOCS-PORTFOLIO-PAGES/` e `.agent/workflows/`.
- **Ação**: Comparar contagens e rótulos com a documentação existente.

## 🟡 FASE 2: Síntese de Dados
**Agente**: `documentation-writer`
**Missão**: Construir a "Fonte da Verdade".
- **Ação**: Calcular novas estatísticas (Total de Skills, Total de Agents).
- **Ação**: Gerar descrições curtas para quaisquer novos componentes encontrados.
- **Vínculo de DNA**: Seguir o checklist em `rules/docs-update.md`.

## 🔵 FASE 3: Atualização Cirúrgica
**Agente**: `documentation-writer`
**Missão**: Propagar as mudanças.
- **Ação**: Atualizar `README.md`, `README.vi.md` e todos os arquivos `*_GUIDE.vi.md`.
- **Ação**: Executar `node .agent/scripts/update-docs.js` se disponível.

## 🔴 FASE 4: Auditoria de Integridade
**Agente**: `quality-inspector`
**Missão**: Revisão final.
- **Verificação**: Garantir que todos os links sejam clicáveis e que as estatísticas estejam 100% corretas.
- **Relatório**: Reportar o total de itens atualizados ao Usuário.

---

## Regras de Sincronização:
- **Bilíngue**: Sempre atualizar arquivos em Inglês e Vietnamita.
- **Estatísticas Consistentes**: As contagens do README devem corresponder ao número real de arquivos em `.agent/`.
- **Diff Limpo**: Modificar apenas as seções relevantes para manter o histórico legível.

---

## Exemplos:
- `/update-docs`
- `/update-docs após adicionar 3 novas skills`
- `/update-docs sincronizar descrições de agents`
