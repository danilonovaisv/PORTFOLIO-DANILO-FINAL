# 📋 PLAN.md - Ajustes About Beliefs v2.0

**Data:** 2026-02-05
**Autor:** @orchestrator & @project-planner
**Status:** `PLANEJADO` (Aguardando Aprovação)

---

## 🎯 OBJETIVO

Implementar os ajustes visuais e de comportamento na sessão "About Beliefs" conforme `SPEC_AboutBeliefs_v2.md`, focando na diferenciação precisa entre Mobile e Desktop, e garantindo a integração correta do asset 3D via Supabase.

---

## 📊 ESTADO ATUAL vs DESEJADO

### 1. Animação de Texto (Mobile)

- **Atual:** Entra da Direita -> Sai para a Direita (`100% -> 0% -> 100%`).
- **Desejado:** Entra da Direita -> Sai para a Esquerda (`+24 -> 0 -> -24`).
- **Arquivo:** `src/components/sobre/beliefs/BeliefSection.tsx`

### 2. Layout & Posicionamento Ghost (Mobile)

- **Atual:** Ghost centralizado na viewport (sticky).
- **Desejado:** Layout "Row": Ghost à Esquerda, Texto à Direita (no Rodapé). Ghost alinhado verticalmente ao centro do texto.
- **Arquivo:** `src/components/sobre/sections/AboutBeliefs.tsx` / `src/components/sobre/3d/GhostModel.tsx`

### 3. Layout & Posicionamento Ghost (Desktop)

- **Atual:** Ghost centralizado.
- **Desejado:** Ghost à Direita, Texto à Esquerda. Ghost alinhado verticalmente ao centro do texto.

### 4. Asset 3D

- **Ação:** Garantir uso da URL do Supabase:
  `https://dpejskjpghoozbpfxkpf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb`

### 5. Header Fixo

- **Mobile:** Ajustar para sticky top-right.
- **Desktop:** Ajustar para "centro + direita".

---

## 🏗️ PLANO DE EXECUÇÃO

### FASE 1: Planejamento (Concluído)

- [x] Análise dos docs em `docs/AJUSTES-ABOUT-BELIEFS/`.
- [x] Criação deste plano.

### FASE 2: Implementação (Paralela/Sequencial)

**Agentes:** `@frontend-specialist`, `@spectral_artist`

#### TAR.1: Ajuste de Animações de Texto (Mobile/Desktop)

- **Agente:** `@frontend-specialist`
- **Ação:**
  - Atualizar `BeliefMobileTextLayer` em `BeliefSection.tsx` para usar `x: ['100%', '0%', '0%', '-100%']` (ou valores em px conforme spec).
  - Verificar animação desktop (Vertical).

#### TAR.2: Layout Mobile e Desktop (Ghost + Texto)

- **Agente:** `@frontend-specialist`
- **Ação:**
  - Refatorar `AboutBeliefs.tsx` para suportar grid layout diferenciado.
  - **Mobile:** Container flex row no rodapé? Ou Grid? (Seguir Spec: "Bloco principal... texto + ghost lado a lado").
  - **Desktop:** Grid 12 colunas. Texto col 1-5, Ghost col 7-12.

#### TAR.3: Refinamento do Ghost Model

- **Agente:** `@spectral_artist` (via `@frontend-specialist` context)
- **Ação:**
  - Atualizar `GhostModel.tsx` com a URL do Supabase.
  - Implementar lógica de alinhamento vertical relativo ao texto (evitar que o ghost flutue sozinho no centro da tela se o texto estiver em outro lugar).
  - Ajustar `GhostScene.tsx` se necessário (luzes/camera).

### FASE 3: Verificação

**Agente:** `@test-engineer`

- [ ] Validar build (`npm run build`).
- [ ] Validar animações em simulação mobile/desktop.
- [ ] Verificar console logs (sem erros 404 para o GLB).

---

## 🛡️ CRITÉRIOS DE SUCESSO

1. Ghost carrega com a URL correta.
2. Mobile: Texto entra Dir -> Sai Esq.
3. Mobile: Ghost visível à esquerda do texto (rodapé).
4. Desktop: Layout 2 colunas nítido.
5. Sem quebras de layout (overflow horizontal).

---

> ⏸️ **AGUARDANDO APROVAÇÃO DO USUÁRIO**
