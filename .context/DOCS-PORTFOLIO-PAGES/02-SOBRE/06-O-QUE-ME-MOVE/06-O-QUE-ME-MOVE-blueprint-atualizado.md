# Blueprint técnico, 06 O QUE ME MOVE

## Critério de sucesso

Atualizar a sessão `06 O QUE ME MOVE` da página `/sobre` para uma versão coerente com a referência Motion `scroll-triggered`, preservando identidade visual, paleta, tipografia, espaçamentos, copy, hierarquia de camadas e conceito do Ghost 3D. A correção deve concentrar-se na camada cinética: background por capítulos de scroll, frases principais entrando da esquerda, split-text apenas no header fixo e no manifesto final, Ghost 3D independente e performático.

## 1. Escopo analisado

### Página atual

A página publicada em `https://portfoliodanilo.com/sobre` contém a sessão com o bloco editorial:

```txt
Acredito no
design que
muda o dia
de alguém.

Não pelo choque,
mas pela conexão.

Um vídeo que respira.
Uma marca que se reconhece.
Um detalhe que fica.
Crio para gerar presença.
Mesmo quando não estou ali.
Mesmo quando ninguém percebe o esforço.

ISSO É
GHOST
DESIGN
```

O HTML renderizado confirma a presença da narrativa, das seis frases principais e do manifesto final, mas não expõe com segurança os nomes dos componentes internos, a timeline real, o modelo 3D ou a implementação Motion/Three.js. Portanto, este blueprint trata a implementação atual como parcialmente observável pela página publicada e parcialmente inferida a partir do documento `06-O-QUE-ME-MOVE-v5-referencia-motion.md`.

### Referências usadas

1. Motion scroll-triggered: entrada por `inView()` e `animate()`, com `opacity: 1`, `x: [-100, 0]`, `duration: 0.9` e `easing: [0.17, 0.55, 0.55, 1]`.
2. Tutorial Motion: confirma que o padrão correto é detectar entrada no viewport com `inView()` e animar o elemento com `animate()`, incluindo cleanup quando sai da viewport.
3. Drinksom: referência de atmosfera 3D editorial, objeto central com presença física, movimento sutil, camadas sobrepostas e relação com scroll.
4. ReactBits Split Text: referência conceitual para dividir texto em palavras ou caracteres, mas deve ser aplicada com parcimônia.
5. Arquivo v5 anexado: base técnica para tokens, arquitetura, z-index, scroll contract, componentes e checklist.

### Limitação importante

O arquivo local `anima.mov` não foi acessível por estar em um caminho local do computador do usuário. O blueprint abaixo assume que o vídeo esperado reforça a direção descrita: background cromático por capítulos, frases entrando horizontalmente, Ghost no centro da cena e manifesto final com impacto. Para uma calibração visual milimétrica, o vídeo precisa ser anexado diretamente ao chat ou exportado como frames.

## 2. Diagnóstico da implementação atual

### O que já está correto

A sessão publicada já possui a estrutura narrativa certa. A sequência editorial cria progressão clara: crença inicial, frases de prova, manifesto final. A copy exibida na página corresponde ao conjunto de frases que deve ser animado, então não há necessidade de reescrever conteúdo.

A direção full-bleed também é adequada para a intenção da sessão. Este bloco não deve ser tratado como conteúdo comum de grid. Ele precisa funcionar como uma cena própria, com altura narrativa maior que a viewport, camadas sticky/fixed e coreografia controlada por scroll.

A presença do manifesto `ISSO É / GHOST / DESIGN` no final confirma que a sessão já tem um clímax textual definido. O Ghost 3D deve existir para amplificar esse clímax, não para competir com cada frase.

### Problemas técnicos prováveis

A principal inconsistência está na mistura de paradigmas de animação. A referência Motion é simples e direta: cada frase entra quando toca o viewport, vindo da esquerda, e volta ao estado oculto no cleanup. Se a implementação atual usa `y`, blur, stagger nas frases principais, CSS keyframes, scrub contínuo ou transições CSS de background, ela se afasta do comportamento de referência.

Outro risco é o background ser implementado como múltiplas camadas com fade ou `transition: background-color`. Isso torna a coreografia mais pesada e menos fiel ao padrão Motion. A solução recomendada é uma única camada cromática, alterada por `animate()` quando cada capítulo entra no viewport.

