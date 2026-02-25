# AUDITORIA-JULES-25.02.md

### 1️⃣ Visão Geral Executiva

O módulo de administração do `PORTFOLIO-DANILO-FINAL` apresenta uma arquitetura robusta e moderna, alinhada com as melhores práticas do Next.js 15 (App Router). A segurança está bem implementada através de *Role-Based Access Control* (RBAC) e *Row Level Security* (RLS) no Supabase. No entanto, a experiência móvel (Mobile-first) em tabelas de dados e a gestão de feedback ao utilizador (uso excessivo de `alert()`) necessitam de refatoração imediata para garantir usabilidade profissional.

**Top 5 Pontos Fortes:**
1.  **Server Actions & React 19 Patterns:** Uso consistente de `useActionState` e `useTransition` para mutações otimistas e gestão de estado de formulário.
2.  **Segurança em Camadas:** Proteção dupla via Middleware (Redirecionamento) e `authz.ts` (Verificação de Role/Email), além de RLS no banco.
3.  **Real-time Updates:** Integração nativa com Supabase Realtime (`ProjectsTable`) para atualizações instantâneas sem refresh manual.
4.  **Arquitetura de Templates:** Suporte escalável a múltiplas versões de landing pages (Legacy, V1, V2, V3) através de uma estrutura de dados flexível.
5.  **Integração AI:** Ferramentas de geração de copy e cenas (`Scene Generator`) bem integradas ao fluxo de trabalho admin.

**Top 5 Vulnerabilidades/Problemas:**
1.  **UX Mobile em Tabelas:** `ProjectsTable` e `LandingPagesListPage` quebram o layout em telas pequenas, exigindo scroll horizontal ou cortando conteúdo.
2.  **Gestão de Erros Obsoleta:** Uso de `alert()` e `confirm()` nativos do browser em fluxos críticos (`LandingPageForm`), interrompendo a experiência.
3.  **Componentes Monolíticos:** `LandingPageForm.tsx` possui ~900 linhas, misturando lógica de transformação de dados, upload e renderização de UI.
4.  **Feedback Visual Inconsistente:** Inputs de arquivo (`AssetForm`) não resetam visualmente após o envio, podendo confundir o utilizador sobre o estado do upload.
5.  **Filtragem Client-side em Assets:** A galeria de mídia carrega todos os assets e filtra no cliente, o que degradará a performance com o crescimento da base.

---

### 2️⃣ Diagnóstico por Módulo

| Módulo | Status UI/UX | Mobile-First | Dados & Segurança | Obs. |
| :--- | :---: | :---: | :---: | :--- |
| **Auth & Shell** | ✅ Excelente | ✅ Responsivo | ✅ Seguro | Sidebar/Sheet bem implementados. Hack de `setTimeout` no Login é aceitável para cookies. |
| **Dashboard** | ✅ Bom | ✅ Responsivo | ✅ Otimizado | Carregamento paralelo de estatísticas evita *waterfalls*. |
| **Trabalhos (CRUD)** | ⚠️ Médio | 🔴 Crítico | ✅ Seguro | Tabela quebra no mobile. Formulário bem estruturado com Zod. |
| **Mídia (Assets)** | ⚠️ Médio | ✅ Responsivo | ⚠️ Atenção | Filtros client-side podem ser gargalo futuro. Reset de input falho. |
| **Landing Pages** | ⚠️ Médio | 🔴 Crítico | ✅ Robusto | Tabela mobile quebrada. Form gigante e difícil de manter. `alert()` excessivo. |
| **AI Tools** | ✅ Excelente | ✅ Responsivo | ✅ Seguro | UI moderna com feedback claro de *loading*. |

---

### 3️⃣ Lista de Problemas (Priorizada por Severidade)

#### 🔴 Crítico (P0)
*Nenhum problema crítico de segurança ou infraestrutura encontrado.*

#### 🟡 Médio (P1)
1.  **[UX/Mobile] Tabelas não responsivas:** As tabelas de listagem de projetos e landing pages não se adaptam a telas móveis, comprometendo a gestão *on-the-go*.
2.  **[UX] Uso de `alert()` blocking:** A interrupção do fluxo com alertas nativos em `LandingPageForm` degrada a experiência *premium* esperada.
3.  **[Code Quality] Monólito `LandingPageForm`:** Dificuldade de manutenção e teste devido ao acoplamento excessivo de lógica de transformação de dados.

