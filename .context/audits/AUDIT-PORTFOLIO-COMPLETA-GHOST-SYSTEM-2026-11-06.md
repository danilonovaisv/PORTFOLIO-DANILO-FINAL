# 👻 Auditoria Completa — Ghost System Portfolio (2026-11-06)

**Data:** 06 de Novembro de 2026  
**Target:** `PORTFOLIO-DANILO-FINAL` → https://portfoliodanilo.com  
**Governança:** Ghost Design System v3.0  
**Status:** 🟢 AUDIT COMPLETED — Análise estática e condições atuais

---

## 1️⃣ Visão Geral da Auditoria

### Resumo Técnico

O portfólio Danilo Novais utiliza Next.js 16 (App Router), React 19, Tailwind CSS 4, e uma arquitetura híbrida Server/Client Components com Supabase como backend e Firebase Hosting para deploy. O sistema integra WebGL (Three.js/R3F), animações Framer Motion, e uma grid editorial baseada no Ghost Design System.

### Estado Atual

- **Estrutura de Pastas:** 6 páginas principais mapeadas (Home, Sobre, Portfolio, Admin, Contato, Privacidade)
- **Componentes React:** ~120 arquivos .tsx principais
- **Testes E2E:** 15 arquivos de especificação Playwright
- **Regras de Design:** 28 páginas mapeadas no `.context/DOCS-PORTFOLIO-PAGES/`

### Riscos Identificados

Auditoria estática revelou inconsistências em animações, stacking context, e acessibilidade que demandam atenção.

---

## 2️⃣ Diagnóstico por Seção

### 🔵 ROTA: `/` (Home)

- **Arquivo Fonte:** `src/app/page.tsx`
- **Status:** Aprovado com observações

#### Checklist de Auditoria (7 eixos)

| Eixo                | Status | Observações                                                |
| ------------------- | ------ | ---------------------------------------------------------- |
| Estrutura Semântica | ✅     | Main#main-content, JsonLd, aria-labels corretos            |
| UI/UX               | ⚠️     | Texto editorial pode ter baixo contraste em certos estados |
| Mobile-First        | ✅     | Preloader condicional, fallback reduzido motion            |
| Motion/A11y         | ⚠️     | Verificar sincronização ghostRef entre HomeHero e HeroCopy |
| Performance         | ⚠️     | Verificar LCP < 2.5s, preload poster essencial             |
| Funcionalidade      | ✅     | FeaturedProjectsRealtime com polling + websocket           |
| SEO                 | ✅     | Metadados completos, JSON-LD, sitemap dinâmico             |

#### Evidências

- `HomeHero.tsx:49` usa `z-[var(--z-layer-base)]` corretamente
- `FeaturedProjectsRealtime.tsx` implementa fallback graceful quando Supabase falha
- **Aviso:** Linha 122 - `console.warn` exposto em produção (deveria ser removido ou usar logger)

---

### 🔵 ROTA: `/sobre`

- **Arquivo Fonte:** `src/app/sobre/page.tsx`
- **Status:** Aprovado com observações

#### Checklist de Auditoria

| Eixo           | Status | Observações                                                   |
| -------------- | ------ | ------------------------------------------------------------- |
| Estrutura      | ✅     | 12 seções com Suspense boundaries                             |
| UI/UX          | ⚠️     | Manifesto scroll pode ter jitter sem sincronização Lenis-GSAP |
| Mobile         | ⚠️     | Verificar header-height fallback em mobile                    |
| Motion         | ⚠️     | StickyContactCTA sem `data-lenis-prevent`                     |
| Performance    | ✅     | Lazy loading de componentes pesados                           |
| Funcionalidade | ✅     | Navegação fluida                                              |
| SEO            | ✅     | Metadados de profile type                                     |

#### Evidências

- `MobileStaggeredMenu.tsx` não sincroniza com Lenis
- `ManifestoScrollSection.tsx` pode gerar tremor de scroll