A terceira fragilidade provável é aplicar split-text em excesso. Split Text deve ser reservado para `BeliefFixedHeader` e `BeliefManifesto`. As frases principais precisam animar como bloco inteiro, porque a referência não usa palavras ou caracteres individuais no texto principal.

No Ghost 3D, o risco técnico não está no conceito, mas no custo. Se o canvas renderiza continuamente em `frameloop="always"`, se o DPR é alto no mobile, se há parallax de cursor em telas touch ou se faltam fallback e error boundary, a sessão pode derrubar FPS justamente no momento em que deveria parecer premium.

## 3. Decisão de stack

A stack recomendada permanece:

```txt
Next.js App Router
React + TypeScript
Tailwind CSS
Motion for React
Motion DOM
React Three Fiber
drei
three.js
```

Não usar GSAP nesta sessão. A referência principal não exige pinning complexo, scrub narrativo ou timeline global. O movimento base é viewport-triggered, e Motion resolve isso com menor superfície de código. GSAP seria justificável se a intenção mudasse para uma narrativa com pinning, scrub e sequências longas dependentes do scroll, o que conflitaria com o comportamento extraído.

## 4. Arquitetura de arquivos

```txt
app/
  sobre/
    page.tsx
    loading.tsx
    error.tsx
    not-found.tsx

src/
  components/
    sobre/
      sections/
        AboutBeliefs.tsx
      beliefs/
        BeliefsScrollContext.tsx
        BeliefBackground.tsx
        BeliefOverlay.tsx
        BeliefFixedHeader.tsx
        BeliefScrollText.tsx
        BeliefManifesto.tsx
        SplitTextMotion.tsx
      3d/
        GhostScene.tsx
        GhostModel.tsx
        GhostSceneFallback.tsx
        GhostErrorBoundary.tsx

  config/
    beliefTokens.ts

  hooks/
    useBeliefsScroll.ts
    useMediaQuery.ts
    usePointerParallax.ts

  types/
    beliefs.ts
```

`AboutBeliefs` deve apenas orquestrar camadas. Lógica pesada de animação, detecção de viewport, split text e canvas deve permanecer nos componentes dedicados.

## 5. Tokens finais

Criar ou atualizar `src/config/beliefTokens.ts`.

```ts
export const beliefColors = {
  deepVoid: '#040013',
  bluePrimary: '#0048ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  blueAccent: '#4fe6ff',
  white: '#ffffff',
} as const;

export const beliefBackgroundStops = [
  beliefColors.deepVoid,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.deepVoid,
] as const;

export const beliefZIndex = {
  background: 0,
  overlay: 10,
  fixedHeader: 30,
  scrollText: 40,
  manifesto: 50,
  ghost: 70,
} as const;

export const beliefMotion = {
  referenceEase: [0.17, 0.55, 0.55, 1],
  ghostEase: [0.22, 1, 0.36, 1],
  softEase: [0.16, 1, 0.3, 1],
  textRevealDuration: 0.9,
  textExitDuration: 0.32,
  backgroundDuration: 0.9,
  headerDuration: 0.8,
  headerExitDuration: 0.5,
  ghostIntroDuration: 1.2,
  wordStagger: 0.08,
  manifestoStagger: 0.06,
} as const;

export const beliefLayout = {
  sectionMinHeight: '620vh',
  phraseSectionHeight: '80vh',
  desktopPhraseMaxWidth: '38vw',
  desktopPhraseLeft: 'clamp(1.5rem, 6vw, 6rem)',
  mobilePhraseBottom: '20vh',
} as const;
```

## 6. Contrato de scroll

Criar `src/hooks/useBeliefsScroll.ts`.

```tsx
'use client';

import { RefObject, useEffect, useState } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';

export function useBeliefsScroll(containerRef: RefObject<HTMLElement | null>) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
  };
}
```

Criar `BeliefsScrollContext.tsx`.

```tsx
'use client';

import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
} from 'react';
import { MotionValue } from 'motion/react';

type BeliefsScrollContextValue = {
  containerRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};

const BeliefsScrollContext =
  createContext<BeliefsScrollContextValue | null>(null);

export function BeliefsScrollProvider({
  value,
  children,
}: {
  value: BeliefsScrollContextValue;
  children: ReactNode;
}) {
  return (
    <BeliefsScrollContext.Provider value={value}>
      {children}
    </BeliefsScrollContext.Provider>
  );
}

export function useBeliefsScrollContext() {
  const context = useContext(BeliefsScrollContext);

  if (!context) {
    throw new Error(
      'useBeliefsScrollContext must be used inside BeliefsScrollProvider'
    );
  }

  return context;
}
```

