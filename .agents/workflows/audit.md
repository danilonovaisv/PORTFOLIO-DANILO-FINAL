---
name: audit
description: Auditoria estratégica completa do portfólio Danilo Novais com análise multidimensional de Design, Usabilidade, Performance, SEO, Motion e Acessibilidade (Ghost System).
---

# /audit: Auditoria Estratégica do Portfólio (Ghost System)

$ARGUMENTS

Executa uma auditoria estratégica estrita e orientada a evidências no portfólio de Danilo Novais (`portfoliodanilo.com`, repositório `PORTFOLIO-DANILO-FINAL`). 
Este workflow integra os fundamentos da skill `auditoria-estrategica-portfolio` e as capacidades especializadas do plugin `portfolio-design-auditor`, operando sob as diretrizes do **Ghost Design System** (`#0048ff` Ghost Blue, `#040013` Void Black, Ghost Easing `[0.22, 1, 0.36, 1]`, grid `.std-grid`).

A auditoria é estritamente **read-only** sobre o código de produção. Nenhuma modificação direta em `src/` ou alteração funcional deve ser executada durante as fases deste workflow.

---

## 🏛️ Princípios Fundamentais de Auditoria

1. **Zero Tolerance:** Qualquer quebra de regra crítica (P0) ou violação estrutural do Ghost System resulta em status **REJEITADO**. A auditoria não aprova código com falhas bloqueantes de acessibilidade, vazamento de segredos ou queda de performance severa.
2. **Fact-Based:** Proibido o uso de impressões subjetivas como "parece bom" ou "gostei do layout". Toda afirmação requer comprovação empírica (exemplo: "passou no teste [X]", "inspeção da tag [Y] na linha [Z]", "queda de framerate registrada em [W]").
3. **Traceable:** Cada achado (finding) deve apontar diretamente para um arquivo específico e número de linha rastreável, ou nó do DOM verificado.
4. **Evidence Framework:** Cada achado deve respeitar o pipeline formal de raciocínio:
   `OBSERVATION → PRINCIPLE → IMPACT → RECOMMENDATION → IMPLEMENTATION → VALIDATION`
5. **Classificação de Severidade Baseada em Impacto:**
   * **P0 (Blocker):** Falhas críticas que quebram renderização, expõem credenciais, impedem navegação ou travam a aplicação.
   * **P1 (Significativo):** Problemas de usabilidade severos, quebras de layout mobile, regressões visíveis de acessibilidade ou lentidão perceptível.
   * **P2 (Melhoria Relevante):** Oportunidades claras de consistência visual, microinterações ausentes ou otimizações técnicas importantes.
   * **P3 (Polimento):** Refinamentos cosméticos e micro-ajustes de espaçamento ou timing.
   * Proibido o uso de pontuações numéricas arbitrárias.
6. **Lente de Princípios Apple:** A skill `apple-design` atua estritamente como lente analítica de princípios (fluidez de interação, clareza, feedback tátil e previsibilidade). Não copiar a estética da Apple; a identidade Ghost prevalece.

---

## 🗺️ Matriz de Alinhamento: 7 Passos Estratégicos & 8 Dimensões

| Passo Estratégico (`auditoria-estrategica-portfolio`) | Dimensões do Design Auditor | Fase do Workflow Correspondente |
| :--- | :--- | :--- |
| **Passo 1:** Auditoria visual desktop e mobile | Visual Design, Typography, Responsive Design | Fase 1 (Baseline & Recon) e Fase 2 (Compliance Review) |
| **Passo 2:** Testes de acessibilidade e navegação | UX, Interaction, Accessibility | Fase 2 (Compliance Review) |
| **Passo 3:** Diagnóstico Lighthouse e Core Web Vitals | Engineering, Performance | Fase 3 (Functional Stress Test) |
| **Passo 4:** Revisão de WebGL, vídeos e animações | Motion, Interaction, Engineering | Fase 2 (Motion Compliance) e Fase 3 (WebGL Stress) |
| **Passo 5:** Validação técnica do sitemap e robots | Engineering, SEO | Fase 2 (Compliance Review) |
| **Passo 6:** Otimização de conteúdo e SEO dos cases | UX, Typography, Visual Design | Fase 1 (Asset Reconnaissance) e Fase 2 (Compliance Review) |
| **Passo 7:** Testes finais e regressão visual | Todas as 8 Dimensões | Fase 3 (Functional Stress Test) e Fase 4 (Certification) |

---

## 🟢 FASE 1: Asset Reconnaissance (Mapeamento de Contexto, Superfície e Conteúdo)

