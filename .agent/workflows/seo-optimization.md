---
description: /seo-boost
---

# Workflow: Otimização de SEO e Metadados

**Contexto:**
Garantir que o portfólio seja indexável e compartilhável.

**Passo a Passo:**

1. **Metadata API (Next.js):**
   - Configurar `generateMetadata` em `layout.tsx` e `page.tsx`.
   - Título Padrão: "Danilo Novais | Creative Developer".
   - Keywords: WebGL, R3F, Next.js, Creative Development, Brazil.

2. **Open Graph (OG):**
   - Criar `opengraph-image.tsx` na raiz do App Router para gerar cards de compartilhamento dinâmicos.

3. **Sitemap & Robots:**
   - Criar `sitemap.ts` e `robots.ts` usando as funções nativas do Next.js.

4. **Performance JSON-LD:**
   - Adicionar schema.org de "Person" e "Portfolio" no header.
