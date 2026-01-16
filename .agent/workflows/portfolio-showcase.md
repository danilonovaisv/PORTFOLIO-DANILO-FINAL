---
description: # Workflow: Implementação do Portfolio Showcase
---

# Workflow: Implementação do Portfolio Showcase (Lo&Behold Style)

## Purpose

Apresentar as principais categorias de trabalho com **sofisticação editorial**, usando movimento, hierarquia tipográfica e interação progressiva para **guiar o usuário naturalmente** até áreas específicas do portfólio — replicando o ritmo, layout e comportamento da sessão equivalente na home do site de referência.

---

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).
6. Crie uma lista mental (ou JSON interno) contendo para cada item:
   - `ID`: Identificador sequencial.
   - `Contexto`: Arquivos alvo (ex: `src/components/Header.tsx`).
   - `Ação`: O que mudar (ex: "Aumentar padding", "Corrigir Z-Index").
   - `Validação`: Critério de sucesso (ex: "Compilar sem erros", "Igual à imagem X").

###REFERECIAS BIBLE DE NA PASTA:

- '/docs/HOME/HOME - PROTOTIPO INTERATIVO.md'
- '/docs/HOME/HOME-PORTFOLIO-BLACK---GHOST.jpg

**Visual Mobile:** - '/docs/HOME/`HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg`<br>

### FASE 2: Protocolo de Análise Profunda:

## Layout & Estrutura

### Desktop (≥1024px)

#### Estrutura Geral

- Headline centralizada - **(font-H1)**:  
  **“portfólio showcase”**
  - “portfólio” em branco
  - “showcase” em `#0048ff`
- Label flutuante contextual - **(font-small)**:
  - Texto: **[what we love working on]**
  - Cor: `#0048ff`
  - Posicionamento: absoluto, alinhado à esquerda, alinhado a esquerda e ao intem 'Brand & Campaigns' dentro da faixa
- Três faixas interativas horizontais ['#8705f2'] (_accordion-style stripes_), com alinhamento alternado - **(font-family: "TT Norms Pro" - Normal - 24px a 40px)**:
  1. **Brand & Campaigns** — alinhada à direita
  2. **Videos & Motions** — centralizada
  3. **Web Campaigns, Websites & Tech** — alinhada à esquerda
     - Quebra de linha após a vírgula
- CTA centralizado abaixo das faixas:
  - **“let’s build something great →”**

---

#### Estrutura de Cada Stripe

Cada faixa contém:

- **Thumbnail de vídeo/imagem**
  - Largura: `288px`
  - Aspect ratio: ~16:9
  - Bordas levemente arredondadas
  - Oculta por padrão
- **Título da categoria**
  - Tipografia grande (2xl–5xl)
  - Peso médio
  - Font-family: `TT Norms Pro Normal`
- **Ícone de ação**
  - Badge circular azul
  - Ícone de seta interna

---

## Interações & Animações

### Scroll Reveal (Desktop)

- Trigger: quando 30% da seção entra na viewport
- Animação:

```js
opacity: 0 → 1
translateY: 24px → 0
duration: 0.8s
easing: ease-out
stagger: 120ms entre faixas
```

- Durante a entrada, os títulos transitam para `#0057FF`, reforçando hierarquia visual.

---

### Hover sobre a Stripe (Desktop)

#### 1. Revelação da Thumbnail

```js
width: 0 → 288px
opacity: 0 → 1
duration: 700ms
easing: cubic-bezier(0.22, 1, 0.36, 1)
```

#### 2. Ajuste de Espaçamento Interno

```js
gap: gap-7 → gap-10
duration: 300ms
```

#### 3. Ícone de Seta

```js
rotation: -45deg → 0deg
duration: 500ms
```

> A interação é **progressiva e silenciosa**, sem sobreposição agressiva ou quebra de layout.

---

### Click

- Navegação para `/portfolio`
- Categoria correspondente aplicada via filtro (slug).

---

## Responsividade & Adaptação de Conteúdo

### Mobile & Tablet (≤1023px)

#### Layout

- Cards verticais full-width
- Conteúdo texto alinhado a esquerda da página
- Ícone de Seta alinhado a direita da página
- Label flutuante removida
- CTA centralizado

#### Comportamento

- Sem hover
- Thumbnails ocultas ou estáticas
- Ícones de seta à direita

---

#### Categories & Assets

1. **Brand & Campaigns**
   - Slug: `brand-campaigns`
   - Thumbnail: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`

2. **Videos & Motions**
   - Slug: `videos-motions`
   - Thumbnail: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`

