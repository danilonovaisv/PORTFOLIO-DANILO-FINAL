---
name: portfolio-design-audit
description: Audita paginas, secoes e componentes de portfolios com evidencias de design, UX, acessibilidade, interacao, responsividade e motion. Use para uma revisao ampla ou para transformar observacoes em findings priorizados; encaminhe problemas especializados aos skills do pacote.
metadata:
  portfolio-design-auditor-role: audit
  adaptation-version: 0.2.0
  source: portfolio-design-auditor
---

# Portfolio Design Audit

## O que faz

Examina uma experiencia de portfolio existente e produz poucos findings acionaveis, vinculados ao comportamento observado. Preserva a identidade do trabalho e separa problemas verificaveis de preferencias esteticas.

## Quando usar

Use quando o pedido envolve auditoria geral de uma pagina, secao, componente ou fluxo, ou quando ainda nao esta claro qual skill especializado resolve o problema. Para uma revisao apenas de motion, use `improve-animations`; para mobile web/PWA, use `mobile-native`.

## Quando não usar

Nao use para inventar um redesign sem contexto, copiar uma referencia externa, declarar testes de dispositivo que nao ocorreram ou tratar uma avaliacao visual isolada como prova de comportamento em runtime.

## Formato / contrato de uso

**Entrada:** alvo e objetivo do usuario; codigo, documentacao e interface disponiveis; restricoes do design system; viewports e dispositivos relevantes.

**Saida:** escopo e fontes examinadas, findings priorizados com evidencia e criterio de aceite, lacunas de verificacao e proximas acoes. Se o usuario pediu implementacao, execute as mudancas autorizadas e valide-as.

## Processo

1. Identifique rota, componentes, estilos, tokens, assets, interacoes, motion e dependencias do alvo. Verifique os caminhos no projeto; nao os infira.
2. Compare documentacao relevante com implementacao atual. Registre divergencias sem presumir que a documentacao esteja atualizada.
3. Observe a interface nos estados e tamanhos relevantes quando houver ambiente de execucao. Distinga observacao direta, inferencia a partir do codigo e preferencia.
4. Avalie apenas dimensoes pertinentes: hierarquia visual, tipografia, legibilidade, navegacao, feedback, foco/teclado, touch, responsividade, acessibilidade, motion e performance percebida.
5. Consulte skills especializados quando o problema exigir seus criterios. Use `apple-design` como lente de interacao, sem copiar sua aparencia. Referencias externas so entram quando resolvem um problema real e cabem na identidade do portfolio.
6. Priorize achados por impacto e confianca. Prefira um conjunto pequeno de findings fortes a uma lista extensa de possibilidades.

## Finding

Para cada achado, informe:

- ID, alvo, categoria e prioridade (`P0` bloqueio, `P1` problema significativo, `P2` melhoria relevante, `P3` polimento).
- Observacao e evidencia concreta (arquivo/linha, estado da interface, captura ou teste). Marque explicitamente o que nao foi verificado.
- Efeito para o usuario e recomendacao proporcional ao problema.
- O que preservar, area afetada, risco/complexidade, criterio de aceite e forma de validar.

Separe **problemas** de **oportunidades**. Nao aumente a prioridade por gosto pessoal. Em uma auditoria, mantenha o codigo do produto sem alteracoes; quando o pedido incluir correcao ou implementacao, a autorizacao do usuario para essa tarefa basta para executar o escopo solicitado.

## Encaminhamento

Consulte [SKILL-ROUTING.md](../../SKILL-ROUTING.md) para selecionar um skill especializado. O contexto historico do fluxo esta em [context.md](../../context.md); confirme qualquer caminho ou capacidade citada ali no projeto em analise.