### Objetivo
Mapear com precisão cirúrgica os artefatos sob escopo, rotas ativas, componentes envolvidos, baseline de documentação em `.context/DOCS-PORTFOLIO-PAGES/`, estado do controle de versão e integridade de conteúdo/SEO.

### Agentes Atribuídos
* `portfolio-context-analyst` (Plugin / `.agents/agents/portfolio-context-analyst.md`): Constrói o mapa factual da implementação antes de qualquer avaliação, inspecionando rotas, árvores de componentes e especificações em `.context/DOCS-PORTFOLIO-PAGES/`.
* `ghost-architect` (`.agents/agents/ghost-architect.md`): Analisa os limites arquiteturais do Next.js 16 App Router, fronteiras de Server e Client Components (`"use client"`), e dependências externas.
* Nota de Auditoria Legada: `explorer-agent` -> `NO MATCHING SPECIALIZED AGENT FOUND` (função assumida e modernizada por `portfolio-context-analyst`).

### Skills Atribuídas
* `portfolio-design-audit` (`.agents/plugins/portfolio-design-auditor/skills/portfolio-design-audit/`): Mapeia o alvo completo da página, seção, componente ou fluxo de UX.
* `seo-fundamentals` (`.agents/skills/seo-fundamentals/`): Avalia a estrutura de conteúdo, semântica dos cases de projeto e metadados.
* `clean-code` (`.agents/skills/clean-code/`): Mapeia dívidas técnicas estruturais, acoplamento desnecessário e duplicações.

### Dimensões Auditadas
* Visual Design (identificação de grid e componentes base)
* Engineering (mapeamento de dependências, tipos e árvore de arquivos)
* Responsive Design (verificação de componentes com variação responsiva)

### Checklist de Tarefas Factuais
* [ ] Inspeção de `git status` e árvore de arquivos modificados ou sob auditoria.
* [ ] Confronto do código real contra a documentação oficial em `.context/DOCS-PORTFOLIO-PAGES/` (exemplo: `01-HOME`, `02-SOBRE`, `03-PORTFOLIO`, `04-ADMIN`).
* [ ] Mapeamento do inventário de conteúdo dos cases de portfólio (Passo 6 da Skill): checagem de títulos H1/H2, textos descritivos, tags de metadados e assets reais no Supabase Storage (cumprindo a política Zero Placeholder).
* [ ] Verificação de boundaries de renderização: identificação exata de Server Components vs Client Components.

### Contrato de Saída da Fase
* **Context Map** completo do alvo auditado (rotas, arquivos-fonte, componentes compartilhados, documentação de referência).

---

## 🟡 FASE 2: Compliance Review (Revisão Heurística, Design System, Motion e Acessibilidade)

### Objetivo
Executar inspeção profunda de conformidade técnica, estética e de experiência do usuário contra os padrões do Ghost System, diretrizes WCAG, princípios de interação e integridade de SEO técnico.

### Agentes Atribuídos
* `design-auditor` (Plugin / `.agents/agents/design-auditor.md`): Conduz a auditoria heurística multidimensional, convertendo observações empíricas em achados acionáveis no schema canônico.
* `audit-sentinel` (`.agents/agents/audit-sentinel.md`): Audita conformidade ao grid `.std-grid`, hierarquia de z-index (`z-indices.ts`), regras de segurança e ausência de segredos em código.
* `spectral-artist` (`.agents/agents/spectral-artist.md`): Audita a composição visual WebGL, shaders Three.js, equilíbrio entre a camada 3D e o conteúdo editorial, e visibilidade contra Void Black (`#040013`).
* `motion-choreographer` (`.agents/agents/motion-choreographer.md`): Audita curvas de aceleração do Framer Motion, sincronização com Lenis scroll e respeito ao Ghost Easing `[0.22, 1, 0.36, 1]`.
* `mobile-developer` (`.agents/agents/mobile-developer.md`): Avalia conformidade mobile-first, gestures, comportamentos de touch e dimensões de tap targets.
* Nota de Auditoria Legada: `security-auditor` -> `NO MATCHING SPECIALIZED AGENT FOUND` (auditoria de segurança de código e segredos executada por `audit-sentinel` e `ghost-architect`).

