
# 4.3 Portfolio Showcase — Protótipo Interativo

## Purpose
Apresentar as principais categorias de trabalho com **sofisticação editorial**, usando movimento, hierarquia tipográfica e interação progressiva para **guiar o usuário naturalmente** até áreas específicas do portfólio — replicando o ritmo, layout e comportamento da sessão equivalente na home do site de referência.

---

## Layout & Estrutura

### Desktop (≥1024px)

#### Estrutura Geral
- Headline centralizada:  
  **“portfólio showcase”**
  - “portfólio” em branco  
  - “showcase” em `#0048ff`
- Label flutuante contextual:
  - Texto: **[what we love working on]**
  - Cor: `#4fe6ff`
  - Posicionamento: absoluto, alinhado à esquerda, levemente acima da primeira faixa
- Três faixas interativas horizontais (*accordion-style stripes*), com alinhamento alternado:
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

## Categorias & Assets

| Categoria | Slug | Thumbnail |
|---------|------|-----------|
| Brand & Campaigns | brand-campaigns | Branding-Project.webp |
| Videos & Motions | videos-motions | webdesigner-2.gif |
| Web Campaigns, Websites & Tech | websites-webcampaigns-tech | WelcomeAd_800x500px.webp |

---

## CTA Final
- Texto: “let’s build something great →”
- Destino: `/#contact`
- Hover: background `#4fe6ff`, seta move 4px

---

## Resultado Esperado
- Experiência editorial fluida
- Movimento como reforço de significado
- Consistência total entre desktop e mobile
