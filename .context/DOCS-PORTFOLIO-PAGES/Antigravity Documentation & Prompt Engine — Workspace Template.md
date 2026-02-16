
# Antigravity Documentation & Prompt Engine — Workspace Template

## 0. Visão
Este workspace implementa o **Antigravity Project Orchestrator Engine**:
- Recebe briefing
- Estrutura requisitos (produto + técnico)
- Organiza Design System / assets
- Gera documentação base
- Cria prompts estruturados
- Produz protótipos (funcional e interativo)
- Prepara deploy (web/app/automations)
- Opera em arquitetura **3 camadas**: Directive → Orchestration → Execution (determinístico) (ref. `.agent/AGENT.md`)

---

## 1. Estrutura ideal de diretórios

.
├── .agent/
│   ├── AGENT.md
│   ├── MCPs-uteis.curated-config.json
│   ├── skills_index.json
│   └── context/
│       ├── Knowledge-Base-Antigravity.json
│       ├── Knowledge-Base-Firebase.json
│       └── Knowledge-Base-Supabase.json
├── agents/
│   ├── orchestrator.engine.md
│   ├── architect.requirements.md
│   ├── architect.system-design.md
│   ├── curator.research.md
│   ├── doc.writer.md
│   ├── proto.web.md
│   ├── proto.interactive.md
│   ├── prompt.engineer.md
│   ├── deploy.web.md
│   ├── deploy.app.md
│   ├── qa.verifier.md
│   └── security.governance.md
├── directives/
│   ├── 00.briefing.intake.md
│   ├── 01.requirements.structuring.md
│   ├── 02.design-system.organize.md
│   ├── 03.documentation.generate.md
│   ├── 04.prototype.functional.md
│   ├── 05.prototype.interactive.md
│   ├── 06.prompts.generate.md
│   ├── 07.deploy.prepare.md
│   ├── 08.verification.release.md
│   └── 99.playbooks.edge-cases.md
├── execution/
│   ├── README.md
│   ├── env/
│   │   ├── validate_env.py
│   │   └── render_env_example.py
│   ├── ingestion/
│   │   ├── fetch_url_content.py
│   │   ├── normalize_assets.py
│   │   └── extract_requirements.py
│   ├── docs/
│   │   ├── build_docs_index.py
│   │   └── export_markdown_bundle.py
│   ├── prototyping/
│   │   ├── scaffold_web_prototype.py
│   │   └── scaffold_interactive_prototype.py
│   ├── prompts/
│   │   ├── compile_prompt_packages.py
│   │   └── validate_prompts.py
│   ├── deploy/
│   │   ├── generate_deploy_configs.py
│   │   └── check_preflight.py
│   └── observability/
│       ├── logger.py
│       └── metrics.py
├── rules/
│   ├── 00.global.md
│   ├── 10.security.md
│   ├── 20.quality.md
│   ├── 30.prompts.md
│   ├── 40.assets.md
│   ├── 50.docs.md
│   └── 90.release.md
├── skills/
│   ├── README.md
│   ├── _shared/
│   │   ├── skill.schema.md
│   │   ├── skill.template.md
│   │   └── skill.testing.md
│   ├── intake/
│   │   ├── briefing-to-spec.md
│   │   └── scoping.md
│   ├── research/
│   │   ├── link-extractor.md
│   │   └── doc-digest.md
│   ├── architecture/
│   │   ├── mas-blueprint.md
│   │   ├── api-contracts.md
│   │   └── data-modeling.md
│   ├── docs/
│   │   ├── docs-blueprint.md
│   │   └── adr-generator.md
│   ├── prototyping/
│   │   ├── web-prototype.md
│   │   └── interactive-prototype.md
│   ├── prompting/
│   │   ├── prompt-structure.md
│   │   ├── prompt-packaging.md
│   │   └── prompt-validation.md
│   ├── deploy/
│   │   ├── vercel-web.md
│   │   ├── firebase-hosting.md
│   │   └── cloudrun.md
│   └── verification/
│       ├── skill-verification-before-completion.md
│       └── qa-checklist.md
├── assets/
│   ├── _inbox/
│   ├── design-system/
│   │   ├── tokens/
│   │   ├── components/
│   │   ├── patterns/
│   │   └── references/
│   ├── images/
│   │   ├── raw/
│   │   └── optimized/
│   ├── icons/
│   ├── diagrams/
│   ├── exports/
│   └── links/
│       ├── sources.md
│       └── snapshots/
├── docs/
│   ├── 00.overview.md
│   ├── 10.product/
│   │   ├── vision.md
│   │   ├── requirements.md
│   │   └── user-stories.md
│   ├── 20.architecture/
│   │   ├── system-context.md
│   │   ├── mas.md
│   │   ├── data.md
│   │   └── adr/
│   ├── 30.prompts/
│   │   ├── prompt-packs.md
│   │   └── catalog/
│   ├── 40.prototypes/
│   │   ├── functional.md
│   │   └── interactive.md
│   ├── 50.deploy/
│   │   ├── environments.md
│   │   └── runbooks.md
│   └── 90.release-notes.md
├── prototypes/
│   ├── functional/
│   └── interactive/
├── prompt-packs/
│   ├── _schema/
│   ├── website/
│   ├── app/
│   └── automations/
├── configs/
│   ├── project.config.json
│   ├── workspace.config.json
│   └── deploy/
│       ├── vercel.json
│       ├── firebase.json
│       └── docker/
├── .tmp/                # intermediários (NUNCA commitar)
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── VERSION
└── README.md

