# 🧠 PROTÓTIPO INTERATIVO — PÁGINA "SOBRE" (VERSÃO TÉCNICA COMPLETA)
## portifoliodanilo.com
### Ghost Design — presença que guia sem aparecer

---

## 🧩 1. TOKENS GLOBAIS (CSS VARIABLES)

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

## 🎬 2. MOTION TOKENS (FRAMER MOTION)

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
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
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

❌ Proibido: scale, rotate, bounce  
✅ Permitido: opacity, blur leve, translate ≤ 18px  

---

## 🟣 SEÇÃO 01 — HERO / MANIFESTO

### Layout
- `h-screen`
- Texto centralizado verticalmente a direita (ligeiramente acima do centro)
- Vídeo hero (desktop e mobile)
- Sem CTA

### Motion (frame-by-frame)
| Frame | Estado |
|------|-------|
| 0% | opacity 0 / blur 10px |
| 30% | linha 1 |
| 60% | linha 2 |
| 100% | texto completo |

---

## 🟣 SEÇÃO 02 — ORIGEM CRIATIVA (DESKTOP FLUIDO)

### Direção crítica (DESKTOP)
- **NÃO blocar o layout**
- Texto e imagens **revezam lados**
- Proporções variáveis (60/40, 50/50, 40/60)
- Texto nunca sobrepõe imagens
- Pode "respirar" mais em alguns trechos
- Sensação editorial / memória viva

### Estrutura conceitual
```
Texto (esq) → Imagem (dir)
Imagem (esq) → Texto (dir)
Texto (esq) → Imagem (dir)
Imagem (esq) → Texto (dir)
```

### Tailwind base
```tsx
<section className="relative min-h-[180vh]">
  <div className="grid grid-cols-12 gap-y-32 items-center">
```

### Destaques tipográficos
```css
.ghost-accent {
  font-weight: 600;
  color: var(--ghost-blue-soft);
  transition: color 0.4s ease;
}
.ghost-accent:hover {
  color: var(--ghost-blue);
}
```

- Máx. 1–2 palavras por parágrafo
- Sem underline
- Sem glow

### Motion (frame-by-frame)
| Ordem | Elemento | Animação |
|------|--------|---------|
| 1 | Texto | fadeGhost |
| 2 | Imagem | imageFloat |
| 3 | Texto | fadeGhost |
| 4 | Imagem | imageFloat |

### Mobile
- Sempre: texto → imagem
- Full-width
- Mesmo ritmo, sem alternância lateral

---

## 🟣 SEÇÃO 03 — O QUE EU FAÇO

### Layout
- Coluna única
- Max-width 520px
- Espaçamento grande

### Motion
- Stagger 0.18s
- riseSoft
- Hover apenas opacity +5%

---

## 🟣 SEÇÃO 04 — COMO EU TRABALHO

### Layout
- Texto em primeiro plano
- Background full-bleed (vídeo / abstrato)

### Motion
| Frame | Estado |
|------|-------|
| 0% | invisível |
| 100% | visível e estático

Sem animação contínua no texto.

---

## 🟣 SEÇÃO 05 — O QUE ME MOVE

### Direção
- Texto central
- Manifesto emocional
- Muito espaço negativo

### Motion por tempo
| Bloco | Delay |
|------|------|
| 1 | 0s |
| 2 | 1.2s |
| 3 | 2.4s |

---

## 🟣 SEÇÃO 06 — FECHAMENTO / CONFIRMAÇÃO

### Layout
- Texto à esquerda
- CTAs simples

### CTA Hover
```css
.cta {
  transition: opacity 0.4s ease;
}
.cta:hover {
  opacity: 0.85;
}
```

---

## 📱 BREAKPOINTS

| Breakpoint | Regra |
|-----------|------|
| sm | fonte maior |
| md | sem colunas duplas |
| lg | layout completo |
| xl | mais respiro |

---

## 🚫 REGRAS ABSOLUTAS

- ❌ Texto sobre imagem
- ❌ Blur excessivo
- ❌ Scale / bounce
- ✅ Alternância fluida desktop
- ✅ Ritmo frase ↔ imagem
- ✅ Mobile-first

---

## 🧩 EXPERIÊNCIA FINAL

O usuário não percebe técnica.  
Mas sente ritmo, memória e presença.

Isso é **Ghost Design**.

---

# 🤖 PROMPT DE AUDITORIA AUTOMÁTICA — PÁGINA SOBRE (GHOST DESIGN)

Você é um **Agent Auditor Sênior Frontend/UI**, responsável por validar PRs
que alterem a página **/sobre** do site.

## Fonte da verdade
- `docs/PROTOTIPO_INTERATIVO_SOBRE_GHOST_COMPLETO.md`

---

## OBJETIVO
Garantir fidelidade TOTAL ao protótipo Ghost Design.
Qualquer divergência = BUG.

---

## CHECKLIST AUTOMÁTICO (OBRIGATÓRIO)

### Estrutura
- [ ] Seções 01 → 06 presentes e na ordem correta
- [ ] Componentes isolados por seção
- [ ] Nenhuma seção extra

### Layout
- [ ] Hero com texto alinhado à direita
- [ ] Origem com alternância fluida texto ↔ imagem
- [ ] Texto nunca sobre imagem
- [ ] Mobile sempre texto antes da imagem

### Motion
- [ ] Apenas opacity / blur / translate
- [ ] Sem scale / bounce / rotate
- [ ] Motion dispara apenas quando visível
- [ ] Manifesto é time-based (não scroll)

### Tipografia
- [ ] Keywords com `.ghost-accent`
- [ ] Hover apenas muda cor
- [ ] Máx. 1–2 keywords por parágrafo

### Performance
- [ ] Nenhuma animação fora do viewport
- [ ] prefers-reduced-motion respeitado
- [ ] Sem re-render excessivo

---

## SE ENCONTRAR PROBLEMAS
1. Liste o arquivo exato
2. Descreva o desvio objetivamente
3. Proponha correção mínima
4. Não altere conteúdo textual
5. Não "melhore" o design

---

## RESULTADO ESPERADO
- Fidelidade visual
- Ritmo ghost preservado
- UX silenciosa
- PR aprovado apenas se todos os itens passarem