## 7. AboutBeliefs

```tsx
'use client';

import { Suspense, useRef } from 'react';
import { BeliefsScrollProvider } from '../beliefs/BeliefsScrollContext';
import { BeliefBackground } from '../beliefs/BeliefBackground';
import { BeliefOverlay } from '../beliefs/BeliefOverlay';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefScrollText } from '../beliefs/BeliefScrollText';
import { BeliefManifesto } from '../beliefs/BeliefManifesto';
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary';
import { GhostSceneFallback } from '../3d/GhostSceneFallback';
import { GhostScene } from '../3d/GhostScene';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement | null>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider value={{ containerRef, ...scroll }}>
      <section
        ref={containerRef}
        id="o-que-me-move"
        aria-labelledby="o-que-me-move-title"
        className="relative min-h-[620vh] overflow-clip bg-[#040013] text-white"
      >
        <h2 id="o-que-me-move-title" className="sr-only">
          O que me move
        </h2>

        <BeliefBackground />
        <BeliefOverlay />

        <div className="sticky top-0 h-dvh">
          <BeliefFixedHeader />

          <GhostErrorBoundary fallback={<GhostSceneFallback />}>
            <Suspense fallback={<GhostSceneFallback />}>
              <GhostScene />
            </Suspense>
          </GhostErrorBoundary>

          <BeliefManifesto />
        </div>

        <BeliefScrollText />
      </section>
    </BeliefsScrollProvider>
  );
}
```

## 8. BeliefBackground

### Comportamento

O background deve trocar de cor quando cada frase entra no viewport. A implementação correta é uma única camada cromática em `z-0`, controlada por `inView()` e `animate()`. Não usar CSS transition, não usar fade entre divs, não usar gradiente animado e não usar timeline global.

```tsx
'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import {
  beliefBackgroundStops,
  beliefMotion,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current) return;

    const stop = inView(
      '#o-que-me-move [data-belief-section]',
      (element) => {
        const index = Number.parseInt(
          element.getAttribute('data-index') ?? '0',
          10
        );

        const color =
          beliefBackgroundStops[
            Math.min(index + 1, beliefBackgroundStops.length - 1)
          ];

        if (shouldReduceMotion) {
          ref.current!.style.backgroundColor = color;
          return;
        }

        const controls = animate(
          ref.current!,
          { backgroundColor: color },
          {
            duration: beliefMotion.backgroundDuration,
            ease: beliefMotion.referenceEase,
          }
        );

        return () => controls.stop();
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-0 bg-[#040013]"
    />
  );
}
```

### Nota de performance

`backgroundColor` não é composite-only, mas aqui é aceitável como exceção controlada porque a troca acontece em uma única camada e em eventos discretos de viewport. O restante das animações deve permanecer em `transform` e `opacity`.

## 9. BeliefOverlay

```tsx
'use client';

import { motion, useTransform } from 'motion/react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0.04, 0.08, 0.1, 0.08, 0.04]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 bg-black"
      style={{ opacity: shouldReduceMotion ? 0.06 : opacity }}
    />
  );
}
```

## 10. BeliefScrollText

### Regra cinética

As frases principais devem seguir a referência Motion:

```txt
Initial: opacity 0, x -100
Enter: opacity 1, x 0
Exit: opacity 0, x -100
Duration: 0.9s
Ease: [0.17, 0.55, 0.55, 1]
Trigger: inView()
Viewport amount: 0.55
```

No mobile, usar `x: -48 -> 0` para ergonomia, mantendo a direção da esquerda para a posição neutra.

### Frases

```ts
const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;
```

### Implementação recomendada

