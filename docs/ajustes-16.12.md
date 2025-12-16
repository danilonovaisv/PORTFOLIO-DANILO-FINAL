# Análise técnica (HOME + PORTFOLIO) — portfoliodanilo.com
Stack: Next.js App Router (TS) + Tailwind CSS + Framer Motion + React Three Fiber/Drei/Three + Supabase Storage + Firebase Hosting

> Base desta análise:
> - Observação visual pelas capturas fornecidas (HOME/PORTFOLIO com “blocos cinza” no mosaico).
> - Estrutura real do repositório `danilonovaisv/_danilonov_portfolio` (paths e componentes existentes).

---

## 📌 Referências obrigatórias (lei absoluta)

- Documento técnico:
  - `docs/PORT DAN REVISADO - NEXT.pdf` (no repo existe também `docs/PORT DAN REVISADO - NEXT.md`)
- Layout final esperado:
  - No repo existem versões em:
    - `docs/HOME-PORTFOLIO-LAYOUYT.jpg`
    - `public/media/HOME-PORTFOLIO-LAYOUYT.jpg`
  - Portfolio esperado:
    - `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`
    - `public/media/PORTFOLIO-PAGE-LAYOUYT.jpg`
  - Mobile hero:
    - `docs/HOME-HERO-MOBILE.jpg`
    - `public/media/HOME-HERO-MOBILE.jpg`

> Observação: seu pedido cita `docs/HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`. No repo, o arquivo equivalente parece ser `HOME-PORTFOLIO-LAYOUYT.jpg`. Validar se há diferença de versão/nome (se existir outro arquivo “_ESPERADO”, ele deve substituir o atual como referência principal).

---

## 🧩 Estrutura relevante (rotas e componentes)

### HOME (`src/app/page.tsx`)
- `src/components/home/Hero.tsx`
  - `src/components/three/HeroGlassCanvas.tsx`
  - `src/components/three/TorusDan.tsx`
  - `public/media/torus_dan.glb`
- `src/components/home/Manifesto.tsx`
- `src/components/home/PortfolioShowcase.tsx`
- `src/components/home/FeaturedProjects.tsx`
- `src/components/home/Clients.tsx`
- `src/components/home/Contact.tsx`

### PORTFOLIO (`src/app/portfolio/page.tsx`)
- `src/components/portfolio/PortfolioHero.tsx`
- `src/components/portfolio/PortfolioMosaicGrid.tsx`
- `src/components/portfolio/MosaicCard.tsx`
- `src/components/portfolio/PortfolioHeroGallery.module.css`

### Layout global
- `src/app/layout.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/SmoothScroll.tsx`
- `src/components/ui/Button.tsx`

---

# 1️⃣ Visão Geral

O projeto tem uma separação de responsabilidades boa (home/portfolio/layout/three/ui). A base técnica está correta para atingir o resultado (Tailwind + Framer + R3F). O principal gargalo atual, pelo que aparece nas capturas, é **fidelidade visual e robustez do carregamento de mídia (imagens)** — especialmente no mosaico da página PORTFOLIO, onde vários cards aparecem como **blocos cinza** (o que destrói a percepção premium do portfólio).

Também existe risco de inconsistência visual por mistura de abordagens (Tailwind + CSS Modules no hero do portfolio) e risco de performance/LCP no HERO por conta do 3D (Canvas + GLB) sem uma estratégia muito controlada de fallback, DPR e carregamento progressivo.

---

# 2️⃣ Diagnóstico por Dimensão

## ✅ Estrutura
**Bom**
- App Router está no lugar certo (`src/app`).
- Componentização clara: `src/components/home`, `src/components/portfolio`, `src/components/three`.

**Problemas**
- O repositório contém artefatos que não deveriam estar versionados (sinal forte: `.DS_Store`, logs e até `.vsix` e `docs/.next`).
- Isso aumenta ruído, peso e risco de deploy/build inconsistentes.

**Ação técnica**
- Remover artefatos do git e reforçar `.gitignore`.
- Opcional: mover mídia pesada de `docs/*.mov` para storage externo (ou Git LFS), já que docs não deveriam impactar o projeto em si.

---

## ⚠️ UI (fidelidade visual)
**Pontos críticos observados**
- **HERO (HOME)**: o layout depende de alinhamento cirúrgico entre:
  - título com tipografia grande,
  - orb/elemento 3D “glass”,
  - CTA “pill + arrow”,
  - label lateral `[ BRAND AWARENESS ]` e thumbnail à direita (no desktop).
