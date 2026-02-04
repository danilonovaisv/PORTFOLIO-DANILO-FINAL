---
description: ### 🚀 Workflow Antigravity: Auditoria e Sincronização de Portfólio
---

### 🚀 Workflow Antigravity: Auditoria e Sincronização de Portfólio

Para garantir que a auditoria seja executada com precisão cirúrgica e que nenhum detalhe do seu protótipo interativo seja perdido, preparei um **Workflow Template de Orquestração Antigravity**.

Este template deve ser injetado no início da sessão do Agente Manager para que ele coordene os agentes especialistas (Layout, Motion, Mobile, Backend/Admin) conforme as especificações do documento canônico.

#### **FASE 0: Reconhecimento e Leitura Profunda**

Antes de qualquer alteração, o **Agente Manager** deve:

* Ler o arquivo `docs/PORTFOLIO/PORTFOLIO-PROTOTIPO-INTERATIVO.md` na íntegra para absorver as regras de animação (timings de 150ms a 1500ms) e os tipos de modal (A/B).
* Analisar os contratos de dados em `src/types/project.ts` para garantir compatibilidade com o Admin.
* Mapear as URLs de vídeo do Supabase destinadas à Hero Section (Desktop vs Mobile).

---

#### **FASE 1: Divisão de Responsabilidades (Batalhão Especializado)**

Cada ajuste será atribuído a um agente com foco específico:

| Agente Especialista | Responsabilidade | Ajustes Descritos no Protótipo |
| --- | --- | --- |
| **Agent_Layout_Grid** | Estrutura e Grid Editorial | Implementar o **Mosaic Grid** com preenchimento 100% da largura e `grid-auto-flow: dense`. |
| **Agent_Motion_Lerp** | Performance e Suavidade | Configurar o sistema **Parallax Lerp** com `requestAnimationFrame` e suavidade (easing 0.05). |
| **Agent_Mobile_First** | Responsividade e Touch | Garantir que o grid colapse para lista no mobile e que o Header não tenha áreas "mortas". |
| **Agent_Admin_Sync** | Dados e Categorias | Sincronizar as tags do Admin com os filtros: *Brand & Campaigns, Videos & Motions, Web & Tech*. |
| **Agent_Ghost_System** | Refinamento Estético | Aplicar o timeline de animação do modal: Backdrop (180ms) → Container (380ms) → Media (760ms). |

---

#### **FASE 2: Execução por Blocos de Teste (Unitários)**

Para evitar perda de informação, os ajustes serão realizados e testados nesta ordem:

1. **Bloco Data-Link (Admin/DB):**

* Verificar se a query em `src/lib/supabase/queries/projects.ts` está puxando as tags corretas para os novos filtros do showcase.
* Validar se o campo `type: 'A' | 'B'` está sendo lido corretamente do banco para disparar o layout de modal adequado.

1. **Bloco Visual-Core (Hero & Gallery):**

* Implementar a **Hero Section** com os vídeos em loop do Supabase e o overlay de gradiente para legibilidade.
* Ajustar os `spans` dos cards no grid (sm, md, lg, wide, tall) conforme as referências visuais.

1. **Bloco Interativo (Modal & Parallax):**

* Configurar o `useLERPScroll` para atuar apenas quando `prefersReducedMotion` for falso.
* Executar o **Checklist de Validação Ghost QA**: ESC fecha modal, foco retorna ao card e scroll do body é bloqueado.

---

#### **FASE 3: Validação Final e Checklist Anti-Erro**

* **Acessibilidade:** Validar se o modal possui `role="dialog"` e se os contrastes seguem WCAG AA/AAA.
* **Performance:** Garantir que o Parallax seja pausado (`body overflow hidden`) enquanto o modal estiver aberto para economizar recursos.
* **SEO:** Verificar se os títulos dos projetos usam a hierarquia semântica correta (`<h2>` para títulos de seção).

---

#### Fase 4: Auditoria de Integração (Data-Link)

O primeiro passo é garantir que a página `/portfolio` não use apenas dados estáticos, mas sim o que está no banco de dados, respeitando as categorias solicitadas.