```tsx
'use client';

import { animate, inView } from 'motion';
import { useEffect } from 'react';
import { beliefMotion } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

export function BeliefScrollText() {
  const { shouldReduceMotion, isMobile } = useBeliefsScrollContext();

  useEffect(() => {
    const stop = inView(
      '#o-que-me-move [data-belief-phrase]',
      (element) => {
        const enterX = shouldReduceMotion ? 0 : isMobile ? -48 : -100;

        if (shouldReduceMotion) {
          const controls = animate(
            element,
            { opacity: 1, x: 0 },
            { duration: 0.16, ease: 'ease-out' }
          );

          return () => controls.stop();
        }

        const enterControls = animate(
          element,
          { opacity: 1, x: [enterX, 0] },
          {
            duration: beliefMotion.textRevealDuration,
            ease: beliefMotion.referenceEase,
          }
        );

        return () => {
          enterControls.stop();

          animate(
            element,
            { opacity: 0, x: enterX },
            {
              duration: beliefMotion.textExitDuration,
              ease: beliefMotion.referenceEase,
            }
          );
        };
      },
      { amount: 0.55 }
    );

    return () => stop();
  }, [isMobile, shouldReduceMotion]);

  return (
    <div className="relative z-40">
      {BELIEF_PHRASES.map((phrase, index) => (
        <section
          key={phrase}
          data-belief-section
          data-index={index}
          className="relative flex h-[80vh] items-center"
        >
          <div className="pointer-events-none ml-[clamp(1.5rem,6vw,6rem)] max-w-[38vw] max-md:fixed max-md:bottom-[20vh] max-md:left-1/2 max-md:ml-0 max-md:w-[min(86vw,28rem)] max-md:-translate-x-1/2">
            <p
              data-belief-phrase
              className="select-none text-left font-h1 text-[clamp(2.8rem,5.8vw,6.3rem)] font-bold italic leading-[1.05] tracking-[-0.03em] text-[#4fe6ff] opacity-0 will-change-transform max-md:text-center max-md:text-[clamp(2rem,8vw,3rem)]"
            >
              {phrase}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
```

### Detalhe crítico

No mobile, o wrapper usa `left-1/2` e `-translate-x-1/2`. Por isso, a animação deve acontecer no `p` interno, não no wrapper. Caso contrário, a animação Motion pode sobrescrever o transform de centralização.

## 11. SplitTextMotion

Usar apenas para `BeliefFixedHeader` e `BeliefManifesto`.

```tsx
'use client';

import { motion, Variants } from 'motion/react';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import { beliefMotion } from '@/config/beliefTokens';

type SplitTextMotionProps<T extends ElementType> = {
  as?: T;
  text: string;
  active?: boolean;
  mode?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function SplitTextMotion<T extends ElementType = 'span'>({
  as,
  text,
  active = true,
  mode = 'words',
  stagger = beliefMotion.wordStagger,
  delay = 0,
  className,
  ...props
}: SplitTextMotionProps<T>) {
  const Component = motion(as ?? 'span');
  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  return (
    <Component
      className={className}
      aria-label={text}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      {...props}
    >
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          aria-hidden="true"
          variants={itemVariants}
          transition={{
            duration: 0.42,
            ease: beliefMotion.softEase,
          }}
          className="inline-block"
        >
          {unit}
          {mode === 'words' && index < units.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </Component>
  );
}
```

## 12. BeliefFixedHeader

### Comportamento

O header editorial pode usar split por palavras. Ele é uma âncora de contexto, não a frase principal da referência.

```txt
Container:
opacity 0 -> 1
x 60 -> 0
duration 0.8
ease [0.22, 1, 0.36, 1]

Words:
opacity 0 -> 1
y 12 -> 0
stagger 0.08
```

### Regras

Não usar split por caracteres no header. Palavras ou linhas preservam leitura e reduzem ruído visual. Sincronizar a entrada com o início da sessão ou com `scrollYProgress` próximo de `0.04`.

## 13. BeliefManifesto

### Comportamento

O manifesto entra no clímax, entre `scrollYProgress` `0.82` e `0.92`. Ele pode usar split por palavras ou por linha, mas deve permanecer legível.

```tsx
'use client';

import { motion, useTransform } from 'motion/react';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);

  return (
    <motion.div
      aria-hidden={!shouldReduceMotion ? undefined : false}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 text-center"
      style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }}
    >
      <div className="font-display text-[clamp(3.5rem,16vw,12rem)] font-black uppercase leading-[0.82] tracking-[0.03em] text-white">
        {['ISSO É', 'GHOST', 'DESIGN'].map((line, index) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            stagger={0.06}
            delay={index * 0.04}
            className="block"
          />
        ))}
      </div>
    </motion.div>
  );
}
```