---

## 2. Organização de assets (padrão)
- `assets/_inbox/`: entrada bruta (recebidos). Nada é usado direto daqui.
- `assets/links/snapshots/`: dumps/snapshots de páginas e docs extraídas.
- `assets/images/raw` → `assets/images/optimized`: pipeline de otimização.
- `assets/design-system/`:
  - `tokens/`: cores, tipografia, spacing, radii
  - `components/`: specs por componente
  - `patterns/`: fluxos/padrões (ex.: auth, onboarding)
  - `references/`: guias (ex.: WeChat Work / iOS / Material)

---

## 3. Convenção de nomes
### Arquivos e pastas
- kebab-case sempre: `system-context.md`, `web-prototype.md`
- Prefixos por ordenação: `00.`, `10.`, `20.` em docs
- Agent file: `<domínio>.<função>.md` (ex.: `proto.web.md`)

### IDs e chaves
- `project.slug`: `antigravity-doc-prompt-engine`
- `prompt-pack`: `{domain}.{usecase}.{version}` ex.: `website.landing.v1`

---

## 4. Estrutura de agents (padrão)
Agents são **contratos operacionais** (não “personas soltas”):
- Input/Output explícitos
- Ferramentas / Skills permitidas
- Critérios de aceite
- Handoffs
- Políticas de segurança/qualidade

Camadas:
- Directive: `directives/*`
- Orchestration: `agents/orchestrator.engine.md`
- Execution: `execution/*` (scripts determinísticos)

---

## 5. Estrutura de rules
- `rules/00.global.md`: regras universais (estilo, padrões, DoD)
- `rules/10.security.md`: guardrails, approvals, secrets, dados sensíveis
- `rules/20.quality.md`: lint, validações, Definition of Done
- `rules/40.assets.md`: ingestão, versionamento, otimização, licenças
- `rules/90.release.md`: versionamento, changelog, gates

---

## 6. Estrutura de skills
`skills/<domínio>/<skill>.md` com:
- Objetivo
- Entradas
- Saídas
- Procedimento
- Ferramentas
- Critérios de verificação
- Edge cases

`skills/_shared/skill.schema.md` define o “contrato”.

---

## 7. Versionamento
### SemVer
- `VERSION`: `MAJOR.MINOR.PATCH`
- `CHANGELOG.md`: keep-a-changelog
- Regras:
  - MAJOR: quebra de schema (configs/prompt packs/agents contracts)
  - MINOR: feature nova backward-compatible
  - PATCH: correções / refactors compatíveis

---

## 8. Configuração ideal de ambiente
- `.env.example` com:
  - `GITHUB_PERSONAL_ACCESS_TOKEN=`
  - `FIREBASE_PROJECT_ID=`
  - `SUPABASE_URL=`
  - `SUPABASE_SERVICE_ROLE_KEY=`
  - `DEPLOY_TARGET=vercel|firebase|cloudrun`
- Execução determinística via `execution/*`
- Observabilidade mínima:
  - logs estruturados JSON
  - trace_id por workflow
  - outputs em `docs/` + `prompt-packs/` + `prototypes/`

---

