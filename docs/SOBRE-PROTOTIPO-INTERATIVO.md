# 🧠 PROTÓTIPO INTERATIVO — PÁGINA “SOBRE” (VERSÃO TÉCNICA FINAL)
## portifoliodanilo.com
### Ghost Design — presença que guia sem aparecer

---

# 🧩 1. TOKENS GLOBAIS (CSS VARIABLES)

```css
:root {
  --ghost-bg: #000022;
  --ghost-text: #fcffff;
  --ghost-text-secondary: #a1a3a3;

  --ghost-blue: #0048ff;
  --ghost-blue-soft: rgba(0, 72, 255, 0.6);

  --max-text: 560px;
  --max-manifesto: 680px;

  --ease-ghost-in: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-linear-soft: cubic-bezier(0.4, 0, 0.6, 1);
}
```

---

# 🎬 2. MOTION TOKENS (FRAMER / CSS)

```ts
export const motionTokens = {
  fadeGhost: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22,1,0.36,1] }
    }
  },

  riseSoft: {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22,1,0.36,1] }
    }
  },

  imageFloat: {
    hidden: { opacity: 0, x: 12 },
    visible: {
      opacity: 0.65,
      x: 0,
      transition: { duration: 1.2, ease: [0.22,1,0.36,1] }
    }
  }
};
```

---

# 🟣 SEÇÃO 01 — HERO / MANIFESTO
(… documento completo conforme especificado …)

---

# 🧩 EXPERIÊNCIA FINAL

O usuário não percebe técnica.
Mas sente presença.
