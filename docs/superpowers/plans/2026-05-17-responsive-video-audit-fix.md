# Responsive Video Audit & Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Garantir que cada seção do portfolio renderize o vídeo correto em desktop e mobile, sem 404, sem cross-browser bug, sem hydration mismatch.

**Architecture:** Corrigir URLs em `video-assets.ts` usando `SUPABASE_STORAGE_URL` de `brand.ts`; substituir `<source media>` por JS-only `src` com `key={activeSrc}` em `ResponsiveVideo`; simplificar resolução de URL em `AboutClosing`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS 4, pnpm, Firebase Hosting, Supabase Storage.

---

## Resumo Executivo

Quatro bugs se combinam para quebrar os vídeos responsivos:

1. **URLs erradas (`video-assets.ts`):** projeto Supabase errado + bucket errado → todos os vídeos que usam `RESPONSIVE_VIDEOS` retornam 404.
2. **`<source media>` não é padrão HTML para `<video>`:** Firefox e Safari ignoram o atributo `media`, sempre carregam o primeiro `<source>` (mobile) em qualquer viewport.
3. **Triple-layer em `AboutClosing`:** resolução de URL em 3 camadas cria inconsistência.
4. **Redundância em `VideoManifesto`:** dois caminhos paralelos de URL (BRAND + RESPONSIVE_VIDEOS como default) desnecessários.

---

## Diagnóstico do Comportamento Atual

### Bug #1 — CRÍTICO: URLs erradas em `video-assets.ts`

**Arquivo:** `src/lib/video-assets.ts`

```
ATUAL (quebrado):
https://oiyjttquhhcmbsrtsnhw.supabase.co/storage/v1/object/public/assets/...

CORRETO:
https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/...
```

Dois problemas combinados:
- Project ID errado: `oiyjttquhhcmbsrtsnhw` → `umkmwbkwvulxtdodzmzf`
- Bucket errado: `assets` → `site-assets`

**Agravante:** `brand.ts` tem um helper `asset()` que converte `site-assets/...` para paths locais `/site.assets/...` (comentado como "Force local path for assets in site-assets bucket to ensure 100% build integrity"). Isso significa que os vídeos são servidos localmente no build, não direto do CDN. `video-assets.ts` ignora esse padrão.

---

### Bug #2 — ALTO: `<source media>` em `<video>` não é padrão

**Arquivo:** `src/components/ui/shared/ResponsiveVideo.tsx`

```html
<!-- ATUAL — quebrado em Firefox e Safari -->
<video>
  <source src={mobileSrc} media="(max-width: 767px)" />
  <source src={desktopSrc} media="(min-width: 768px)" />
  <source src={desktopSrc} />
</video>
```

| Browser | Comportamento real |
|---------|-------------------|
| Chrome | Respeita parcialmente (inconsistente) |
| Firefox | Ignora `media`, usa primeiro `<source>` → sempre mobile |
| Safari | Ignora `media`, usa primeiro `<source>` → sempre mobile |

O `useEffect` que chama `.load()` no resize mitiga parcialmente, mas o **carregamento inicial** em Firefox/Safari já está errado.

O terceiro `<source src={desktopSrc} />` (fallback sem `media`) nunca é avaliado porque Firefox/Safari param no primeiro `<source>` válido.

---

### Bug #3 — MÉDIO: Triple-layer em `AboutClosing`

**Arquivo:** `src/components/sobre/sections/AboutClosing.tsx`

```
Camada 1: useSiteAssetUrl(SITE_ASSET_KEYS.about.closingDesktop, BRAND.assets.video.aboutClosing)
Camada 2: BRAND.assets.video.aboutClosing → /site.assets/about/closing/video.closing.desk.mp4
Camada 3: || RESPONSIVE_VIDEOS.aboutClosing.desktop  ← URL errada (Bug #1)
```

Se `useSiteAssetUrl` retorna `null`, cai em `RESPONSIVE_VIDEOS` com URL quebrada.

