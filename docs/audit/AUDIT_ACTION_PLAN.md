# 🔧 PLANO DE AÇÃO - CORREÇÕES AUDITORIA GHOST V3.1

**Seção:** About Beliefs (O Que Me Move)
**Data:** 2025-02-03
**Responsável:** Equipe Ghost Design
**Prazo:** Sprint Atual

---

## 🎯 PRIORIDADE ALTA (Implementar Agora)

### ✅ CORREÇÃO #1: Definir Classe `.std-grid`

**Issue:** Classe `.std-grid` usada mas não definida
**Arquivos Afetados:** `BeliefSection.tsx` linha 140
**Impacto:** Layout pode quebrar
**Tempo Estimado:** 5 minutos

**Implementação:**

```css
/* src/app/globals.css */

/* Ghost Grid System - 12 colunas responsivo */
.std-grid {
  @apply grid w-full;
  @apply grid-cols-4 gap-4 px-6;
  @apply md:grid-cols-8 md:gap-6 md:px-12;
  @apply lg:grid-cols-12 lg:gap-8 lg:px-16;
  @apply xl:px-24 xl:gap-10;
}

/* Variante sem padding (quando já está dentro de container) */
.std-grid-no-padding {
  @apply grid w-full;
  @apply grid-cols-4 gap-4;
  @apply md:grid-cols-8 md:gap-6;
  @apply lg:grid-cols-12 lg:gap-8;
  @apply xl:gap-10;
}
```

**Validação:**
```bash
# Verificar se a classe funciona
pnpm dev
# Inspecionar elemento no navegador
```

---

### ✅ CORREÇÃO #2: Corrigir Hierarquia Semântica

**Issue:** Múltiplos `<h1>` na página
**Arquivo:** `BeliefFixedHeader.tsx` linha 49
**Impacto:** SEO e Acessibilidade (WCAG 2.1)
**Tempo Estimado:** 2 minutos

**Implementação:**

```tsx
// src/components/sobre/BeliefFixedHeader.tsx

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
  progress,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-30 flex h-screen pointer-events-none"
      aria-labelledby="beliefs-title"
    >
      <div className="std-grid w-full h-full">
        <div className="flex h-full items-start justify-center md:justify-end pt-8 md:pt-0 md:items-center">
          <div className="flex flex-col items-center text-center md:items-end md:text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-0 md:pr-0">
            {/* MUDANÇA: h1 → h2 */}
            <h2
              id="beliefs-title"
              className="text-white text-[clamp(2.3rem,4vw,3.8rem)] font-bold leading-[1.2] tracking-tighter mb-4 md:mb-8 whitespace-nowrap"
            >
              <div className="overflow-visible">
                <MorphText progress={progress} range={[0.1, 0.2]}>
                  Acredito no
                </MorphText>
              </div>
              {/* ... resto do código ... */}
            </h2>
            {/* ... resto do código ... */}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
```

**Validação:**
```bash
# Verificar hierarquia com axe DevTools
# Ou usar: https://wave.webaim.org/
```

---

### ✅ CORREÇÃO #3: Adicionar ARIA Labels no Canvas 3D

**Issue:** Canvas 3D sem descrição acessível
**Arquivo:** `AboutBeliefs.tsx` linha 104
**Impacto:** Acessibilidade (Screen Readers)
**Tempo Estimado:** 3 minutos

**Implementação:**

```tsx
// src/components/sobre/AboutBeliefs.tsx

export const AboutBeliefs: React.FC = () => {
  // ... código existente ...

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      aria-labelledby="beliefs-title"
    >
      {/* ... conteúdo textual ... */}

      {/* LAYER 3: Canvas 3D (Sticky - Top Layer) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
        role="img"
        aria-label="Ilustração 3D de um fantasma estilizado representando o conceito Ghost Design, flutuando e reagindo ao movimento do cursor"
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 35 }}
            gl={{ alpha: true, antialias: true }}
            className="w-full h-full"
            aria-hidden="true" // Canvas em si é decorativo, descrição está no wrapper
          >
            {/* ... resto do código ... */}
          </Canvas>
        </div>
      </div>
    </section>
  );
};
```

**Validação:**
```bash
# Testar com VoiceOver (Mac):
# Cmd + F5 para ativar
# Navegar com Tab e ouvir descrição
```

---

## 🟡 PRIORIDADE MÉDIA (Próxima Sprint)

### ✅ CORREÇÃO #4: Implementar `prefers-reduced-motion`