- **PORTFOLIO (página)**: o mosaico com blocos cinza indica (quase sempre) que:
  - o container do `Image fill` está sem dimensões (height/ratio) e o browser “pinta” background,
  - ou a URL da imagem falha e cai num placeholder,
  - ou existe placeholder permanente ligado à lógica de loading.

**Ação técnica**
- Garantir que cada card tem dimensões previsíveis via `aspect-[w/h]` (ou `min-h`+`auto-rows`) e `relative`.
- Garantir que o overlay (texto/tag/seta) está em camadas consistentes e que o hover é idêntico ao layout.

---

## ⚠️ UX (microinterações e consistência)
**Pontos críticos**
- Cards precisam de hover “coeso”: imagem + tag + CTA/seta devem reagir juntos (scale/shine/shadow).
- Estado de foco (teclado) deve existir e ser visível (principalmente no Header e CTAs).
- Navegação por âncoras no Header precisa respeitar offset do header fixo (evitar “pular” e esconder título).

**Ação técnica**
- Padronizar `focus-visible` e `aria-label`.
- Se usar `SmoothScroll`, garantir que âncoras funcionem com offset consistente (`scroll-margin-top` nas seções).

---

## 🔴 Responsividade (mobile-first)
**Riscos**
- Overflow horizontal em grids (portfolio mosaic + showcase) se o grid não colapsa bem.
- 3D no hero mobile: risco de “comer” altura e reduzir leitura.

**Ação técnica**
- Estratégia mobile-first:
  - mobile: texto central + orb em tamanho controlado, sem elementos laterais (label/thumbnail podem virar “stack” abaixo ou sumir via breakpoints se a referência mandar).
  - desktop: orb deslocado e label/thumbnail como no layout.

---

## ⚠️ Animações (Framer Motion)
**Riscos**
- Animação demais no topo com 3D pode causar jank.
- Animar propriedades “caras” (height/width/left/top) causa reflow.

**Ação técnica**
- Motion apenas com `opacity`/`transform`.
- Respeitar `prefers-reduced-motion`.

---

## ⚠️ 3D / WebGL (R3F)
**Riscos**
- Canvas sem `Suspense` → flash branco ou travada no LCP.
- DPR alto em mobile → custo alto sem ganho visual.
- GLB carregado sem preload.

**Ação técnica**
- `Suspense` com fallback visual idêntico (blur/glow/shape).
- `dpr={[1, 1.5]}` ou `[1, 1.75]` dependendo do device.
- `useGLTF.preload("/media/torus_dan.glb")`.
- Se possível: `frameloop="demand"` e render somente quando há animação/hover.

---

## ⚠️ Performance (LCP/CLS/TBT)
**Riscos**
- LCP: HERO (texto + orb 3D) é o principal.
- CLS: grids com `Image fill` sem ratio.
- TBT: scripts/3D/motion na dobra.

**Ação técnica**
- `next/image` com `sizes` bem definido e `priority` somente no LCP (provavelmente hero).
- Imagens abaixo da dobra: lazy load.
- Fallback do Canvas para não bloquear interação inicial.

---

## ⚠️ Acessibilidade
**Riscos**
- Ícones sem `aria-label`.
- Links sem foco visível.
- Botões “div” (sem semântica).
- `alt` genérico ou vazio indevidamente.

**Ação técnica**
- Semântica: `header/nav/main/section/footer`.
- `focus-visible:ring` e `aria-label` nos ícones.
- Card clicável: usar `<Link>`/`<a>` de verdade.

---

# 3️⃣ (Opcional) Análise por Seção

## 🎯 Seção: Hero (HOME)
- 📌 Fidelidade visual à imagem: ✗ (precisa bater 1:1 com `HOME-PORTFOLIO-LAYOUYT.jpg`)
- 📱 Responsividade mobile: ⚠️ (depende de travar orb e tipografia)
- 🎥 Animações: ⚠️ (precisa ser leve)
- 💻 Componente: `src/components/home/Hero.tsx`
- 🧩 Integrações:
  - `Hero.tsx` → `HeroGlassCanvas.tsx` → `TorusDan.tsx` → `public/media/torus_dan.glb`

### ❌ Problema (objetivo)
Divergências pequenas de grid/spacing quebram o hero. O 3D precisa ser parte da composição sem “brigar” com o título e sem causar jank no carregamento.

### 🔧 Solução técnica (direção)
- Grid com container `max-w` e colunas controladas por breakpoint.
- Orb posicionado por `absolute` no desktop e “stack” no mobile, conforme referência.
- `Suspense` no Canvas + fallback premium.

