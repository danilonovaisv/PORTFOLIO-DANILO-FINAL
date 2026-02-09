# AGENT.md — Mission Control & Governance

> **SYSTEM OVERRIDE**: Este arquivo é a LEI SUPREMA para a execução de agentes neste workspace.
> **Contexto**: Portfolio Next.js 16 + React 19 + Supabase (Realtime/Storage) + WebGL.
> **Princípio**: "Zero Deploy Content" — O código é o container; o Supabase é o conteúdo.

---

## 1. VISÃO GERAL E OBJETIVOS

Este projeto é um ecossistema digital composto por um **Portfolio Imersivo (WebGL/R3F)** e um **Admin CMS Proprietário**.
A operação é "Agent-First" via Google Antigravity, focada em autonomia, segurança e documentação viva.

### Objetivos Operacionais

1. **Zero-Deploy Content**: Textos, mídias, ordem de projetos e configurações devem ser editáveis no Admin e refletir na produção sem novo build.
2. **Realtime**: Atualizações no Supabase devem propagar via subscriptions ou revalidação on-demand instantânea.
3. **Single Source of Truth**: A pasta `.context/` define a verdade do produto; o código implementa essa verdade.

### Definition of Done (DoD) Global

- [ ] Funcionalidade implementada conforme `.context/`.
- [ ] Conteúdo 100% vindo do Supabase (sem hardcode editorial).
- [ ] Feedback visual de Realtime validado ("editou → piscou").
- [ ] RLS e Auth verificados (sem vazamento de dados `draft`).
- [ ] `.context/` atualizado e entrada no `knowledge/` criada.

---

## 2. ESCOPO DE PÁGINAS (Mapas de Calor)

### 🏠 HOME (`/`)

- **Objetivo**: Manifesto visual, conversão para contato e vitrine rápida.
- **Docs**: `.context/HOME - PROTOTIPO INTERATIVO.md`
- **Código**: `src/app/page.tsx`, `src/components/home/*`, `src/components/canvas/home/hero/*`
- **Dados**: `featured_projects` (Supabase), `site_assets` (Manifesto Vídeo).
- **Regras**: Fallback gracioso se WebGL falhar. Carregamento crítico do Hero.

### 👤 SOBRE (`/sobre`)

- **Objetivo**: Narrativa de autoridade e metodologia.
- **Docs**: `.context/SOBRE-PROTOTIPO-INTERATIVO.md`
- **Código**: `src/app/sobre/page.tsx`, `src/components/sobre/*`
- **Dados**: `about_sections` (texto/mídia), `timeline`.
- **Regras**: Seção 3D (Ghost) deve ser isolada para não bloquear scroll.

### 📂 PORTFOLIO (`/portfolio`)

- **Objetivo**: Galeria completa, filtros e case studies (Modal/Page).
- **Docs**: `.context/PORTFOLIO-PROTOTIPO-INTERATIVO.md`
- **Código**: `src/app/portfolio/*`, `src/components/portfolio/*`
- **Dados**: `projects` (tabela principal), `tags`, `media_gallery`.
- **Regras**: Paginação ou Infinite Scroll performático. Imagens otimizadas via Supabase Image Loader.

### ⚙️ ADMIN (`/admin`)

- **Objetivo**: CMS completo para gestão do site.
- **Docs**: `.context/ADMIN - PROTOTIPO INTERATIVO.md`
- **Código**: `src/app/admin/*`, `src/components/admin/*`, `src/lib/admin/*`
- **Dados**: Acesso total (RLS Admin) a todas as tabelas.
- **Regras**:
  - **Auth Gate**: `src/app/admin/(auth)` protege tudo.
  - **Audit**: Logs de `create/update/delete` obrigatórios.
  - **UX**: Feedback imediato (Toasts) para ações de banco.

---

## 3. FONTE DE VERDADE

1. **Produto & UX** = `.context/*.md`
    - Se o código diz "X" e o `.context` diz "Y", o **Agente deve alertar** e priorizar o `.context` (ou propor atualização do doc).
2. **Estrutura Técnica** = Repositório (`src/`)
    - Caminhos de arquivos e exportações no código são a verdade técnica.

---

## 4. ESTRUTURA DE ASSETS E DADOS

