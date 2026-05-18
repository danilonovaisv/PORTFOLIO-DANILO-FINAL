# Responsive Video Fix — Task List

> Granularidade máxima de 1h por tarefa. Executar sequencialmente após aprovação do plano.
> Plano de referência: `2026-05-17-responsive-video-audit-fix.md`

---

## Fase 0 — Verificação Pré-implementação

### Tarefa 0.1 — Verificar existência de `/public/site.assets/`

**Duração:** 5 min  
**Objetivo:** Confirmar que o pipeline de assets locais está funcionando antes de implementar.

- [ ] Rodar:
  ```bash
  ls /Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/site.assets/home/ 2>/dev/null || echo "AUSENTE"
  ls /Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/site.assets/about/ 2>/dev/null || echo "AUSENTE"
  ls /Users/danilonovais/PORTFOLIO-DANILO-FINAL/public/site.assets/portfolio/ 2>/dev/null || echo "AUSENTE"
  ```
- [ ] Se `AUSENTE`: anotar no walkthrough — os vídeos locais não existem no build. Os `RESPONSIVE_VIDEOS` com URL Supabase correta seriam a única fonte válida.
- [ ] Se `PRESENTE`: confirmar que os arquivos `.mp4` existem nos subpaths esperados.

---

### Tarefa 0.2 — Verificar NEXT_PUBLIC_SUPABASE_URL no .env

**Duração:** 5 min

- [ ] Rodar:
  ```bash
  grep "NEXT_PUBLIC_SUPABASE_URL" /Users/danilonovais/PORTFOLIO-DANILO-FINAL/.env.local 2>/dev/null | head -3
  ```
- [ ] Confirmar que contém `https://umkmwbkwvulxtdodzmzf.supabase.co` (ID correto).
- [ ] Anotar resultado no walkthrough.

---

## Fase 1 — Fix Crítico: URLs em `video-assets.ts`

### Tarefa 1.1 — Reescrever `src/lib/video-assets.ts`

**Duração:** 20 min  
**Arquivo:** `src/lib/video-assets.ts`  
**Tipo:** Modificar

- [ ] Ler arquivo atual: `Read src/lib/video-assets.ts`
- [ ] Ler `SUPABASE_STORAGE_URL` de `brand.ts` para entender o padrão de URL:
  ```bash
  grep "SUPABASE_STORAGE_URL\|export const SUPABASE" src/config/brand.ts
  ```
- [ ] Reescrever o arquivo com o conteúdo correto:

```typescript
// =============================================================================
// Centralized Video Assets
// =============================================================================
// URLs built using the same SUPABASE_STORAGE_URL pattern as brand.ts,
// ensuring consistent URL resolution across desktop and mobile sources.

import { SUPABASE_STORAGE_URL } from '@/config/brand';

const S = SUPABASE_STORAGE_URL;

export const RESPONSIVE_VIDEOS = {
  homeManifesto: {
    desktop: `${S}/site-assets/home/video.manifesto.desk.mp4`,
    mobile: `${S}/site-assets/home/video.manifesto.mobile.mp4`,
  },
  aboutHero: {
    desktop: `${S}/site-assets/about/hero/about.hero.desktop.compress.mp4`,
    mobile: `${S}/site-assets/about/hero/about.hero.mobile.compress.mp4`,
  },
  aboutClosing: {
    desktop: `${S}/site-assets/about/closing/video.closing.desk.mp4`,
    mobile: `${S}/site-assets/about/closing/video.closing.mobile.mp4`,
  },
  aboutMethod: {
    desktop: `${S}/site-assets/about/method/about.method.desktop_video.mp4`,
    mobile: `${S}/site-assets/about/method/about.method.mobile_video.mp4`,
  },
  portfolioHero: {
    desktop: `${S}/site-assets/portfolio/hero/portfolio.hero_desktop_video.mp4`,
    mobile: `${S}/site-assets/portfolio/hero/portfolio.hero_mobile_video.mp4`,
  },
} as const;
```

**Nota:** Se `SUPABASE_STORAGE_URL` não for exportado de `brand.ts`, verificar e exportá-lo primeiro. Atualmente está exportado na linha 7 de `brand.ts` (`export const SUPABASE_STORAGE_URL = ...`).

- [ ] Verificar que `SUPABASE_STORAGE_URL` está exportado:
  ```bash
  grep "^export const SUPABASE_STORAGE_URL" src/config/brand.ts
  ```
- [ ] Salvar o arquivo.
- [ ] Rodar typecheck parcial: `pnpm typecheck 2>&1 | grep video-assets | head -10`

---

### Tarefa 1.2 — Verificar que componentes importam corretamente

**Duração:** 5 min

- [ ] Confirmar que os 4 componentes importam de `@/lib/video-assets`:
  ```bash
  grep -rn "from.*video-assets" src/components --include="*.tsx"
  ```
