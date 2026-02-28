# 🟣 SEÇÃO 03 — O QUE EU FAÇO + Rodapé Animado (Ghost Design)

## 🎯 Função da seção
Transformar **serviços/capabilities** em uma lista de entregas claras, com visual calmo e confiável.  
A seção utiliza **animação guiada pelo scroll**, onde os conteúdos entram **da direita para a esquerda**, reforçando progressão e controle.  
Finaliza com um **rodapé animado (marquee)** que atua como assinatura rítmica.

Mensagem principal:

**Título (Display):**  
> Do **insight** ao **impacto**.  
> Mesmo quando você não percebe.

Texto centralizado.

---

## 📐 Layout Geral
- Altura de referência: ~100vh (não obrigatório).
- Fundo: `#040013` (`backgroundDark`).
- Container central:
  - `max-width`: 1120–1200px
  - `padding-inline`: 24–32px
  - Centralizado (`margin-inline: auto`).

---

## 🧠 Motion Principle (conceito)
- Movimento **horizontal (X)** da **direita → esquerda**
- Animação **silenciosa e progressiva**
- Nenhum elemento “salta” ou aparece abruptamente
- Desktop: movimento **sincronizado ao scroll**
- Mobile: movimento **por entrada no viewport**
- Sempre respeitar `prefers-reduced-motion`

---

## 🖥 Layout — Desktop (≥ 1024px)

### 1. Título
- Centralizado no topo da seção.
- Duas linhas.
- Tipografia:
  - font-weight: 900
  - font-size: 44–48px
  - line-height: 1.2
- Cores:
  - “Do” / “ao impacto.” → branco
  - “insight” / “impacto” → azul primário
  - Linha 2 → branco
- Margens:
  - Topo: 64–80px
  - Base: 48–64px
- max-width: 900px

---

## 2. Lista Interativa de Cards — Desktop

### Visual
- Faixa horizontal única com **7 cards**
- display: flex
- flex-direction: row
- gap: 16–20px
- Sem wrap
- Centralizada em telas ≥ 1440px

### Estrutura de cada card
- Altura mínima: 120–140px
- Padding: 20–24px
- border-radius: 12–16px
- Fundo: rgba(255,255,255,0.04)
- Opacidade base: 0.92
- Layout interno:
  - Ícone circular azul (32–36px)
  - Texto à direita (16–18px)

---

## 🎬 Animação — Cards Desktop (Scroll-driven)

- Disparo: quando a seção entra no viewport
- Controle: progresso do scroll
- Todos os cards se movem no eixo X:
  - Origem: +120px
  - Destino: 0px
- Opacidade: 0 → 1
- Blur opcional: 6px → 0
- Stagger progressivo:
  - Delay incremental: ~0.06s por card
- Sensação: organização gradual do caos

---

## 📱 Layout — Mobile (≤ 768px)

### 1. Título
- Centralizado
- font-size: 28–32px
- line-height: 1.25
- font-weight: 700
- Margem inferior: 32–40px

### 2. Cards (Barras)
- Coluna vertical
- display: flex
- flex-direction: column
- gap: 10–14px
- Largura: 100%
- Padding: 18–20px

---

## 🎬 Animação — Barras Mobile (Viewport-based)

- Cada barra anima individualmente
- Movimento lateral:
  - Origem: +80px
  - Destino: 0px
- Opacidade: 0 → 1
- Duração: ~0.4s
- Delay baseado no índice
- Disparo ao entrar no viewport
- viewport margin: -80px

---

## 🧾 Conteúdo dos Cards
1. Direção criativa que organiza o caos  
2. Design estratégico que guia decisões  
3. Identidades que permanecem na memória  
4. Campanhas multicanais com lógica e emoção  
5. Branding que não grita — mas marca  
6. Inteligência artificial aplicada à criação e automação  
7. Liderança criativa com visão e método  

Regras:
- Palavra-chave inicial em azul
- Complemento em branco
- Frases curtas e afirmativas

---

## 🌀 Rodapé Animado — Marquee (Ghost Design)

### Layout
- Margem superior: 48–64px
- padding-block: 16–24px
- BG: #0048ff
- Texto: #8705f2
- Duas linhas horizontais

### Conteúdo
Linha 1 (A → B):  
DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・BRANDING・INTELIGÊNCIA ARTIFICIAL・LIDERANÇA CRIATIVA・

Linha 2 (B → A):  
BRANDING・INTELIGÊNCIA ARTIFICIAL・LIDERANÇA CRIATIVA・DIREÇÃO CRIATIVA・DESIGN ESTRATÉGICO・IDENTIDADES・CAMPANHAS・

---

## 🎬 Motion — Marquee
- Duas instâncias com direções opostas
- baseVelocity: ±10
- Velocidade modulada pelo scroll
- Loop infinito
- Movimento linear
- Em mobile: velocidade reduzida
- prefers-reduced-motion:
  - animação pausada
  - textos centralizados e estáticos

---

## ♿ Acessibilidade
- Título como h2
- Cards informativos: article/div com aria-label
- Cards clicáveis: button ou a
- Marquee com aria-hidden="true"
- Contraste AA/AAA
- Foco visível em teclado

---

## 🧩 Notas de Implementação
- Desktop: flex-row | Mobile: flex-col
- Alturas consistentes
- Animações via transform: translateX
- will-change: transform
- Intersection Observer para disparo inicial
- Evitar box-shadows pesados

---

**Ghost Design não explica.  
Ele permanece.**
