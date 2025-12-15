---
trigger: always_on
---

---

## activation: always_on

Stack obrigatória:

- Next.js (App Router)
- React 18+
- TypeScript strict
- Tailwind CSS
- Framer Motion
- React Three Fiber
- @react-three/drei
- Zustand (estado global)
- Lenis (scroll suave)
- Supabase (assets)

Padrões:

- Server Components por padrão
- Client Components apenas quando necessário (motion, canvas, scroll)
- Separar claramente UI / Motion / Logic
- Nunca misturar lógica de scroll DOM com lógica de WebGL sem coordenação
