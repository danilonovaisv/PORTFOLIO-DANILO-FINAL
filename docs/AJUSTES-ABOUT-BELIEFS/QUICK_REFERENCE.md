# Quick Reference - About Beliefs

Referência rápida para consulta durante desenvolvimento.

---

## 🎯 Diferenças Mobile vs Desktop

| Aspecto | Mobile (<768px) | Desktop (>768px) |
|---------|----------------|------------------|
| **Header Position** | Sticky top-right | Sticky centro + direita |
| **Texto Rotativo** | Rodapé, centralizado | Esquerda, inline |
| **Animação Texto** | Horizontal (x: ±24) | Vertical (y: ±20) |
| **Direção Entrada** | Da direita (x: +24 → 0) | De baixo (y: 20 → 0) |
| **Direção Saída** | Para esquerda (x: 0 → -24) | Para cima (y: 0 → -20) |
| **Ghost Position** | Esquerda | Direita |
| **Texto Position** | Direita (rodapé) | Esquerda (inline) |
| **Ghost Size** | 200-240px | 320-380px |
| **Interações** | Scroll-based | Hover + Scroll |
| **Quebra de linha** | Só quando necessário | Forçada (\n) |

---

## 🎨 Cores e Backgrounds

| Frase | Background Color | Hex Code |
|-------|-----------------|----------|
| Frase 1 | bluePrimary | #0048ff |
| Frase 2 | purpleDetails | #8705f2 |
| Frase 3 | pinkDetails | #f501d3 |
| Frase 4 | bluePrimary | #0048ff |
| Frase 5 | purpleDetails | #8705f2 |
| Frase 6 | pinkDetails | #f501d3 |
| Final | bluePrimary | #0048ff |

---

## 📐 Breakpoints

| Breakpoint | Range | Ghost Size | Tipografia |
|------------|-------|------------|------------|
| Small | <360px | 180-200px | Reduzida |
| Mobile | <768px | 200-240px | 22-26px |
| Tablet | 768-1024px | 220-260px | Intermediária |
| Desktop | >1024px | 320-380px | 32-38px |
| Large | >1440px | 320-380px | Máxima |

---

## 🎬 Animações - Valores Exatos

### Mobile (Horizontal)

| Propriedade | Entrada | Permanência | Saída |
|-------------|---------|-------------|-------|
| **x** | +24 → 0 | 0 | 0 → -24 |
| **y** | - | - | - |
| **opacity** | 0 → 1 | 1 | 1 → 0 |
| **blur** | 10px → 0 | 0 | 0 → 10px |
| **duration** | ~1s | ~4s | ~1s |

### Desktop (Vertical)

| Propriedade | Entrada | Permanência | Saída |
|-------------|---------|-------------|-------|
| **x** | - | - | - |
| **y** | 20 → 0 | 0 | 0 → -20 |
| **opacity** | 0 → 1 | 1 | 1 → 0 |
| **blur** | 10px → 0 | 0 | 0 → 10px |
| **duration** | ~1s | ~4s | ~1s |

---

## 👻 Ghost 3D - Comportamento por Scroll

| Scroll Progress | Escala | Wobble | Rotação | Movimento |
|-----------------|--------|--------|---------|-----------|
| 0% - 20% | 1.0 | Baixo | Lenta | Início curva |
| 20% - 40% | 1.0 | Médio | Normal | Meio curva |
| 40% - 60% | 1.0 | Médio | Normal | Meio curva |
| 60% - 80% | 1.0 | Médio | Normal | Fim curva |
| 80% - 100% | 1.0 → 1.1 | Alto | Rápida | Aproxima Z |

---

## 📊 Scroll Progress Timeline

| Progress | Evento | Componente |
|----------|--------|------------|
| 0.00-0.05 | Fade in inicial | Container |
| 0.05-0.12 | Header aparece | BeliefFixedHeader |
| 0.10-0.25 | Frase 1 | BeliefSection |
| 0.25-0.40 | Frase 2 | BeliefSection |
| 0.40-0.55 | Frase 3 | BeliefSection |
| 0.55-0.70 | Frase 4 | BeliefSection |
| 0.70-0.80 | Frase 5 | BeliefSection |
| 0.80-0.95 | Frase 6 + Ghost boost | BeliefSection + GhostModel |
| 0.85-0.95 | Header fade out | BeliefFixedHeader |
| 0.95-1.00 | Manifesto final | BeliefFinalSectionOverlay |

---

## 🎯 Classes Tailwind - Cheat Sheet

### Containers

```typescript
// Grid padrão
"std-grid max-w-none w-full"

// Padding responsivo
"px-6 md:px-12 lg:px-16 xl:px-24"

// Gap generoso
"gap-12"
```

### Texto Rotativo

```typescript
// Mobile
"text-blueAccent italic font-semibold text-[clamp(2rem,7vw,3rem)] leading-[1.15] tracking-[-0.01em] text-center select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]"

// Desktop
"text-blueAccent italic font-semibold text-[clamp(2.75rem,4.5vw,2.5rem)] leading-[1.2] text-left whitespace-pre-line select-none tracking-[-0.01em] max-w-fit"
```

### Header

```typescript
// Container
"sticky top-0 z-30 flex h-screen pointer-events-none"

// Título
"text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tighter mb-4 md:mb-8 uppercase font-black mix-blend-difference whitespace-nowrap"
```

### Manifesto Final

```typescript
// Container
"flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"

// Linha 1 e 3
"tracking-tighter uppercase font-black mix-blend-overlay opacity-80"

// Linha 2 (GHOST)
"font-black tracking-tighter uppercase relative z-10 text-bluePrimary"
```

