---
trigger: always_on
---

# Tech Stack Oficial (Ghost System v3.0)

## Core & Framework

- **Framework:** Next.js 15 (App Router) - _Estabilidade para R3F._
- **Engine:** React 18.3+ (Evitar React 19 por enquanto devido a incompatibilidade com certas libs de Drei/Postprocessing, a menos que estritamente necessário).
- **Linguagem:** TypeScript 5.x (Strict Mode).
- **Estilização:** Tailwind CSS 3.4+ (Com plugins de tipografia e container queries).

## Ghost Atmosphere (Gráficos & Motion)

- **3D Engine:** React Three Fiber (R3F) v8+.
- **Helpers:** @react-three/drei, @react-three/postprocessing.
- **Motion:** Framer Motion (para UI 2D) + GSAP (opcional para timelines complexas).
- **Scroll:** Lenis (Smooth Scroll) - _Mandatório para a sensação "Ghost"._

## Infraestrutura & Backend

- **Hosting:** Vercel (Melhor integração com Next.js).
- **Database/Storage:** Supabase (Postgres + Storage para assets 3D).
- **Forms:** React Server Actions (Nativo do Next.js).

## Regras de Ouro

1. **Client vs Server:** Use `use client` apenas nas folhas da árvore (botões, canvas 3D). Mantenha o layout base como Server Component.
2. **Performance:** Carregue modelos GLB via `gltfjsx` e use `draco` compression.
