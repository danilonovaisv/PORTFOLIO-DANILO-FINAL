# PROTOTIPO INTERATIVO DA LANDING PAGE

## Documento Técnico — Arquitetura Modular + Storage Realtime + Vídeos Autoplay

> Documento consolidado e aprofundado tecnicamente.  
> Define comportamento estrutural, arquitetural, armazenamento, mídia e renderização dinâmica.

Baseado em:

- Admin Template Mestre V3 (ALPA) [Danilo Novais | Creative Developer.pdf]
- Sistema gallery_grid
- BG animado (LiquidEther + Three.js)
- Estrutura pública da landing

---

# 1. OBJETIVO ARQUITETURAL

A Landing Page de Projeto é um **sistema modular dinâmico**, não um layout fixo.

Ela foi projetada para:

- Permitir composição editorial flexível
- Evitar dependência de deploy para atualização de conteúdo
- Integrar mídia rica (imagem e vídeo)
- Operar com armazenamento em tempo real (Supabase Storage)
- Garantir consistência estrutural com liberdade criativa

---

# 2. ESTRUTURA FIXA VS DINÂMICA

## 🔒 Estrutura Fixa (não editável via blocos)

Somente estes elementos são fixos:

1. Header global
2. Background animado (Liquid Ether)
3. Hero
4. Introdução (headline + parágrafos)
5. CTA final + navegação (voltar / próximo)

Esses componentes fazem parte da camada estrutural do template.

---

## 🧩 Estrutura 100% Dinâmica (Admin-driven)

Todo o restante da landing é montado via:

gallery_grid: Block[]

Não existe layout padrão após a introdução.

Cada projeto pode ter:
• Número diferente de blocos
• Ordem diferente
• Tipos diferentes
• Narrativa completamente distinta

⸻

# 3. ARQUITETURA DE DADOS

## 3.1 Estrutura Conceitual

interface LandingPage {
id: string
slug: string
title: string
subtitle?: string
year?: string
themeColor: string
hero_cover_image: string
hero_logo_image?: string
intro_headline: string
intro_paragraphs: string[]
gallery_grid: Block[]
footer_cta: string
next_project_slug?: string
}

⸻

## 3.2 Estrutura do Bloco

interface Block {
id: string
type:
| "text"
| "image_full"
| "video_full"
| "video_autoplay"
| "quote_full"
| "image_text"
| "text_image"
| "image_double"
| "image_video"
| "video_text"

media?: Media[]
content?: {
title?: string
description?: string
quote?: string
}
}

⸻

# 4. STORAGE & REALTIME (SEM DEPLOY)

4.1 Fluxo de Upload

Quando um asset é enviado via Admin: 1. Upload é feito diretamente para Supabase Storage 2. Arquivo é salvo em bucket estruturado:

landing-pages/{slug}/...

    3.    URL pública é retornada
    4.    URL é salva no banco
    5.    Página pública consome via fetch
    6.    Renderização ocorre instantaneamente

⚠️ Não há necessidade de deploy.

⸻

## 4.2 Benefícios

    •    Atualização em tempo real
    •    Sem rebuild
    •    Sem dependência de pipeline CI/CD
    •    Assets versionáveis por slug
    •    Estrutura escalável

⸻

# 5. SUPORTE A VÍDEOS

A landing aceita vídeos via:

5.1 Vídeo armazenado no Supabase

{
type: "video_full",
src: "landing-pages/slug/video.mp4",
poster: "landing-pages/slug/poster.webp"
}

Comportamento:
• Autoplay
• Muted obrigatório
• Loop opcional
• PlaysInline obrigatório
• Lazy load abaixo da dobra

Exemplo técnico:

<video
autoplay
muted
loop
playsinline
preload="metadata"

>

⸻

## 5.2 Vídeo via YouTube (Embed)

Também aceito:

{
type: "video_full",
youtube_url: "https://youtube.com/watch?v=..."
}

Renderizado como:

<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playsinline=1"
  allow="autoplay"
>

Regras:
• Autoplay ativado
• Muted obrigatório
• Loop configurado
• Sem mostrar controles (quando possível)

⸻

# 6. RESPONSIVIDADE TÉCNICA

Breakpoints

mobile: 0–767px
tablet: 768–1023px
desktop: 1024+

⸻

Desktop
• Grid 2 colunas em composições
• Full media 100% largura
• Tipografia ampla
• Espaçamento generoso

⸻

Tablet
• Grid mantido
• Ajuste de padding
• Escala tipográfica reduzida

⸻

Mobile

Regras automáticas:
• Tudo vira stack vertical
• Split vira coluna única
• Image double vira 1 coluna
• Padding lateral: 16px
• Vídeos mantêm proporção 16:9
• BG animado com resolution reduzida

⸻

# 7. BACKGROUND ANIMADO (LIQUID ETHER)

Tecnologia:
• React
• Three.js
• Shader simulation
• WebGL alpha true

Configurações relevantes:

<LiquidEther
  mouseForce={20}
  resolution={0.5}
  autoDemo
/>

Performance
• PixelRatio limitado
• Resize observer otimizado
• IntersectionObserver para pausar fora da viewport
• Não interfere no scroll

⸻

# 8. PERFORMANCE & OTIMIZAÇÃO

    •    Lazy loading de mídia
    •    Poster obrigatório para vídeo
    •    next/image quando aplicável
    •    Compressão WebP/AVIF
    •    Debounce resize do canvas
    •    CDN do Supabase

⸻

# 9. ACESSIBILIDADE

    •    Alt obrigatório
    •    Role apropriado para iframe
    •    Contraste AA mínimo
    •    Navegação via teclado
    •    aria-label para botões

⸻

# 10. REGRA FUNDAMENTAL

A landing page NÃO é:
• Um layout rígido
• Um modelo pré-moldado
• Uma sequência fixa de seções

Ela é:
• Um sistema modular
• Um construtor editorial
• Um motor dinâmico alimentado pelo Admin
• Integrado a storage em tempo real
• Capaz de receber imagens e vídeos (Supabase ou YouTube)
• Atualizado sem necessidade de deploy

⸻

# 11. CONCLUSÃO TÉCNICA

A arquitetura foi pensada para:
• Separar estrutura fixa da composição editorial
• Permitir total liberdade criativa
• Garantir performance
• Garantir atualização em tempo real
• Manter consistência visual e estrutural

⸻