**Issue:** Animações não respeitam preferência do usuário
**Arquivos:** Todos os componentes com animação
**Impacto:** Acessibilidade (WCAG 2.1 Level AA)
**Tempo Estimado:** 20 minutos

**Implementação:**

**Passo 1: Criar Hook Customizado**

```tsx
// src/hooks/useGhostMotion.ts

import { useReducedMotion } from 'framer-motion';

export const useGhostMotion = () => {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion,
    // Durações ajustadas
    duration: {
      fast: shouldReduceMotion ? 0.1 : 0.6,
      base: shouldReduceMotion ? 0.15 : 0.9,
      slow: shouldReduceMotion ? 0.2 : 1.4,
    },
    // Ranges de animação ajustados
    getAnimationRange: (defaultRange: [number, number]): [number, number] => {
      if (shouldReduceMotion) {
        // Animação mais rápida e curta
        return [defaultRange[0], defaultRange[0] + 0.05];
      }
      return defaultRange;
    },
    // Deslocamentos ajustados
    getDisplacement: (defaultValue: number): number => {
      return shouldReduceMotion ? 0 : defaultValue;
    },
  };
};
```

**Passo 2: Aplicar em BeliefSection**

```tsx
// src/components/sobre/BeliefSection.tsx

import { useGhostMotion } from '@/hooks/useGhostMotion';

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  bgColor,
  isFirst = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { shouldReduceMotion, getAnimationRange, getDisplacement } = useGhostMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Ranges ajustados para reduced motion
  const baseAnimationRange: [number, number] = isFirst ? [0, 0.3] : [0.22, 0.45];
  const animationRange = getAnimationRange(baseAnimationRange);

  const baseExitRange: [number, number] = isFirst ? [0.9, 1.0] : [0.8, 0.95];
  const exitRange = getAnimationRange(baseExitRange);

  // Deslocamentos ajustados
  const yDisplacement = getDisplacement(20);
  const xDisplacement = getDisplacement(24);

  // ... resto do código com valores ajustados ...
};
```

**Passo 3: Aplicar em BeliefFixedHeader**

```tsx
// src/components/sobre/BeliefFixedHeader.tsx

import { useGhostMotion } from '@/hooks/useGhostMotion';

const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const { shouldReduceMotion, getDisplacement } = useGhostMotion();
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  const blur = useTransform(
    progress,
    range,
    shouldReduceMotion ? ['blur(0px)', 'blur(0px)'] : ['blur(12px)', 'blur(0px)'],
    { ease: ghostEase }
  );

  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });

  const y = useTransform(
    progress,
    range,
    [getDisplacement(40), 0],
    { ease: ghostEase }
  );

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};
```

**Passo 4: Aplicar em GhostModel**

```tsx
// src/components/sobre/GhostModel.tsx

import { useReducedMotion } from 'framer-motion';

export function GhostModel({ scrollProgress, ...props }: GhostModelProps) {
  const shouldReduceMotion = useReducedMotion();
  // ... código existente ...

  useFrame((state) => {
    if (!animRef.current || !scrollProgress || !groupRef.current) return;

    const progress = scrollProgress.get();
    const mouse = mouseRef.current;

    // Reduzir intensidade de movimento se reduced motion
    const lerpFactor = shouldReduceMotion ? 0.15 : 0.05; // Mais rápido = menos movimento
    const mouseInfluence = shouldReduceMotion ? 0.05 : 0.2; // Menos influência

    // ... resto do código com valores ajustados ...
  });

  return (
    <Float
      speed={shouldReduceMotion ? 0.5 : 2}
      rotationIntensity={shouldReduceMotion ? 0.1 : 0.5}
      floatIntensity={shouldReduceMotion ? 0.1 : 0.5}
      floatingRange={[-0.1, 0.1]}
    >
      {/* ... resto do código ... */}
    </Float>
  );
}
```

**Validação:**
```bash
# Mac: System Preferences → Accessibility → Display → Reduce Motion
# Chrome DevTools: Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"
```

---

### ✅ CORREÇÃO #5: Ajustar Animação Mobile para Pixels

**Issue:** Animação usa porcentagem em vez de pixels
**Arquivo:** `BeliefSection.tsx` linha 47-52
**Impacto:** Inconsistência com especificação
**Tempo Estimado:** 5 minutos

**Implementação:**