---

## 🎯 Seção: Portfolio Showcase (HOME)
- 📌 Fidelidade visual: ⚠️ (depende de cards + categorias baterem com o layout)
- 📱 Responsividade: ⚠️
- 🎥 Animações: ⚠️
- 💻 Componente: `src/components/home/PortfolioShowcase.tsx`

### ❌ Problema
Cards precisam manter proporções e hover premium. Qualquer variação gera CLS e sensação “barata”.

### 🔧 Solução técnica
- `aspect-*` por breakpoint.
- `Image fill` + wrapper com altura previsível.
- Hover: scale leve + sombra + reação da seta/tag.

---

## 🎯 Página: Portfolio (`/portfolio`)
- 📌 Fidelidade visual: ✗ (blocos cinza no mosaico)
- 📱 Responsividade: ⚠️ (grid pode quebrar)
- 🎥 Animações: ⚠️
- 💻 Componentes:
  - `src/components/portfolio/PortfolioHero.tsx`
  - `src/components/portfolio/PortfolioMosaicGrid.tsx`
  - `src/components/portfolio/MosaicCard.tsx`

### ❌ Problema
Cards cinza indicam quebra de imagem/ratio/URLs (Supabase) ou placeholder permanente.

### 🔧 Solução técnica
- Corrigir pipeline de imagem (URL pública vs signed URL, `next.config.mjs`, fallback).
- Travar ratio e impedir “slots vazios”.
- Grid determinístico (spans/áreas) para bater 1:1 com referência.

---

# 4️⃣ Lista de Problemas (por severidade)

## 🔴 Alta
1. PORTFOLIO: mosaico com “blocos cinza” (quebra total de percepção premium).
2. Carregamento de imagens instável (Supabase/Next Image/domínios/URLs).
3. CLS em grids e cards (ratio indefinido).
4. HERO 3D sem fallback/performance (risco de LCP ruim e travada).

## 🟡 Média
1. Inconsistência Tailwind + CSS Modules (Portfolio hero/gallery).
2. Hover/focus sem padronização e sem “microinterações premium”.
3. Responsividade do mosaico e do showcase (possível overflow horizontal).
4. Navegação por âncoras (offset do header/smooth scroll).

## 🟢 Baixa
1. A11y (aria-label, foco visível, semântica).
2. Higiene do repo (arquivos de sistema, logs, etc.).
3. Polimento de motion (prefers-reduced-motion).

---

# 5️⃣ Recomendações Prioritárias (ordem)

1) **PORTFOLIO mosaic + imagens (corrigir blocos cinza)**
- Porque é o problema mais grave visualmente e gera desconfiança imediata.

2) **Travamento de layout para evitar CLS**
- Sem isso, qualquer correção de UI “não assenta”.

3) **HERO (HOME): fidelidade + 3D com fallback**
- É a primeira impressão e o principal LCP.

4) **Microinterações e acessibilidade**
- Finaliza o “premium feel” sem alterar layout.

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR (ATÔMICOS E EXECUTÁVEIS)

> 🚫 REGRAS ABSOLUTAS (para TODOS os prompts)
> - ❌ NÃO alterar nenhum conteúdo textual
> - ❌ NÃO mudar ordem das seções
> - ❌ NÃO reinventar layout
> - ✅ Validar visualmente contra `docs/HOME-PORTFOLIO-LAYOUYT.jpg` (ou o arquivo `*_ESPERADO` se existir) e `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`
> - ✅ Validar contra `docs/PORT DAN REVISADO - NEXT.pdf` (ou versão `.md`)
> - ✅ Usar Tailwind CSS como padrão
> - ✅ Manter App Router (`src/app`)
> - ✅ Mobile-first
> - ✅ Framer Motion só com `transform/opacity` e respeitando `prefers-reduced-motion`

---

### 🛠️ Prompt #01 — Corrigir “blocos cinza” no mosaico (PORTFOLIO)

Objetivo:
Eliminar definitivamente cards vazios/blocos cinza em `/portfolio`, garantindo que todos os cards renderizem imagem e overlay conforme `PORTFOLIO-PAGE-LAYOUYT.jpg`.

Ações:
1. Revisar `src/components/portfolio/MosaicCard.tsx` e identificar:
   - origem de `imageUrl` (dados locais vs Supabase),
   - comportamento quando `imageUrl` é vazio/undefined,
   - se existe placeholder/skeleton permanente.
2. Se `imageUrl` vier do Supabase:
   - confirmar se a URL é pública (preferível) ou signed URL (expira).
   - se for signed URL, garantir renovação correta e cache controlado.