### Skills Atribuídas
* `portfolio-design-audit`: Auditoria abrangente da página, seção ou jornada.
* `apple-design` (`.agents/plugins/portfolio-design-auditor/skills/apple-design/`): Lente de avaliação de princípios de clareza, fluidez e feedback tátil (sem clonagem estética).
* `improve-animations` (`.agents/plugins/portfolio-design-auditor/skills/improve-animations/`): Auditoria do sistema global de motion, coreografia e continuidade.
* `find-animation-opportunities` (`.agents/plugins/portfolio-design-auditor/skills/find-animation-opportunities/`): Identificação de lacunas de feedback interativo onde o movimento agregaria clareza.
* `review-animations` (`.agents/plugins/portfolio-design-auditor/skills/review-animations/`): Análise localizada e cirúrgica de microinterações, transições de estado e timing.
* `animation-vocabulary` (`.agents/plugins/portfolio-design-auditor/skills/animation-vocabulary/`): Normalização precisa da taxonomia de motion nos achados.
* `mobile-native` (`.agents/plugins/portfolio-design-auditor/skills/mobile-native/`): Auditoria da camada web mobile (viewport units, safe areas, sticky hover, tap highlight).
  * *Nota de Roteamento:* Para eventuais referências a `mobile-design` -> `NO MATCHING SKILL FOUND` (a skill canônica do projeto é `mobile-native`).
* `a11y-debugging` (`.agents/skills/a11y-debugging/`): Auditoria rigorosa de acessibilidade WCAG 2.2 (contraste de cor, foco visível, teclado, tags ARIA).
* `ghost-r3f-optimization` (`.agents/skills/ghost-r3f-optimization/`): Verificação de fallbacks HTML para WebGL e ausência de alocações indevidas.

### Dimensões Auditadas
* Visual Design
* Typography
* UX
* Interaction
* Motion
* Accessibility
* Responsive Design
* Engineering

### Checklist de Tarefas Factuais
* [ ] **Design Visual & Tipografia (Passo 1):** Verificação de contraste de cores (`#0048ff` Ghost Blue sobre `#040013` Void Black, sem tons de violeta/púrpura não autorizados). Uso de `clamp()` para tipografia fluida com 'TT Norms Pro'.
* [ ] **Acessibilidade & Navegação (Passo 2):** Teste de navegação 100% por teclado (tab order lógico, indicador de foco visível). Verificação de atributos ARIA em menus, modais e botões. Suporte mandatório a `prefers-reduced-motion`.
* [ ] **Revisão de WebGL e Motion (Passo 4):** A camada 3D/partículas da Hero não compete com nem ofusca o texto editorial. Vídeos possuem posters estáticos otimizados. Transições respeitam o easing `[0.22, 1, 0.36, 1]`.
* [ ] **SEO Técnico (Passo 5):** Inspeção de `src/app/sitemap.ts` (ou `sitemap.xml`) e `src/app/robots.ts` (ou `robots.txt`). Garantir que rotas críticas não estejam bloqueadas e que não haja URLs quebradas.
* [ ] **Segurança e Higiene:** Verificação de variáveis de ambiente (ausência de chaves privadas em bundles do cliente) e ausência de tipagens `any` permissivas em TypeScript.

### Contrato de Saída da Fase
* Conjunto de **Findings** formatados estritamente sob o Finding Schema canônico (AUD-[NUMBER]), com categoria, prioridade P0-P3, evidência factual e princípios referenciados.

---

## 🔵 FASE 3: Functional Stress Test (Estresse Funcional, Performance e Resiliência)

### Objetivo
Submeter a aplicação a testes empíricos de performance em runtime, verificação de Core Web Vitals, checagem de boundaries de erro e estabilidade de renderização WebGL a 60 FPS.

### Agentes Atribuídos
* `quality-verification-specialist` (`.agents/agents/quality-verification-specialist.md`): Conduz validação independente de testes estáticos, typecheck, linting e suites funcionais.
* `spectral-artist` (`.agents/agents/spectral-artist.md`): Profiling da render loop do R3F, monitoramento de draw calls (limite < 100), uso de texturas e descarte de geometrias/materiais (`dispose`).
* `audit-sentinel` (`.agents/agents/audit-sentinel.md`): Validação dos gates de Core Web Vitals (LCP, INP, CLS) e inspeção de boundaries de erro (`error.tsx`).
* Nota de Auditoria Legada: `test-engineer` -> `NO MATCHING SPECIALIZED AGENT FOUND` (função assumida por `quality-verification-specialist`).