- **Specs & Docs**: `.context/`
- **Assets Estáticos (Build)**: `public/` (apenas logos fixos, ícones de sistema).
- **Assets Dinâmicos (Conteúdo)**: **Supabase Storage**.
  - Bucket: `portfolio-assets` (public) e `admin-uploads` (private).
  - Helper de URL: `src/hooks/useSiteAssetUrl.ts`.
  - Componentes: `src/components/ui/shared/DynamicAssetImage.tsx`.
- **Database Schema**:
  - Definições em `src/lib/database.types.ts` (gerado).
  - Queries centrais em `src/lib/supabase/queries/*`.

---

## 5. ESTRATÉGIA REALTIME (Zero-Deploy)

> **REGRA DURA**: É proibido hardcodar textos de parágrafos, títulos de projetos ou links de cases no código React.

**Workflow de Consumo:**

1. **Server Component**: Faz fetch inicial (SSR) para SEO e performance.
2. **Client Component**: Hidrata e monta subscription (`useRealtimeAssets` ou similar).
3. **Supabase Realtime**: Ouve `INSERT/UPDATE/DELETE` na tabela.
4. **React State**: Atualiza UI instantaneamente.

**Checklist de Validação Realtime:**

1. Abrir Site em janela anônima.
2. Abrir `/admin` logado.
3. Alterar um texto/status no Admin.
4. Verificar reflexo na janela anônima **sem refresh** ( < 2s).
5. Se falhar: Debugar Subscription e RLS.

---

## 6. ADMIN & SEGURANÇA

### Autenticação & Autorização

- Login via `src/app/admin/(auth)/login`.
- Middleware `src/middleware.ts` deve bloquear rotas `/admin/(protected)` para não-autenticados.
- Use `src/lib/admin/authz.ts` para verificar roles no lado do servidor.

### Supabase RLS (Row Level Security)

- **Public**: `SELECT` permitido apenas onde `status = 'published'` (para tabelas de conteúdo).
- **Admin**: `ALL` permitido para roles autenticadas com claim de admin.
- **Storage**: Upload/Delete restrito a Admin. Download público para assets do site.

### Segurança Operacional

- **Secrets**: Nunca commitar `.env`. Validar presença de `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (apenas server-side).
- **Logs**: Registrar ações destrutivas em tabela de auditoria (se houver) ou console estruturado.

---

## 7. DOCUMENTAÇÃO VIVA (`.context/`)

A manutenção desta pasta é **obrigatória** e **contínua**.

- **Mudou uma feature?** -> Atualize o `.context/[PAGINA] - PROTOTIPO.md`.
- **Mudou a stack?** -> Atualize `.context/ARCHITECTURE.md`.
- **Mudou tokens visuais?** -> Atualize `.context/GHOST-DESIGN-SYSTEM.md`.

---

## 8. KNOWLEDGE LOG (`.context/knowledge/`)

Toda tarefa concluída deve gerar uma entrada no Changelog.

**Formato da Entrada:**

```markdown
## [YYYY-MM-DD] - [TIPO]
**Escopo**: [admin | public | realtime | security | docs]
**Resumo**: Uma frase sobre o que mudou.
**Decisão**: Por que foi feito assim? (Contexto).
**Arquivos**: Lista dos principais arquivos tocados.
**Impacto**: O que o usuário ou dev percebe de diferente.