3. Implementar `onError` (somente para UI) para detectar falhas de imagem e trocar para fallback visual premium (gradiente/blur), sem quebrar layout.
4. Se `imageUrl` não existir para algum projeto:
   - NÃO renderizar um “buraco cinza”,
   - renderizar um fallback intencional (mesmo raio, mesmo overlay, sem parecer erro).

Arquivos alvo:
- `src/components/portfolio/MosaicCard.tsx`
- `src/components/portfolio/PortfolioMosaicGrid.tsx`

Resultado esperado:
Nenhum bloco cinza “sem intenção”. Layout idêntico ao da referência.

---

### 🛠️ Prompt #02 — Travar ratio/altura dos cards (PORTFOLIO) para evitar CLS

Objetivo:
Eliminar CLS no mosaico garantindo dimensões estáveis antes do carregamento.

Ações:
1. No card (`MosaicCard.tsx`), garantir wrapper:
   - `relative`, `overflow-hidden`, `rounded-*` conforme referência,
   - `aspect-[w/h]` ou `min-h` + grid com `auto-rows`.
2. Se usar `next/image` com `fill`, garantir que o wrapper define a altura (ratio).
3. Definir `sizes` correto para o card (evitar baixar imagem enorme no mobile).

Resultado esperado:
Mosaico estável, sem “pulos”.

---

### 🛠️ Prompt #03 — Grid determinístico do mosaico (PORTFOLIO) 1:1 com a referência

Objetivo:
Bater o posicionamento e proporção do mosaico exatamente como `PORTFOLIO-PAGE-LAYOUYT.jpg`.

Ações:
1. Revisar `src/components/portfolio/PortfolioMosaicGrid.tsx`:
   - quantas colunas no desktop,
   - spans por card (largos/altos),
   - gaps (vertical/horizontal).
2. Implementar grid determinístico:
   - desktop: colunas fixas (ex.: 12) + spans por item,
   - tablet: reduzir colunas,
   - mobile: 1 coluna.
3. Garantir que cards “largos” não colapsam gerando buracos.

Resultado esperado:
Mosaico idêntico ao layout esperado.

---

### 🛠️ Prompt #04 — Ajustar Hero Gallery do Portfolio (topo) + padronização de estilo

Objetivo:
Garantir que a faixa de imagens do topo do PORTFOLIO (gallery/hero) fique idêntica à referência e responsiva.

Ações:
1. Revisar `src/components/portfolio/PortfolioHero.tsx` e `PortfolioHeroGallery.module.css`.
2. Garantir:
   - 4 colunas no desktop com recorte e alinhamento idênticos,
   - bordas/raios e proporções consistentes,
   - responsividade (no mobile deve virar stack/carrossel se a referência mandar; caso contrário, quebrar para 2 colunas e depois 1).
3. Migrar layout/spacing para Tailwind quando possível; manter CSS module só se necessário.

Resultado esperado:
Topo do portfolio idêntico ao layout e consistente com o resto do sistema.

---

### 🛠️ Prompt #05 — Header: layout, estados ativos e acessibilidade

Objetivo:
Header fiel ao layout e com navegação perfeita (mouse + teclado + mobile menu).

Ações:
1. Revisar `src/components/layout/Header.tsx`:
   - alinhar logo e itens de menu,
   - estado ativo com underline/realce igual à referência,
   - garantir `aria-label` no botão de menu mobile.
2. Garantir foco visível (`focus-visible`) em links e botões.
3. Se o header for fixo: aplicar `scroll-margin-top` nas seções alvo para anchors não ficarem escondidas.

Resultado esperado:
Header premium, acessível e fiel.

---

### 🛠️ Prompt #06 — Hero HOME: composição 1:1 com o layout esperado

Objetivo:
Reproduzir exatamente o Hero da HOME conforme `HOME-PORTFOLIO-LAYOUYT.jpg` e `HOME-HERO-MOBILE.jpg`.

Ações:
1. Revisar `src/components/home/Hero.tsx`:
   - container (max-width), grid e spacing,
   - tipografia (line-height/tracking),
   - posicionamento do orb,
   - label `[ BRAND AWARENESS ]` e thumbnail no desktop (se existirem na referência).
2. Garantir CTA pill:
   - dimensões, padding, raio, cores,
   - seta com círculo e animação de hover coerente.
3. Garantir que o 3D não rouba foco do texto e não bloqueia clique (usar `pointer-events-none` no canvas se necessário).

Resultado esperado:
Hero indistinguível da referência, sem alterar textos.