---

## 🔧 Constantes Importantes

```typescript
// Easing padrão
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

// URL do GLB
const GHOST_GLB_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb';

// Frases
const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

// Cores
const COLORS = [
  BRAND.colors.bluePrimary,    // #0048ff
  BRAND.colors.purpleDetails,  // #8705f2
  BRAND.colors.pinkDetails,    // #f501d3
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];
```

---

## 📱 Detecção de Mobile

```typescript
// Hook
const isMobile = useIsMobile();

// Implementação
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};
```

---

## 🎨 Z-Index Layers

| Layer | Z-Index | Componente | Descrição |
|-------|---------|------------|-----------|
| 1 | z-10 | Backgrounds | Seções coloridas |
| 2 | z-30 | Header | BeliefFixedHeader sticky |
| 3 | z-40 | Texto Mobile | BeliefMobileTextLayer |
| 4 | z-40 | Manifesto | BeliefFinalSectionOverlay |
| 5 | z-50 | Canvas 3D | GhostScene (top layer) |

---

## 🚀 Performance Checklist

| Item | Status | Prioridade |
|------|--------|------------|
| GLB Preload | ✅ | Alta |
| Suspense Boundary | ✅ | Alta |
| Error Boundary | ✅ | Alta |
| Responsive Scale | ✅ | Média |
| LERP Smoothing | ✅ | Média |
| Easing Consistente | ✅ | Média |
| Fallback WebGL | ⚠️ | Baixa |
| Loading State | ⚠️ | Baixa |
| Lazy Loading | ⚠️ | Baixa |

---

## 📂 Arquivos por Responsabilidade

| Responsabilidade | Arquivo | Localização |
|------------------|---------|-------------|
| Orquestração | AboutBeliefs.tsx | src/components/sobre/sections/ |
| Header Sticky | BeliefFixedHeader.tsx | src/components/sobre/beliefs/ |
| Frases Desktop | BeliefSection.tsx | src/components/sobre/beliefs/ |
| Frases Mobile | BeliefSection.tsx | src/components/sobre/beliefs/ |
| Background Final | BeliefFinalSection.tsx | src/components/sobre/beliefs/ |
| Manifesto Final | BeliefFinalSectionOverlay.tsx | src/components/sobre/beliefs/ |
| Modelo 3D | GhostModel.tsx | src/components/sobre/3d/ |
| Cena 3D | GhostScene.tsx | src/components/sobre/3d/ |

---

## 🎯 Props Principais

### AboutBeliefs
```typescript
// Sem props (componente raiz)
```

### BeliefFixedHeader
```typescript
interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}
```

### BeliefSection
```typescript
interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
}
```

### BeliefMobileTextLayer
```typescript
interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress: MotionValue<number>;
}
```

### GhostModel
```typescript
interface GhostModelProps {
  scrollProgress: MotionValue<number>;
}
```

### GhostScene
```typescript
interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}
```

---

## 🔍 Debugging Tips

| Problema | Solução | Arquivo |
|----------|---------|---------|
| Texto não anima mobile | Verificar `useIsMobile()` | BeliefSection.tsx |
| Ghost não alinha | Verificar container flex/grid | AboutBeliefs.tsx |
| Background não muda | Verificar COLORS array | AboutBeliefs.tsx |
| GLB não carrega | Verificar URL Supabase | GhostModel.tsx |
| Scroll não funciona | Verificar scrollYProgress | AboutBeliefs.tsx |
| Header não sticky | Verificar position: sticky | BeliefFixedHeader.tsx |

---

## 📊 Métricas de Sucesso

| Métrica | Alvo | Como Medir |
|---------|------|------------|
| FPS | >60 | Chrome DevTools Performance |
| GLB Load Time | <2s | Network tab |
| Scroll Smoothness | Sem jank | Visual + Performance tab |
| Mobile Responsiveness | 100% | Teste em dispositivos reais |
| Acessibilidade | AA/AAA | Lighthouse |

---

## 🎨 Efeitos Visuais

| Efeito | Onde | Valores |
|--------|------|---------|
| Blur | Entrada/Saída texto | 0-10px |
| Drop Shadow | Texto mobile | rgba(79,230,255,0.25) |
| Mix Blend | Manifesto linhas 1,3 | overlay |
| Opacity | Manifesto linhas 1,3 | 0.8 |
| Glow | Textos bluePrimary | Micro sublinhado |

---

## 🔗 Links Úteis

| Recurso | Link |
|---------|------|
| Supabase Storage | https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/ |
| GLB Asset | .../about/beliefs/ghost-transformed.glb |
| Framer Motion Docs | https://www.framer.com/motion/ |
| R3F Docs | https://docs.pmnd.rs/react-three-fiber/ |
| Drei Docs | https://github.com/pmndrs/drei |

---

## ✅ Checklist Rápido

### Antes de Commitar:
- [ ] Testado em mobile (<768px)
- [ ] Testado em desktop (>1024px)
- [ ] Animações suaves (60fps)
- [ ] Ghost alinhado com texto
- [ ] Backgrounds mudando corretamente
- [ ] Header sticky funcionando
- [ ] Manifesto final aparecendo
- [ ] GLB carregando do Supabase
- [ ] Sem erros no console
- [ ] Acessibilidade validada

---

**Versão:** 1.0
**Última atualização:** 2025
**Uso:** Consulta rápida durante desenvolvimento
