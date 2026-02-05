# 🎼 Plano de Orquestração: Migração Ghost 3D ("About Beliefs")

**Criado:** 2026-02-04
**Solicitante:** @User
**Pasta Fonte:** `docs/SOBRE/ANIMA-3DGHOST`
**Pasta Alvo:** `src/components/sobre/`

---

## 📋 Contexto e Objetivo

O usuário identificou que os arquivos na pasta `docs/SOBRE/ANIMA-3DGHOST` contêm a implementação visual e lógica "perfeita" para o elemento 3D da seção "About Beliefs". O objetivo é substituir a implementação atual pela versão da documentação, garantindo que o design e a animação sejam aplicados corretamente.

**Arquivos Fornecidos (Source of Truth):**

1. `GhostModel.tsx` (Lógica de animação, materiais "Black Ghost", useScroll do Drei)
2. `GhostScene.tsx` (Setup de luzes cinemáticas, ScrollControls)
3. `Overlay.tsx` (Exemplo de overlay - *A ser analisado se deve substituir o conteúdo atual*)

**Desafio Técnico:**
A implementação atual usa **Framer Motion (`useScroll`)** propagando props para o Canvas. A nova implementação usa **Drei (`ScrollControls`)**, que gerencia o scroll internamente no Canvas. A migração exige refatoração do componente pai `AboutBeliefs.tsx` para acomodar essa mudança de arquitetura sem quebrar o conteúdo de texto existente.

---

## 🚀 Estratégia de Implementação

### 1. Substituição de Componentes Core (3D)

Substituiremos os arquivos 3D diretamente, pois contêm as configurações visuais (Luzes, Materiais) e lógicas (Lerp, Rotação) desejadas.

* `src/components/sobre/3d/GhostModel.tsx` ← `docs/.../GhostModel.tsx`
* `src/components/sobre/3d/GhostScene.tsx` ← `docs/.../GhostScene.tsx`

### 2. Integração no Layout (`AboutBeliefs.tsx`)

O arquivo `AboutBeliefs.tsx` deve ser limpo. Atualmente ele define `Canvas` manualmente. Passaremos a usar o `<GhostScene />` que já encapsula o Canvas e Controles.

**Problema:** O conteúdo de texto (`BeliefSection`, frases) precisa coexistir com o `ScrollControls` do Drei.
**Solução:**

1. Manteremos o array `PHRASES` e a lógica de conteúdo.
2. Inseriremos o conteúdo de texto como *children* do `ScrollControls` (usando o componente `<Scroll html>` do Drei) OU manteremos o texto em uma camada separada sincronizada (mais complexo com ScrollControls).
    * *Decisão:* Dado que `GhostModel` usa `useScroll()` do Drei, o Canvas *deve* envolver a área de scroll.
    * Vamos refatorar `AboutBeliefs` para renderizar o `GhostScene` como container principal visual.

---

## 📅 Plano de Execução

### Fase 1: Preparação e Backup

1. Criar backup dos arquivos atuais em `src/components/sobre/3d/_backup/`.
2. Instalar dependências se necessário (o projeto já parece ter `@react-three/drei`).

### Fase 2: Migração de Arquivos 3D (Agente: @spectral_artist)

1. **GhostModel.tsx**: Substituir inteiramente.
    * Verificar imports (caminho do modelo GLB).
2. **GhostScene.tsx**: Substituir inteiramente.
    * Ajustar `ScrollControls` pages para bater com a quantidade de conteúdo (hoje são ~6 frases, o arquivo docs usa `pages={4}`). Ajustaremos para `pages={6}` ou dinâmico.

### Fase 3: Refatoração do Container (Agente: @frontend-specialist)

1. **AboutBeliefs.tsx**:
    * Remover definição inline de `<Canvas>`.
    * Importar `<GhostScene />`.
    * **Integração de Texto**:
        * Opção A: Renderizar o texto dentro de `<Scroll html>` do Drei dentro de `GhostScene`.
        * Opção B: Tentar sincronizar o scroll externo com o Drei (difícil).
        * *Estratégia Escolhida:* Manter o texto existente sobreposto via HTML/CSS clássico (Overlay) e remover o `ScrollControls` do `GhostScene` **SE** o usuário preferir manter o controle de scroll atual da página.
        * **ATENÇÃO:** O arquivo fonte `GhostModel.tsx` usa `useScroll` do Drei. Isso *exige* `ScrollControls`. Portanto, devemos usar `ScrollControls`.
        * Vamos adaptar `AboutBeliefs` para ser um Wrapper que chama `GhostScene`.
        * O texto (`PHRASES`) será passado para `GhostScene` ou um novo componente `BeliefsOverlay` que usa `<Scroll html>`.

### Fase 4: Validação (Agente: @audit_sentinel)

1. Verificar erro de "GLTF failed to load".
2. Verificar responsividade (Mobile vs Desktop).

---

## ❓ Perguntas de Aprovação (Crucial)

Para prosseguir, preciso que confirme:

1. **Conteúdo de Texto:** Deseja manter as frases originais ("Um vídeo que respira...") ou usar o texto do arquivo `Overlay.tsx` ("ETHEREAL SPECTRE...")?
    * *Presumo que seja manter o original, adaptando o layout.*
2. **Scroll:** O novo código usa `ScrollControls` (scroll virtual dentro do Canvas). Isso altera a sensação de scroll da seção. Vc aprova essa mudança de comportamento?

---

**Status:** AGUARDANDO APROVAÇÃO E ESCLARECIMENTOS.
