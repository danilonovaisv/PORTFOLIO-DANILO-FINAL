---
trigger: always_on
---

# Tech Stack Oficial (Ghost Era)

## Core

- **Framework:** Next.js 16.1+ (App Router).
- **Linguagem:** TypeScript (Strict Mode).
- **Estilização:** Tailwind CSS 4.1.x (Native CSS variables).
- **Runtime:** Node.js >= 22.

## Gráficos & CGI

- **Engine:** React Three Fiber (R3F) 9.5.x / Three.js 0.182.x.
- **Drei:** @react-three/drei 10.x.
- **Post-Processing:** @react-three/postprocessing 3.x.
- **Shaders:** GLSL (custom ShaderMaterial).

## Animação & Motion

- **UI Motion:** Framer Motion 12.x.
- **Complex Timelines:** GSAP 3.14+ (ScrollTrigger).
- **Smooth Scroll:** Lenis 1.3+ (Integrated global instance).

## Infra & Backend

- **CMS/Database:** Supabase (Image/Video hosting via CDN URLs).
- **Auth/Services:** Supabase SSR.
- **Forms:** FormSubmit / Custom API routes.
- **Deploy:** Firebase Hosting / Vercel.

## Estado & Performance

- **Zustand:** 5.x (Para estados globais de UI e sincronização WebGL-React).
- **Optimization:** Dynamic imports para componentes WebGL (`ssr: false`).
- **Assets:** Imagens WebP/SVG e Vídeos via CDN Supabase.
