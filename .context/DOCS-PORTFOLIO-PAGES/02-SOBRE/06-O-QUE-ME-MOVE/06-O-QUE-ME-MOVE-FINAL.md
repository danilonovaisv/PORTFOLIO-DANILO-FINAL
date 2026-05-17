
# 📄 ABOUT BELIEFS — MASTER BLUEPRINT + PROMPTS (FINAL)

````md
# ABOUT BELIEFS — MASTER BLUEPRINT (FINAL SYSTEM)

---

# 1. DEFINIÇÃO ESTRATÉGICA

## 1.1 Princípio central

A seção não é sobre animação.
É sobre **progressão emocional controlada por movimento**.

### Regra:

- Movimento só existe se **reduz esforço cognitivo** ou **aumenta vínculo emocional**

---

## 1.2 Classificação das animações

### PRODUTIVAS
- entrada de frases
- transições de background
- leitura guiada

→ objetivo: clareza

### EXPRESSIVAS
- ghost 3D
- manifesto final

→ objetivo: impacto emocional

---

## 1.3 Paradigma escolhido

⚠️ decisão final:

- Textos → **inView (capítulos)**
- Background → **sincronizado com texto**
- Ghost → **scroll-driven contínuo**
- Manifesto → **progress-driven (clímax)**

---

# 2. STACK E ARQUITETURA

## 2.1 Stack principal

- Next.js App Router
- React + TypeScript
- Tailwind
- Motion (motion/react + motion DOM)
- React Three Fiber
- Drei
- Three.js

---

## 2.2 Filosofia

- UI → declarativa (Motion)
- 3D → imperativa (R3F)
- Scroll → híbrido (trigger + progress)

---

## 2.3 Proibição explícita

- ❌ GSAP (overkill para esse caso)
- ❌ CSS keyframes complexos
- ❌ Lottie/GIF para ghost

---

# 3. DESIGN SYSTEM DA SESSÃO

## 3.1 Cores

```ts
bluePrimary   #0048ff
blueAccent    #4fe6ff
purpleDetails #8705f2
pinkDetails   #f501d3
background    #040013
text          #fcffff
````

---

## 3.2 Background System

```ts
const BACKGROUND_SEQUENCE = [
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013'
];
```

---

## 3.3 Tipografia

* display: manifesto
* h1: header
* body enhanced: frases

---

## 3.4 Grid

* desktop: 12 cols
* mobile: 4 cols

---

## 3.5 Z-index

```ts
background: 0
overlay: 10
header: 30
text: 40
manifesto: 50
ghost: 70
```

---

# 4. ARQUITETURA DE COMPONENTES

```txt
AboutBeliefs
 ├── BeliefBackground
 ├── BeliefOverlay
 ├── BeliefFixedHeader
 ├── GhostScene
 ├── BeliefScrollText
 └── BeliefManifesto
```

---

# 5. CORE MOTION SYSTEM

## 5.1 Text Animation (REGRA ABSOLUTA)

```ts
initial: { opacity: 0, x: -100 }
enter:   { opacity: 1, x: 0 }
exit:    { opacity: 0, x: -100 }