---

### Bug #4 — BAIXO: Redundância em `VideoManifesto`

`page.tsx` passa `BRAND.assets.video.manifesto` como prop (path local correto). `VideoManifesto` usa esse valor e os `RESPONSIVE_VIDEOS` como defaults — mas como `page.tsx` sempre passa as props, os defaults nunca são usados. Redundância, não bug funcional.

---

## Inventário dos Vídeos no Código

| Seção | Componente | URL Atual | Estado |
|-------|-----------|-----------|--------|
| Home Manifesto Desktop | `VideoManifesto` | `BRAND.assets.video.manifesto` → `/site.assets/home/video.manifesto.desk.mp4` | ✅ |
| Home Manifesto Mobile | `VideoManifesto` | `BRAND.assets.video.manifestoMobile` → `/site.assets/home/video.manifesto.mobile.mp4` | ✅ |
| Sobre Hero Desktop | `AboutHero` | `RESPONSIVE_VIDEOS.aboutHero.desktop` → URL Supabase errada | ❌ 404 |
| Sobre Hero Mobile | `AboutHero` | `RESPONSIVE_VIDEOS.aboutHero.mobile` → URL Supabase errada | ❌ 404 |
| Sobre Closing Desktop | `AboutClosing` | `BRAND.assets.video.aboutClosing` → `/site.assets/about/closing/video.closing.desk.mp4` | ✅ |
| Sobre Closing Mobile | `AboutClosing` | `BRAND.assets.video.aboutClosingMobile` → `/site.assets/about/closing/video.closing.mobile.mp4` | ✅ |
| Sobre Method Desktop | `AboutMethod` | `RESPONSIVE_VIDEOS.aboutMethod.desktop` → URL Supabase errada | ❌ 404 |
| Sobre Method Mobile | `AboutMethod` | `RESPONSIVE_VIDEOS.aboutMethod.mobile` → URL Supabase errada | ❌ 404 |
| Portfolio Hero Desktop | `PortfolioHeroNew` | `RESPONSIVE_VIDEOS.portfolioHero.desktop` → URL Supabase errada | ❌ 404 |
| Portfolio Hero Mobile | `PortfolioHeroNew` | `RESPONSIVE_VIDEOS.portfolioHero.mobile` → URL Supabase errada | ❌ 404 |

---

## Tabela Esperado vs Atual por Seção

### Home Video Manifesto

| | Atual | Esperado |
|--|-------|---------|
| Desktop URL | `/site.assets/home/video.manifesto.desk.mp4` | ✅ correto |
| Mobile URL | `/site.assets/home/video.manifesto.mobile.mp4` | ✅ correto |
| Swap responsivo | `<source media>` — Firefox/Safari: mobile em desktop | JS matchMedia + key |

### Sobre Hero

| | Atual | Esperado |
|--|-------|---------|
| Desktop URL | `https://oiyjttquhhcmbsrtsnhw.../assets/about/hero/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/about/hero/about.hero.desktop.compress.mp4` |
| Mobile URL | `https://oiyjttquhhcmbsrtsnhw.../assets/about/hero/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/about/hero/about.hero.mobile.compress.mp4` |
| Estado | ❌ 404 | ✅ |

### Sobre Closing

| | Atual | Esperado |
|--|-------|---------|
| Desktop URL | `/site.assets/about/closing/video.closing.desk.mp4` | ✅ correto |
| Mobile URL | `/site.assets/about/closing/video.closing.mobile.mp4` | ✅ correto |
| Swap responsivo | `<source media>` — Firefox/Safari: mobile em desktop | JS matchMedia + key |

### Sobre Method

| | Atual | Esperado |
|--|-------|---------|
| Desktop URL | `https://oiyjttquhhcmbsrtsnhw.../assets/about/method/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/about/method/about.method.desktop_video.mp4` |
| Mobile URL | `https://oiyjttquhhcmbsrtsnhw.../assets/about/method/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/about/method/about.method.mobile_video.mp4` |
| Estado | ❌ 404 | ✅ |