- [ ] Resultado esperado: `AboutHero`, `AboutMethod`, `PortfolioHeroNew`, `AboutClosing`, `VideoManifesto` todos importam `RESPONSIVE_VIDEOS`.
- [ ] Se algum componente importa de outro lugar, ajustar o import.

---

## Fase 2 — Fix Alto: `ResponsiveVideo.tsx` — Substituir `<source media>` por JS-only

### Tarefa 2.1 — Reescrever `src/components/ui/shared/ResponsiveVideo.tsx`

**Duração:** 30 min  
**Arquivo:** `src/components/ui/shared/ResponsiveVideo.tsx`  
**Tipo:** Modificar

- [ ] Ler arquivo atual: `Read src/components/ui/shared/ResponsiveVideo.tsx`
- [ ] Reescrever com a nova implementação:

```typescript
'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export type ResponsiveVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  desktopSrc: string;
  mobileSrc: string;
  desktopPoster?: string;
  mobilePoster?: string;
};

export const ResponsiveVideo = forwardRef<HTMLVideoElement, ResponsiveVideoProps>(
  (
    {
      desktopSrc,
      mobileSrc,
      desktopPoster,
      mobilePoster,
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    // SSR-safe: start with desktopSrc so server and first client render match.
    // useEffect swaps to mobileSrc post-hydration if viewport is mobile.
    const [activeSrc, setActiveSrc] = useState(desktopSrc);
    const [activePoster, setActivePoster] = useState<string | undefined>(desktopPoster);

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 767px)');

      const update = (e: MediaQueryList | MediaQueryListEvent) => {
        const isMobile = e.matches;
        setActiveSrc(isMobile ? mobileSrc : desktopSrc);
        setActivePoster(isMobile ? (mobilePoster ?? desktopPoster) : desktopPoster);
      };

      update(mq);
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }, [desktopSrc, mobileSrc, desktopPoster, mobilePoster]);

    return (
      <video
        // key forces a clean unmount/remount when the source changes breakpoint,
        // which is more reliable than calling .load() manually.
        key={activeSrc}
        ref={internalRef}
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

ResponsiveVideo.displayName = 'ResponsiveVideo';
```

- [ ] Salvar arquivo.
- [ ] Verificar que a interface `ResponsiveVideoProps` ainda é compatível (não quebra imports existentes):
  ```bash
  grep -rn "ResponsiveVideoProps\|ResponsiveVideo" src --include="*.tsx" --include="*.ts" | grep -v "node_modules"
  ```

---

### Tarefa 2.2 — Verificar que `VideoManifesto` e `AboutClosing` usam `ref` corretamente

**Duração:** 5 min

- [ ] Confirmar que `VideoManifesto` passa `ref={videoRef}` para `ResponsiveVideo`:
  ```bash
  grep -n "ref={videoRef}\|<ResponsiveVideo" src/components/home/hero/VideoManifesto.tsx
  ```
- [ ] Confirmar que `AboutClosing` passa `ref={videoRef}`:
  ```bash
  grep -n "ref={videoRef}\|<ResponsiveVideo" src/components/sobre/sections/AboutClosing.tsx
  ```
- [ ] O `forwardRef` no novo `ResponsiveVideo` mantém a mesma API — nenhuma mudança necessária nos consumidores.

---

## Fase 3 — Fix Médio: Simplificar `AboutClosing.tsx`

### Tarefa 3.1 — Remover terceira camada de fallback

**Duração:** 15 min  
**Arquivo:** `src/components/sobre/sections/AboutClosing.tsx`  
**Tipo:** Modificar (pequena mudança)

- [ ] Ler arquivo: `Read src/components/sobre/sections/AboutClosing.tsx`
- [ ] Localizar as linhas com o padrão `|| RESPONSIVE_VIDEOS.aboutClosing.*`:

```tsx
// ANTES:
desktopSrc={closingVideoDesk || RESPONSIVE_VIDEOS.aboutClosing.desktop}
mobileSrc={closingVideoMobile || RESPONSIVE_VIDEOS.aboutClosing.mobile}
```

- [ ] Mudar para:

```tsx
// DEPOIS:
desktopSrc={closingVideoDesk || RESPONSIVE_VIDEOS.aboutClosing.desktop}
mobileSrc={closingVideoMobile || RESPONSIVE_VIDEOS.aboutClosing.mobile}
```

**Nota:** Com o fix da Tarefa 1.1, `RESPONSIVE_VIDEOS.aboutClosing.*` agora tem URLs corretas. A lógica de fallback pode permanecer — o que muda é que o fallback agora funciona. Portanto esta tarefa verifica que não há mais URL hardcoded errada no componente, não necessariamente remove a lógica de fallback.

