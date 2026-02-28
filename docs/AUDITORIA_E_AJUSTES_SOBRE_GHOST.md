# 🧠 AUDITORIA & PLANO DE AJUSTES — PÁGINA “SOBRE”
## portfoliodanilo.com/sobre
### Ghost Design — Refinamento final (base Phantom)

---

## 🎯 CONTEXTO

A página **/sobre** está implementada, porém **ainda não atinge o nível de controle visual, tipográfico e rítmico** esperado pelo conceito **Ghost Design**.

Referência estrutural:
- https://www.phantom.land/about/agency

Este documento lista:
- Problemas reais identificados
- Por que são problemas
- Soluções técnicas objetivas
- Prompts executores para Copilot ajustar o código

---

## 📌 FONTE DA VERDADE

- Documento canônico:
  `PROTOTIPO_INTERATIVO_SOBRE_GHOST_COMPLETO.md`
- Vídeos obrigatórios:
  - Hero Desktop: HeroSobre.mp4
  - Hero Mobile: HeroSobreMobile.mp4
  - About Method: VideoAboutMethod.mp4

---

## 🔴 PROBLEMAS IDENTIFICADOS (RESUMO)

CRÍTICOS:
1. Tipografia não domina a experiência
2. Vídeo da Hero ainda compete com o texto
3. Hierarquia fraca entre H1 e parágrafo
4. Motion entra “junto demais”
5. Texto largo demais (sem grid invisível)

MÉDIOS:
6. Keywords em excesso ou pouco editoriais
7. Falta pausa visual entre ideias
8. Ritmo vertical inconsistente

---

## 🧩 PROBLEMA 01 — TIPOGRAFIA FRACA (CRÍTICO)

### Problema
- Headline sem âncora visual
- Corpo muito largo
- Line-height baixo

### Solução
Aplicar hierarquia clara e respiro.

```css
.hero-title {
  font-size: clamp(44px, 4.5vw, 64px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
}

.hero-text {
  font-size: 16px;
  line-height: 1.8;
  max-width: 520px;
}
```

### Prompt executor
Ajuste a tipografia da Hero conforme os valores acima. Não altere textos.

---

## 🧩 PROBLEMA 02 — VÍDEO COMPETINDO (CRÍTICO)

### Solução
Reduzir opacidade e reforçar overlay.

```tsx
<video className="opacity-[0.55]" />
<div className="bg-gradient-to-b from-black/70 via-black/65 to-black/90" />
```

### Prompt executor
Faça o vídeo atuar como atmosfera, não protagonista.

---

## 🧩 PROBLEMA 03 — GRID INVISÍVEL AUSENTE

### Solução
```tsx
<div className="ml-auto pr-[8vw] max-w-[680px] text-right" />
```

---

## 🧩 PROBLEMA 04 — MOTION SEM PAUSA

### Solução
Separar entrada de headline e texto.

```ts
Headline delay: 0
Texto delay: 0.4
```

---

## 🧩 PROBLEMA 05 — KEYWORDS SEM CONTROLE

### Solução
- Máx. 1 keyword por frase
- Peso 600
- Hover apenas muda cor

---

## ✅ CRITÉRIO FINAL DE ACEITE

- Texto domina mais que o vídeo
- Tipografia é protagonista
- Vídeo é atmosfera
- Motion tem pausas
- Nada grita

---

Documento pronto para uso com Copilot / Cursor / Devin.