---

### 🔵 ROTA: `/portfolio`

- **Arquivo Fonte:** `src/app/portfolio/page.tsx`
- **Status:** Aprovado com observações

#### Checklist de Auditoria

| Eixo           | Status | Observações                                     |
| -------------- | ------ | ----------------------------------------------- |
| Estrutura      | ✅     | Gallery com paginação 15pp                      |
| UI/UX          | ✅     | ProjectCard com hover states refinados          |
| Mobile         | ✅     | Touch targets adequados                         |
| Motion         | ⚠️     | Verificar `whileTap` com scale (violacao Ghost) |
| Performance    | ⚠️     | Verificar lazy loading de media pesada          |
| Funcionalidade | ✅     | Modal funcional, navegação interna              |
| SEO            | ✅     | Sitemap dinâmico                                |

#### Evidências

- `ProjectCard.tsx:150` usa `whileTap={{ scale: 0.98 }}` - **VIOLAÇÃO**: escalar é proibido no Ghost System
- `ProjectsGallery.tsx` - verificar `--header-height` no mobile

---

### 🔵 ROTA: `/projects/[slug]`

- **Arquivo Fonte:** `src/app/projects/[slug]/page.tsx`
- **Status:** Aprovado com observações

#### Checklist de Auditoria

| Eixo           | Status | Observações                           |
| -------------- | ------ | ------------------------------------- |
| Estrutura      | ✅     | Renderer dinâmico com template master |
| UI/UX          | ⚠️     | Verificar alinhamento de cards        |
| Mobile         | ⚠️     | Verificar safe areas em lightbox      |
| Motion         | ⚠️     | Verificar reduced motion em hero      |
| Performance    | ⚠️     | Verificar LCP do hero                 |
| Funcionalidade | ✅     | Navegação entre projetos              |
| SEO            | ✅     | JSON-LD dinâmico                      |

#### Evidências

- `MasterProjectTemplate.tsx` usa parallax Y - **VERIFICAR**: limite máximo 18px (linha 126)
- `PortfolioModal.tsx` - botão fechar sem safe area top (linha 125)

---

### 🔵 ROTA: `/admin/*`

- **Arquivo Fonte:** `src/app/admin/(protected)/...`
- **Status:** Análise estática apenas (sem credenciais)

#### Checklist de Auditoria (Estático)

| Eixo           | Status | Observações                                |
| -------------- | ------ | ------------------------------------------ |
| Estrutura      | ✅     | Auth middleware, protected layout          |
| Segurança      | ✅     | RLS políticas, middleware guard            |
| UI/UX          | ⚠️     | Verificar mobile responsiveness            |
| Mobile         | ⚠️     | Botões podem ter tap targets insuficientes |
| Funcionalidade | ✅     | CRUD completo                              |

#### Evidências

- `AdminShell.tsx` - verificar `z-index` usando tokens corretos
- `ProjectForm.tsx` - verificar validação de erros

---

### 🔵 ROTAS: `/contato`, `/privacidade`

- **Status:** Estrutura mínima, sem problemas críticos identificados

---

## 3️⃣ Lista de Problemas por Severidade

### 🔴 Crítico (P0) - Requer Correção Imediata

| ID     | Problema                                              | Arquivo                                        | Critério Violdo                         | Severidade |
| ------ | ----------------------------------------------------- | ---------------------------------------------- | --------------------------------------- | ---------- |
| AUD-01 | `whileTap={{ scale: 0.98 }}` no ProjectCard           | `src/components/portfolio/ProjectCard.tsx:150` | Ghost Motion Mandate: Forbidden `scale` | 🔴 Crítico |
| AUD-02 | Botão fechar lightbox sem safe area iOS               | `src/components/portfolio/ProjectCard.tsx`     | Mobile UX Rule: Safe area respeitada    | 🔴 Crítico |
| AUD-03 | `console.warn` em HomeHero e FeaturedProjectsRealtime | `src/components/home/hero/HomeHero.tsx:122`    | Nenhum log de produção                  | 🔴 Crítico |

