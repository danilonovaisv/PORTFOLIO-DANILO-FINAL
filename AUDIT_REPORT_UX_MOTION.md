# Relatório de Auditoria: Motion & UX (Ghost Design)

## TAREFA 01: Auditoria de Animação (Inconformidades Encontradas)

### 1. `src/components/home/portfolio-showcase/CategoryStripe.tsx`
*   **Desvio de Easing e Translação:** Utiliza `y: 24` e `parallaxY` de `[-20, 20]`. O valor ultrapassa o teto máximo de 18px para translações (TranslateY) conforme a regra do Ghost Design.
*   **Interações de Escala:** Apesar da regra "Scale proibido em elementos de conteúdo/UI", precisa-se ter cuidado redobrado se as animações de zoom da imagem não violam a premissa de conteúdo.

### 2. `src/components/sobre/sections/AboutHero.tsx`
*   **Translação Além do Permitido:** Apresenta `y: 24` e parallax (`mediaY`) em até `[-48, 48]`. Ambos violam o limite de TranslateY Max 18px para transições suaves de UX/UI.

### 3. `src/components/sobre/sections/AboutWhatIDo.tsx`
*   **Desvio de Transição:** Uso exagerado de transformações no eixo horizontal (ex: `x: 80`, `x: ['120vw', '-120%']`). Embora a regra seja explícita para o eixo Y (`TranslateY máx 18px`), translações abruptas de eixo X em UX que prezam pelo silêncio visual fogem do Ghost Design.
*   **Performance (Scroll):** Animações horizontais longas baseadas em scroll exigem `will-change` rigoroso e atenção em dispositivos móveis, para não violar a taxa de quadros e o `prefers-reduced-motion`.
*   **Easing:** O hook usa `stiffness: 100, damping: 30`, o que deve ser validado para garantir a ausência do efeito elástico ("Bounce proibido").

### 4. `src/components/home/hero/HeroHeader.tsx`
*   **Translação Além do Permitido:** A animação inicial da manchete usa `y: 20` e filter com `blur(6px)`. A violação sutil no translateY precisa ser corrigida para respeitar o máximo de 18px.

### 5. `src/components/sobre/sections/AboutBeliefs.tsx`
*   **Conflitos de Z-Index:** O Canvas 3D (Layer 3) utiliza `z-[999]`, podendo sobrepor indevidamente o conteúdo em casos específicos de re-render ou `prefers-reduced-motion` mal resolvido.
*   **Over-engineering de Motion:** Os scroll wrappers múltiplos não combinados com transições suaves desviam a atenção.

---

## TAREFA 02: Plano de Implementação de Melhorias

### FASE 01 (Crítica)
*   **Sincronização & Legibilidade:** Corrigir os limites absolutos de translateY (cortando de `24px` / `20px` para `18px`).
*   **Acessibilidade (`useMotionGate`):** Reforçar a regra para que as animações passem de fato pelo filtro de `prefers-reduced-motion`. Onde a animação ultrapassar a sutileza (parallax pesados), zerá-las no fallback.

### FASE 02 (Refinamento)
*   **Padronização do Easing:** Forçar o uso estrito de `[0.22, 1, 0.36, 1]` para todo e qualquer reveal/stagger em componentes críticos.
*   **Remoção de Bounces e Scales Indesejados:** Verificar componentes de interação e garantir que botões e cards utilizem, no máximo, `opacity` e deslocamentos de 1 a 2px sem transições elásticas.

### FASE 03 (Experiência)
*   Melhorar as entradas de sessão garantindo a mesma duração (`Fast/Normal/Slow`) e evitar delays excessivos que deixam a interface ociosa. A sincronia do vídeo com os tempos da web (Motion) será refinada, assim como os z-indexes de sobreposição R3F.

---

## Tabela de Tokens de Movimento (Atualizada)
| Propriedade | Token GHOST_DESIGN | Uso Aplicável |
| :--- | :--- | :--- |
| **Easing Core** | `[0.22, 1, 0.36, 1]` | Toda entrada de elementos DOM, Fade/Blur |
| **TranslateY Máx** | `18px` | Distância máxima para surgimento vertical |
| **TranslateX Máx** | `18px` | Para evitar translações bruscas e manter sutileza |
| **Duration (Slow)** | `1.2s` | Elementos de grande impacto visual / Atmosfera |
| **Duration (Normal)** | `0.8s` | Conteúdos de lista, Cards, Seções Padrão |
| **Duration (Fast)** | `0.4s` | Interações (Hover de Botões / Links) |
| **Opacity Padrão** | `0` to `1` (or `0.85` max for media) | Componentes UI que surgem e background texturas |
| **Blur Core** | `blur(10px)` to `blur(0px)` | Aparecimento macio simulando profundidade e foco |
| **Scale / Bounce** | ❌ **PROIBIDO** | Elementos devem surgir, nunca inchar ou pular |

## Snippets de Código Sugeridos (Correções Aplicadas)

### `src/components/home/portfolio-showcase/CategoryStripe.tsx`
```tsx
// Substituição de valores fixos grandes pelos limites estabelecidos
const parallaxY = useTransform(smoothProgress, [0, 1], [-18, 18]);

// Na entrada de scroll
initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
```

### `src/components/sobre/sections/AboutHero.tsx`
```tsx
// Substituição do parallax e fade base
const mediaY = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [18, -18]);

// Nos elementos textuais
initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
```

### `src/components/sobre/sections/AboutWhatIDo.tsx`
```tsx
// Ajuste das spring configurations para a física GHOST
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 50, // Reduzido de 100
  damping: 20,   // Reduzido de 30
  restDelta: 0.001,
});

// Translação horizontal de entrada limitada no Mobile (x: 80 -> x: 18)
initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
```

### `src/config/motion.ts`
```typescript
// Limites absolutos de offset definidos
export const MOTION_TOKENS = {
  // ...
  offset: {
    subtle: 8,
    standard: 18,
    large: 18,     // Reduzido de 30
    dramatic: 18,  // Reduzido de 40
  },
};
```

### `src/components/sobre/sections/AboutBeliefs.tsx`
```tsx
// Correção de conflito de Z-Index
<div
  className="absolute inset-0 z-0 w-full h-full pointer-events-none" // Reduzido de z-[999]
  aria-hidden
>
  {/* GhostScene */}
</div>
```
