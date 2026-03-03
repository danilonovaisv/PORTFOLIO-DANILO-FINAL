---
description: ## PROTOCOLO GHOST - AJUSTES ORQUESTRADOS
---

# 🛡️ AJUSTES GHOST SYSTEM

**Status:** `READY_FOR_EXECUTION`
**Nível de Rigor:** Máximo (Orchestrated)

## 📂 FONTE DA VERDADE

O arquivo mestre é: `docs/AUDIT_EXECUTION_PLAN.md` (ou caminho equivalente fornecido).
Este arquivo dita O QUE fazer. O código atual dita ONDE fazer.

Documentação para consulta e imagens de cada pagina com layout absoluto na pasta: '.context'

## 🌌 1. DESIGNAÇÃO DO BATALHÃO (@orchestration)

| Agente                    | Responsabilidade                                          | Check-in Requerido |
| :------------------------ | :-------------------------------------------------------- | :----------------- |
| **@ghost_architect**      | Integridade de Pasta, Arquitetura de Componentes e Types. | [ ]                |
| **@spectral_artist**      | Cores (`#0048ff`, `#040013`), Shaders e Materiais.        | [ ]                |
| **@motion_choreographer** | Framer Motion, Lenis e Sincronização de Scroll.           | [ ]                |
| **@audit_sentinel**       | Grid Compliance (`.std-grid`), Lighthouse e Z-index.      | [ ]                |

---

## 📐 REFERÊNCIAS OBRIGATÓRIAS (POR PÁGINA E SESSÃO)

Sua análise deve cruzar o código atual com os seguintes documentos técnicos mestres:

### 🏠 PÁGINA: HOME

- **Header:** `01-HEADER.md`
- **Hero:** `02-HERO-HOME.md`
- **Video Reel:** `03-VIDEO-MANIFESTO.md`
- **Showcase:** `04-PORTFOLIO-SHOWCASE.md`
- **Featured Projects:** `05-FEATURED-PROJECTS.md`
- **Clients/Brands:** `06-CLIENTS-BRANDS.md`
- **Contact:** `07-CONTACT.md`
- **Footer:** `10-FOOTER.md`

### 👤 PÁGINA: SOBRE

- **Manifesto:** `02-HERO-MANIFESTO.md`
- **Origem:** `03-ORIGEM-CRIATIVA.md`
- **O Que Eu Faço:** `04-O-QUE-EU-FACO.md`
- **Método/Processo:** `05-COMO-EU-TRABALHO.md`
- **Crenças (O Que Me Move):** `06-O-QUE-ME-MOVE.md`
- **Fechamento:** `07-FECHAMENTO-CONFIRMACAO.md`

### 📂 PÁGINA: PORTFOLIO

- **Gallery/Filtros:** `03-GALLERY.md`
- **Project Cards:** `04-PROJECT-CARDS.md`
- **Modal de Detalhes:** `05-MODAL.md` e `09-MODAL-ROOT.md`
- **Página do Projeto (Slug):** `06-PROJETO-SLUG.md`
- **Landing Pages Dinâmicas:** `07-LANDING-PAGES.md`

### 🔐 PÁGINA: ADMIN (CMS)

- **Dashboard:** `03-DASHBOARD.md`
- **Gestão de Trabalhos:** `04-TRABALHOS.md`
- **Tags e Mídia:** `05-TAGS.md` e `06-MIDIA.md`
- **Copy Agent (IA):** `09-COPY-AGENT.md`
- **Configurações:** `08-SETTINGS-CONFIG.md`

---

## 🏗️ 2. FASES DA MISSÃO

### FASE 1: ESCANEAMENTO TÉCNICO (Parsing)

- [ ] Mapear todos os arquivos da seção específica.
- [ ] Identificar dependências de assets no `assets.json`.
- [ ] Verificar versões do Next.js e React no contexto do arquivo.

- **Skill:** `use a skill concise-planning`
- **MCP Action:** `context7`

### FASE 2: ANÁLISE DE CONFORMIDADE

- [ ] **Grid:** Todas as margens seguem o sistema `.std-grid`?
- [ ] **Aesthetics:** O glow está dentro dos parâmetros Ghost Blue?
- [ ] **Motion:** O easing segue `[0.22, 1, 0.36, 1]`?

### FASE 3: IMPLEMENTAÇÃO ORQUESTRADA

1. **Sub-tarefa A:** Correção de bugs estruturais (@ghost_architect).
2. **Sub-tarefa B:** Polimento visual e shaders (@spectral_artist).
3. **Sub-tarefa C:** Ajustes de micro-interações (@motion_choreographer).

### FASE 4: VETAGEM FINAL (QA)

- [ ] Teste de performance (FPS > 50).
- [ ] Verificação de acessibilidade (Aria labels).
- [ ] Snapshot visual mobile-first.

## 📝 3. LOG DE SAÍDA (RESUMO)

> Todos os bugs devem ser reportados no `AUDIT_PENTEST.md` após a execução.