### Skills Atribuídas
* `verify-portfolio-change` (`.agents/skills/verify-portfolio-change/`): Executa suite padronizada de checagem técnica (build check, linting, integridade de tipos).
* `web-performance-optimization` (`.agents/skills/web-performance-optimization/`): Análise de LCP, CLS, INP, eliminação de gargalos de render-blocking e bundle budgets.
* `memory-leak-debugging` (`.agents/skills/memory-leak-debugging/`): Diagnóstico de retenção de memória em animações contínuas e event listeners no unmount.
* `ghost-r3f-optimization` (`.agents/skills/ghost-r3f-optimization/`): Garantia empírica do Mandato de 60 FPS e ausência de alocações (`new Vector3`) dentro de hooks `useFrame`.
* `systematic-debugging` (`.agents/skills/systematic-debugging/`): Diagnóstico de causa raiz caso anomalias de runtime sejam detectadas.

### Dimensões Auditadas
* Engineering
* Motion
* Interaction
* Responsive Design

### Checklist de Tarefas Factuais
* [ ] **Diagnóstico Lighthouse & Core Web Vitals (Passo 3):**
  * LCP < 2.5s (otimização de imagens hero, preloads corretos, formatos WebP/AVIF).
  * INP < 200ms (ausência de blocking tasks pesadas no main thread durante interações).
  * CLS < 0.1 (dimensões explícitas `aspect-ratio`, width/height em mídias para evitar layout shift).
  * Budgets: JavaScript inicial gzip < 300 KB, CSS < 100 KB.
* [ ] **Mandato de 60 FPS em WebGL (Passo 4):**
  * Cenas 3D isoladas em `<Canvas>` com `ssr: false`.
  * Fallback HTML renderizável caso WebGL context seja perdido.
  * Reutilização estrita de vetores/matrizes fora do render loop.
* [ ] **Stress Test de Error Boundaries:**
  * Toda rota principal possui `error.tsx` configurado.
  * Validação de integridade de formulários e fallbacks de carregamento (`loading.tsx`).
* [ ] **Verificação de Tipos e Linting (Passo 7 parcial):**
  * Execução em modo dry-run de checagem de tipos TypeScript sem quebras.

### Contrato de Saída da Fase
* Relatório empírico de estresse funcional com métricas de Core Web Vitals, contagem de draw calls, evidências de estabilidade ou registros de falhas técnicas.

---

## 🔴 FASE 4: Certification, Implementation Planning & Master Walkthrough

### Objetivo
Sintetizar as evidências coletadas, validar a consistência dos achados, estruturar o plano de implementação dependente (sem alterar código nesta fase) e emitir a certificação conclusiva da auditoria.

### Agentes Atribuídos
* `implementation-planner` (Plugin / `.agents/plugins/portfolio-design-auditor/agents/implementation-planner.md`): Converte findings aprovados em pacotes de trabalho isolados e sequenciados para futuros workflows de implementação (`/implement-audit` ou `/plan-implementation`).
* `audit-validator` (Plugin / `.agents/plugins/portfolio-design-auditor/agents/audit-validator.md`): Valida os achados contra critérios de aceitação e checa potenciais riscos de regressão visual.
* `quality-verification-specialist` (`.agents/agents/quality-verification-specialist.md`): Emite o parecer técnico final e assina o status da auditoria.
* Nota de Auditoria Legada: `quality-inspector` -> `NO MATCHING SPECIALIZED AGENT FOUND` (função formalmente assumida por `quality-verification-specialist` e `audit-validator`).

### Skills Atribuídas
* `verification-before-completion` (`.agents/skills/verification-before-completion/`): Impõe gate de evidência factual antes de homologar o relatório final.
* `pick-ui-library` (`.agents/plugins/portfolio-design-auditor/skills/pick-ui-library/`): Fornece análise de dependências caso o plano recomende novas bibliotecas auxiliares.
* `prototype` (`.agents/plugins/portfolio-design-auditor/skills/prototype/`): Estrutura alternativas arquiteturais e cenários de teste para achados de alto risco.
* `writing-plans` (`.agents/skills/writing-plans/`): Constrói a estrutura sequencial e atômica do plano de remediação.

### Dimensões Auditadas
* Todas as 8 Dimensões consolidadas.

### Checklist de Tarefas Factuais
* [ ] Triagem final de severidade dos achados (P0, P1, P2, P3).
* [ ] Validação da regra Zero Tolerance: se houver 1 finding P0 não mitigado, o status final é obrigatoriamente **AUDIT REJECTED**.
* [ ] Mapeamento de dependências e ordem de resolução para execução futura.
* [ ] Planejamento de regressão visual (Passo 7): definição dos cenários de teste que garantirão que as correções futuras não quebrem o Ghost System.
* [ ] Geração do documento mestre de auditoria.

### Contrato de Saída da Fase
* Artefato oficial salvo em `.context/audits/AUDIT-[TARGET]-[DATA].md` estruturado segundo a seção de saída formal descrita abaixo.

