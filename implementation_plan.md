# Implementation Plan — Mobile Responsiveness & Media Pipeline Fixes

> **Role:** Frontend Architecture Lead  
> **Status:** Draft (Awaiting Approval)  
> **Date:** 2026-05-16  

## 1. Diagnóstico Técnico

### 1.1 Responsividade de Texto
- **Problema:** Títulos e subtítulos apresentam overflow ou quebras indesejadas em dispositivos muito estreitos (320px - iPhone SE). O uso de `clamp()` na `globals.css` tem valores mínimos que podem ser agressivos demais para certas palavras.
- **Causa:** Valores mínimos de `clamp` em `HeroCopy` e tokens globais não considerando o padding do grid em 320px.

### 1.2 Pipeline de Mídia (Desktop vs Mobile)
- **Problema:** Troca inconsistente de vídeos. Alguns componentes usam `hidden md:block` (carrega ambos), outros usam hooks customizados (`VideoManifesto`).
- **Causa:** Ausência de um padrão unificado de `useIsMobile` e um componente `SourceMedia` que evite carregar mídias pesadas desnecessariamente.

### 1.3 Mismatch de Dados do Admin (ALPA V3)
- **Problema:** Imagens e vídeos de Landing Pages (Template V3/ALPA) não aparecem.
- **Causa:** O renderizador `AlpaBlock.tsx` espera tipos de bloco legados (`image-full`, `video-full`) e propriedades (`src`, `content`), enquanto o Admin salva o padrão `LandingPageBlock` (`image`, `video`, `text`) com propriedades (`media`, `text`).

### 1.4 Novo Componente 3D
- **Tarefa:** Adicionar seção de animação shader entre projetos e clientes.

---

## 2. Arquitetura Proposta

### 2.1 Shared Hooks & Helpers
- Consolidar `useIsMobile` em `src/hooks/useIsMobile.ts` (breakpoint 767px).
- Criar `src/lib/portfolio/media-selector.ts` para resolver URLs baseadas no dispositivo.

### 2.2 Refatoração do AlpaBlock
- Atualizar o `dispatcher` em `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx` para mapear os tipos de `LandingPageBlock` salvos pelo Admin.

### 2.3 Typography Optimization
- Ajustar tokens em `globals.css` para garantir que o tamanho mínimo de `text-display` e `text-h1` não quebre em 320px.

---

## 3. Arquivos Afetados

| Componente/Arquivo | Mudança |
| :--- | :--- |
| `src/app/globals.css` | Ajuste de tokens fluidos. |
| `src/hooks/useIsMobile.ts` | **Novo.** Hook compartilhado. |
| `src/components/home/hero/VideoManifesto.tsx` | Migrar para `useIsMobile` compartilhado. |
| `src/components/projects/templates/alpa/blocks/AlpaBlock.tsx` | Correção do mapeamento de tipos/dados. |
| `src/components/projects/templates/alpa/blocks/*.tsx` | Ajuste de responsividade de texto interno. |
| `src/components/home/ShaderSection.tsx` | **Novo.** Componente de animação shader. |
| `src/app/page.tsx` | Integração do `ShaderSection`. |
| `src/components/portfolio/content/AdaptiveMediaLayout.tsx` | Melhorar fallback de mídia. |

---

## 4. Estratégia de Rollback & Riscos
- **Riscos:** Hidratação inconsistente ao usar `useIsMobile` no SSR.
- **Mitigação:** Sempre retornar `false` (desktop-first ou placeholder) no servidor e atualizar no `useEffect`.
- **Rollback:** Reverter alterações no `AlpaBlock.tsx` se os tipos antigos ainda forem necessários para casos legados.

---

## 5. Plano de Validação

### 5.1 Funcional
- Verificar se as mídias salvas no Admin aparecem nas Landing Pages.
- Testar troca de vídeo ao redimensionar a janela (refresh pode ser necessário para vídeos HTML5).

### 5.2 Visual (Viewports)
- **320x568 (iPhone SE):** Verificar se o título "BRANDING" ou palavras longas não quebram o layout.
- **375px a 430px:** Validar espaçamentos laterais.
- **Desktop (1440x900):** Garantir que nada mudou no visual Ghost.

### 5.3 Performance
- Verificar via Network Tab se apenas um vídeo (ou a versão correta) está sendo baixado em mobile.

---

## 6. Approval Gate
**Aguardando resposta do humano: `Aprovado` ou `Proceed`.**
