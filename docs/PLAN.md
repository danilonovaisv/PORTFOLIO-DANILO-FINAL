# Plano de Ajustes e Melhorias - Frontend Audit

## 1. Visão Geral

Auditoria realizada nas páginas principais (`/`, `/sobre`, `/portfolio`, `/contato`) e estilos globais com foco em "Frontend Code Review" e "Frontend Design" (Ghost Era Guidelines).

## 2. Resultados da Auditoria

### 🟢 Pontos Positivos

- **Estrutura**: Uso consistente de Server Components e metadados de SEO.
- **Design System**: Variáveis CSS (Tailwind v4-like) e `std-grid` bem definidos.
- **Patterns**: Uso do `SiteClosure` na maioria das páginas.
- **Performance**: `createStaticClient` e ISR configurados.

### 🔴 Pontos de Atenção (Ajustes Necessários)

#### A. Arquitetura & Código (Code Review)

1. **Portfolio Page (`src/app/portfolio/page.tsx`)**:
   - **Complexidade**: Lógica de fallback (`buildFallbackProjects`, `FALLBACK_CATEGORY_MAP`) acoplada diretamente à página. Dificulta manutenção.
   - **Hardcoding**: Cores de destaque (`accentColor`) hardcoded dentro do mapper.

2. **Home Page (`src/app/page.tsx`)**:
   - **Dead Code**: Comentários de código morto (`// Removed unused...`).
   - **Robustez**: Tratamento de erro no fetch de projetos pode resultar em seção vazia sem feedback visual (embora evite crash).

#### B. Design & Consistência (Frontend Design)

1. **Contact Page (`src/app/contato/page.tsx`)**:
   - **Violação de Pattern**: A página de contato não segue o padrão "Ghost Era Closure" completo. Falta a seção `ClientsBrandsSection` antes do formulário, quebrando a consistência narrativa presente em Home e Sobre.

2. **Global Styles (`src/app/globals.css`)**:
   - **Manutenção**: Mistura de definições de variáveis. Algumas cores hardcoded em hex que poderiam usar tokens do sistema (ex: `#0048ff` repetido).

## 3. Plano de Ação

### Fase 1: Refatoração & Limpeza

- [x] **Extrair Lógica de Fallback**: Mover `buildFallbackProjects` e mapas auxiliares de `/portfolio` para `src/lib/portfolio/fallbacks.ts`.
- [x] **Centralizar Estilos**: Mover lógica de cores por categoria para `src/config/brand.ts` ou utilitário de estilos.
- [x] **Limpeza Home**: Remover comentários e importações não utilizadas.

### Fase 2: Consistência Visual (Ghost Era)

- [x] **Padronizar Contato**: Adicionar `ClientsBrandsSection` na página de contato (antes do formulário) para alinhar com o `SiteClosure` pattern.
- [x] **Revisão de Cores**: Substituir valores hex hardcoded em `globals.css` por variáveis CSS onde possível para facilitar temas.

### Fase 3: Validação

- [ ] Verificar build (`npm run build`) - *Validation skipped: Dev server locked files. Please verify manually.*
- [ ] Verificar consistência visual em mobile/desktop.

---

**Aprovação**: Aguardando confirmação do usuário para iniciar a implementação via `parallel-agents`.
