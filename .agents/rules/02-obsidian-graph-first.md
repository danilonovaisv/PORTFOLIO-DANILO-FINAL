---
trigger: always_on
priority: critical
name: obsidian-graph-first
description: Protocolo mandatório de pesquisa nos grafos do Obsidian e Graphify antes da execução de qualquer tarefa por agentes do Antigravity.
---

# 02-obsidian-graph-first.md — Obsidian & Graphify Knowledge First Mandate

## 🌐 O Mandato dos Grafos (Pesquisa Antes da Ação)

**Regra Inegociável:** Antes de formular qualquer plano de execução, propor arquiteturas, refatorar código ou executar alterações no projeto, **TODOS OS AGENTES DO ANTIGRAVITY DEVEM OBRIGATORIAMENTE PESQUISAR NOS GRAFOS DO OBSIDIAN E NO GRAFIFY**.

Você nunca parte de suposições cegas. A inteligência e o histórico deste portfólio residem no grafo semântico e no cofre Obsidian (Second Brain).

---

## 🧭 Protocolo Operacional em 3 Etapas (Pré-Execução)

### Etapa 1: Pesquisa no Cofre do Obsidian (MCP `obsidian`)
O cofre Obsidian está conectado em tempo real via MCP `obsidian` com mais de 600 notas estruturadas (`DevMemory`, `Wiki`, `02-projects/portfolio-danilo-final/`, `00-system`).

**Ferramentas MCP a utilizar:**
1. **`obsidian:search_vault`**: Pesquise palavras-chave do problema, nome do componente, bug ou conceito (ex: `"portfolio-danilo-final"`, `"hero-3d"`, `"r3f-optimization"`, `"auth-ssr"`).
2. **`obsidian:get_vault_file`**: Leia as notas identificadas para resgatar decisões arquiteturais passadas, lições aprendidas e restrições.
3. **`obsidian:get_canvas`**: Inspecione arquivos Canvas de mapeamento visual quando existirem.
4. **`obsidian:get_backlinks` e `obsidian:get_outgoing_links`**: Trace as dependências e o contexto estendido no grafo de notas.

---

### Etapa 2: Consulta ao Grafo Semântico do Codebase (Graphify)
O repositório possui um grafo semântico gerado via AST em `graphify-out/`.

**Ações obrigatórias:**
1. **Consulta Direta:** Execute `graphify query "<pergunta sobre arquitetura/fluxo>"` para obter um subgrafo escopado sem alucinações.
2. **Navegação de Comunidades:** Utilize `graphify-out/wiki/index.md` e `graphify-out/GRAPH_REPORT.md` como guia das comunidades e nós centrais (*god nodes*).
3. **Traçado de Relações:** Use `graphify path "<ComponenteA>" "<ComponenteB>"` quando a tarefa envolver acoplamento entre dois módulos.
4. **Atualização Pós-Edição:** Após qualquer modificação no código, garanta a sincronia rodando `graphify update .`.

---

### Etapa 3: Alinhamento com `.context/` e Design System
Cruze o conhecimento obtido no Obsidian e Graphify com:
- `.context/DOCS-PORTFOLIO-PAGES/` (Blueprint por página)
- `.context/GHOST-DESIGN-SYSTEM.md` (Design Tokens e Regras)
- `.context/knowledge-graph.md` (Estado ativo de arquitetura)

---

## 🚫 Violações Proibidas
1. **Proibido Codar às Cegas:** Nunca edite um arquivo sem antes verificar se existem notas ou histórico correspondente no Obsidian.
2. **Proibido Ignorar o Grafo:** Não varra diretórios brutos aleatoriamente quando o grafo do Graphify já possui a rota de dependências mapeada.
3. **Proibido Alucinar Decisões:** Decisões arquiteturais anteriores documentadas no Obsidian têm precedência sobre palpites estéticos do modelo.
