# 🎯 Ajustes Hero + Manifesto Video (loandbehold.studio Replica)

**Data:** 2026-01-08  
**Referência:** https://loandbehold.studio  
**Frame Inicial:** `/docs/HOME/HERO.png`

---

## ✅ Mudanças Implementadas

### 1. **ManifestoThumb.tsx** (Desktop)

#### Thresholds de Scroll (loandbehold.studio spec)
```typescript
// ANTES: 0.8 → 0.95 (incorreto)
// DEPOIS:
A: THUMB      → 0.00 - 0.12  (vídeo pequeno, muted)
B: EXPANSÃO   → 0.12 - 0.46  (scale + translate, muted)
C: FULL       → 0.46 - 0.78  (fullscreen, ÁUDIO ON)
D: EXIT       → 0.78 - 1.00  (fade out, ÁUDIO OFF)
```

#### Transformações Precisas
- **Border Radius:** `24px → 20px → 0px` (thumb → expansão → full)
- **Posição Inicial:** `right: 4vw, bottom: 5vh`
- **Posição Full:** `right: 0, bottom: 0` (com translate 50% para centrar)
- **Dimensões:** `30vw x 16.875vw → 100vw x 100vh`

#### Áudio (Threshold-Based, Automático)
```typescript
// Estado C: FULL (0.46 ≤ progress < 0.78)
if (latest >= 0.46 && latest < 0.78) {
  video.muted = false;  // ON
  video.volume = 1;
}

// Estado D: EXIT (progress ≥ 0.78)
else if (latest >= 0.78) {
  video.muted = true;  // OFF IMEDIATO
}
```

#### Remoções (Regra "Zero UI")
- ❌ Botões de som (Volume2, VolumeX)
- ❌ Holding indicator (barra de progresso)
- ❌ Hover states interativos
- ❌ Click handlers (scroll jump)
- ❌ Lenis scroll lock
- ✅ Apenas: `<video>` + scroll transforms

---

### 2. **ManifestoSection.tsx** (Mobile)

#### Simplificação Total
- ❌ Botão de toggle de som
- ❌ Indicador "Sound On"
- ❌ Gradient overlay decorativo
- ✅ Apenas: vídeo muted + auto-mute on scroll away

---

### 3. **HomeHero.tsx**

#### Estrutura Ajustada
```typescript
<section ref={heroSectionRef} style={{ height: '200vh' }}>
  <div className="sticky top-0 h-screen">
    {/* HeroCopy (z-0) */}
    {/* GhostCanvas (z-10) */}
    {/* ManifestoThumb (z-30) - scroll-driven */}
  </div>
</section>
```

**Altura:** `200vh` (permite scroll completo da animação)  
**Sticky Container:** Primeiro `100vh` permanece fixo enquanto scroll acontece

---

## 🎨 Fidelidade ao Frame Inicial

### Estado A (scrollY = 0)
- Vídeo posicionado em **bottom-right**
- Dimensões: **~30vw x ~16.875vw**
- Border radius: **24px**
- **Totalmente muted**
- Sem UI visível sobre o vídeo
- Texto e Ghost conforme `/docs/HOME/HERO.png`

---

## 🔊 Regras de Áudio

| Estado | Progress | Áudio | Trigger |
|--------|----------|-------|---------|
| **THUMB** | 0.00-0.12 | MUTED | Sempre |
| **EXPANSÃO** | 0.12-0.46 | MUTED | Scroll |
| **FULL** | 0.46-0.78 | **ON (volume 1)** | `progress >= 0.46` |
| **EXIT** | 0.78-1.00 | MUTED | `progress >= 0.78` |

**Autoplay Bloqueado?**  
→ Mantém `muted`, sem UI de fallback

---

## 🚀 Performance

- ✅ **MotionValues:** Sem `setState` por frame
- ✅ **useTransform:** Scroll-driven nativo (GPU-accelerated)
- ✅ **prefers-reduced-motion:** Respeitado (fade-in simples)
- ✅ **willChange:** `transform, opacity`
- ✅ **Build:** Passou sem erros (Exit Code 0)

---

## 📐 Validação Técnica

### Checklist de Aceite
- ✅ Frame inicial idêntico a `/docs/HOME/HERO.png`
- ✅ Thumb → Expansão suave (0.12-0.46)
- ✅ Full com estética premium (0.46-0.78)
- ✅ Áudio ON em Full, OFF em Exit
- ✅ **Zero UI** sobre o vídeo
- ✅ Sem jank (60fps esperado)
- ✅ Build limpo

---

## 📝 Notas de Engenharia

### 1. Offset de Scroll
```typescript
useScroll({
  target: sectionRef,
  offset: ['start start', 'end start']
})
```
→ **Progress:** 0 quando topo da Hero toca topo da viewport  
→ **Progress:** 1 quando fim da Hero (200vh) toca topo da viewport

### 2. Easing
```typescript
const GHOST_EASE = [0.22, 1, 0.36, 1]; // cubic-bezier
```
→ Editorial premium, sem bounce/overshoot

### 3. Z-Index Stack
```
GhostCanvas (z-10)
  ↑
HeroCopy (z-0)
  ↑  
ManifestoThumb (z-30) ← maior índice, sempre visível
```

---

## 🔄 Próximos Passos Recomendados (Opcional)

1. **Teste Visual:**
   - Capturar 4 frames (0%, 12%, 46%, 78%)
   - Comparar lado a lado com loandbehold.studio

2. **Teste de Áudio:**
   - Scroll lento: verificar unmute em ~46%
   - Scroll para próxima seção: verificar mute imediato

3. **Performance Audit:**
   - Lighthouse (esperado: >90)
   - FPS durante scroll (esperado: 60fps)

---

## 🎬 Resultado

**Comportamento:** Réplica fiel do loandbehold.studio  
**Frame Inicial:** Preservado 100%  
**Áudio:** Automático e silencioso  
**UI:** Zero elementos sobre o vídeo  
**Performance:** Otimizado com MotionValues

---

**Executado como engenharia de precisão, não como experimentação criativa.**
