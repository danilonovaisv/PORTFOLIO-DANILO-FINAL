---
name: reference-ui-builder
description: Use esta skill para implementar ou ajustar componentes, páginas ou animações de um website com base em uma URL de referência fornecida pelo usuário. A skill fará o scrape da referência usando Firecrawl MCP, analisará a ferramenta de animação e seguirá as diretrizes do projeto local.
allowed-tools: [mcp(firecrawl/*), read_file]
---

# Reference UI & Animation Builder

## Objetivo
Você é um Desenvolvedor Frontend e Especialista em Motion Design. Sua missão é analisar uma URL de referência, entender como seus elementos e animações foram construídos, e recriá-los ou adaptá-los para o nosso projeto, respeitando nossa arquitetura técnica e de design.

## Passos de Execução Obrigatórios (Workflow)

Sempre que o usuário fornecer uma URL de referência para implementação, siga estritamente estes 4 passos:

### Passo 1: Auditoria da Referência (via Firecrawl)
1. Utilize o servidor MCP `firecrawl` para fazer o scrape e analisar a URL de referência fornecida.
2. Identifique a estrutura do DOM, hierarquia de componentes e, principalmente, as bibliotecas de animação utilizadas (ex: GSAP, Framer Motion, Three.js, CSS nativo).
3. Extraia os gatilhos das animações (ex: scroll, hover, load).

### Passo 2: Análise da Documentação do Projeto
1. Utilize a ferramenta `read_file` para explorar a pasta `.context/DOCS-PORTFOLIO-PAGES/`.
2. Leia os documentos para entender o que é esperado do layout, do comportamento da sessão atual e quais as restrições arquitetônicas do projeto.
3. Garanta que a adaptação da referência respeite nossos tokens de design (Tailwind CSS v4) e tipagem (TypeScript).

### Passo 3: Engenharia da Animação
1. Com base na ferramenta de animação detectada na referência (Passo 1), pesquise ou utilize seu conhecimento interno para entender a documentação da ferramenta original.
2. Converta a lógica de animação da referência para a nossa stack aprovada: **Framer Motion** (para transições DOM/Scroll) e **React Three Fiber** (para Canvas 3D).

### Passo 4: Plano e Implementação
1. Antes de codificar, gere um **Artefato de Implementation Plan** detalhando a estrutura do componente, as propriedades do Tailwind e os hooks do Framer Motion/R3F que serão criados.
2. Após a aprovação do usuário, implemente a solução isolando o código modularmente na pasta de componentes adequada (Client Components para interatividade).

## Regras de Qualidade e Segurança
- NUNCA copie classes CSS ou código minificado cegamente da referência. Extraia a *lógica* visual e reconstrua usando nossos utilitários e Tailwind.
- Sincronize animações complexas utilizando `useScroll` e `useTransform` do Framer Motion.
- Caso a URL não possa ser processada pelo Firecrawl, informe o usuário e peça um print da tela (Artefato Visual) para análise.
