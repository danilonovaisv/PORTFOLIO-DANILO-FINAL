# CONTEXT7 MCP /prompt-agent  
## ORQUESTRAÇÃO CORRETIVA TOTAL — REIMPLEMENTAÇÃO + VALIDAÇÃO + DEPLOY VERIFICADO

---

/// IDENTIDADE  
Você é o **/prompt-agent (Context7 MCP)** operando como **Architect & Agent Manager Sênior** em uma arquitetura **MAS (Directive → Orchestration → Execution)**.

Sua missão é **corrigir definitivamente** todos os ajustes que:
- Funcionaram parcialmente em dev
- Quebraram após deploy
- Não foram aplicados corretamente
- Estão inconsistentes entre ADMIN, HOME e PORTFOLIO
- Apresentam divergência entre estado do banco e renderização

Operar com rigor de produção.

---

# OBJETIVO GLOBAL

Reimplementar, testar e validar todos os 13 ajustes abaixo com:

1. Diagnóstico de causa raiz (dev vs build vs deploy)
2. Correção arquitetural
3. Testes unitários e E2E
4. Validação pós-deploy
5. Atualização obrigatória da documentação em:

/.context/DOCS-PORTFOLIO-PAGES/

6. Encerramento com `skill-verification-before-completion`

Cada item deve ser executado como **task isolada**, com:
- Skills declaradas
- MCPs utilizados
- Definition of Done
- Atualização de documentação

---

# 🔴 FASE ZERO — DIAGNÓSTICO OBRIGATÓRIO (ANTES DAS TASKS)

Antes de iniciar qualquer task:

1. Validar diferenças entre:
- Ambiente local
- Build de produção
- Variáveis de ambiente
- Configuração Supabase
- Configuração Firebase
- Cache/CDN
- SSR vs CSR

2. Verificar:
- Se há código morto não buildado
- Se existe diferença de ENV
- Se há problema de hydration
- Se há race condition no realtime
- Se existe uso incorreto de window em SSR

Gerar relatório técnico resumido antes de iniciar Task 01.

Skills:
- concise-planning
- git-advanced-workflows
- frontend-code-review

MCPs:
- github
- firebase
- chrome-devtools

---

# TASK 01 — THUMBS 16:9 / 1:1 NÃO FUNCIONANDO

## Problema:
Troca automática por ratio não funciona após deploy.

## Ações:

1. Revisar lógica de ratio:
- ResizeObserver?
- container query?
- SSR hydration mismatch?

2. Garantir:
- Determinismo
- Sem flicker
- Fallback correto

3. Testar:
- Mobile
- Desktop
- Resize dinâmico

4. Validar build produção

5. Atualizar documentação

Skills:
- frontend-developer
- e2e-runner
- frontend-code-review
- verification-before-completion

MCPs:
- github
- chrome-devtools

---

# TASK 02 — VIDEO MANIFESTO MOBILE NÃO FUNCIONA

Corrigir definitivamente:

- Aspect ratio
- object-fit
- Hydration
- Preload
- SSR safety

Testar:
- iOS
- Android
- Desktop

Validar URL:
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/VIDEO-MANIFESTO-MOBILE.mp4

Atualizar docs.

Skills:
- frontend-developer
- frontend-design
- e2e-runner
- verification-before-completion

MCPs:
- chrome-devtools
- github

---

# TASK 03 — PORTFOLIO NÃO LISTA PROJETOS CORRETAMENTE + FEATURED QUEBRADO

Problema:
- Projetos não destacados não aparecem
- Featured não sincroniza
- Ordem incorreta
- Divergência com Supabase

Ações:

1. Auditar query:
- published
- featured
- deleted_at
- order

2. Separar:
- featured
- non-featured

3. Garantir:
- Todos publicados aparecem
- Featured no topo
- Sem duplicação

4. Testar sincronização realtime

5. Atualizar docs

Skills:
- database-design
- frontend-developer
- e2e-runner
- verification-before-completion

MCPs:
- github
- firebase
- chrome-devtools

---

# TASK 04 — CTA VOLTAR / PRÓXIMA + PAGINAÇÃO 15 PROJETOS

Implementar:

- CTA inferior esquerdo “Voltar”
- CTA inferior direito “Próxima”
- Paginação fixa: 15 por página

Garantir:
- Performance
- SEO não quebrado
- Scroll correto

Atualizar docs.

Skills:
- frontend-developer
- frontend-design
- e2e-runner
- verification-before-completion

MCPs:
- github

---

# TASK 05 — RANDOMIZAÇÃO DOS DESTAQUES INSTÁVEL

Problema:
Ordem muda constantemente.

Implementar:
- Seed determinístico por janela temporal
- Randomização server-side
- Sem layout shift

Testar:
- Mesmo seed → mesma ordem
- Novo seed → nova ordem

Atualizar docs.

Skills:
- frontend-developer
- e2e-runner
- verification-before-completion

MCPs:
- github

---

# TASK 06 — MODAL: DESCRIÇÃO SUMIU + SCROLL QUEBRADO + MARKDOWN NÃO RENDERIZA

Diagnóstico:
- CSS overflow?
- Sanitização?
- Campo errado?
- SSR hydration?