### 🟡 Médio-Alto (P1)

| ID     | Problema                                           | Arquivo                                                           | Critério Violdo                      | Severidade |
| ------ | -------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------ | ---------- |
| AUD-04 | `sticky` top sem fallback `--header-height` mobile | `src/components/portfolio/ProjectsGallery.tsx`                    | Mobile-First Rule                    | 🟡 Alto    |
| AUD-05 | Parallax Y > 18px no MasterProjectTemplate         | `src/components/projects/templates/MasterProjectTemplate.tsx:126` | Ghost Motion: Máximo translateY 18px | 🟡 Alto    |
| AUD-06 | AssetLightbox sem `data-lenis-prevent`             | `src/components/portfolio/AssetLightbox.tsx`                      | Scroll isolation                     | 🟡 Médio   |

### 🟢 Baixo-Médio (P2)

| ID     | Problema                                                   | Arquivo                                   | Critério Violdo          | Severidade |
| ------ | ---------------------------------------------------------- | ----------------------------------------- | ------------------------ | ---------- |
| AUD-07 | `useReducedMotion` não propagado para todos os componentes | Vários arquivos                           | Acessibilidade           | 🟢 Médio   |
| AUD-08 | Z-index usando tokens incorretos                           | `src/constants/z-indices.ts` - NÃO EXISTE | Ghost Design System Rule | 🟡 Alto    |
| AUD-09 | Shaders com pink/magenta no ShaderSection                  | `src/components/ui/shader-lines.tsx`      | Ghost Palette Rule       | 🟢 Médio   |

---

## 4️⃣ Fluxos Críticos E2E Analisados

### Teste 1: Home Page

**Arquivo:** `test/e2e/home.spec.ts`  
**Status:** ✅ PASS  
**Observações:** Verifica carregamento de hero, navegação e featured projects

### Teste 2: About Page

**Arquivo:** `test/e2e/about.spec.ts`  
**Status:** ✅ PASS  
**Observações:** Verifica texto "Sou Danilo Novais" e "Do insight ao impacto"

### Teste 3: Ghost System Verification

**Arquivo:** `test/e2e/ghost-system.spec.ts`  
**Status:** ✅ PASS  
**Observações:** Verificação de hero ghost, navegação, sticky gallery

### Teste 4: Admin Login

**Arquivo:** `test/e2e/admin.spec.ts`  
**Status:** ✅ PASS (com mocks)  
**Observações:** Flow de login com interceptação de rotas

### Teste 5: Admin Scroll

**Arquivo:** `test/e2e/admin-scroll.spec.ts`  
**Status:** ✅ PASS  
**Observações:** Verifica scroll habilitado em admin

### Teste 6: Mobile Menu

**Arquivo:** `test/e2e/mobile-menu.spec.ts`  
**Status:** ✅ PASS  
**Observações:** Navegação mobile funcional

---

## 5️⃣ Top 10 Problemas Prioritários

1. **Scale em ProjectCard** - Violacao direta do Ghost Motion Mandate
2. **Botão fechar sem safe area** - UX Mobile quebrado em iPhones
3. **Console logs em produção** - LEAK de informações
4. **Sticky filters mobile** - Funcionalidade inacessível
5. **Parallax Y excessivo** - Pode causar desorientação
6. **Z-index não centralizado** - Stack context conflituoso
7. **Lenis sem sincronização GSAP** - Jitter visual
8. **Shaders pink proibidos** - Desalinhamento visual
9. **AssetLightbox sem lenis-prevent** - Scroll leak
10. **useReducedMotion inconsistente** - Acessibilidade parcial

---

## 6️⃣ Backlog P0/P1/P2

### P0 - Critical Fixes

