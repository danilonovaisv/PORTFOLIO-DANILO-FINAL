 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

 
# 📑 RELATÓRIO DE AUDITORIA DE INTERFACE & UX

## 📂 PÁGINA: HOME (`/`)

### 1. Diagnóstico Geral

A Home é a página de maior complexidade técnica devido à mistura de **WebGL** (Ghost), **Video Physics** (Thumbnail to Fullscreen) e **Layout Editorial**. A referência visual (`HOME-PORTFOLIO-BLACK---GHOST.jpg`) exige um controle de contraste rigoroso, especialmente na transição para o rodapé branco, que é um ponto crítico de falha para o Header "Glass".

### 2. Análise de Seções e Espaçamentos

| Seção | Status Layout (Ref vs Spec) | Status Espaçamento | Status Motion | Risco Técnico |
| --- | --- | --- | --- | --- |
| **Hero + Ghost** | ✅ Fiel | ⚠️ Crítico | ✅ Alta complexidade | O texto "Você não vê o design" precisa de z-index perfeito sobre o WebGL. |
| **Manifesto Video** | ⚠️ Atenção | ❌ Risco de quebra | ✅ Definido (Lerp) | A transição de Thumbnail (canto inf. dir.) para Fullscreen exige `layout-shared-element`. |
| **Showcase (Stripes)** | ✅ Fiel | ✅ Definido | 🟡 Performance | O hover nas listras deve empurrar o layout sem *layout shift* brusco. |
| **Featured (Bento)** | ❌ Divergência | ⚠️ Crítico | ✅ Stagger | A imagem mostra um grid assimétrico específico; a spec fala em Bento genérico. Seguir imagem. |
| **Contact (White)** | ✅ Fiel | ✅ Definido | ❌ Contraste Header | O Header precisa inverter a cor do texto para preto ao entrar nesta seção branca. |

### 3. Problemas Detectados (Detalhe)