Corrigir:
- Render markdown confiável
- Scroll container correto
- Descrição visível

Testar com post real.

Atualizar docs.

Skills:
- frontend-developer
- frontend-security-coder
- e2e-runner
- verification-before-completion

---

# TASK 07 — MODAL GALERIA QUEBRADA + TAGS

Corrigir:
- Filtrar apenas galeria
- Corrigir thumbs, as thumbs não entram na visualização
- Corrigir visualização
- Remover tags da view principal

Testar com múltiplos projetos.

Atualizar docs.

---

# TASK 08 — GERADOR DE CENAS NÃO FUNCIONA

Base obrigatória:

.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/PROMPT CENAS PUBLICITÁRIAS.md  
.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/listas peças.json  
.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/TIPOS DE CENA.json  
.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/Nível de Direção de Arte.json  

Implementar:
- Prompt builder determinístico
- Menus/submenus
- Versionamento
- Persistência

Testar:
- Output estruturado
- Sem campos extras

Atualizar docs.

Skills:
- frontend-developer
- database-design
- firebase
- verification-before-completion

---

# TASK 09 — COPY AGENT NÃO FUNCIONA

Base:

.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/SUPER-TEMPLATE-COPY.md  

Implementar:
- Seletor Landing / Modal
- Output estritamente validado
- Campo YouTube URL
- Validação formato link

Testar geração real.

Atualizar docs.

---

# TASK 10 — ADMIN CONFIG (TOKENS + USERS) NÃO FUNCIONA

Implementar corretamente:

- Tokens salvos via Secret Manager
- Referência no DB
- Mask UI
- CRUD usuários
- RBAC

Proibir:
- Tokens no client

Testar:
- Persistência
- Permissões

Atualizar docs.

Skills:
- firebase
- database-design
- frontend-security-coder
- verification-before-completion

---

# TASK 11 — MOBILE HEADER DIFERENTE EM CADA PÁGINA

Refatorar:
- Single source of truth
- API padronizada
- Sem duplicação

Testar navegação completa.

Atualizar docs.

---

# TASK 12 — HERO HOME: QUEBRA 2 LINHAS DESKTOP / 3 MOBILE

Implementar:
- Controle tipográfico determinístico
- Sem quebra inesperada
- Testar em 1280 / 1440 / 1920 / mobile
HERO HOME: O ajuste não funcionou da HERO HOME deixar a quebra de texto em duas linhas no formato desktop e em três linhas no mobile para o titulo da sessão;

/// OBJETIVO
Na HERO da HOME, garantir que no desktop o título quebre sempre em duas linhas e em três linhas no mobile para o titulo da sessão(controle tipográfico).

/// MECÂNICA
Execution:
    1.    Ajustar markup para inserir quebra controlada (<br/> condicional por breakpoint) ou wrap com spans e CSS.
    2.    Evitar quebra em 3 linhas em resoluções intermediárias (testar em 1280/1440/1920).
    3.    Testes visuais/E2E.
    4.    Docs: regra tipográfica.
     
      {/* Headline - Desktop/Tablet (2 linhas) */}
  <h1 className="hidden md:block">
    Você não vê
    <br />
    o design.
  </h1>
  
  {/* Headline - Mobile (3 linhas) */}
  <h1 className="md:hidden">
    Você não
    <br />
    vê o
    <br />
    design.
  </h1>
  
  {/* Subheading */}
  <h2>Mas ele vê você.</h2>

/// MCPs
chrome-devtools, github

/// REFERÊNCIAS
.agent/skills_index.json, /.context/DOCS-PORTFOLIO-PAGES/

Skills: frontend-developer, frontend-design, e2e-runner

Opções de revisão:
    •    (A) Quebra fixa via <br/>
    •    (B) Quebra responsiva via CSS clamp + max-width

  

Atualizar docs.

---

# TASK 13 — VERIFICAR REALTIME

Auditar:
- Supabase subscriptions
- Firebase listeners
- Race conditions
- Memory leaks
- Cleanup de listeners

Testar:
- Criar projeto no ADMIN
- Verificar atualização no PORTFOLIO
- Testar múltiplas abas

Atualizar docs com:
- Estratégia realtime
- Cleanup policy
- Diagrama simplificado

Skills:
- database-design
- firebase
- frontend-developer
- verification-before-completion



  

---

# GOVERNANÇA OBRIGATÓRIA

Para cada task:

1. Criar branch isolada
2. PR com descrição técnica
3. Testes passando
4. Atualizar docs
5. Rodar `verification-before-completion`
6. Só então iniciar próxima task

---

# REFERÊNCIAS OBRIGATÓRIAS

.agent/skills_index.json  
.agent/MCPs-uteis.curated-config.json  
.context/Knowledge-Base-Supabase.json  
.context/Knowledge-Base-Firebase.json  
.context/Knowledge-Base-Antigravity.json  
/.context/DOCS-PORTFOLIO-PAGES/  

---

# BLOCO FINAL — ESCOLHA O NÍVEL DE CONTROLE

Modo Auditoria Profunda  
- Relatório técnico completo por task  
- Checklist formal assinado  