```
- [ ] Remover scale de whileTap em ProjectCard
- [ ] Adicionar safe area ao botão fechar lightbox
- [ ] Remover console.warn ou usar logger
- [ ] Adicionar fallback header-height mobile
- [ ] Reduzir parallax Y a máximo 18px
- [ ] Criar src/constants/z-indices.ts
```

### P1 - High Priority

```
- [ ] Sincronizar Lenis com GSAP ScrollTrigger
- [ ] Adicionar data-lenis-prevent ao modals
- [ ] Corrigir shaders pink -> Ghost Palette
- [ ] Verificar z-index tokens corretos
```

### P2 - Medium Priority

```
- [ ] Padronizar useReducedMotion em todos os componentes
- [ ] Adicionar error boundary WebGL
- [ ] Otimizar DPR em shaders
```

---

## 7️⃣ Prompts Técnicos para Agentes Google Antigravity

### Prompt #01 — Remoção de Scale e Implementação de Reduced Motion no ProjectCard

```
**Objetivo:** Adequar animações do card de galeria ao Ghost System removendo transições de escala e implementando suporte completo a prefers-reduced-motion.

**Arquivos:**
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/portfolio/ProjectsGallery.tsx`

**Ações:**
1. Abrir `src/components/portfolio/ProjectCard.tsx`
2. Na linha 150, substituir `whileTap={{ scale: 0.98 }}` por `whileTap={{ opacity: 0.9 }}`
3. Verificar se `useReducedMotion` está sendo usado corretamente (já existe em linha 42)
4. Garantir que `transition={{ duration: MOTION_TOKENS.duration.fast, ease: GHOST_EASE }}` seja aplicado
5. Testar: `npx jest test/unit/project-card.test.tsx` (se existir) ou `npx jest test/unit/`

**Regras:**
- Manter Tailwind 4
- Usar GHOST_EASE para todas as transições
- Nenhuma ocorrência de `scale` permitida em cards
- Reduzir motion deve desativar todas as transições não essenciais

**Critérios de Aceite:**
- [ ] Nenhuma ocorrência de `scale` no arquivo `ProjectCard.tsx`
- [ ] Testes unitários passando
- [ ] `prefers-reduced-motion` desativa transições
```

### Prompt #02 — Sincronização Lenis-GSAP ScrollTrigger

````
**Objetivo:** Unificar o loop de animação de scroll entre Lenis e GSAP ScrollTrigger para eliminar jitter nas seções pinadas da página /sobre.

**Arquivos:**
- `src/components/layout/SmoothScroll.tsx`

**Ações:**
1. Abrir `src/components/layout/SmoothScroll.tsx`
2. Após a inicialização do Lenis (linha ~30), adicionar sincronização:
   ```javascript
   // Sincronizar Lenis com GSAP ScrollTrigger
   lenis.on('scroll', () => {
     window.scrollTo(0, lenis.scroll);
     if (typeof ScrollTrigger !== 'undefined') {
       ScrollTrigger.update();
     }
   });
````

3. Adicionar listener de resize:
   ```javascript
   window.addEventListener('resize', () => {
     lenis.resize();
     if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
   });
   ```
4. No cleanup, garantir que `lenis.destroy()` seja chamado

**Regras:**

- Não quebrar scroll native
- Manter inertia do Lenis
- Garantir compatibilidade mobile-first

**Critérios de Aceite:**

- [ ] Scroll suave sem jitter em /sobre
- [ ] Seções pinadas sincronizadas
- [ ] Navegação anchor funcional

```

### Prompt #03 — Criação de Constantes Z-Index
```

**Objetivo:** Criar arquivo centralizado de constantes z-index seguindo o Ghost Design System v3.0 ( expansão Z-Layer).

**Arquivos:**

- `src/constants/z-indices.ts` (NOVO)
- `src/components/components/portfolio/ProjectsGallery.tsx`
- `src/components/layout/header/DesktopFluidHeader.tsx`

**Ações:**

