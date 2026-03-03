# 05-FEATURED-PROJECTS

## 0. O que mudou

- A HOME agora usa o sistema `BACKGROUND ANIMADO THUMBS HOME` nos cards da seção Featured Projects.
- Cada card recebe uma camada visual dinâmica com um background ReactBits:
  - `grainient`
  - `ghost`
  - `aurora`
- O background não é persistido no projeto/post. Apenas o layout do card destaque é salvo no projeto via `home_featured`.
- O admin ganhou uma área exclusiva `Destaques HOME` para controlar:
  - se o projeto entra na Home
  - qual layout do card destaque deve ser usado
  - qual logo invertido será usado quando o layout exigir branding central

## 1. Arquivos envolvidos

- HOME / Featured Projects
  - `src/components/home/featured-projects/FeaturedProjectsRealtime.tsx`
  - `src/components/home/featured-projects/FeaturedProjectsSection.tsx`
  - `src/components/home/featured-projects/FeaturedProjectCard.tsx`
  - `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`
  - `src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx`
  - `src/components/home/featured-projects/animated-backgrounds.ts`
- ReactBits gerados via shadcn
  - `src/components/Grainient.tsx`
  - `src/components/GhostCursor.tsx`
  - `src/components/Aurora.tsx`
- Tipos / schemas / mapeamento
  - `src/types/project.ts`
  - `src/types/admin.ts`
  - `src/lib/portfolio/home-featured.ts`
  - `src/lib/portfolio/project-mappers.ts`
  - `src/lib/admin/schemas/project.ts`
  - `src/lib/supabase.types.ts`
- Admin
  - `src/components/admin/ProjectForm.tsx`
  - `src/app/admin/(protected)/trabalhos/actions.ts`
- Banco / view pública
  - `supabase/migrations/20260301011000_home_featured_animated_cards.sql`

## 2. Atribuição determinística dos backgrounds

- Pool fixo:
  - `['grainient', 'ghost', 'aurora']`
- O background continua não persistido no projeto/post.
- A atribuição acontece no client dentro de `FeaturedProjectsSection`, mas agora é estável por projeto.
- A função `getFeaturedProjectBackgroundVariant()`:
  - aplica hash estável no `project.id`
  - resolve o índice dentro do pool fixo
  - garante que o mesmo projeto receba sempre o mesmo background enquanto o `id` não mudar
- O `surface` estático em `FeaturedProjectAnimatedBackground` usa um mapa constante por variante.
- Isso elimina divergência entre SSR e o primeiro render do client, mesmo quando a lista é atualizada pelo realtime.
- A HOME mantém o `stableShuffle(..., { window: 'daily', scope: 'home' })` tanto no server quanto no client.
- O shuffle diário pode alterar a ordem dos cards ao mudar a janela diária ou o conjunto de projetos, mas o `variant` não depende mais da posição da lista.

## 3. Layouts persistidos no admin

Persistência nova no projeto:

- Coluna: `portfolio_projects.home_featured jsonb`
- Shape esperado:

```json
{
  "enabled": true,
  "cardStyle": "ANIMATED_BG_INVERTED_LOGO",
  "logoPath": "portfolio-media/cliente/projeto/assets-do-projeto/home-featured/logo-inverted.png"
}
```

Layouts disponíveis:

- `ANIMATED_BG_INVERTED_LOGO`
  - background animado + logo invertido central fixo
  - exige `logoPath`
  - se não houver logo, o render cai automaticamente para o layout de thumb overlay
- `ANIMATED_BG_THUMB_OVERLAY_50`
  - background animado + thumb do projeto com overlay escuro de 50%
  - usa as capas já existentes (`url_landscape`, `url_square` ou fallback estático)

Importante:

- `featured_on_home` continua sendo a flag principal de destaque.
- `home_featured.enabled` acompanha esse estado para manter o agrupamento sem duplicar a regra de publicação.
- Não existe campo de escolha do background animado. Isso é sempre dinâmico na HOME.

## 4. Regras de render dos cards

- O background animado é sempre a camada mais baixa do card.
- O overlay de branding fica acima:
  - logo invertido central
  - ou thumb com overlay 50%