1. **Mapeamento de Tags (Filtros):**

* **Ação:** Validar se as tags no Admin correspondem aos clusters:
* `brand-campaigns`
* `videos-motions`
* `web-tech`

* **Arquivo:** `src/lib/supabase/queries/tags.ts` e `src/config/content.ts`.

1. **Verificação de Query:**

* **Ação:** Ajustar a função `listProjects` para suportar o filtro por essas categorias específicas via URL ou estado.
* **Arquivo:** `src/lib/supabase/queries/projects.ts`.

#### Fase 5: Implementação do Layout Editorial (Mosaic Grid)

Conforme o `PROMPT_06` do seu sistema Antigravity, o grid deve ser 100% responsivo e preencher "buracos".

1. **Sync de Layout:**

* **Ação:** Garantir que o campo `layout.size` (sm, md, lg, wide, tall) definido no `ProjectForm.tsx` seja respeitado pelo `ProjectsGallery.tsx`.

1. **Correção de LERP/Parallax:**

* **Ação:** Validar se o `useLERPScroll` está calculando corretamente a altura total da galeria baseada no `trackRef` para evitar "pulo" no final da página.

#### Fase 6: Validação dos Modais (Tipo A vs Tipo B)

O protótipo define dois tipos de experiência. O sistema deve decidir qual abrir baseado no dado vindo do Admin.

1. **Lógica de Seleção:**

* **Ação:** No componente `PortfolioModal.tsx`, implementar o switch:
* **Tipo A (Zoom):** Para projetos com apenas uma imagem principal.
* **Tipo B (Case):** Para projetos que possuem `gallery` ou `description` longa.

1. **Animação "Silenciosa":**

* **Ação:** Aplicar o timeline de 1500ms (Backdrop → Container → Media → Texto) usando Framer Motion.

---

### 🛠️ Novos Prompts Atômicos (Adição ao `prompts.ts`)

Você deve adicionar estes prompts ao seu `ATOMIC_PROMPTS` para automatizar a correção:

```typescript
{
  id: 'PROMPT_PORTFOLIO_SYNC',
  title: 'Sincronizar Categorias Admin com Filtros Showcase',
  severity: 'high',
  category: 'layout',
  objective: 'Conectar os clusters de tags do Admin aos menus de filtro da galeria.',
  files: ['src/components/portfolio/ProjectsGallery.tsx', 'src/lib/supabase/queries/projects.ts'],
  actions: [
    'Implementar filtro por slug de tag na query principal.',
    'Criar a barra de navegação superior com os 3 pilares: Brand, Motion e Web.'
  ],
  acceptanceCriteria: ['Clicar em "Videos & Motions" filtra instantaneamente os projetos via Supabase.']
},
{
  id: 'PROMPT_MODAL_ORCHESTRATOR',
  title: 'Orquestrador de Modais Tipo A/B',
  severity: 'critical',
  category: 'motion',
  objective: 'Garantir que o modal correto abra conforme a complexidade do projeto no DB.',
  files: ['src/components/portfolio/PortfolioModal.tsx'],
  actions: [
    'Validar a presença de galeria no objeto do projeto para forçar Tipo B.',
    'Implementar o bloqueio de scroll (BodyLock) ao abrir o modal.'
  ],
  acceptanceCriteria: ['O fechamento via ESC funciona e o foco retorna ao card original.']
}

```

---

### 📋 Checklist de Integridade (Ghost QA)

* [ ] **Mídia:** Imagens de capa estão com `object-cover` e `priority` nas 3 primeiras?
* [ ] **Admin:** O `ProjectForm` permite selecionar se o projeto é destaque no Portfólio (`featured_on_portfolio`)?
* [ ] **Performance:** O vídeo da Hero está abaixo de 10MB e em loop silencioso?
* [ ] **Mobile:** O grid colapsa para 1 coluna sem scroll horizontal?
* [ ] **Conexão LP:** Se o projeto tem uma `landingPageSlug`, o modal redireciona ou abre a LP interna?

Este workflow garante que seu portfólio não seja apenas um site visual, mas uma ferramenta de gestão conectada ao seu fluxo de trabalho no **Admin Shell**.