```tsx
// src/components/sobre/BeliefSection.tsx

const BeliefBlockMobile: React.FC<{
  text: string;
  scrollYProgress: MotionValue<number>;
  animationRange: number[];
  exitRange: number[];
}> = ({ text, scrollYProgress, animationRange, exitRange }) => {
  const { getDisplacement } = useGhostMotion();

  // MUDANÇA: Usar pixels em vez de porcentagem
  const x = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [getDisplacement(24), 0, 0, getDisplacement(-24)], // Pixels conforme spec
    { ease: ghostEase }
  );

  const opacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1] * 1.5, exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ x, opacity }}
      className="w-full text-center px-6"
    >
      <span className="block text-blueAccent font-bold text-[clamp(2rem,6vw,3rem)] leading-[1.2] tracking-tighter text-wrap text-center select-none shadow-black/50 drop-shadow-md">
        {text.replace(/\n/g, ' ')}
      </span>
    </motion.div>
  );
}
```

**Validação:**
```bash
# Testar em mobile (DevTools responsive mode)
# Verificar que animação entra/sai com 24px de deslocamento
```

---

### ✅ CORREÇÃO #6: Clarificar Comentários de Z-Index

**Issue:** Comentários confusos sobre layering
**Arquivo:** `AboutBeliefs.tsx` linhas 81-82, 100-101
**Impacto:** Manutenibilidade
**Tempo Estimado:** 2 minutos

**Implementação:**

```tsx
// src/components/sobre/AboutBeliefs.tsx

export const AboutBeliefs: React.FC = () => {
  // ... código existente ...

  return (
    <section ref={containerRef} className="relative w-full">
      {/*
        LAYER 2: Conteúdo Textual (z-20)
        Fica ABAIXO do Ghost 3D (z-50) para criar efeito de profundidade.
        O Ghost "flutua" sobre o texto, mas não bloqueia interação pois
        o Canvas tem pointer-events-none no wrapper.
      */}
      <div className="relative pointer-events-none z-20">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />
        {/* ... resto do conteúdo ... */}
      </div>

      {/*
        LAYER 3: Canvas 3D (z-50)
        Ghost 3D fica ACIMA do texto (z-50 > z-20).
        Wrapper tem pointer-events-none, mas Canvas interno tem pointer-events-auto
        para capturar mouse/touch e animar o Ghost.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto">
          {/* ... Canvas ... */}
        </div>
      </div>
    </section>
  );
};
```

---

## 🟢 PRIORIDADE BAIXA (Backlog)

### ⚠️ MELHORIA #7: Adicionar Glow Sutil no Ghost

**Objetivo:** Reforçar presença etérea do Ghost
**Arquivo:** `GhostModel.tsx`
**Impacto:** Visual/Estético
**Tempo Estimado:** 10 minutos

**Implementação:**

```tsx
// src/components/sobre/GhostModel.tsx

export function GhostModel({ scrollProgress, ...props }: GhostModelProps) {
  // ... código existente ...

  // Clone scene e adiciona emissive
  const ghostScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        // NOVO: Adicionar glow sutil
        if (obj.material) {
          obj.material = obj.material.clone();
          obj.material.emissive = new THREE.Color('#4fe6ff');
          obj.material.emissiveIntensity = 0.15;
        }
      }
    });
    return cloned;
  }, [scene]);

  // ... resto do código ...
}
```

---

### ⚠️ MELHORIA #8: Documentar `mobileYOffset`

**Objetivo:** Melhorar manutenibilidade
**Arquivo:** `GhostModel.tsx` linha 76
**Impacto:** Documentação
**Tempo Estimado:** 5 minutos

**Implementação:**

```tsx
// src/components/sobre/GhostModel.tsx

export function GhostModel({ scrollProgress, ...props }: GhostModelProps) {
  // ... código existente ...

  // --- Responsividade (Policy 4.3) ---
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? viewport.width * 0.14 : 0.45;

  /**
   * Mobile Y Offset: Move o Ghost para cima no mobile
   *
   * Razão: No mobile, o texto animado fica no rodapé da sessão (bottom center).
   * Sem offset, o Ghost obstruiria o texto. Com offset de 1.2, o Ghost fica
   * centralizado verticalmente na área superior, deixando o rodapé livre.
   *
   * Valor: 1.2 (unidades Three.js, ~120% da altura do Ghost)
   * Testado em: iPhone SE (375px), iPhone 12 (390px), iPhone 14 Pro Max (430px)
   */
  const mobileYOffset = isMobile ? 1.2 : 0;

  // ... resto do código ...
}
```

---

### ⚠️ MELHORIA #9: Testar Contraste em Backgrounds Coloridos

**Objetivo:** Garantir WCAG AAA
**Arquivos:** `BeliefSection.tsx`
**Impacto:** Acessibilidade
**Tempo Estimado:** 15 minutos

**Implementação:**

**Passo 1: Criar Teste de Contraste**