- O conteúdo editorial do card permanece igual:
  - categoria / cliente / ano
  - título
  - CTA small com seta
  - rota/link/modal existente

Hover aplicado:

- zoom leve do shell
- translate sutil do card
- parallax de mouse na camada visual
- glow roxo `#8705f2` no shell
- glow roxo no `btn-icon-circle`
- CTA small muda de azul para roxo no hover

### 4.5 Featured Projects (Grid)

#### Objetivo

Showcase curado de trabalhos de alta qualidade em layout editorial estilo revista.

#### Layout Desktop

**Grid Irregular (Magazine-style):**

```text
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

- **Imagem/Vídeo:** cobre o card, `object-fit: cover`
- **Pills (tags):** absoluto, top-right, bg `#E6EFEF` 70% opacity
  - Implementado em `FeaturedProjectCardFrame` com render das 2 primeiras tags disponíveis do projeto
- **Info Block:**
  - Título (H3, medium weight)
  - Meta: `Cliente • Ano` (`#6B7280`, small)
  - Ícone de seta em círculo azul (translada à direita no hover)

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
container: { opacity: 0 -> 1, y: 40 -> 0 }
cards: { scale: 0.96 -> 1, staggerChildren: 0.12 }
duration: 0.7s
```

#### Background Animado

- 3 opções de backgrounds animados
- Historicamente, o conceito previa alternância aleatória entre os cards da sessão “Featured Projects”
- Implementação atual: a rotação visual entre cards continua variada, mas cada projeto recebe um background determinístico por `project.id` para evitar hydration mismatch
- O background animado não é fixo no post publicado
- No dashboard do ADMIN existe uma área dedicada para os destaques HOME, com escolha entre:
  - background animado + logo invertido
  - background animado + thumb com overlay 50%
- O logo invertido do card fica fixo no centro
- Interação com mouse nos cards:
  - cursor tracking sutil
  - leve zoom
  - animação de movimento
  - mudança de cor do CTA small no rodapé do card
  - glow leve no background do card e no CTA em `#8705f2`
- Demais configurações dos cards permanecem as mesmas

## 4.6 Backgrounds Cards

- 01. Gradiente: `https://reactbits.dev/tools/background-studio?bg=grainient`
  - Install: `pnpm dlx shadcn@latest add @react-bits/Grainient-TS-TW`
  - Usage:

```tsx
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
```

- 02. Ghost Cursor: `https://reactbits.dev/tools/background-studio?bg=ghost-cursor`
  - Install: `pnpm dlx shadcn@latest add @react-bits/GhostCursor-TS-TW`
  - Usage:

```tsx
import GhostCursor from './GhostCursor';

<div style={{ height: 600, position: 'relative' }}>
  <GhostCursor
    color="#8705f2"
    brightness={2}
    edgeIntensity={0}
    trailLength={50}
    inertia={0.5}
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1}
    bloomThreshold={0.025}
    fadeDelayMs={1000}
    fadeDurationMs={1500}
  />
</div>
```

- 03. Aurora: `https://reactbits.dev/tools/background-studio?bg=aurora`
  - Install: `pnpm dlx shadcn@latest add @react-bits/Aurora-TS-TW`
  - Usage:

```tsx
import Aurora from './Aurora';

<Aurora
  colorStops={['#b301f4', '#0048ff', '#8705f2']}
  blend={0.5}
  amplitude={1.0}
  speed={1}
/>
```

Tecnologia:

- React
- Three.js
- Shader simulation
- WebGL alpha true

Performance:

- PixelRatio limitado
- Resize observer otimizado
- IntersectionObserver para pausar fora da viewport
- Não interfere no scroll

#### CTA Card

**Conteúdo:**

- Headline: `Like what you see?`
- Button: `view projects ->`
- Background: `#040013`

**Hover:**

```js
text: white -> #0057FF
arrow: translateX(4px)
duration: 300ms
```

**Destino:** `/portfolio`

#### Layout Mobile

