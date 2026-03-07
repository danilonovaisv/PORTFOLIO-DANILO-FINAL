# Relatório de Auditoria — Motion & UX (Home + Sobre)

**Data:** 2026-03-07  
**Escopo auditado:** `src/components/home/**`, `src/components/sobre/**`  
**SOT principal:** `.context/GHOST-DESIGN-SYSTEM.md`  
**SOT complementar:** `.context/DOCS-PORTFOLIO-PAGES/**` (Home e Sobre)

---

## Transparência de fontes obrigatórias

### 1) Repositório GitHub (DATABASE_AGENT_NEXT)

- **Tentativa realizada:** `git ls-remote https://github.com/danilonovaisv/DATABASE_AGENT_NEXT`
- **Resultado:** bloqueado por autenticação (`could not read Username for 'https://github.com'`).
- **Impacto:** sem leitura remota do código externo; auditoria baseada no estado local do workspace (verdade operacional disponível).

### 2) Vector Store (`vs_69520b1fb834819197e445db9aab8d69`)

- **Tentativa realizada:** enumeração de recursos MCP (`list_mcp_resources`).
- **Resultado:** nenhum recurso disponível nesta sessão.
- **Impacto:** sem recuperação de contexto vetorial; análise ancorada em código local + docs `.context`.

---

## 1) Lista de inconformidades por arquivo

## HOME

### `src/components/home/hero/GhostAura.tsx`

- Usa easing string `easeInOut` em vez do token Ghost `[0.22, 1, 0.36, 1]`.
- Usa `scale` em dois orbs (`scale: [1, 1.15, 1]`, `scale: [1, 1.2, 1]`) — proibido para conteúdo/UI pelo SOT.
- Animação contínua e decorativa (5 layers infinitos) sem gate explícito de reduced motion.

### `src/components/home/hero/VideoManifesto.tsx`

- Reveal principal ok em `y: 18`, porém o wrapper aplica `scale` + `x` por scroll (`deskScale`, `deskX`) — fora do conjunto permitido para UI/content.
- Rotina de “scroll lock” de 2s (`document.body.style.overflow = 'hidden'`) pode degradar UX/acessibilidade em navegação assistiva.

### `src/components/home/portfolio-showcase/CategoryStripe.tsx`

- `initial y: 24` excede máximo permitido (18px).
- `parallaxY` varia `[-20, 20]` (acima do limite de deslocamento recomendado para conteúdo).
- `useScroll` + `useSpring` + `useTransform` por item de lista pode escalar custo em páginas com muitas categorias.

### `src/components/home/portfolio-showcase/PortfolioShowcase.tsx`

- Header com `y: 30` (acima de 18px) e bloco secundário com `y: 20`.
- Usa `useMotionGate` corretamente, mas amplitudes de entrada estão fora do token Ghost estrito.

### `src/components/home/contact/ContactSection.tsx`

- Entrada com `y: 24` fora do limite de 18px.

### `src/components/home/contact/ContactForm.tsx`

- Entrada do form em `y: 20` (>18).
- Microinteração de botão (`whileHover y:-2`, `whileTap y:1`) é permitida no princípio de translateY, mas deve herdar timing/token único.

### `src/components/home/contact/ContactDetails.tsx`

- Usa animação em eixo `x` (`x: -30 -> 0`) — fora das propriedades permitidas para conteúdo.
- Não aplica `useMotionGate`/`prefers-reduced-motion`.

### `src/components/home/clients/ClientsBrandsSection.tsx`

- Lista de logos usa `hidden y: 20` (>18).
- Gate de motion presente (`useMotionGate`), mas amplitude está fora do padrão.

### `src/components/home/hero/HeroHeader.tsx`

- Title usa `y: 20` (>18); easing está correto (GHOST_EASE).

## SOBRE

### `src/components/sobre/sections/AboutBeliefs.tsx` (Sessão 06)

- Canvas 3D em `z-[999]`, conflitante com hierarquia Ghost DS (`Canvas/R3F` deve operar em camada equivalente a `z-30`, abaixo de overlays finais).
- Risco de sobreposição indevida com camadas DOM e leitura visual de texto.

### `src/components/sobre/beliefs/BeliefFixedHeader.tsx`

- Morph usa `y: [40, 0]` no `useTransform`, excedendo limite máximo de 18px.

### `src/components/sobre/sections/AboutHero.tsx`

- Parallax de mídia usa `[48, -48]` (muito acima da faixa permitida).
- Reveals de conteúdo usam `y: 24` em desktop.

### `src/components/sobre/sections/AboutWhatIDo.tsx`