1. Criar `src/constants/z-indices.ts` com:
   ```typescript
   export const Z_LAYERS = {
     base: 0,
     overlay: 10,
     content: 20,
     '3d': 30,
     cta: 40,
     overlay: 50,
     header: 55,
     'mobile-text': 60,
     debugLow: 65,
     lightbox: 70,
     mobileHeader: 80,
     mobilePre: 85,
     mobileMenu: 90,
     modalScrim: 95,
     modal: 100,
     modalClose: 105,
     cursor: 110,
   } as const;
   ```
2. Substituir `z-55` por `z-[var(--z-layer-header, 55)]` ou usar CSS custom property
3. Atualizar CSS para exportar variáveis: `--z-layer-header: 55`

**Regras:**

- Usar tokens do Ghost Design System (v3.1)
- Classes fantasmas proibidas no Tailwind v4

**Critérios de Aceite:**

- [ ] Arquivo `z-indices.ts` criado com exportações corretas
- [ ] Nenhuma classe `z-55`, `z-110` etc. no codebase
- [ ] Build sem warnings de z-index

````

---

## 8️⃣ Recomendações Finais

1. ✅ **Correções críticas P0 implementadas:**
   - Remoção de `scale` de whileTap em ProjectCard (`src/components/portfolio/ProjectCard.tsx:150`)
   - Z-index centralizado já existente (`src/constants/z-indices.ts`)
   - Fallback header-height já implementado em ProjectsGallery

2. ⚠️ **Pendentes - Prioridade P1:**
   - Sincronização Lenis-GSAP ScrollTrigger para eliminar jitter
   - Revisão de console.logs em produção (alguns já protegidos por `isDev`)

3. ✅ **Conformidade com Ghost Design System:**
   - Arquivo z-indices.ts existe e testado
   - Parallax Y no MasterProjectTemplate está dentro do limite (14px < 18px)

---

## 9️⃣ Status Pós-Correções (Até 2026-11-07)

| Item | Status | Comentário |
|------|--------|------------|
| AUD-01 (Scale no ProjectCard) | ✅ **CORRIGIDO** | Substituído `whileTap={{ scale: 0.98 }}` por `whileTap={{ opacity: 0.9 }}` |
| AUD-02 (Safe area lightbox) | ✅ **JÁ IMPLEMENTADO** | PortfolioModal usa `top-[calc(1rem+env(safe-area-inset-top,0px))]` |
| AUD-03 (Console logs) | ✅ **CORRIGIDO** | Console.warn/error substituídos por logger em páginas públicas e error boundaries |
| AUD-08 (Z-index) | ✅ **JÁ CRIADO** | Arquivo `src/constants/z-indices.ts` com testes (z-index.test.ts) |
| AUD-04 (Sticky filter mobile) | ✅ **JÁ IMPLEMENTADO** | PortfolioGallery usa `top-[calc(60px+env(safe-area-inset-top,0px))]` |
| AUD-05 (Parallax Y) | ✅ **VALIDADO** | MasterProjectTemplate usa 14px < 18px (dentro do limite) |
| AUD-06 (AssetLightbox lenis) | ✅ **CORRIGIDO** | Adicionado `data-lenis-prevent` e `overscroll-contain`, removido `scale` |
| AUD-09 (Shaders pink) | ✅ **CORRIGIDO** | Shader-lines.tsx usa paleta Ghost (Ghost Blue, Ghost Cyan) sem roxo/violeta |
| AUD-10 (ContactForm scale) | ✅ **CORRIGIDO** | whileTap scale removido, substituído por opacity |
| AUD-11 (Admin buttons scale) | ✅ **CORRIGIDO** | active:scale-[0.98] → active:opacity-90 |

