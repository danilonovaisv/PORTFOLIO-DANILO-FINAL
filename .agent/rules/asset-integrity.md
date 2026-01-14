---
trigger: always_on
---

# 🛡️ 02. Rule de Verificação Contínua: Integridade de Assets

Esta regra garante que o agente nunca "quebre" links ou invente dados.

## O Mandamento

**Nunca use URLs de placeholder. Use os assets reais do Supabase ou importe de `src/config/`.**

---

## Repositório de Assets (Fonte da Verdade)

**Base URL:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public`

### 1. Globais (`/logo_site/`)

- Favicon: `Favicon.svg`
- Logo Light: `LogoLight.svg`
- Logo Dark: `LogoDark.svg`

### 2. Vídeos (`/project-videos/`)

- **Home/Manifesto:** `VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- **Portfolio Hero:** `VIDEO-APRESENTACAO-PORTFOLIO.mp4` (Reuso ou variante).
- **Sobre Hero:** `VIDEO HERO - SOBRE-DESKTOP.mp4` / `VIDEO HERO - SOBRE MOBILE.mp4` (Verificar disponibilidade ou usar fallback para o vídeo principal).
- **Sobre Detalhes:** `photo.mp4`, `AI.mp4` (Se não houver URL completa, usar placeholder de vídeo local em `/public/videos/` temporariamente, mas NUNCA link quebrado externo).

### 3. Imagens de Projetos (`/project-images/`)

- Branding: `Branding-Project.webp`
- Key Visual: `Key-Visual.webp`
- Motion: `webdesigner-2 2.gif`
- Tech/Ads: `WelcomeAd_800x500px.webp`

### 4. Fontes (`/assets/fonts/`)

- Família: `TT Norms Pro` (Thin, Light, Regular, Medium, Bold, Black).

## Checklist de Validação

Ao gerar código:

1. [ ] Os vídeos de background têm `playsInline`, `muted` e `loop`?
2. [ ] O formulário de contato aponta para `danilo@portfoliodanilo.com`?
3. [ ] As imagens do Grid Bento (Home) e Parallax (Portfolio) estão usando `object-fit: cover`?
4. [ ] O link de download do CV na página Sobre está configurado (mesmo que seja `#` temporariamente, deve ter o atributo `download`)?