### Acessibilidade

Evitar `aria-live` permanente em texto oculto. Se for necessário anunciar o manifesto, controlar o anúncio por um estado booleano derivado do progresso, nunca por render invisível constante.

## 14. Ghost 3D

### Papel visual

O Ghost funciona como presença simbólica e camada de assinatura. Ele deve ser inspirado no comportamento premium de objeto 3D editorial: flutuação leve, resposta sutil ao cursor no desktop, material com profundidade, centralização no clímax e escala levemente maior no final.

### Regras técnicas

```txt
z-index: 70
pointer-events: none
frameloop: demand
DPR desktop: [1, 1.5]
DPR mobile: [1, 1.2]
cursor parallax: desktop only
floating: disabled in reduced motion
climax: scrollYProgress > 0.85
climax transform: centered, scale +10%
fallback: required
error boundary: required
```

### Pseudocódigo de cena

```tsx
<Canvas
  frameloop="demand"
  dpr={isMobile ? [1, 1.2] : [1, 1.5]}
  gl={{
    antialias: !isMobile,
    alpha: true,
    powerPreference: 'high-performance',
  }}
>
  <ambientLight intensity={0.7} />
  <directionalLight position={[2, 3, 4]} intensity={1.2} />
  <Suspense fallback={null}>
    <GhostModel
      scrollProgress={scrollYProgress}
      pointerEnabled={!isMobile && !shouldReduceMotion}
      floatingEnabled={!shouldReduceMotion}
    />
  </Suspense>
</Canvas>
```

### Fallback

```tsx
export function GhostSceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
```

## 15. Estados e fluxo

### Estado inicial da sessão

```txt
background: #040013
overlay: opacity baixa
header: oculto ou entrando de forma discreta
frases: opacity 0, x -100
ghost: opacity 0, scale 0.95
manifesto: opacity 0
```

### Durante as frases

```txt
cada data-belief-section entra no viewport
background muda para o stop correspondente
frase entra como bloco inteiro
frase sai para opacity 0 e x negativo no cleanup
ghost mantém presença central e flutuação leve
```

### Clímax

```txt
scrollYProgress > 0.82
manifesto aparece
scrollYProgress > 0.85
ghost centraliza e escala +10%
ghost fica acima do manifesto
```

### Reduced motion

```txt
frases: fade simples sem deslocamento
background: troca imediata
ghost: sem floating e sem parallax
manifesto: estado estático ou fade curto
sem flashes, sem loop visual intenso
```

## 16. Guia de ajustes da implementação atual

| Prioridade | Área | Problema | Solução recomendada | Complexidade |
|---|---|---|---|---|
| Alta | `BeliefScrollText` | Frases principais provavelmente usam `y`, blur, stagger ou lógica diferente da referência. | Substituir por `inView()` + `animate()` com `opacity 0 -> 1`, `x -100 -> 0`, `duration 0.9`, `ease [0.17, 0.55, 0.55, 1]`. | Média |
| Alta | `BeliefBackground` | Background pode estar com CSS transition, gradiente animado ou múltiplas camadas em fade. | Usar uma única camada em `z-0`, alterada por `animate()` ao entrar cada `[data-belief-section]`. | Média |
| Alta | Mobile transform | Centralização por `-translate-x-1/2` pode conflitar com animação `x`. | Separar wrapper de posicionamento e filho animado. Animar somente o `p` interno. | Baixa |
| Alta | Acessibilidade | Motion reduzido pode não remover deslocamento, parallax e floating. | Implementar `useReducedMotion()` e fallback específico por componente. | Média |
| Alta | Ghost 3D | Canvas pode renderizar continuamente ou pesado demais no mobile. | Usar `frameloop="demand"`, DPR reduzido, parallax só no desktop e fallback 2D. | Média |
| Média | `BeliefFixedHeader` | Split text pode estar excessivo ou por caracteres. | Usar split por palavras ou linhas, com stagger curto e container entrando pela direita. | Baixa |
| Média | `BeliefManifesto` | Manifesto pode aparecer sem sincronismo ou com anúncio acessível incorreto. | Revelar entre `0.82` e `0.92`, controlar `aria-hidden` quando inativo e manter Ghost acima. | Média |
| Média | Z-index | Ghost pode disputar camada com texto ou ficar atrás do manifesto. | Normalizar tokens de z-index: background 0, overlay 10, header 30, scroll text 40, manifesto 50, ghost 70. | Baixa |
| Média | Cleanup | `inView()` sem cleanup pode acumular animações em scroll rápido. | Retornar cleanup que para controles e reseta para estado de saída. | Baixa |
| Baixa | QA | Falta de validação visual em DevTools Animation Inspector e mobile real. | Testar scroll lento, scroll rápido, reduced motion, WebGL failure, Safari iOS e Android Chrome. | Baixa |