- Cards empilhados verticalmente
- Full-width, heights adaptados
- CTA card como último item
- Espaçamento consistente (32px)

## 5. Performance e acessibilidade

Regras obrigatórias implementadas:

- `pointer-events: none` em toda a camada de background animado
- fallback estático quando:
  - `prefers-reduced-motion`
  - sem suporte WebGL
  - card fora da viewport
- pausa/offscreen:
  - `FeaturedProjectAnimatedBackground` usa `IntersectionObserver`
  - quando o card sai da viewport, a versão animada desmonta e sobra só a superfície estática
- pausa por aba oculta:
  - `document.visibilitychange`
- budget de DPR:
  - `GhostCursor`: `maxDevicePixelRatio=0.65` + `targetPixels=180000`
  - `Grainient`: limite de DPR reduzido
  - `Aurora`: limite de DPR reduzido
- SSR/CSR:
  - wrappers via `dynamic(..., { ssr: false })`
  - durante SSR/hidratação inicial, o card renderiza só a superfície estática

Legibilidade:

- sobreposição escura fixa no shell
- thumb overlay com 50%
- logo central tratado como decorativo para não duplicar leitura com o texto do card

## 6. Manutenção

Se quiser trocar o comportamento visual:

- ajuste o pool e o algoritmo:
  - `src/components/home/featured-projects/animated-backgrounds.ts`
- ajuste props/performance de cada background:
  - `src/components/home/featured-projects/FeaturedProjectAnimatedBackground.tsx`
- ajuste o shell visual e o parallax:
  - `src/components/home/featured-projects/FeaturedProjectCardFrame.tsx`
- ajuste regras persistidas do admin:
  - `src/lib/portfolio/home-featured.ts`
  - `src/lib/admin/schemas/project.ts`
  - `src/components/admin/ProjectForm.tsx`

Se adicionar um quarto background:

1. registrar no pool `FEATURED_PROJECT_BACKGROUND_POOL`
2. criar fallback estático correspondente
3. adicionar o render no resolver `FeaturedProjectAnimatedBackground`
4. validar custo de GPU no mobile

## 7. Retrocompatibilidade

- Projetos antigos destacados na Home continuam renderizando.
- Quando `home_featured` não existe:
  - o mapper assume `ANIMATED_BG_THUMB_OVERLAY_50`
- Quando o estilo salvo é `ANIMATED_BG_INVERTED_LOGO`, mas não há `logoPath`:
  - o resolver degrada automaticamente para o layout de thumb overlay
- Quando não houver thumb válida:
  - o frame mostra fallback textual com a categoria do projeto

## 8. Checklist de QA manual

- HOME:
  - abrir `/` e confirmar que os 4 cards de destaque mostram backgrounds animados
  - validar que os 3 tipos aparecem distribuídos entre os cards
  - dar refresh e confirmar que cada projeto mantém o mesmo background enquanto a seleção do dia não mudar
  - confirmar que o texto do card continua legível
  - confirmar ausência de hydration mismatch no console
- Hover:
  - mover o mouse sobre cada card
  - verificar zoom leve + parallax sutil
  - verificar glow roxo no card
  - verificar mudança de cor e glow do CTA small
- Reduced motion:
  - ativar `prefers-reduced-motion`
  - confirmar que os cards mostram apenas superfícies estáticas
- Offscreen:
  - inspecionar cards fora da viewport e confirmar desmontagem/pausa da camada animada
- Admin:
  - editar um projeto
  - marcar `Exibir este trabalho como destaque na Home`
  - alternar entre os dois layouts
  - tentar salvar modo logo invertido sem logo e confirmar validação
  - subir logo invertido e salvar com sucesso
- Retrocompatibilidade:
  - abrir um projeto antigo destacado sem `home_featured`
  - confirmar fallback para thumb overlay sem erro de render
- Build:
  - rodar lint, typecheck e build

## 9. Dependências

- `ogl`
- `three`
- Componentes ReactBits adicionados via `shadcn add`:
  - `@react-bits/Grainient-TS-TW`
  - `@react-bits/GhostCursor-TS-TW`
  - `@react-bits/Aurora-TS-TW`