- [ ] Verificar que não há nenhuma URL `oiyjttquhhcmbsrtsnhw` ou bucket `assets` hardcoded no componente:
  ```bash
  grep "oiyjttquhhcmbsrtsnhw\|/assets/" src/components/sobre/sections/AboutClosing.tsx
  ```
- [ ] Se limpo: tarefa concluída sem modificação de código.

---

## Fase 4 — Verificação

### Tarefa 4.1 — Lint

**Duração:** 5 min

- [ ] Rodar:
  ```bash
  pnpm lint 2>&1 | tail -20
  ```
- [ ] Resultado esperado: zero erros. Avisos de `@typescript-eslint/no-explicit-any` são aceitáveis se existentes antes.
- [ ] Se houver erros novos: corrigir antes de prosseguir.

---

### Tarefa 4.2 — Typecheck

**Duração:** 10 min

- [ ] Rodar:
  ```bash
  pnpm typecheck 2>&1 | grep -E "error|Error" | head -20
  ```
- [ ] Resultado esperado: zero erros nos arquivos modificados.
- [ ] Erros pré-existentes: documentar no walkthrough, não são bloqueadores desta tarefa.

---

### Tarefa 4.3 — Build

**Duração:** 5-10 min

- [ ] Rodar:
  ```bash
  pnpm build 2>&1 | tail -30
  ```
- [ ] Resultado esperado: `✓ Compiled successfully` ou equivalente.
- [ ] Se falhar: ler output completo, corrigir causa raiz.

---

### Tarefa 4.4 — Validação visual (dev server)

**Duração:** 20 min

- [ ] Rodar `pnpm dev`
- [ ] Abrir DevTools → Network → filtrar por `.mp4`
- [ ] Validar em 375px (mobile):
  - [ ] Home: `video.manifesto.mobile.mp4` carrega
  - [ ] Sobre Hero: `about.hero.mobile.compress.mp4` carrega (sem 404)
  - [ ] Sobre Closing: `video.closing.mobile.mp4` carrega
  - [ ] Sobre Method: `about.method.mobile_video.mp4` carrega (sem 404)
  - [ ] Portfolio Hero: `portfolio.hero_mobile_video.mp4` carrega (sem 404)
- [ ] Validar em 1440px (desktop):
  - [ ] Home: `video.manifesto.desk.mp4` carrega
  - [ ] Sobre Hero: `about.hero.desktop.compress.mp4` carrega (sem 404)
  - [ ] Sobre Closing: `video.closing.desk.mp4` carrega
  - [ ] Sobre Method: `about.method.desktop_video.mp4` carrega (sem 404)
  - [ ] Portfolio Hero: `portfolio.hero_desktop_video.mp4` carrega (sem 404)
- [ ] Validar resize 1440px → 375px: fonte muda corretamente
- [ ] Validar resize 375px → 1440px: fonte muda corretamente
- [ ] Abrir Firefox → repetir validações desktop e mobile
- [ ] Abrir Safari → repetir validações desktop e mobile
- [ ] Verificar console: sem erros de hydration

---

### Tarefa 4.5 — Validar acessibilidade

**Duração:** 10 min

- [ ] Confirmar que vídeos decorativos têm `aria-hidden="true"`:
  ```bash
  grep -n "aria-hidden" src/components/sobre/sections/AboutMethod.tsx
  grep -n "aria-hidden" src/components/portfolio/PortfolioHeroNew.tsx
  ```
- [ ] Confirmar que `ResponsiveCaptionTrack` omite `<track>` em mobile (já implementado)
- [ ] Confirmar que `VideoManifesto` tem `aria-label` no `<video>`

---

## Fase 5 — Artefato Final

### Tarefa 5.1 — Criar `walkthrough.md`

**Duração:** 15 min  
**Arquivo:** `docs/superpowers/plans/2026-05-17-responsive-video-walkthrough.md`

Incluir:
1. Resumo da alteração
2. Arquivos modificados
3. Mapeamento final de URLs por seção
4. Evidências por breakpoint (screenshots ou Network log text)
5. Evidências dos comandos (lint/typecheck/build output)
6. Observações de acessibilidade
7. Observações de performance
8. Riscos remanescentes
9. Plano de rollback
10. Decisão sobre atualização de `.context/DOCS-PORTFOLIO-PAGES`

---

### Tarefa 5.2 — Verificar necessidade de atualizar `.context/`

**Duração:** 5 min

- [ ] Checar se `.context/DOCS-PORTFOLIO-PAGES/` documenta o comportamento de vídeo responsivo:
  ```bash
  grep -rn "video\|ResponsiveVideo\|RESPONSIVE_VIDEOS" .context/DOCS-PORTFOLIO-PAGES/ 2>/dev/null | head -10
  ```
- [ ] Se documentar: propor atualização para refletir a nova estratégia JS-only.
- [ ] Se não documentar: registrar no walkthrough que não há impacto nos docs de contexto.