3. **Web Campaigns, Websites & Tech**
   - Slug: `websites-webcampaigns-tech`
   - Thumbnail: `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp`

#### CTA Button

**Text:** "let's build something great →"  
**Destination:** `/#contact`
**Estado**,Propriedade,Valor / Classe Tailwind,Duração,Easing
**Idle**,Translação Y,translate-y-0,-,-
**Hover**,Translação Y,-translate-y-px (Levitação sutil),200ms,ease-out
**Hover**,Background,bg-light-blue `#0048ff` (Iluminação),300ms,default (`translateX: 4px`)  
**Optional:** Subtle looping animation on arrow in idle state (`translateX: 0 → 4px → 0`)

--

### FASE 3: EXECUÇÃO DO LOOP (Iterativo)

Para cada item da lista indexada na FASE 1, execute:

#### 1. Análise de Contexto

- Leia o conteúdo atual dos arquivos alvo.
- Compare o código atual com o pedido do prompt.
- _Raciocínio:_ "O que preciso mudar neste código para atingir o critério de aceite sem quebrar o que já funciona?"

#### 2. Aplicação Atômica

- Aplique a mudança mínima necessária.
- **Regras de Ouro:**
  - Mantenha a consistência do Tailwind (use classes utilitárias, evite style inline).
  - Não remova lógica de negócios existente.
  - Respeite a estrutura do App Router.

#### 3. Verificação Técnica (Self-Correction)

- Após a edição, simule/rode: `npm run lint` ou verifique a sintaxe.
- **Se houver erro:** Tente corrigir o erro **uma vez** baseado na mensagem de log.
- **Se persistir:** Desfaça a alteração e marque como "FALHA TÉCNICA".

#### 4. Verificação de Layout (Code-Level)

- Verifique se as classes de responsividade (ex: `md:`, `lg:`) foram aplicadas conforme o pedido "Mobile-First".
- Verifique se não há valores hardcoded que quebrem o layout (ex: `width: 1000px`).

---

## FASE 4: 🛠️ VERIFICAÇÂO:

### 3. Tipografia e Textos

- **Fonte:** Confirmar se `src/config/brand.ts` está sendo a única fonte de definição de fontes (`TT Norms Pro`).
- **Hierarquia:**
- Verificar se os tamanhos de fonte em `src/app/globals.css` (clamp) estão sendo aplicados via classes utilitárias (`text-display`, `text-h1`).

- **Quebra de Linha:** O agente deve alertar se títulos longos não tiverem `max-w-[ch]` para evitar linhas infinitas em monitores ultrawide.

### 4. Responsividade

- **Breakpoints:** Verificar o uso consistente do prefixo `lg:` (1024px) como ponto de virada principal (Desktop).
- **Menu:** O `MobileStaggeredMenu.tsx` deve ser ativado apenas em `< lg`.
- **Touch Targets:** Botões em `src/components/ui/CTAButton.tsx` devem ter altura mínima (ex: `h-12` ou `py-3`).

### 5. Componentes e Interações

- **Estados:** Verificar se os botões têm `hover:`, `active:` e `focus-visible:` definidos.
- **Feedback:** Componentes de formulário (`ContactForm.tsx`) possuem estados de erro/sucesso visuais alinhados com o tema escuro?
- **Animações:** As transições em `src/config/motion.ts` estão sendo usadas, ou há animações "hardcoded" soltas nos componentes?

### 6. Acessibilidade

- **Contraste:** Verificar se textos cinza (`text-secondary`) sobre fundo preto têm contraste suficiente.
- **Tags Semânticas:** Uso correto de `<main>`, `<section>`, `<h1>`, `<button>` vs `<div>`.
- **Imagens:** Verificar se componentes como `Image` do Next.js possuem `alt` descritivo.

### 7. Coerência Global

- **Design Tokens:** O código usa cores hexadecimais soltas (ex: `#0048ff`) ou usa variáveis do Tailwind/Brand (`bg-primary`)? _Isso é crítico para manutenção._

## 8. ✅ Checklist Técnico Preenchido

✔ **GSAP mask reveal** pinned com 4 imagens  
✔ **Posicionamento texto** exato (-10% vertical)  
✔ **Mobile ordering** automático  
✔ **Cores/typo** 100% spec  
✔ **Acessibilidade** AAA  
✔ **Next.js production-ready**  
✔ **Smooth 60fps** scroll experience

## Resultado Esperado

- Experiência editorial fluida
- Movimento como reforço de significado
- Consistência total entre desktop e mobile