- Track principal animado com `x: '120vw' -> '-120%'` (propriedade não permitida para conteúdo).
- Cards mobile entram com `x: 80`.
- `layout` em `motion.article` pode adicionar custo de layout/reflow sem ganho claro em lista longa.

### `src/components/sobre/origin/useOriginAnimations.ts`

- Easing GSAP usa `power3.inOut` / `power3.out` (não alinhado ao easing oficial).
- Usa `scaleY` em máscaras (`origin-mask`) — efeito decorativo que precisa justificativa de exceção de sistema.
- Gate de reduced motion usa `matchMedia` local (funciona), porém sem centralização em `useMotionGate`.

### `src/components/sobre/sections/AboutMethod.tsx`

- Boa aderência geral ao gate de motion e ao eixo `y`; sem inconformidade crítica encontrada.

### `src/components/sobre/sections/AboutClosing.tsx`

- Gate de motion aplicado corretamente para autoplay.
- Sem inconformidade crítica de easing/offset no bloco principal.

---

## 2) Tabela de Tokens de Movimento (atualizada)

| Token / Regra                       | Estado atual detectado                                       | Padrão-alvo (Ghost DS)                         | Ação recomendada                                              |
| ----------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------- |
| Easing global                       | Mistura de `GHOST_EASE`, `easeInOut`, `power3.*`             | `[0.22, 1, 0.36, 1]`                           | Unificar Framer/CSS e mapear GSAP para curva equivalente      |
| Propriedades de entrada de conteúdo | Existem `x`, `scale`, `scaleY` em fluxos de UI               | `opacity`, `blur`, `translateY`                | Remover/restringir `x/scale`; documentar exceções decorativas |
| Offset Y máximo                     | Há `y: 20`, `24`, `30`, `40`, `48`                           | `<= 18px`                                      | Recalibrar reveals e parallax de conteúdo                     |
| Duração Fast                        | Encontrado `0.4–0.6s` em microinterações                     | `0.2s`                                         | Encurtar interações de botão/card                             |
| Duração Normal                      | Predominante `0.8–0.9s`                                      | `0.8s`                                         | Manter 0.8 como padrão de reveal                              |
| Duração Slow                        | Encontrado `1.2s` em alguns blocos                           | `1.5s+` (atmosfera)                            | Usar Slow só em layers de fundo                               |
| Reduced Motion                      | Parcial: muitos componentes usam gate, alguns não            | Gate obrigatório centralizado                  | Garantir `useMotionGate` em 100% dos componentes animados     |
| Parallax Scroll                     | Variações agressivas (`±20`, `±48`, deslocamento horizontal) | Subtil, sem ruído e com limite de deslocamento | Reduzir amplitude e retirar parallax horizontal de conteúdo   |
| Z-index R3F vs DOM                  | Sessão 06 usa `z-[999]`                                      | Canvas na camada `z-30`                        | Reestruturar pilha para preservar legibilidade de overlay     |

---

## 3) Snippets de correção sugeridos (hooks de animação)

### 3.1 Hook central para reveal Ghost (Framer Motion)

```ts
// src/hooks/useGhostReveal.ts
import { useMemo } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';

const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function useGhostReveal(y = 18, duration = 0.8, delay = 0) {
  const reduce = useMotionGate();

  return useMemo(() => {
    if (reduce) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }

    return {
      initial: { opacity: 0, y: Math.min(y, 18), filter: 'blur(8px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration, delay, ease: GHOST_EASE },
    };
  }, [reduce, y, duration, delay]);
}
```

### 3.2 Hook para parallax seguro (sem extrapolar limites)

```ts
// src/hooks/useGhostParallaxY.ts
import { useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';

export function useGhostParallaxY(
  target: React.RefObject<Element | null>,
  amplitude = 12
) {
  const reduce = useMotionGate();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const clamped = Math.min(Math.abs(amplitude), 18);
  return useTransform(smooth, [0, 1], reduce ? [0, 0] : [-clamped, clamped]);
}
```

### 3.3 GSAP helper para easing Ghost consistente

```ts
// src/lib/motion/gsapGhostEase.ts
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export const GSAP_GHOST_EASE = CustomEase.create('ghostEase', '0.22,1,0.36,1');

// uso: ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE
```

---

## Conclusão executiva

- A base atual já contém parte importante da infraestrutura correta (`useMotionGate`, `GHOST_EASE`, tokens), porém ainda há **inconsistências relevantes** em amplitude de deslocamento, easing e camadas (especialmente na seção 06 da Sobre).
- A maior dívida técnica de Motion/UX hoje está em: **(1) redução de offsets acima de 18px**, **(2) eliminação de `x/scale` em conteúdo**, **(3) normalização de easing GSAP/Framer** e **(4) ajuste de z-index do Canvas 3D**.