### Portfolio Hero

| | Atual | Esperado |
|--|-------|---------|
| Desktop URL | `https://oiyjttquhhcmbsrtsnhw.../assets/portfolio/hero/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/portfolio/hero/portfolio.hero_desktop_video.mp4` |
| Mobile URL | `https://oiyjttquhhcmbsrtsnhw.../assets/portfolio/hero/...` | `https://umkmwbkwvulxtdodzmzf.../site-assets/portfolio/hero/portfolio.hero_mobile_video.mp4` |
| Estado | ❌ 404 | ✅ |

---

## Arquivos e Componentes Afetados

| Arquivo | Operação | Razão |
|---------|----------|-------|
| `src/lib/video-assets.ts` | Modificar | Corrigir URLs usando `SUPABASE_STORAGE_URL` de `brand.ts` |
| `src/components/ui/shared/ResponsiveVideo.tsx` | Modificar | Substituir `<source media>` por JS-only src swap |
| `src/components/sobre/sections/AboutClosing.tsx` | Modificar | Remover 3ª camada de fallback (RESPONSIVE_VIDEOS) |

**Não alterar:**
- `src/components/sobre/sections/AboutHero.tsx` — usa RESPONSIVE_VIDEOS, corrige com fix #1
- `src/components/sobre/sections/AboutMethod.tsx` — usa RESPONSIVE_VIDEOS, corrige com fix #1
- `src/components/portfolio/PortfolioHeroNew.tsx` — usa RESPONSIVE_VIDEOS, corrige com fix #1
- `src/components/home/hero/VideoManifesto.tsx` — usa BRAND paths (correto)
- `src/components/ui/ResponsiveCaptionTrack.tsx` — correto
- `src/hooks/useIsMobile.ts` — correto (inicia false para SSR)
- `src/config/brand.ts` — não precisa alterar

---

## Estratégia Responsiva Proposta

### Antes (quebrado em Firefox/Safari):
```tsx
<video>
  <source src={mobileSrc} media="(max-width: 767px)" />
  <source src={desktopSrc} media="(min-width: 768px)" />
  <source src={desktopSrc} />
</video>
```

### Depois (cross-browser confiável):
```tsx
'use client';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

export const ResponsiveVideo = forwardRef<HTMLVideoElement, ResponsiveVideoProps>(
  ({ desktopSrc, mobileSrc, desktopPoster, mobilePoster,
     autoPlay = true, muted = true, loop = true, playsInline = true,
     className = '', children, ...rest }, ref) => {
    
    const internalRef = useRef<HTMLVideoElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    // SSR-safe: default to desktop, swap to mobile post-hydration if needed
    const [activeSrc, setActiveSrc] = useState(desktopSrc);
    const [activePoster, setActivePoster] = useState<string | undefined>(desktopPoster);

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 767px)');
      const update = (e: MediaQueryList | MediaQueryListEvent) => {
        const isMob = e.matches;
        setActiveSrc(isMob ? mobileSrc : desktopSrc);
        setActivePoster(isMob ? (mobilePoster ?? desktopPoster) : desktopPoster);
      };
      update(mq);
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }, [desktopSrc, mobileSrc, desktopPoster, mobilePoster]);

    return (
      <video
        ref={internalRef}
        key={activeSrc}        // forçar remount limpo ao trocar src
        src={activeSrc}
        poster={activePoster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        {...rest}
      >
        {children}
      </video>
    );
  }
);
```

**Por que `key={activeSrc}`:** React desmonta e remonta o `<video>` quando `activeSrc` muda, disparando load limpo. Sem `key`, precisaríamos sincronizar `.load()` + `.play()` manualmente — frágil.

**SSR/Hydration:** `useState(desktopSrc)` renderiza o mesmo valor server/client → sem mismatch. `useEffect` avalia viewport real pós-hidratação.

---