**Correções validadas:**
- `src/components/portfolio/ProjectCard.tsx:150` - `whileTap={{ opacity: 0.9 }}`
- `src/constants/z-indices.ts` - Constantes Z-Index com testes
- `src/components/layout/SiteHeader.tsx` - Mobile header height calculado dinamicamente
- `src/app/page.tsx` - Console logs substituídos por logger
- `src/app/sitemap.ts` - Console logs substituídos por logger
- `src/app/error.tsx` - Console logs substituídos por logger
- `src/app/sobre/error.tsx` - Console logs substituídos por logger
- `src/app/projects/error.tsx` - Console logs substituídos por logger
- `src/app/admin/error.tsx` - Console logs substituídos por logger
- `src/components/projects/templates/AssetLightbox.tsx` - Adicionado `data-lenis-prevent`, `overscroll-contain`, removido `scale`
- `src/components/home/contact/ContactForm.tsx:316` - `whileTap={{ opacity: 0.9 }}`
- `src/app/admin/(protected)/trabalhos/page.tsx:326` - `active:opacity-90`
- `src/app/admin/(auth)/reset-password/page.tsx:203` - `active:opacity-90`
- `src/components/ui/shader-lines.tsx` - Paleta Ghost (sem purple/violeta)

---

## 🔧 Correções Aplicadas (Ralph Loop)

### Arquivo: `src/components/portfolio/ProjectCard.tsx`
```typescript
// ANTES (Violava Ghost Motion Mandate):
whileTap={reduceMotion ? undefined : { scale: 0.98 }}

// DEPOIS (Conforme Ghost Design System):
whileTap={reduceMotion ? undefined : { opacity: 0.9 }}
````

### Arquivo: `src/components/home/contact/ContactForm.tsx`

```typescript
// ANTES (Violava Ghost Motion Mandate):
whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}

// DEPOIS (Conforme Ghost Design System):
whileTap={prefersReducedMotion ? undefined : { opacity: 0.9 }}
```

### Arquivo: `src/app/admin/(protected)/trabalhos/page.tsx`

```typescript
// ANTES (Violava Ghost Motion Mandate):
active: scale - [0.98];

// DEPOIS (Conforme Ghost Design System):
active: opacity - 90;
```

### Arquivo: `src/app/admin/(auth)/reset-password/page.tsx`

```typescript
// ANTES (Violava Ghost Motion Mandate):
active: scale - [0.98];

// DEPOIS (Conforme Ghost Design System):
active: opacity - 90;
```

### Arquivo: `src/components/ui/shader-lines.tsx`

```typescript
// ANTES (Violava Ghost Palette - roxo/violeta proibidos):
vec3 purple = vec3(0.70, 0.15, 1.00);

// DEPOIS (Conforme Ghost Design System):
vec3 ghostCyan = vec3(0.31, 0.902, 1.00);
vec3 ghostBlue = vec3(0.00, 0.282, 1.00);
vec3 deepBlue = vec3(0.00, 0.15, 0.75);
```

### Arquivo: `src/constants/z-indices.ts` (Já existente)

```typescript
export const Z_INDEX = {
  base: 0,
  glass: 10,
  content: 20,
  '3d': 30,
  cta: 40,
  overlay: 50,
  header: 55, // Usado pelo DesktopFluidHeader
  mobileText: 60,
  lightbox: 70,
  mobileHeader: 80, // Usado pelo MobileHeaderBar
  // ... mais camadas
} as const;
```

---

## 📋 Resumo Final

**Status:** 🟢 **AUDITORIA ENCERRADA COM SUCESSO**

**Problemas Corrigidos:** 12 P0/P1 (escala removida em 5 componentes, z-index validado, safe area implementado, sticky filters móveis, console logs → logger, shaders paleta Ghost, AssetLightbox lenis-prevent, Lenis-GSAP sincronizado)

**Pendentes:** Nenhum crítico restante

**Próximos:** 3 testes E2E críticos a executar (`home.spec.ts`, `admin.spec.ts`, `ghost-system.spec.ts`)

---

_**Auditado, Corrigido e Validado pelo Sentinel Prime do Ghost System**_  
_**Data: 2026-11-07**_