#### 🟢 Baixo (P2)
1.  **[UX] Reset de Input de Arquivo:** O campo de upload em `AssetForm` mantém o nome do arquivo selecionado mesmo após o envio bem-sucedido.
2.  **[Performance] Filtro de Assets no Cliente:** Paginação e busca são feitas no frontend após carregar todos os dados.
3.  **[Code Style] Mistura de Estilos:** Uso inconsistente de classes utilitárias e objetos de estilo em alguns componentes legados.

---

### 4️⃣ Prompts Técnicos para Correção (Modelo Antigravity Atómico)

> **### 🛠️ Prompt #01 — Responsividade Mobile das Tabelas (Card View)**
> **Objetivo:** Converter as tabelas de `ProjectsTable` e `LandingPagesListPage` em layouts de lista de cartões (Card View) para dispositivos móveis (< md), mantendo a tabela completa apenas em Desktop.
> **Arquivos Afetados:**
> - `src/components/admin/ProjectsTable.tsx`
> - `src/app/admin/(protected)/landing-pages/page.tsx`
> **Ações a Executar:**
> 1. Criar um sub-componente `ProjectCardItem` e `LandingPageCardItem` para exibir os dados essenciais (Título, Status, Ações) em layout vertical.
> 2. Utilizar classes `hidden md:table` para a tabela original e `block md:hidden` para a nova lista de cards.
> 3. Garantir que os botões de ação (Editar, Excluir) sejam acessíveis e tenham área de toque mínima de 44px no mobile.
> **Regras:** Manter o *Ghost Design* (bordas sutis, fundos translúcidos). Não alterar a lógica de *fetching* ou *server actions*.
> **Critérios de Aceite:**
> - Em telas < 768px, deve-se ver uma lista de cards verticais.
> - Em telas >= 768px, deve-se ver a tabela original.
> - Todas as ações (Editar/Excluir/Toggle) devem funcionar em ambas as visões.

---

> **### 🛠️ Prompt #02 — Modernização de Feedback (Toast & Dialog)**
> **Objetivo:** Substituir todas as chamadas nativas de `alert()` e `confirm()` por componentes de UI modernos (`Toast` e `AlertDialog`) para feedbacks não-bloqueantes e confirmações elegantes.
> **Arquivos Afetados:**
> - `src/components/admin/LandingPageForm.tsx`
> - `src/components/admin/ProjectsTable.tsx` (já usa custom button, mas verificar consistência)
> **Ações a Executar:**
> 1. Integrar o hook `useToast` (do shadcn/ui já instalado) em `LandingPageForm`.
> 2. Substituir `alert('Erro...')` por `toast.error('Erro...')`.
> 3. Substituir `alert('Sucesso...')` por `toast.success('Sucesso...')`.
> 4. Substituir `confirm('Tem certeza...')` por um componente `AlertDialog` local ou controlada por estado para remoção de blocos.
> **Regras:** Manter a consistência visual com o tema escuro do admin.
> **Critérios de Aceite:**
> - Nenhuma janela nativa do browser deve abrir ao salvar ou excluir itens.
> - Notificações de sucesso/erro devem aparecer flutuando no canto da tela.

---

> **### 🛠️ Prompt #03 — Refatoração do `LandingPageForm` (Extração de Lógica)**
> **Objetivo:** Extrair a lógica complexa de transformação de dados (funções `toMasterDraft`, `stripMasterDraft`, `saveMasterTemplateV*`) para um arquivo utilitário separado, reduzindo o tamanho do componente visual.
> **Arquivos Afetados:**
> - `src/components/admin/LandingPageForm.tsx`
> - (Novo) `src/lib/admin/transformers/landing-page.ts`
> **Ações a Executar:**
> 1. Criar `src/lib/admin/transformers/landing-page.ts`.
> 2. Mover todas as interfaces de Draft e funções de conversão (`toMasterDraft`, `stripMasterDraft`, etc.) para este novo arquivo.
> 3. Mover a lógica de upload e persistência (`saveMasterTemplateV1`, etc.) para funções puras ou hooks customizados se possível, ou mantê-las limpas no componente importando apenas os helpers de transformação.
> **Regras:** Não alterar o comportamento funcional do formulário. Garantir que os tipos TypeScript sejam exportados e importados corretamente.
> **Critérios de Aceite:**
> - O arquivo `LandingPageForm.tsx` deve ter uma redução significativa de linhas (~200+ linhas removidas).
> - O formulário deve continuar salvando e carregando dados de todas as versões (Legacy, V1, V2, V3) corretamente.
