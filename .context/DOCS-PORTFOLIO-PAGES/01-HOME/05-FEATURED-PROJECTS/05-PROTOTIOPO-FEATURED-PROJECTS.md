
### 4.5 Featured Projects (Grid)

#### Objetivo

Showcase curado de trabalhos de alta qualidade em layout editorial estilo revista.

#### Layout Desktop

**Grid Irregular (Magazine-style):**

```
┌─────────────┐ ┌──────────────────────────────┐
│   Card 1    │ │         Card 2               │
│ (336×500)   │ │       (840×500)              │
└─────────────┘ └──────────────────────────────┘

┌──────────────────────────────────────────────┐
│              Card 3 (1176×600)               │
└──────────────────────────────────────────────┘

┌────────────────────────────┐ ┌─────────────┐
│        Card 4 (784×500)    │ │ CTA Card    │
└────────────────────────────┘ └─────────────┘
```

**Implementação (Tailwind Grid):**

```jsx
// Row 1
<div className="md:col-span-5"><ProjectCard /></div>
<div className="md:col-span-7"><ProjectCard /></div>

// Row 2
<div className="md:col-span-12"><ProjectCard /></div>

// Row 3
<div className="md:col-span-8"><ProjectCard /></div>
<div className="md:col-span-4"><CTACard /></div>
```

#### Estrutura de Project Card

- **Imagem/Vídeo:** Cobre card, `object-fit: cover`
- **Pills (tags):** Absoluto, top-right, bg `#E6EFEF` 70% opacity
- **Info Block:**
  - Título (H3, medium weight)
  - Meta: `Cliente • Ano` (`#6B7280`, small)
  - Ícone de seta em círculo azul (translada direita no hover)

#### Interações (Desktop)

**Hover:**

```js
image: { scale: 1.03, translateY: -1 }
arrow: { translateX: 20px }
shadow: { shadow-xl shadow-blue-500/10 }
duration: 500-700ms
```

**Scroll Reveal:**

```js
container: { opacity: 0 → 1, y: 40 → 0 }
cards: { scale: 0.96 → 1, staggerChildren: 0.12 }
duration: 0.7s
```

### BAckground Animado

- 3 opções de backgrounds animados;
- Alteram em ordem aleatória nos cards da sessão “Featured Projects”;
- O background animado não é fixo no post publicado, as três versões se alternam entre todos os cards destaque da HOME;
- No dashboard do ADMIN de inclusão de trabalhos, reservar uma area só para os destaques HOME, de escolha entre background animado e logos invertidos ou background animado e thumb com overlay 50%;
- O logo invertido do card sempre fixo no centro;
- Interação com mouse nos cards com o cursor, leve zoom, animação de movimento e mudança de cor do cta small do rodapé do card (o mesmo que ja existe) e leve glow no background do card e cta `#8705f2`;
- Demais configurações dos cards permanecem as mesmas;

# **BACKGROUNDS CARDS**

- 1. Gradiente: https://reactbits.dev/tools/background-studio?bg=grainient
     - Install: pnpm dlx shadcn@latest add @react-bits/Grainient-TS-TW
     - Usage:

`````
import Grainient from './Grainient';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Grainient
    color1="#0048ff"
    color2="#996fd6"
    color3="#8705f2"
    timeSpeed={0.25}
    colorBalance={0}
    warpStrength={1}
    warpFrequency={5}
    warpSpeed={2}
    warpAmplitude={50}
    blendAngle={0}
    blendSoftness={0.05}
    rotationAmount={500}
    noiseScale={2}
    grainAmount={0.1}
    grainScale={2}
    grainAnimated={false}
    contrast={1.5}
    gamma={1}
    saturation={1}
    centerX={0}
    centerY={0}
    zoom={0.9}
  />
</div>
````
- 02. Ghost Cursor: https://reactbits.dev/tools/background-studio?bg=ghost-cursor
         - Install: pnpm dlx shadcn@latest add @react-bits/GhostCursor-TS-TW
         - Usage:
         
`````

import GhostCursor from './GhostCursor'

<div style={{ height: 600, position: 'relative' }}>
  <GhostCursor
    // Visuals
    color="#8705f2"
    brightness={2}
    edgeIntensity={0}

    // Trail and motion
    trailLength={50}
    inertia={0.5}

    // Post-processing
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1}
    bloomThreshold={0.025}

    // Fade-out behavior
    fadeDelayMs={1000}
    fadeDurationMs={1500}

/>

</div>

´´´´´´´´

- 3. Aurora: https://reactbits.dev/tools/background-studio?bg=aurora
     - Install: pnpm dlx shadcn@latest add @react-bits/Aurora-TS-TW
     - Usage:

````
import Aurora from './Aurora';

<Aurora
  colorStops={["#b301f4","#0048ff","#8705f2"]}
  blend={0.5}
  amplitude={1.0}
  speed={1}
/>
‘’’’’’’’

Tecnologia:
• React
• Three.js
• Shader simulation
• WebGL alpha true

Performance
• PixelRatio limitado
• Resize observer otimizado
• IntersectionObserver para pausar fora da viewport
• Não interfere no scroll




#### CTA Card

**Conteúdo:**

- Headline: "Like what you see?"
- Button: "view projects →"
- Background: `#040013`

**Hover:**

```js
text: white → #0057FF
arrow: translateX(4px)
duration: 300ms
```

**Destino:** `/portfolio`

#### Layout Mobile

- Cards empilhados verticalmente
- Full-width, heights adaptados
- CTA card como último item
- Espaçamento consistente (32px)

---