---

## 📋 Estrutura Canônica do Relatório de Auditoria

O relatório gerado ao final do workflow deve ser salvo em `.context/audits/AUDIT-[TARGET]-[DATA].md` com a seguinte estrutura de seções:

```markdown
# Auditoria Estratégica: [Nome do Alvo/Página]

## 1. Current Experience
[Resumo factual da experiência atual observada, sem suposições]

## 2. Context Map
[Mapeamento de rotas, componentes-chave, assets do Supabase e documentação em .context/DOCS-PORTFOLIO-PAGES]

## 3. Findings
[Lista de achados estruturados sob o schema canônico abaixo]

### AUD-[NUMBER] — [Título Resumido]
- **Target**: [Página, seção, componente ou comportamento exato]
- **Category**: [Visual Design | Typography | UX | Interaction | Motion | Accessibility | Responsive | Engineering]
- **Priority**: [P0 | P1 | P2 | P3]
- **Type**: [Issue | Opportunity]
- **Observation**: [Descrição factual do comportamento atual]
- **Evidence**: [Fonte da observação: arquivo, linha de código, seletor CSS, medição]
- **Relevant Principle**: [Princípio do Ghost System ou padrão de design violado]
- **Reference Principle**: [Princípio derivado de referência externa ou lente Apple Design, se aplicável]
- **Why It Matters**: [Impacto direto na experiência, usabilidade ou performance]
- **Recommendation**: [Comportamento ideal esperado]
- **Preserve**: [Aspectos da identidade Ghost que devem ser mantidos intactos]
- **Do Not Copy**: [Características de referências externas que NÃO devem ser replicadas]
- **Affected Components**: [Lista de componentes verificados]
- **Skills**: [Skills do repositório/plugin necessárias para a eventual remediação]
- **Agent**: [Agente especializado encarregado da eventual remediação]
- **Effort**: [LOW | MEDIUM | HIGH]
- **Risk**: [LOW | MEDIUM | HIGH]
- **Acceptance Criteria**: [Critérios objetivos e mensuráveis de aceitação]
- **Validation**: [Instruções de como validar a correção]

## 4. Proposed Experience
[Visão holística da experiência após a resolução dos achados prioritários]

## 5. Technical Impact
[Impacto na arquitetura, bundle size, consumo de CPU/GPU e manutenção de código]

## 6. Selected Skills
[Inventário das skills ativadas durante a auditoria e recomendadas para a implementação]

## 7. Selected Agents
[Inventário dos agentes ativados durante a auditoria e recomendados para a implementação]

## 8. Implementation Plan
[Plano sequenciado e dependente para remediação futura via /implement-audit]

## 9. Agent Tasks
[Divisão de tarefas atômicas distribuídas por agente especializado]

## 10. Acceptance Criteria
[Critérios globais de liberação da versão auditada]

## 11. Validation Plan
[Roteiro de testes de validação funcional, visual e de acessibilidade]

## 12. Risks
[Avaliação de riscos de efeitos colaterais e regressões]

## 13. Rollback Considerations
[Estratégia de reversão e salvaguardas para as correções planejadas]
```

---

## 🔀 Contrato de Roteamento de Skills e Resolução de Conflitos

Ao executar o workflow e planejar tarefas, aplique a regra da **skill mais estreita** (Narrowest Skill Principle):

1. **Auditoria de página, seção, componente ou fluxo de UX:** `portfolio-design-audit`
2. **Sistema global de motion e coreografia:** `improve-animations`
3. **Lacunas e oportunidades de motion:** `find-animation-opportunities`
4. **Comportamento e plataforma mobile web:** `mobile-native`
   * Se consultado `mobile-design`: indicar `NO MATCHING SKILL FOUND (usar mobile-native)`
5. **Revisão cirúrgica de microinterações de motion:** `review-animations`
6. **Padronização de taxonomia de movimento:** `animation-vocabulary`
7. **Avaliação e seleção de dependências:** `pick-ui-library`
8. **Exploração de protótipos para mitigar riscos:** `prototype`
9. **Lente de interação fluida:** `apple-design`

### Ordem de Resolução de Conflitos:
1. Evidência factual do código e requisitos aprovados do projeto.
2. Diretrizes do Ghost Design System e linguagem visual do portfólio.
3. Skill especializada mais restrita relevante ao problema.
4. `apple-design` apenas como lente avaliativa de princípios de usabilidade.
5. Referências visuais externas somente quando comprovadamente transferíveis sem corromper a identidade Ghost.