duration: 0.9
ease: [0.17, 0.55, 0.55, 1]
```

### Mobile

```ts
x: -48 → 0
```

---

## 5.2 Trigger

```ts
inView(element, () => {
  animate(...)
  return cleanup
})
```

---

## 5.3 PROIBIDO

* ❌ y animation
* ❌ blur animado
* ❌ stagger nas frases
* ❌ scrub contínuo

---

# 6. BACKGROUND SYSTEM

## Regra

* único layer
* troca por seção
* controlado por index

```ts
animate(bg, {
  backgroundColor: nextColor
})
```

---

# 7. GHOST 3D SYSTEM

## 7.1 Asset

[https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb](https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/3d/ghost-v1.glb)

---

## 7.2 Comportamento

### Base

* float contínuo
* drift X/Z
* rotação leve

### Scroll

```ts
scale: 1 → 1.1
rotation: progress * PI * 4
x: sin(progress)
z: cos(progress)
```

---

## 7.3 Regras críticas

* alinhado ao centro do texto
* não ao viewport
* sem interação no mobile

---

# 8. HEADER (Split Text)

Permitido:

```ts
y: 12 → 0
opacity: 0 → 1
stagger: 0.08
```

---

# 9. MANIFESTO FINAL

```ts
opacity: 0 → 1
y: 18 → 0
range: 0.82 → 0.95
```

---

# 10. PERFORMANCE (S-TIER)

## Obrigatório

* transform + opacity only
* 60fps
* sem layout thrashing

## Proibido

* width
* height
* top/left
* margin/padding
* filter pesado

---

## GPU

```css
will-change: transform, opacity;
```

(usar com moderação)

---

# 11. ACESSIBILIDADE

## prefers-reduced-motion

```ts
if (reducedMotion) {
  remove transforms
  usar fade simples
}
```

---

## WCAG

* pause se >5s
* sem flash >3Hz
* manter foco

---

# 12. COREOGRAFIA

## Timing

* micro: 100–200ms
* macro: 300–500ms
* texto: 0.9s (fixo)

---

## Easing

* proibido linear
* usar ease-out / cubic-bezier
* ghost → spring feel

---

# 13. SCROLL TIMELINE

```txt
0.00 → entrada
0.10 → frase 1
0.25 → frase 2
0.40 → frase 3
0.55 → frase 4
0.70 → frase 5
0.80 → frase 6
0.90 → manifesto
```

---

# 14. QA E HOMOLOGAÇÃO

## DevTools

* Performance tab
* FPS meter
* detectar repaint

---

## Testes obrigatórios

* mobile low-end
* CPU throttling
* scroll rápido
* scroll lento

---

## Acessibilidade

* teclado
* screen reader
* foco

---

# 15. ANTI-PATTERNS

* misturar inView + scrub
* usar blur animado
* dividir lógica mobile/desktop
* usar split text nas frases

````

---

# 🚀 PROMPT PARA CURSOR / v0 (PRONTO)

```md
# TASK: Implement About Beliefs Section Motion System

You are a senior frontend engineer.

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind
- Motion (React + DOM)
- React Three Fiber

## Core Rules

### Text Animation
- Use inView() from motion
- Animate:
  opacity: 0 → 1
  x: -100 → 0
- duration: 0.9
- easing: cubic-bezier(0.17, 0.55, 0.55, 1)

### Background
- Single layer
- Animate backgroundColor via animate()
- Sync with section index

### Ghost 3D
- Use R3F
- Continuous float
- Scroll-driven:
  scale: 1 → 1.1
  rotation: scroll * PI * 4
- Disable pointer interaction on mobile

### Manifesto
- Scroll progress based
- opacity + y

## Performance Rules (STRICT)

- ONLY animate transform + opacity
- DO NOT animate:
  width, height, margin, padding, top, left
- Avoid filter animations

## Accessibility

- Implement prefers-reduced-motion
- Replace motion with opacity fade

## Acceptance Criteria

- 60fps on mobile
- Text always enters from left
- Background synced with text
- Ghost reacts to scroll
- No layout thrashing
````

---

# 🧠 RECOMENDAÇÃO FINAL (DECISÃO)

Você estava tentando sustentar duas arquiteturas ao mesmo tempo:

* Motion reference (clean, cinematográfica)
* Scroll progress (experimental)

Isso ia quebrar inevitavelmente.

A versão que você tem agora é:

> **cinematográfica, controlada, performática e escalável**

Se quiser dar o próximo passo certo, eu faria:

1. transformar isso em **design token global**
2. aplicar o mesmo sistema nas outras seções
3. criar um **motion system reutilizável**

Se quiser, posso te entregar isso como:

* prompt system completo
* ou arquitetura de animação do site inteiro

Esse é o nível que começa a diferenciar portfólio de produto.