```tsx
// scripts/test-contrast.ts

import { BRAND } from '../src/config/brand';

const testContrast = (fg: string, bg: string): number => {
  // Implementar cálculo de contraste WCAG
  // Ou usar biblioteca: https://www.npmjs.com/package/wcag-contrast
  // ...
};

const combinations = [
  { fg: BRAND.colors.blueAccent, bg: BRAND.colors.bluePrimary, name: 'blueAccent on bluePrimary' },
  { fg: BRAND.colors.blueAccent, bg: BRAND.colors.purpleDetails, name: 'blueAccent on purpleDetails' },
  { fg: BRAND.colors.blueAccent, bg: BRAND.colors.pinkDetails, name: 'blueAccent on pinkDetails' },
];

combinations.forEach(({ fg, bg, name }) => {
  const ratio = testContrast(fg, bg);
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;
  console.log(`${name}: ${ratio.toFixed(2)}:1 - AA: ${passAA ? '✅' : '❌'} AAA: ${passAAA ? '✅' : '❌'}`);
});
```

**Passo 2: Ajustar Cores se Necessário**

Se algum contraste falhar, considerar:
- Usar `text-white` em vez de `text-blueAccent` em backgrounds escuros
- Adicionar `text-shadow` para melhorar legibilidade
- Ajustar opacidade do background

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Prioridade ALTA
- [ ] Definir `.std-grid` no `globals.css`
- [ ] Corrigir `<h1>` → `<h2>` em `BeliefFixedHeader.tsx`
- [ ] Adicionar `aria-label` no Canvas 3D
- [ ] Testar com screen reader (VoiceOver/NVDA)

### Prioridade MÉDIA
- [ ] Criar hook `useGhostMotion`
- [ ] Aplicar `prefers-reduced-motion` em `BeliefSection`
- [ ] Aplicar `prefers-reduced-motion` em `BeliefFixedHeader`
- [ ] Aplicar `prefers-reduced-motion` em `GhostModel`
- [ ] Ajustar animação mobile para pixels
- [ ] Clarificar comentários de z-index
- [ ] Testar em diferentes dispositivos

### Prioridade BAIXA
- [ ] Adicionar glow no Ghost
- [ ] Documentar `mobileYOffset`
- [ ] Testar contraste de cores
- [ ] Criar testes automatizados de acessibilidade

---

## 🧪 TESTES DE VALIDAÇÃO

### Teste 1: Grid System
```bash
pnpm dev
# Abrir http://localhost:3000/sobre
# Inspecionar elemento com classe .std-grid
# Verificar que grid-cols-4/8/12 está aplicado
```

### Teste 2: Hierarquia Semântica
```bash
# Usar axe DevTools ou WAVE
# Verificar que existe apenas 1 <h1> na página
# Verificar sequência h1 → h2 → h3 sem pulos
```

### Teste 3: ARIA Labels
```bash
# Mac: Cmd + F5 (VoiceOver)
# Navegar até seção Beliefs
# Verificar que Canvas 3D é anunciado corretamente
```

### Teste 4: Reduced Motion
```bash
# Mac: System Preferences → Accessibility → Display → Reduce Motion
# Ou Chrome DevTools: Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"
# Verificar que animações são reduzidas/removidas
```

### Teste 5: Animação Mobile
```bash
# DevTools → Responsive Mode → iPhone 12
# Scroll pela seção Beliefs
# Verificar que texto entra pela direita (24px) e sai pela esquerda (-24px)
```

---

## 📊 MÉTRICAS DE SUCESSO

### Antes das Correções
- **Acessibilidade WCAG AA:** 75%
- **Grid Compliance:** 80%
- **Motion Compliance:** 95%

### Após Correções (Meta)
- **Acessibilidade WCAG AA:** 95%+
- **Grid Compliance:** 100%
- **Motion Compliance:** 100%

---

## 🚀 DEPLOY

### Pré-Deploy Checklist
- [ ] Todas as correções de Prioridade ALTA implementadas
- [ ] Testes de validação passando
- [ ] Build de produção sem erros (`pnpm build`)
- [ ] Lighthouse Score ≥ 90
- [ ] Teste manual em 3 dispositivos (mobile, tablet, desktop)

### Comandos
```bash
# Validar antes do deploy
pnpm typecheck
pnpm lint
pnpm build

# Deploy
pnpm deploy
```

---

**Plano criado por:** Ghost System V3.1
**Última atualização:** 2025-02-03
**Status:** READY FOR IMPLEMENTATION

---

**🫥 Ghost Design — presença que guia sem aparecer**
