---
description: # 🚀 Workflow Antigravity: Portfolio Ghost v2.0
---

---

# 🚀 Workflow Antigravity: Portfolio Ghost v2.0

## 📋 Visão Geral

- **Objetivo:** Criar um portfólio "Showcase" com scroll infinito (loop), parallax suave (Lerp) e modais com animação editorial.
- **Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion.
- **Complexidade:** Alta (foco em performance e timing exato de animações).

---

## 🔹 FASE 1: Fundação e Tipagem (Setup)

_O objetivo é criar as estruturas de dados antes de tentar renderizar qualquer componente visual._

**Tarefa 1.1: Definir Interfaces e Dados**
Criar a estrutura de tipos para suportar os dois tipos de projetos (A e B) e o mock de dados.

- **Arquivo:** `src/types/project.ts`
- **Arquivo:** `src/data/projects.ts`
- **Instrução:** Implementar interfaces `Project`, `ProjectType` ('A' | 'B') e criar array com 6 projetos fictícios (3 de cada tipo) seguindo o schema do documento.

---

## 🔹 FASE 2: O Motor de Parallax (Core Logic)

_Antes de criar o visual, precisamos da lógica matemática do scroll suave._

**Tarefa 2.1: Hook de Parallax (Lerp Engine)**
Criar o hook que gerencia o `requestAnimationFrame` e a interpolação linear.

- **Arquivo:** `src/hooks/useParallax.ts`
- **Requisitos:**
- Implementar função `lerp(start, end, t)`.
- Gerenciar refs (`galleryRef`, `trackRef`).
- Implementar loop de animação (`updateScroll`).
- Cálculo de `transform: translateY` baseado na posição do scroll.
- **Importante:** Easing de `0.05` conforme especificação.

**Tarefa 2.2: Hook de Bloqueio de Scroll**
Para quando o modal estiver aberto.

- **Arquivo:** `src/hooks/useBodyLock.ts`
- **Requisitos:** Bloquear o `overflow` do body quando um modal estiver ativo e restaurar ao fechar.

---

## 🔹 FASE 3: Estrutura Visual Principal

_Montar a página base onde o parallax irá habitar._

**Tarefa 3.1: Hero Section (Video Loop)**

- **Arquivo:** `src/components/HeroSection.tsx`
- **Requisitos:** Vídeo HTML5 (`autoPlay`, `loop`, `muted`, `playsInline`). Overlay gradiente `from-black/60`. Título com span azul.

**Tarefa 3.2: Project Card (Componente Isolado)**

- **Arquivo:** `src/components/ProjectCard.tsx`
- **Requisitos:**
- Wrapper de imagem com 135% de altura (para o parallax interno).
- Hover states (overlay aparece, card sobe levemente).
- Receber `ref` para o sistema de parallax.

**Tarefa 3.3: Gallery Track (Integração)**

- **Arquivo:** `src/components/ProjectsGallery.tsx`
- **Requisitos:**
- Grid CSS (`fixed` position).
- Utilizar `useParallax` para mover o container inteiro.
- Renderizar a lista de `ProjectCard`.
- Responsividade (1 col mobile, 2 tablet, 3 desktop).

---

## 🔹 FASE 4: O Sistema de Modal (Ghost Animation)

_A parte mais crítica do documento: a coreografia de entrada._

**Tarefa 4.1: Componentes de Conteúdo (A e B)**

- **Arquivos:** `src/components/content/TypeA.tsx` e `TypeB.tsx`.
- **Requisitos:** Layouts estáticos (sem animação ainda) conforme os diagramas ASCII do documento.

**Tarefa 4.2: Modal Wrapper (AnimatePresence)**

- **Arquivo:** `src/components/PortfolioModal.tsx`
- **Lógica de Animação (Timings Rígidos):**
- **Backdrop:** `duration: 0.18`.
- **Container:** `delay: 0.12`, `duration: 0.26`, `ease: [0.22, 1, 0.36, 1]`.
- **Conteúdo:** Stagger (atraso em cascata) começando em `0.52s`.

- **Interação:**
- Uso de `createPortal`.
- Botão Close fixo.
- Captura de tecla `ESC`.

---

## 🔹 FASE 5: Montagem Final e Performance

_Juntar tudo e garantir que roda a 60fps._

**Tarefa 5.1: Página Principal (PortfolioShowcase)**

- **Arquivo:** `src/pages/PortfolioShowcase.tsx`
- **Ação:** Juntar Hero + Gallery + Modal (condicional). Gerenciar estado `selectedProject`.

**Tarefa 5.2: Otimizações**

- Adicionar `will-change: transform` no CSS da galeria.
- Garantir `loading="lazy"` nas imagens.
- Verificar acessibilidade (`aria-modal`, focus trap).

---