## Estratégia Anti-Hydration Mismatch

- `useState(desktopSrc)` como default → SSR e primeiro render client são idênticos
- `useEffect` executa apenas no client → sem divergência
- `key` muda apenas pós-hidratação → React reconcilia sem erro
- Breakpoint `(max-width: 767px)` consistente com `useIsMobile` e `useMediaQuery` do projeto

---

## Estratégia de Performance

| Seção | `preload` | Justificativa |
|-------|-----------|--------------|
| Home Manifesto | `"metadata"` | Não é LCP, below fold |
| Sobre Hero | (não altera, já ok) | Hero — manter como está |
| Sobre Closing | `"metadata"` | Below fold |
| Sobre Method | `"metadata"` | Below fold |
| Portfolio Hero | `preload="auto"` (já configurado) | Hero, above fold |

- `key={activeSrc}` causa remount ao trocar breakpoint → vídeo recarrega. Aceitável para background loops.
- Poster bem definido minimiza flash durante remount.
- `muted + playsInline + loop` obrigatórios em todos os vídeos decorativos (autoplay).

---

## Estratégia de Acessibilidade

- Vídeos decorativos: `aria-hidden="true"` (já presente em AboutMethod, PortfolioHero)
- Vídeos com conteúdo narrativo: `aria-label` descritivo (VideoManifesto tem)
- `ResponsiveCaptionTrack` com `hideOnMobile={true}` (padrão) → omite `<track>` em mobile
- `VideoManifesto` tem botão de toggle de som com `aria-label` correto
- `useMotionGate` respeita `prefers-reduced-motion` em todos os componentes

---

## Riscos Técnicos

| Risco | Prob | Mitigação |
|-------|------|-----------|
| Flash visual durante remount ao cruzar 767px | Média | Poster bem definido absorve o flash |
| Autoplay não dispara após remount | Baixa | `autoPlay` prop passada → browser dispara automaticamente |
| `public/site.assets/` não existe no build | Alta se asset pipeline quebrou | Verificar antes de implementar |
| `NEXT_PUBLIC_SUPABASE_URL` undefined | Baixa | `brand.ts` já tem fallback chain |

---

## Plano de Rollback

```bash
# Reverter os 3 arquivos modificados
git checkout src/lib/video-assets.ts
git checkout src/components/ui/shared/ResponsiveVideo.tsx
git checkout src/components/sobre/sections/AboutClosing.tsx
```

---

## Critérios de Aceite

- [ ] Home Video Manifesto: desktop em desktop, mobile em mobile
- [ ] Sobre Hero: desktop em desktop, mobile em mobile (sem 404)
- [ ] Sobre Closing: desktop em desktop, mobile em mobile
- [ ] Sobre Method: desktop em desktop, mobile em mobile (sem 404)
- [ ] Portfolio Hero: desktop em desktop, mobile em mobile (sem 404)
- [ ] Swap correto ao redimensionar em Chrome, Firefox e Safari
- [ ] Sem hydration mismatch no console
- [ ] Sem layout shift perceptível
- [ ] Aspect ratio correto em mobile e desktop
- [ ] Autoplay funciona quando esperado
- [ ] Vídeos decorativos com `aria-hidden="true"`
- [ ] Vídeos mobile sem `<track kind="captions">` desnecessário
- [ ] LCP não piora nas páginas com Hero
- [ ] `pnpm lint` passa
- [ ] `pnpm typecheck` passa
- [ ] `pnpm build` passa

---

## Comandos de Validação

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Breakpoints para teste visual: 375px, 430px, 768px, 1024px, 1440px, 1680px.

Cenários de validação:
- Carregamento inicial em mobile
- Carregamento inicial em desktop
- Resize desktop → mobile
- Resize mobile → desktop
- Rotação de dispositivo
- Reload na página
- Navegação entre rotas
- Conexão lenta
- `prefers-reduced-motion` ativo
- Autoplay bloqueado pelo browser
- Vídeo indisponível (404)