## 17. Checklist de aceite

```txt
[ ] A seção começa em #040013.
[ ] As seis frases existem na ordem correta.
[ ] As frases principais entram da esquerda.
[ ] Desktop usa x -100 -> 0.
[ ] Mobile usa x -48 -> 0 ou equivalente, sem inverter direção.
[ ] Frases principais usam duration 0.9.
[ ] Frases principais usam ease [0.17, 0.55, 0.55, 1].
[ ] Frases principais resetam para opacity 0 e x negativo ao sair.
[ ] Não há blur animado nas frases principais.
[ ] Não há split text nas frases principais.
[ ] Background responde a data-index das frases.
[ ] Background não usa transition: background-color.
[ ] Background não usa fade entre múltiplas divs.
[ ] Reduced motion remove deslocamento textual.
[ ] Reduced motion troca background instantaneamente.
[ ] Reduced motion remove floating e cursor parallax do Ghost.
[ ] Header usa split por palavras ou linhas.
[ ] Manifesto usa split no clímax.
[ ] Ghost fica em z-[70].
[ ] Ghost centraliza e escala +10% depois de 0.85.
[ ] Ghost não reage a cursor no mobile.
[ ] Canvas possui fallback e error boundary.
[ ] Nenhum secret de Supabase aparece no client.
[ ] A sessão mantém leitura clara em desktop e mobile.
```

## 18. Prompt final para agente de código