## 9. Definition of Done (DoD)
Para uma entrega ser considerada “pronta”:
- Requisitos rastreáveis: briefing → spec → docs → prompts → protótipo → deploy
- `docs/` completo + índices gerados
- `prompt-packs/` validados por schema
- `prototypes/` gerados e navegáveis
- Configs de deploy geradas e preflight ok


⸻

2) GUIA TÉCNICO DETALHADO (GUIDE.md)

# Antigravity Project Orchestrator Engine — Guia Técnico

## 1. Padrão operacional (3 camadas)
Adotar o modelo:
- **Directive**: SOPs em `directives/` (o que fazer) (ref. `.agent/AGENT.md`)
- **Orchestration**: roteamento, decisões, handoffs em `agents/`
- **Execution**: scripts determinísticos em `execution/` (ingestão, normalização, geração, validação)

> Regra: decisões na camada Orchestration; efeitos colaterais e processamento repetível na Execution. (ref. `.agent/AGENT.md`)

---

## 2. Como estruturar um projeto Antigravity

### 2.1 Websites
Recomendação base:
- **App**: Next.js (App Router), Tailwind
- **Design System**: tokens em `assets/design-system/tokens`
- **Prototipagem**:
  - Funcional: páginas HTML/Next rápidas em `prototypes/functional`
  - Interativa: flows com navegação + microinterações em `prototypes/interactive`
- **Deploy**:
  - Vercel (default) ou Firebase Hosting
  - `configs/deploy/vercel.json` ou `configs/deploy/firebase.json`

Outputs esperados:
- `docs/10.product/*` (visão, requisitos, user stories)
- `docs/20.architecture/*` (contexto, MAS, ADRs)
- `prompt-packs/website/*` (packs por jornada: landing, blog, docs, dashboard)
- `prototypes/*` navegável

### 2.2 Aplicativos
Recomendação base:
- **Frontend**: React Native / Expo (ou Flutter)
- **Backend**: Supabase (Auth/DB/Storage) ou Firebase (Auth/Firestore/Functions)
- **Arquitetura**:
  - `docs/20.architecture/data.md` define modelo, policies, e limites de consulta
  - `prompt-packs/app/*` organiza prompts por feature: auth, profile, feed etc.
- **Deploy**:
  - Web: Vercel/Firebase
  - Mobile: EAS (Expo) / stores
  - Backend: Supabase/Firebase/Cloud Run (quando necessário)

### 2.3 Automações
Recomendação base:
- **Engine**: workflows idempotentes, com retries e estado
- **Inputs**: `assets/_inbox` + links
- **Outputs**: docs + prompt packs + relatórios
- **Execução**:
  - scripts em `execution/ingestion` + `execution/prompts` + `execution/deploy`
- **Governança**:
  - regras de aprovação em `rules/10.security.md` (human-in-the-loop para ações destrutivas)

---

## 3. Como estruturar agents especializados (contratos)
Cada agent (arquivo em `agents/*.md`) deve ter:
- **Responsabilidade única**
- **Inputs/Outputs formais**
- **Skills permitidas** (IDs do `skills_index.json`)
- **Regras aplicáveis** (globais + locais)
- **Handoffs**: para qual agent passa, com qual payload
- **Critérios de aceite**: checklist testável

Exemplo de cadeia mínima (pipeline):
1) `architect.requirements` → 2) `curator.research` → 3) `doc.writer`
→ 4) `proto.web`/`proto.interactive` → 5) `prompt.engineer` → 6) `deploy.*` → 7) `qa.verifier`

---

## 4. Como estruturar skills reutilizáveis
Padrão:
- Skills pequenas, composáveis e auditáveis
- Uma skill = um resultado verificável
- Cada skill tem:
  - Procedure
  - Validation steps
  - Failure modes

Reuso:
- `skills/_shared/` define schema, template e testes.
- Skills por domínio: `intake/`, `research/`, `architecture/`, `docs/`, `prototyping/`, `prompting/`, `deploy/`, `verification/`.

---

## 5. Regras globais e locais
- Global: `rules/00.global.md` (DoD, naming, outputs)
- Local por etapa: ex. protótipo segue também `rules/30.prompts.md` + `rules/20.quality.md`
- Segurança prevalece: `rules/10.security.md` sempre tem prioridade.

---

## 6. Pipeline completo (briefing → deploy)

### 6.1 Briefing (intake)
Entradas:
- briefing do usuário
- links (docs/repo)
- assets (imagens, tokens, textos)
Saídas:
- `docs/10.product/requirements.md`
- `assets/links/sources.md`

