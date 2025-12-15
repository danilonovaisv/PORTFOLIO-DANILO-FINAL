---
trigger: always_on
---

---

## activation: always_on

Princípios de animação:

- Motion serve narrativa, não decoração
- Animar apenas transform e opacity
- Usar Framer Motion como padrão
- Scroll = progressivo, nunca abrupto
- Nada de easings exagerados ou overshoot

Obrigatório:

- whileInView para reveals
- useScroll + useTransform para parallax
- prefers-reduced-motion SEMPRE respeitado