---

### 🛠️ Prompt #07 — 3D do Hero (R3F): fallback, preload e performance real

Objetivo:
Fazer o 3D do Hero carregar sempre, sem flash branco e sem destruir LCP.

Ações:
1. Validar cadeia:
   - `Hero.tsx` → `HeroGlassCanvas.tsx` → `TorusDan.tsx` → `public/media/torus_dan.glb`
2. `HeroGlassCanvas.tsx`:
   - envolver conteúdo com `Suspense` e fallback visual (glow/blur) fiel ao layout,
   - limitar DPR (ex.: `[1, 1.5]`),
   - reduzir custo de render (avaliar `frameloop="demand"`).
3. `TorusDan.tsx`:
   - `useGLTF.preload("/media/torus_dan.glb")`,
   - evitar recriar materiais por render,
   - garantir path absoluto `/media/...`.

Resultado esperado:
3D robusto e leve, sem travar a dobra.

---

### 🛠️ Prompt #08 — Motion do Hero (Framer Motion) com “premium feel”

Objetivo:
Adicionar/ajustar motion suave sem custo de performance e respeitando `prefers-reduced-motion`.

Ações:
1. Aplicar motion somente com `opacity` + `translateY` leve no:
   - título,
   - subtítulo,
   - CTA,
   - label lateral.
2. Evitar motion em layout (width/height/top/left).
3. Definir `transition` com easing consistente e curto.

Resultado esperado:
Animação elegante, sem jank.

---

### 🛠️ Prompt #09 — Portfolio Showcase HOME: cards e grid fiéis (sem CLS)

Objetivo:
Reproduzir a seção “portfólio showcase” na HOME com grid e cards idênticos.

Ações:
1. Revisar `src/components/home/PortfolioShowcase.tsx`:
   - heading, alinhamento e botão “vamos trabalhar juntos” conforme referência,
   - grid de cards sem overflow.
2. Nos cards:
   - tag pill no topo,
   - seta circular no canto,
   - overlay com texto,
   - hover com zoom leve + sombra + reação coordenada da seta.

Resultado esperado:
Seção igual à referência e microinterações premium.

---

### 🛠️ Prompt #10 — Clients/Brands + Contact + Footer: polimento e consistência

Objetivo:
Garantir consistência visual e responsiva nas seções finais da HOME.

Ações:
1. `src/components/home/Clients.tsx`: grid de logos (sem overflow).
2. `src/components/home/Contact.tsx`:
   - grid 2 colunas desktop / 1 coluna mobile,
   - estados de foco e validação,
   - sem alterar textos.
3. `src/components/layout/Footer.tsx`:
   - alinhamento, hover/focus,
   - `aria-label` em ícones sociais.

Resultado esperado:
Rodapé e contato “premium” e fiéis ao layout.

---

### 🛠️ Prompt #11 — Auditoria de imagens (Next/Image + Supabase) para estabilidade e qualidade

Objetivo:
Garantir que todas as imagens (home + portfolio) sejam estáveis, rápidas e compatíveis com o deploy.

Ações:
1. Revisar `next.config.mjs`:
   - `images.remotePatterns`/`domains` para Supabase Storage (se usar imagens remotas).
2. Garantir que URLs do Supabase sejam:
   - públicas (preferível) ou signed com renovação.
3. Definir `sizes` adequados em grids.
4. Garantir `priority` somente no LCP (hero).

Resultado esperado:
Sem falhas e sem downloads excessivos.

---

### 🛠️ Prompt #12 — Limpeza do repositório e .gitignore

Objetivo:
Remover ruído e reduzir risco de build/deploy.

Ações:
1. Remover do git:
   - `.DS_Store`, logs, `.vsix`, `docs/.next`, arquivos gerados.
2. Atualizar `.gitignore` para evitar recorrência.
3. Garantir que vídeos pesados em `docs/` não impactam o deploy.

Resultado esperado:
Repo limpo e previsível.

---

## ✅ Checklist final (obrigatório)
1. Comparar HOME inteira com `docs/HOME-PORTFOLIO-LAYOUYT.jpg` (ou `*_ESPERADO` se existir).
2. Comparar PORTFOLIO com `docs/PORTFOLIO-PAGE-LAYOUYT.jpg`.
3. Validar mobile com `docs/HOME-HERO-MOBILE.jpg`.
4. Confirmar:
   - zero blocos cinza “não intencionais”,
   - zero overflow horizontal,
   - hover/focus coerentes,
   - 3D com fallback e sem travar a dobra.

--- 
Fim do relatório.
