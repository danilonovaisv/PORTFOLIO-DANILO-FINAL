# 🎯 Hero + Manifesto — Estrutura Final para Portfólio Danilo Novais

## ✨ Objetivo
Criar uma experiência hero imersiva e responsiva, com atmosfera 3D, manifesto em vídeo e animação de entrada impactante. Inspirado em:

- CodePen: https://codepen.io/danilonovaisv/pen/YPWyrdW
- Site: https://loandbehold.studio/

---

## 🧱 Estrutura (Desktop - Z-Index Stack)

1. **Z-50** Preloader (SVG ghost + texto)
2. **Z-30** Manifesto Video Thumbnail (flutuante, bottom-right)
3. **Z-20** Ghost Atmosphere (WebGL Canvas)
4. **Z-10** Editorial Text Block (centralizado)
5. **Z-0** Fundo Gradient: `#040013 → #0b0d3a`

---

## 🌀 Preloader

**Visual**:
- Ícone ghost SVG branco flutuante
- Texto: `SUMMONING SPIRITS` (mono, uppercase)
- Progress bar: gradiente `#0057FF → #5227FF`

**Comportamento**:
- Exibe imediatamente ao carregar
- Fade out: `opacity 1 → 0` em 1s após 1.5–2s

---

## 👻 Ghost Atmosphere (WebGL Canvas)

**Elementos**:
- Ghost Mesh: esfera emissiva azul pulsante
- Eyes: brilham conforme o movimento do mouse
- Partículas + Fireflies orbitando
- Movimento orgânico: `sin(time * freq)`

**Pós-processamento**:
- Bloom (intensity: 2.8)
- Grain, scanlines, jitter sutil, vignette

**Interação**:
- Ghost segue o cursor com `lerp: 0.05`
- Canvas desabilitado em `prefers-reduced-motion`

**Fallback**:
- Gradiente radial estático

---

## 🧾 Editorial Text Block

**Fontes**: TT Norms Pro, fallback: `ui-sans-serif`

**Conteúdo**:
- Tag: `[BRAND AWARENESS]` (mono, 14px)
- H1: “Você não vê / o design.” (2 linhas)
- H2: “Mas ele vê você.” (destacado)
- CTA: “step inside →” (link: `/sobre`, hover animado)

**Estilo**:
- Centralizado verticalmente
- Cor: `#d9dade` sobre `#06071f`

**Responsivo**:
- Mobile: Quebra o H1 em 3 linhas

---

## 📹 Manifesto Video Thumbnail (Desktop)

**Estado Inicial**:
- Posição: `bottom-right`, `30vw` largura
- Estilo: `rounded`, `shadow`, `aspect-video`
- Props: autoplay, loop, muted, `playsInline`

**Scroll Behavior**:
- Vídeo fixo no viewport (não rola com página)
- Animação:
  - scale: `[0.3, 1]`
  - posX/posY: `["100%", "50%"]`
  - borderRadius: `["16px", "0px"]`
  - editorial opacity: `[1, 0]`

**Lógica Scroll**:
- Quando atinge fullscreen:
  - `hold 2s` com scroll travado
  - vídeo se **desmuta**
- Ao sair do Hero: volta a ser **muted**

**Click Behavior**:
- Clica → vai direto ao fullscreen
- Triggera mesma lógica de áudio/scroll

**Hover**:
- Scale `1 → 1.05`, `500ms`

---

## 📱 Manifesto (Mobile)

**Layout**:
- Seção fullscreen logo após a Hero
- `aspect-video`, fundo `#040013`

**Vídeo**:
- autoplay, loop, muted, `playsInline`
- botão visível para som (tap = unmute)
- Ao sair da seção → mutar de novo

**Animação**:
```js
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
```

**Acessibilidade**:
- Controles claros
- Modo focável visível
- Sem som automático

---


## 📱📐 Comportamento Responsivo

**Viewport:**

- **Desktop**:  
  H1: "Você não vê" (linha 01)  
       "o design." (linha 02)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_

- **Tablet**:  
  H1: "Você não vê" (linha 01)  
       "o design." (linha 02)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_

- **Mobile**:  
  H1: "Você não" (linha 01)  
       "vê o" (linha 02)  
       "design." (linha 03)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_


## 🎬 Entrada (Page Load)

```js
initial: {
  opacity: 0,
  scale: 0.92,
  translateY: 60,
  filter: "blur(10px)"
},
animate: {
  opacity: 1,
  scale: [1.02, 1],
  translateY: 0,
  filter: "blur(0px)"
},
duration: 1.2s,
easing: [0.25, 0.46, 0.45, 0.94]
```

---

## 📊 Performance

- DPR máx: 2
- Antialias: false
- `prefers-reduced-motion`: desativa canvas e efeitos pesados

---

## ✅ Resumo de Implementação

- Hero 100% responsiva
- Ghost com movimento realista e camadas visuais
- Texto editorial centralizado com quebra de linha adaptativa
- Manifesto em vídeo com transição scroll e lógica de som
- Acessível e performático

---

_Pronto para usar como guia para seu Copilot, documentação ou roadmap de implementação._
