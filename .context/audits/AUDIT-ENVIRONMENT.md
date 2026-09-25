# 🎨 Ambiente de Auditoria de Design & Animação — Ghost System

Este arquivo estabelece o ambiente e o contexto operacional para execução de auditorias de design, experiência de usuário (UX/UI), interatividade e animação no ecossistema do **Portfolio Danilo Novais** via plugin `portfolio-design-auditor`.

---

## 📌 1. Fontes da Verdade & Contexto Arquitetural

Toda auditoria deve ser estritamente fundamentada em evidências reais do código e alinhada com as especificações documentadas:

1. **Documentação por Página / Seção:**
   - [DOCS-PORTFOLIO-PAGES](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.context/DOCS-PORTFOLIO-PAGES):
     - `01-HOME`: Hero 3D, Projetos em destaque, Filosofia e Atmosfera Ghost
     - `02-SOBRE`: Trajetória, Editorial Manifesto, Linha do tempo
     - `03-PORTFOLIO`: Grid de projetos, filtros dinâmicos, modais e transições
     - `04-ADMIN`: Painel de controle, autenticação SSR (`__session`), CRUD Supabase
     - `05-CONTATO`: Formulário interativo, microinterações de envio e canais
     - `06-PRIVACIDADE`: Aspectos legais e consentimento

2. **Design System & Ghost Constants:**
   - [GHOST-DESIGN-SYSTEM.md](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.context/GHOST-DESIGN-SYSTEM.md)
   - [23-design-system.md](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/rules/23-design-system.md)
   - **Paleta Canônica:**
     - Ghost Blue: `#0048ff`
     - Ghost Accent: `#4fe6ff`
     - Void Black: `#040013`
     - Background: `#040013`
     - Proibido: Roxo/Violeta em superfícies principais (apenas permitido em glitches/hovers específicos).
   - **Grid Mandatório:** Todas as seções estruturais devem obedecer à classe `.std-grid` ou ao componente `Container`.
   - **Tipografia:** 'TT Norms Pro' / 'Inter Tight' (UI), 'Playfair Display' (Headings) e 'Geist Mono' (Código). Escala fluida via `clamp()`.

3. **Diretrizes de Motion & 3D (Ghost Era):**
   - **Motion Easing:** `[0.22, 1, 0.36, 1]` (Ghost Easing). Transições snappy para UI (0.2s) e floaty/atmosféricas para ambientação.
   - **Scroll:** Lenis scroll sincronizado.
   - **WebGL / R3F (Mandato 60 FPS):**
     - Proibido `new Vector3()` ou alocações de memória dentro de `useFrame`.
     - `InstancedMesh` obrigatório para repetições > 10.
     - Limite de DPR em dispositivos mobile.
     - Fallback HTML obrigatório se o WebGL falhar.

---

## 🛠️ 2. Plugin `portfolio-design-auditor` (Instalado & Configurado)

Localização: [.agents/plugins/portfolio-design-auditor](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/plugins/portfolio-design-auditor)

### Componentes Integrados:

#### A. Subagentes Especializados:

- **`portfolio-context-analyst`**: Mapeia rotas, componentes, dependências, estilos e divergências entre docs e código real.
- **`design-auditor`**: Executa auditoria dimensional (Visual, Tipografia, UX, Interação, Motion, A11y, Mobile).
- **`implementation-planner`**: Converte apontamentos aprovados em planos executáveis com grafo de dependência e tarefas isoladas.
- **`audit-validator`**: Valida a conformidade das implementações frente aos critérios de aceite e checagem de regressão.

#### B. Comandos Slash de Auditoria:

- **`/audit`**: Inicia auditoria em página, seção ou componente (Gera relatório e findings P0-P3).
- **`/plan-implementation`**: Transforma achados aceitos em tarefas de engenharia atribuídas a agentes específicos.
- **`/implement-audit`**: Executa a implementação via agentes do sistema com verificação em etapas.
- **`/validate-audit`**: Verifica de ponta a ponta se o código atende às especificações e critérios de aceite.