### 6.2 Organização
- normalizar assets (inbox → categorias)
- gerar “project map”
Saídas:
- `assets/*` organizado
- `docs/00.overview.md`

### 6.3 Documentação
- visão, escopo, decisões (ADRs), contexto do sistema
Saídas:
- `docs/10.product/*`
- `docs/20.architecture/*`

### 6.4 Protótipo funcional
- estrutura navegável base, sem microinterações complexas
Saídas:
- `prototypes/functional/*`
- `docs/40.prototypes/functional.md`

### 6.5 Protótipo interativo
- fluxos principais, estados, transições
Saídas:
- `prototypes/interactive/*`
- `docs/40.prototypes/interactive.md`

### 6.6 Prompts estruturados
- packs por caso de uso (website/app/automations)
- prompt schema + validação
Saídas:
- `prompt-packs/**`
- `docs/30.prompts/*`

### 6.7 Deploy
- gerar configs e runbooks
Saídas:
- `configs/deploy/*`
- `docs/50.deploy/*`

### 6.8 Verificação e release
- checklist + validações determinísticas
Saídas:
- `docs/90.release-notes.md`
- bump em `VERSION` + `CHANGELOG.md`


⸻

3) ARQUIVOS PRONTOS (conteúdo para colar no repo)

3.1 agents/*.md

agents/orchestrator.engine.md

# Agent: Orchestrator Engine

## Role
Orquestrador principal do **Antigravity Project Orchestrator Engine**. Responsável por roteamento, handoffs, consistência de outputs e gates de qualidade.

## Operating Model
3 camadas: Directive → Orchestration → Execution (ref. `.agent/AGENT.md`).

## Inputs
- Briefing (texto + objetivos + restrições)
- Links/documentações
- Assets (qualquer mídia)
- `project.config.json`, `workspace.config.json`

## Outputs
- Diretivas selecionadas (lista)
- Plano de execução por etapas
- Payloads para cada agent
- Status de gates (quality/security/release)

## Allowed Skills (IDs)
- concise-planning
- lint-and-validate
- (obrigatório) skill-verification-before-completion

## Handoffs
1) architect.requirements → spec
2) curator.research → evidências e extrações
3) doc.writer → docs base
4) proto.* → protótipos
5) prompt.engineer → prompt packs
6) deploy.* → configs e runbooks
7) qa.verifier → release gate

## Acceptance Criteria
- Outputs em `docs/`, `prototypes/`, `prompt-packs/`, `configs/`
- Rastreabilidade: briefing → requirements → artefatos
- DoD cumprido e verificação final executada

agents/architect.requirements.md

# Agent: Requirements Architect

## Inputs
- Briefing
- Constraints (tempo, stack, deploy)
- Links e assets relevantes

## Outputs
- `docs/10.product/requirements.md`
- `docs/10.product/user-stories.md`
- Matriz de rastreabilidade: requisito → artefato

## Rules
- `rules/00.global.md`
- `rules/20.quality.md`

## Acceptance Criteria
- Requisitos com prioridade, critérios de aceite e riscos
- Escopo explícito (in/out)

agents/curator.research.md

# Agent: Research Curator

## Mission
Extrair dados de links/documentações e gerar “digests” com evidências utilizáveis no projeto.

## Inputs
- URLs
- Repos e docs
- Arquivos em `assets/_inbox`

## Outputs
- `assets/links/sources.md`
- `assets/links/snapshots/*`
- `docs/00.overview.md` (seção “Referências e Evidências”)

## Guardrails
- Não inventar fatos; registrar suposições como suposições.
- Se houver conflito entre fontes, registrar divergência.

## Acceptance Criteria
- Cada claim relevante tem referência
- Conteúdo normalizado para consumo por outros agents

agents/doc.writer.md

# Agent: Documentation Writer

## Inputs
- requirements
- research digests
- design system tokens/padrões

## Outputs
- `docs/10.product/*`
- `docs/20.architecture/*`
- `docs/50.deploy/*` (esqueleto)

## Acceptance Criteria
- Docs com índice e navegação clara
- ADRs para decisões não-triviais

agents/proto.web.md

# Agent: Web Prototype Builder

## Reference
Usar o template de prompt de protótipo (ref. `.agent/prompt-structure.md`) e design system de referência (ref. `.agent/design-systems.md`).

## Outputs
- `prototypes/functional/*`
- `docs/40.prototypes/functional.md`

## Acceptance Criteria
- Protótipo navegável
- Componentização coerente com tokens

agents/proto.interactive.md

# Agent: Interactive Prototype Builder

## Outputs
- `prototypes/interactive/*`
- `docs/40.prototypes/interactive.md`

## Acceptance Criteria
- Fluxos principais cobertos
- Estados: loading/empty/error/success

agents/prompt.engineer.md

# Agent: Prompt Engineer

## Inputs
- Docs e requirements
- Protótipos
- Regras de prompt

## Outputs
- `prompt-packs/**`
- `docs/30.prompts/prompt-packs.md`
- Validação por schema

## Acceptance Criteria
- Prompts estruturados e versionados
- Packs por domínio: website/app/automations

agents/deploy.web.md

# Agent: Deploy Web

## Outputs
- `configs/deploy/vercel.json` ou `configs/deploy/firebase.json`
- `docs/50.deploy/runbooks.md`

## Acceptance Criteria
- Preflight ok
- Variáveis documentadas

agents/deploy.app.md

# Agent: Deploy App

## Outputs
- Runbooks de build/release
- Checklists de stores/CI

## Acceptance Criteria
- Pipeline reprodutível

agents/qa.verifier.md

# Agent: QA Verifier

## Mission
Executar o protocolo final de verificação (skill-verification-before-completion).

## Outputs
- `docs/90.release-notes.md`
- Status final: PASS/FAIL com evidências

## Acceptance Criteria
- Não aprova com pendências críticas

agents/security.governance.md

# Agent: Security & Governance

## Outputs
- Hardening de regras
- Política de secrets e approvals

## Acceptance Criteria
- Nenhum secret em texto puro
- Ações destrutivas exigem aprovação


⸻

3.2 rules/*.md

rules/00.global.md

# Global Rules

- Naming: kebab-case; docs com prefixo 00/10/20…
- Outputs obrigatórios: docs + prototypes + prompt-packs + configs
- Tudo rastreável: requisito → artefato → validação
- Intermediários em `.tmp/` e nunca comitar
- Sempre finalizar com verificação (skill-verification-before-completion)

rules/10.security.md

# Security Rules

- Proibir secrets em commits; usar `.env` e secret managers
- Qualquer ação destrutiva (delete/migrate/prod deploy) requer approval explícito
- Sanitizar entradas de links e arquivos
- Licenças: registrar origem de assets em `assets/links/sources.md`

rules/20.quality.md

# Quality Rules

- Validações determinísticas em `execution/*`
- Logs estruturados JSON + trace_id
- DoD: docs + packs validados + protótipo navegável + configs preflight

rules/30.prompts.md

# Prompt Rules

- Prompts seguem estrutura padrão (role/task/stack/visual/implementation/config) conforme template de prototipagem (ref. `.agent/prompt-structure.md`)
- Packs versionados e testáveis
- Sempre declarar suposições e limites

rules/40.assets.md

# Assets Rules

- Inbox é somente entrada; nada é consumido direto
- Organizar por tipo e normalizar nomes
- Otimizar imagens (raw → optimized)
- Registrar licenças e fontes

rules/50.docs.md

# Documentation Rules

- Sempre gerar `docs/00.overview.md` e índices
- ADR obrigatório para decisões não-triviais (stack, deploy, dados, segurança)

rules/90.release.md

# Release Rules

- SemVer em `VERSION`
- CHANGELOG atualizado
- Release Notes em `docs/90.release-notes.md`
- Gate final: QA Verifier PASS


⸻

3.3 skills/*.md (base)

skills/_shared/skill.schema.md

# Skill Schema (Contract)

## Fields
- Objective
- Inputs (schema)
- Outputs (schema)
- Procedure (steps)
- Tools/Commands
- Validation (checks)
- Failure Modes
- Handoffs (optional)

skills/verification/skill-verification-before-completion.md

# Skill: verification-before-completion

## Objective
Executar verificação final do workspace e garantir DoD.

## Inputs
- project root
- lista de entregáveis esperados

## Outputs
- relatório PASS/FAIL com evidências e paths

## Procedure
1) Checar estrutura mínima (agents/rules/skills/docs/configs)
2) Checar rastreabilidade (requirements → docs/packs/prototypes)
3) Checar configs (project/workspace)
4) Checar versionamento (VERSION + CHANGELOG)
5) Checar assets (sources e licenças)
6) Emitir PASS/FAIL

## Validation
- Nenhum arquivo “obrigatório” ausente
- Nenhum secret em texto puro

skills/prompting/prompt-structure.md

# Skill: prompt-structure

Use a estrutura padrão de protótipo (role/task/stack/visual/implementation/tailwind config) conforme referência em `.agent/prompt-structure.md`.


⸻

3.4 configs/*.json

configs/project.config.json

{
  "project": {
    "name": "Antigravity Documentation & Prompt Engine",
    "slug": "antigravity-doc-prompt-engine",
    "versionFile": "VERSION",
    "changelogFile": "CHANGELOG.md"
  },
  "outputs": {
    "docsDir": "docs",
    "prototypesDir": "prototypes",
    "promptPacksDir": "prompt-packs",
    "configsDir": "configs",
    "assetsDir": "assets"
  },
  "targets": {
    "website": { "enabled": true, "defaultStack": "nextjs" },
    "app": { "enabled": true, "defaultStack": "expo" },
    "automations": { "enabled": true, "defaultStack": "python" }
  },
  "designSystem": {
    "tokensPath": "assets/design-system/tokens",
    "reference": "assets/design-system/references"
  }
}

configs/workspace.config.json

{
  "workspace": {
    "mode": "orchestrator-engine",
    "architecture": "directive-orchestration-execution",
    "tempDir": ".tmp",
    "inboxDir": "assets/_inbox"
  },
  "governance": {
    "requireApprovalForDestructiveActions": true,
    "secretsPolicy": "no-plaintext",
    "licenseTracking": true
  },
  "observability": {
    "logFormat": "json",
    "traceId": true,
    "metrics": ["latency_ms", "failures", "retries"]
  },
  "mcp": {
    "curatedConfigPath": ".agent/MCPs-uteis.curated-config.json"
  }
}


⸻

4) CURADORIA TÉCNICA (melhores práticas incorporadas)

Nota técnica (transparente): eu não consigo “abrir” os repositórios externos aqui (sem navegação web ativa neste ambiente), então não vou afirmar detalhes específicos desses repos. Em vez disso, incorporei padrões compatíveis com as referências que você já forneceu no workspace (3-layer architecture, design systems e prompt structure) e com o inventário de skills/MCPs do seu bundle local  ￼  ￼  ￼  ￼  ￼.

Práticas aplicadas:
    •    Separation of concerns real: decisão (agents) vs execução determinística (execution scripts)  ￼
    •    Intermediários descartáveis: .tmp/ nunca commitado  ￼
    •    Design system como asset de primeira classe (tokens/components/patterns)  ￼
    •    Prompting padronizado (estrutura forte e validável)  ￼
    •    Inventário oficial de skills (não inventar slug; usar skills_index.json)  ￼
    •    MCPs selecionados para repo hygiene + deploy/ops (GitHub, Firebase, DevTools)  ￼
    •    Governança: approvals para destrutivo + no plaintext secrets

⸻

5) COMO ESTE WORKSPACE “ORQUESTRA” NA PRÁTICA

Sistema (alto nível)
    •    Intake: coloca tudo em assets/_inbox/ + lista links em assets/links/sources.md
    •    Curadoria: extrai/normaliza e snapshot em assets/links/snapshots/
    •    Especificação: docs/10.product/*
    •    Arquitetura MAS: docs/20.architecture/mas.md
    •    Protótipos: prototypes/functional e prototypes/interactive
    •    Prompt packs: prompt-packs/{website,app,automations}
    •    Deploy: configs/deploy/* + docs/50.deploy/runbooks.md
    •    Gate: skill-verification-before-completion (PASS/FAIL)

⸻

6) BLOCO FINAL OBRIGATÓRIO (opções de revisão)

Escolha uma opção e eu ajusto o pacote:
    1.    Stack default Web: Next.js + Vercel (atual) | ou Firebase Hosting
    2.    Stack default App: Expo + Supabase | ou Firebase-only
    3.    Modo de prototipagem: HTML estático | Next app | Figma-like (estrutura)
    4.    Nível de governança: “startup” (leve) | “enterprise” (aprovações + trilhas)
    5.    Estratégia de prompt packs: por feature | por jornada | por persona + jornada
