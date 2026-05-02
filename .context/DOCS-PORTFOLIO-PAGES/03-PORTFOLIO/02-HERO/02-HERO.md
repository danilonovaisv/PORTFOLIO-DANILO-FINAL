# 02-HERO

## 0. Estrutura de arquivos da sessão

- `src/components/portfolio/PortfolioHeroNew.tsx`
- `src/components/ui/shared/DynamicAssetVideo.tsx`
- `src/config/content.ts`
- `src/config/site-assets.ts`
- `src/hooks/useMotionGate.ts`
- `src/hooks/useMediaQuery.ts`

## 1. Objetivo da sessão

Abrir a página com presença visual forte (vídeo desktop/mobile), título editorial e leitura clara sem competir com conteúdo subsequente.

## 2. Estrutura de conteúdo

- `section#portfolio-hero`
- `h1` com "portfólio showcase"
- overlay gradiente para legibilidade
- vídeo dinâmico com fallback poster

## 3. Identidade visual

- Paleta escura + acento `#4fe6ff` no termo "portfólio".
- Atmosfera "Ghost" via glows e gradiente de base.

## 4. Interatividade e motion

- Motion indireto via playback de vídeo + camadas visuais.
- `prefers-reduced-motion` aplicado: troca vídeo por poster estático.
- Sem bounce/rotate no conteúdo textual.

## 5. Responsividade

- Troca de asset por breakpoint (`heroDesktop`/`heroMobile`).
- Tipografia escala de `text-4xl` até `text-8xl`.
- Vídeo hero é full-bleed em desktop e mobile: `section#portfolio-hero` rompe o wrapper `.std-grid` com `w-screen` e `left-1/2 -translate-x-1/2`.
- O vídeo usa `object-cover` e ocupa toda a largura do viewport até as bordas da página.

## 6. Acessibilidade e SEO

- `aria-labelledby` no section.
- Poster de fallback evita área vazia em conexões lentas/erro de vídeo.

## 7. Considerações técnicas

- Pontos fortes:
  - bom fallback para ausência de motion.
  - centralização de source via `SITE_ASSET_KEYS`.
  - validação local em `2026-05-02`: `fullBleedX: true` para desktop `1440px` e mobile `390px`, sem erro de mídia.
- Riscos:
  - custo de LCP se asset hero não estiver otimizado no storage.

## 8. Inconformidades observadas

- Inconformidade média: validar contraste do texto em cenas de vídeo muito claras (ajuste fino de overlay pode ser necessário por frame).