**❌ [PROBLEMA #01] - Conflito de Referência no Grid de Projetos**

* **Referência Visual:** `HOME-PORTFOLIO-BLACK---GHOST.jpg` mostra projetos como "Magic" e "Designing Trust" ocupando larguras específicas, com títulos sobrepostos ou abaixo.
* **Especificação Técnica:** `HOME - PROTOTIPO INTERATIVO.md` descreve um "Bento Grid" genérico.
* **Determinação:** O código deve forçar as classes do Tailwind (`col-span-X`) para replicar **exatamente** o mosaico da imagem JPG, ignorando a sugestão genérica da spec se houver conflito.

**❌ [PROBLEMA #02] - Header Contrast Bug (Seção Contato)**

* **Referência Visual:** A seção de contato final tem fundo branco/cinza claro (`#f0f0f0` na spec). O Header é fixo.
* **Risco Técnico:** Se o header mantiver texto branco (`#fcffff`) sobre o fundo claro, a navegação desaparece.
* **Ação:** Implementar observer para trocar a variável CSS do header `--header-text` para `#0e0e0e` ao cruzar a `div` de contato.

**❌ [PROBLEMA #03] - Mobile Manifesto Video**

* **Referência:** `HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg`.
* **Análise:** No mobile, não existe "floating thumbnail". O vídeo é um bloco de largura total.
* **Correção de Código:** Garantir `display: none` no componente FloatingThumbnail em breakpoints `< lg` e renderizar um componente `VideoBlock` estático no fluxo.

---

## 📂 PÁGINA: SOBRE (`/sobre`)

### 1. Diagnóstico Geral

Esta página é puramente editorial. O sucesso depende de **Tipografia** (TT Norms Pro) e **Ritmo Vertical**. A referência visual (`SOBRE-PORTFOLIO-BLACK---GHOST.jpg`) mostra um uso agressivo de espaço negativo e alinhamentos à direita que são difíceis de manter responsivos sem um grid CSS robusto.

### 2. Análise de Seções e Espaçamentos

| Seção | Status Layout | Status Espaçamento | Status Motion | Risco Técnico |
| --- | --- | --- | --- | --- |
| **Hero (Manifesto)** | ✅ Fiel | ✅ 100vh | ✅ Texto a Texto | O alinhamento à direita do texto no desktop é crucial. |
| **Origem (Timeline)** | ⚠️ Atenção | ❌ Risco de aperto | ✅ Scroll Trigger | A imagem mostra MUITO respiro entre os blocos. O código tende a "apertar". |
| **Skills (Cards)** | ✅ Fiel | ✅ Definido | 🟡 Opacidade | Os cards na imagem têm bordas sutis e transparência. |
| **Mobile Flow** | ✅ Fiel | ✅ Ajustado | N/A | A imagem `SOBRE-MOBILE...` confirma: Texto em cima, imagem em baixo. |

### 3. Problemas Detectados (Detalhe)

**❌ [PROBLEMA #04] - Espaçamento da Seção "Origem"**

* **Referência:** `SOBRE-PORTFOLIO-BLACK---GHOST.jpg` (Seção "Desde cedo...").
* **Análise:** Existe um alinhamento visual onde o texto está em uma coluna (esq) e a imagem na outra (dir), mas verticalmente desencontrados (staggered).
* **Risco:** O dev comum colocaria `flex-row items-center`. Isso está **errado**.
* **Correção:** Usar Grid ou `mt-16` / `pt-32` na coluna da imagem para criar o desnível visual da referência.

**❌ [PROBLEMA #05] - Legibilidade Texto sobre Vídeo (Hero)**

* **Referência:** Texto branco sobre fundo escuro com rosto (vídeo).
* **Risco:** Se o vídeo for claro, o texto some.
* **Obrigatoriedade:** Implementar o overlay descrito na spec (`bg-gradient-to-b from-black/60...`) com rigor, ou o design quebra em telas de alto brilho.

---

## 📂 PÁGINA: PORTFOLIO SHOWCASE (`/portfolio`)

### 1. Diagnóstico Geral

Focada em imersão. A imagem `PORTFOLIO-PAGE-LAYOUYT.jpg` mostra um layout vibrante no topo (Hero Colorido) e um grid denso abaixo. A Spec fala de "Parallax Lerp", que não é visível na imagem estática, mas é fundamental para a sensação "Ghost".

### 2. Análise de Seções e Espaçamentos

| Seção | Status Layout | Status Espaçamento | Status Motion | Risco Técnico |
| --- | --- | --- | --- | --- |
| **Hero Loop** | ✅ Fiel | ✅ Fullscreen | N/A | Vídeo deve ter `object-fit: cover` absoluto. |
| **Gallery Grid** | ❌ Divergência | ✅ Tight Gap | ⚠️ Performance | A imagem mostra 3 colunas "full bleed" (sem margem lateral?). Spec diz padding `0.25rem`. |
| **Modal (Project)** | N/A (Sem img) | N/A | ✅ Timeline Spec | Seguir estritamente a timeline de animação da spec (0-1500ms). |

### 3. Problemas Detectados (Detalhe)

**❌ [PROBLEMA #06] - Grid Gap e Margens**

* **Referência:** `PORTFOLIO-PAGE-LAYOUYT.jpg` mostra as imagens dos projetos (Garoto, etc.) quase coladas umas nas outras.
* **Spec:** Pede `gap-1` (`0.25rem`).
* **Ação:** Garantir que o container da galeria não tenha `max-width` restritivo (como `container mx-auto`), mas sim ocupe a largura total ou quase total conforme a referência visual "widescreen".

---

## 🛠️ FASE 2: PROMPTS TÉCNICOS DE EXECUÇÃO

Aqui estão os prompts atômicos para corrigir/implementar o código com precisão cirúrgica, baseados na auditoria acima.

### 🔧 Prompt #01 — Implementação do Bento Grid (Home)

**Objetivo:** Criar a seção "Featured Projects" da Home respeitando a assimetria da imagem de referência, ignorando grids genéricos.

**Contexto:**
Você deve implementar a seção de Projetos em Destaque.
**Referência Visual:** `HOME-PORTFOLIO-BLACK---GHOST.jpg` (Grid irregular, estilo revista).
**Tech Stack:** React, Tailwind CSS.

**Instruções Técnicas:**

1. Crie um componente `FeaturedProjects.tsx`.
2. Utilize CSS Grid (`grid-cols-1 md:grid-cols-12`).
3. **Layout Rígido (Desktop):**
* **Card 1 (Magic):** `col-span-5` (Esquerda).
* **Card 2 (Designing Trust - FFF):** `col-span-7` (Direita, mais largo).
* **Card 3 (Epic Look - Full):** `col-span-12` (Largura total, destaque central).
* **Card 4 (Building - Vertical):** `col-span-8`.
* **CTA Card (Like what you see?):** `col-span-4` (Canto inferior direito, fundo escuro sólido).


4. **Espaçamento:** Use `gap-6` ou `gap-8`.
5. **Mobile:** Tudo vira `col-span-12` (pilha vertical).
6. Ajuste as alturas (`h-[500px]`, `h-[600px]`) para bater visualmente com a proporção das imagens.

---

### 🔧 Prompt #02 — Correção do Header com Contraste Dinâmico

**Objetivo:** Garantir que o menu seja legível tanto no fundo escuro (Hero) quanto no fundo branco (Contato).

**Contexto:**
O Header é fixo (`sticky`). A seção final "Contato" é branca (`bg-[#F5F5F5]`). O texto do header é branco por padrão.

**Instruções Técnicas:**

1. No componente `Header.tsx`, adicione um estado `isDarkSection`.
2. Implemente um `useEffect` que detecta a posição de scroll ou usa `IntersectionObserver` visando a seção de ID `#contact`.
3. **Lógica:**
* Se `#contact` estiver visível no viewport (top intersection): `setIsDarkSection(true)`.
* Caso contrário: `setIsDarkSection(false)`.


4. **Estilização Tailwind:**
* Container: `transition-colors duration-300`.
* Texto dos links: `${isDarkSection ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-400'}`.
* Logo: Altere o `src` ou o `fill` do SVG dependendo do estado.



---

### 🔧 Prompt #03 — Ajuste de Ritmo Vertical (Página Sobre)

**Objetivo:** Recriar o espaçamento "Editorial" e o desalinhamento visual entre texto e imagem na seção "Origem".

**Contexto:**
Referência `SOBRE-PORTFOLIO-BLACK---GHOST.jpg`. O layout não é simétrico.

**Instruções Técnicas:**

1. No componente `OriginSection.tsx`, use um Grid de 12 colunas.
2. **Bloco 1:**
* Texto: `col-start-2 col-span-5`. Centralizado verticalmente? **Não.** Adicione `mt-0`.
* Mídia (Vídeo/Foto): `col-start-8 col-span-5`. Adicione `mt-32` (margin-top forçado) para criar o efeito "staggered" (desencontrado) visto na imagem.


3. **Bloco 2 (Invertido):**
* Mídia: `col-start-2 col-span-5`. Margin normal.
* Texto: `col-start-8 col-span-4`. Adicione `mt-24`.


4. **Tipografia:** Garanta que os títulos tenham `leading-tight` e as descrições tenham `leading-relaxed` com cor `#a1a3a3` (cinza médio), não branco puro.

---

### 🔧 Prompt #04 — Portfolio Parallax Engine (Performance)

**Objetivo:** Implementar o grid da galeria com Scroll Lerp sem travar o navegador.

**Contexto:**
Spec `PORTFOLIO - PROTÓTIPO INTERATIVO.md`. Requer `requestAnimationFrame`.

**Instruções Técnicas:**

1. Crie o hook `useParallax.ts`.
2. Não anime `top` ou `margin`. Use **apenas** `transform: translate3d(0, Ypx, 0)`.
3. **Lógica Lerp:** `current = current + (target - current) * 0.05`.
4. **Gallery Track:** O container da galeria deve ser `fixed` na tela, enquanto o `body` tem a altura total simulada (`document.body.style.height = trackHeight + 'px'`).
5. **Mobile Guard:** Desative completamente o cálculo de Lerp em telas `< 1024px` (`window.matchMedia`). No mobile, use scroll nativo para melhor UX.