```md
# TASK: Correct the `06 O QUE ME MOVE` motion implementation

You are a senior frontend engineer specialized in Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Motion DOM and React Three Fiber.

Update the `O Que Me Move` section on `/sobre` so the animation layer follows the Motion scroll-triggered reference while preserving the current visual identity, copy, layout hierarchy, colors, typography, spacing and Ghost 3D concept.

## Core rule

Do not redesign the section. Correct the motion system.

## Stack

Use:
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- `motion/react`
- `motion` for DOM `animate()` and `inView()`
- React Three Fiber, drei and three.js for the Ghost only

Do not use GSAP in this section.

## Files to create or update

```txt
src/config/beliefTokens.ts
src/hooks/useBeliefsScroll.ts
src/components/sobre/sections/AboutBeliefs.tsx
src/components/sobre/beliefs/BeliefsScrollContext.tsx
src/components/sobre/beliefs/BeliefBackground.tsx
src/components/sobre/beliefs/BeliefOverlay.tsx
src/components/sobre/beliefs/BeliefFixedHeader.tsx
src/components/sobre/beliefs/BeliefScrollText.tsx
src/components/sobre/beliefs/BeliefManifesto.tsx
src/components/sobre/beliefs/SplitTextMotion.tsx
src/components/sobre/3d/GhostScene.tsx
src/components/sobre/3d/GhostModel.tsx
src/components/sobre/3d/GhostSceneFallback.tsx
src/components/sobre/3d/GhostErrorBoundary.tsx
```

## Layer order

Keep:
1. `BeliefBackground`, z-0
2. `BeliefOverlay`, z-10
3. `BeliefFixedHeader`, z-30
4. `BeliefScrollText`, z-40
5. `BeliefManifesto`, z-50
6. `GhostScene`, z-[70]

The Ghost must stay above the manifesto during the climax.

## Main text reference behavior

Use Motion DOM:

```ts
inView('[data-belief-phrase]', (element) => {
  animate(
    element,
    { opacity: 1, x: [-100, 0] },
    {
      duration: 0.9,
      ease: [0.17, 0.55, 0.55, 1],
    }
  );

  return () => animate(element, { opacity: 0, x: -100 });
});
```

Required:
- No split text on the main phrases.
- No blur animation on the main phrases.
- No `y` entrance for the main phrases.
- No scrub for the main phrase reveal.
- No CSS keyframes for the main phrase reveal.
- Mobile may reduce distance to `x: -48 -> 0`, but must keep left-to-right entrance.

Required phrases:
1. `Um vídeo que respira`
2. `Uma marca que se reconhece`
3. `Um detalhe que fica`
4. `Crio para gerar presença`
5. `Mesmo quando não estou ali`
6. `Mesmo quando ninguém percebe o esforço`

Each phrase section must have:
```tsx
data-belief-section
data-index={index}
```

Each animated phrase element must have:
```tsx
data-belief-phrase
```

## Background behavior

Use one background layer only.

Palette:
```ts
[
  '#040013',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#040013',
]
```

When `[data-belief-section]` enters viewport, read `data-index`, select `beliefBackgroundStops[index + 1]`, and animate the single background layer:

```ts
animate(backgroundElement, { backgroundColor: color }, {
  duration: 0.9,
  ease: [0.17, 0.55, 0.55, 1],
});
```

Do not use `transition: background-color`.
Do not use multiple fading background divs.
Do not use animated gradients.

In `prefers-reduced-motion`, set the background color directly.

## Fixed header

Use split-text only here and in the manifesto.

Header:
- Container `opacity 0 -> 1`, `x 60 -> 0`
- Duration `0.8`
- Ease `[0.22, 1, 0.36, 1]`
- Words `opacity 0 -> 1`, `y 12 -> 0`
- Stagger `0.08`
- Use words or lines, not characters.

## Manifesto

Text:
```txt
ISSO É
GHOST
DESIGN
```

Reveal:
- Between `scrollYProgress` `0.82` and `0.92`
- Global `opacity 0 -> 1`, `y 18 -> 0`
- Split by words or lines
- Stagger between `0.04` and `0.07`
- Keep `z-50`, below Ghost

Avoid `aria-live` on hidden looping content. Use `aria-hidden` while inactive or manage a one-time announcement.

## Ghost 3D

Keep Ghost as an independent R3F layer:
- `z-[70]`
- `pointer-events-none`
- `frameloop="demand"`
- DPR reduced on mobile
- No cursor parallax on mobile
- No floating or cursor parallax in reduced motion
- Climax after `scrollYProgress > 0.85`: center Ghost and scale up by 10 percent
- Add `GhostErrorBoundary`
- Add `GhostSceneFallback`
- Do not expose Supabase secrets

## Performance

Animate mostly:
- `transform`
- `opacity`

Do not animate:
- `width`
- `height`
- `margin`
- `padding`
- `top`
- `left`
- `right`
- `bottom`
- `font-size`
- `filter` on the main phrases
- `box-shadow`

Use `will-change` only on elements that animate and avoid applying it globally.

## Accessibility

Respect `prefers-reduced-motion`.

If reduced motion is active:
- Main phrases use simple fade or static state
- Background color changes instantly
- Ghost floating is disabled
- Cursor parallax is disabled
- Manifesto uses a simple fade or static state

Do not create flashes above 3 times per second.
Do not trap keyboard focus inside sticky content.
Canvas must have a 2D fallback.

## QA

Validate:
- Desktop Chrome, Safari and Firefox
- iOS Safari
- Android Chrome
- Reduced motion enabled
- WebGL unavailable
- Slow scroll
- Fast scroll
- Resize from desktop to mobile
- No hydration errors
- No memory leaks after navigating away and back
```

## 19. Recomendações técnicas adicionais

Use Motion para esta sessão, não GSAP. A troca para GSAP só faria sentido se o vídeo de referência local exigir pinning com scrub ou uma timeline cinematográfica contínua. Enquanto a referência principal for `examples.motion.dev/js/scroll-triggered`, o melhor resultado vem de manter `inView()` como núcleo.

Não tente tornar todas as camadas igualmente animadas. A sessão deve ter uma hierarquia cinética: frases com entrada limpa, background respondendo por capítulo, header com microcoreografia, manifesto com clímax e Ghost como presença contínua. Se todas as camadas competirem, a seção perde leitura e parece demo técnica.

Antes de codar, anexe o `anima.mov` real ao projeto ou extraia 6 a 10 frames-chave. Isso permitiria validar posição do Ghost, escala no clímax e cadência visual do manifesto com mais precisão.