```

---

## 9. ARQUITETURA DE EXECUÇÃO (THE 3-LAYER MODEL)

Você opera dentro de uma arquitetura de 3 camadas que separa preocupações para maximizar a confiabilidade. LLMs são probabilísticos, enquanto a maior parte da lógica de negócios é determinística e requer consistência. Este sistema corrige esse descompasso.

### **Layer 1: Diretrizes e Contexto (O Que Fazer)**

- **Fonte**: Documentos em `.context/` e workflows em `.agent/workflows/`.
- **Função**: Definem os objetivos, inputs, ferramentas/scripts a usar, outputs esperados e edge cases.
- **Natureza**: Instruções em linguagem natural, como SOPs (Standard Operating Procedures) para um engenheiro sênior.

### **Layer 2: Orquestração (Tomada de Decisão)**

- **Fonte**: **VOCÊ (O Agente)**.
- **Função**: Roteamento inteligente.
- Ler as diretrizes (.context).
- Chamar ferramentas de execução na ordem certa.
- Tratar erros e pedir esclarecimentos.
- Atualizar as diretrizes com aprendizados.

- **Papel**: Você é a cola entre a intenção humana e a execução do código. *Ex: Não tente "adivinhar" o schema do banco; leia `src/lib/database.types.ts` e execute scripts de validação.*

### **Layer 3: Execução Determinística (O Trabalho Real)**

- **Fonte**: Scripts em `scripts/` e utilitários em `src/lib/`.
- **Função**: Código TypeScript/Python determinístico.
- Manipulação de API, processamento de dados, operações de arquivo, interações com Supabase.

- **Natureza**: Confiável, testável, rápido. Comentado e tipado.
- **Por que funciona**: Se você faz tudo manualmente (token a token), erros se acumulam. A solução é **empurrar a complexidade para o código determinístico**. Dessa forma, você foca apenas na tomada de decisão.

### **Princípios Operacionais**

1. **Check for Tools First**: Antes de escrever um script novo, verifique `scripts/` e `src/lib/`. Só crie novos se não existirem.
2. **Self-Annealing Loop (Ciclo de Auto-Correção)**:

- Quando algo quebrar: **Não peça desculpas, conserte.**

1. Leia a mensagem de erro e stack trace.
2. Corrija o código/script e teste novamente.
3. **ATUALIZE O DOC/DIRETRIZ**: Se você descobriu um limite de API, uma race condition ou um edge case, atualize o arquivo `.context/` correspondente imediatamente. O sistema deve ficar mais forte após cada erro.

4. **Directives are Living Documents**: Diretrizes são seu conjunto de instruções. Elas devem ser preservadas e melhoradas ao longo do tempo, nunca descartadas.

---

## 10. ORQUESTRAÇÃO MULTI-AGENT (Antigravity)

**Estrutura do Squad:**

1. **Orchestrator**: Lê `task.md`, quebra em passos, delega.
2. **Repo Analyst**: "Onde está o código?". Mapeia imports e dependências.
3. **Builder**: Escreve código (React/TS/Supabase).
4. **Verifier (QA)**: Testa segurança, realtime e build.
5. **Scribe**: Atualiza `.context/` e gera logs.

**Fluxo Padrão:**

1. Análise (Ler Docs) -> 2. Plano (`implementation_plan.md`) -> 3. Aprovação -> 4. Execução -> 5. Validação -> 6. Documentação.

---

## 11. REGRAS DE EXECUÇÃO (Safety)

### Modo: Request Review

- O Agente deve pedir confirmação antes de:
- Executar comandos de escrita no terminal (exceto logs/temp).
- Deletar arquivos.
- Alterar configurações de segurança (RLS/Auth).

### Allowlist Terminal

- `git status`, `git log`, `git diff`
- `ls`, `cat`, `grep`, `find`
- `npm run lint`, `npm run typecheck`, `npm run build`

### Denylist Terminal (Requer Aprovação Explícita)

- `rm -rf`, `sudo`
- `git push`, `git commit` (O agente gera o stage, o humano commita/pusha preferencialmente, ou aprova explicitamente).
- Instalação de pacotes globais.

---

## 12. ARTIFACTS

Todo ciclo de trabalho deve produzir em `artifacts/`:

1. `implementation_plan.md`: O que será feito.
2. `verification.md`: Como testar o que foi feito.
3. `docs_update_summary.md`: Diff da documentação viva.
4. `knowledge_entry.md`: Texto pronto para o log.

---

## 13. PENTEST ÉTICO (AUTORIZADO)

> **ATIVAR APENAS SOB COMANDO EXPLÍCITO: "INICIAR PENTEST"**

**Protocolo de Segurança:**

1. **Scope Check**: Ler `targets/scope.txt` antes de qualquer pacote enviado.
2. **No Destructive**: Proibido testes de DoS, flooding ou exclusão de dados.
3. **PII Stop**: Se encontrar dados pessoais reais, PARAR IMEDIATAMENTE e reportar.

**Workflow de Pentest:**

1. **Recon**: Mapear rotas e headers (passivo).
2. **Analysis**: Verificar RLS via cliente Supabase (tentar ler dados não publicados).
3. **Report**: Gerar `reports/final-pentest.md` com Findings (Criticidade, PoC, Correção).
4. **Clean**: Remover quaisquer dados de teste criados no banco.

**Artifacts de Pentest:**

- `payloads/`: Scripts usados (auditáveis).
- `reports/`: Relatório final.