#### C. Catálogo de Skills:

- `portfolio-design-audit`: Auditoria ampla de páginas e componentes com evidências.
- `apple-design`: Lente de princípios de interfaces fluidas (física de springs, continuidade espacial, feedback).
- `improve-animations`: Auditoria e plano de melhorias no sistema de motion global.
- `find-animation-opportunities`: Varredura cirúrgica de pontos de alto impacto para animação.
- `review-animations`: Revisão e validação localizada de motion e easing.
- `animate`: Implementação de motion web refinado.
- `mobile-native`: Ajustes de viewport, touch, sticky hover e comportamento mobile.
- `pick-ui-library`: Avaliação consciente de dependências sem inflar o bundle.
- `prototype`: Concepção e comparação de variantes de UI.
- `ask-sonner`: Gestão de toasts e feedback de estado via Sonner.
- `animation-vocabulary`: Vocabulário técnico padronizado para motion.

---

## 🔄 3. Ciclo Operacional de Auditoria

```
[TARGET SELECTION]
       ↓
[/audit] ──> Mapeia Contexto (.context/DOCS-PORTFOLIO-PAGES)
       ↓
[EVIDENCE FINDINGS] ──> Relatório em .context/audits/AUDIT-[TARGET]-[DATA].md
       ↓
[APPROVAL GATE] ──> Validação humana dos findings
       ↓
[/plan-implementation] ──> Atribuição: @frontend-specialist / @spectral-artist / @motion-choreographer
       ↓
[/implement-audit] ──> Execução cirúrgica (Zero Jank, Zero Placeholder)
       ↓
[/validate-audit] ──> Portão independente de QA (@quality-verification-specialist)
```

---

## 📁 4. Repositório de Relatórios

Todos os relatórios gerados por auditorias devem ser salvos neste diretório:
`file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.context/audits/`
com a nomenclatura:

- `AUDIT-[DATA]-[NOME_DA_SECAO].md`
- `PLAN-[DATA]-[NOME_DA_SECAO].md`
- `VALIDATION-[DATA]-[NOME_DA_SECAO].md`

---

## 🤖 5. Execução por Agents do Antigravity

Os agentes de auditoria agora são cidadãos de primeira classe no Antigravity IDE, localizados em [`.agents/agents/`](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agents/agents):

### Como Chamar no Chat do Antigravity:

| Agente                        | Chamada no Chat              | Propósito Principal                                                                                               |
| :---------------------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Portfolio Context Analyst** | `@portfolio-context-analyst` | _"Mapeie os componentes, rotas e divergências entre a doc e o código da seção Hero da Home antes de auditarmos."_ |
| **Design Auditor**            | `@design-auditor`            | _"Realize a auditoria dimensional (Visual, UX, A11y e Motion) da página /sobre gerando findings P0 a P3."_        |
| **Implementation Planner**    | `@implementation-planner`    | _"Converta os findings do relatório AUDIT-HOME.md em um plano de tarefas dependentes para os especialistas."_     |
| **Audit Validator**           | `@audit-validator`           | _"Valide a implementação da TASK-01 da seção de Projetos contra os critérios de aceite e cheque regressões."_     |

### Orquestração Integrada via Ghost Commander:

Ao utilizar `@project-orchestrator` ou `/agents-orquestrator`, o fluxo completo pode ser disparado com delegação automática:

1. O Orchestrator despacha `@portfolio-context-analyst` para leitura de contexto.
2. Em seguida, aciona `@design-auditor` para compilação dos achados em `.context/audits/`.
3. Após aprovação humana do escopo, `@implementation-planner` cria as tarefas.
4. `@frontend-specialist` ou `@spectral-artist` executa a implementação no código.
5. `@audit-validator` e `@quality-verification` fecham o ciclo garantindo 60 FPS e conformidade total com o Ghost System.
