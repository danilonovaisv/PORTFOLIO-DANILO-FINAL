# Standard Project Folder Structure

Use this as the canonical ASCII tree for every generated project. Adapt based on user's project scope.

## Full Production Tree

```
my-project/
├── .env.local.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── firebase.json
├── .firebaserc
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
│
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx          # Marketing layout (minimal nav)
│   │   ├── page.tsx            # Home page (Server Component)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── work/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx          # Admin layout (authenticated)
│   │   └── admin/
│   │       └── page.tsx
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Root loading UI
│   ├── not-found.tsx           # 404 page
│   └── error.tsx               # Root error boundary
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   └── index.ts
│   ├── 3d/
│   │   ├── Scene.tsx           # Main R3F Canvas wrapper
│   │   ├── FloatingObject.tsx  # Example R3F mesh
│   │   ├── Environment.tsx     # Lighting & environment
│   │   └── index.ts
│   └── providers/
│       ├── Providers.tsx       # Combines all context providers
│       └── index.ts
│
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useScrollProgress.ts
│   ├── useIntersection.ts
│   └── useSupabase.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client (SSR)
│   │   └── storage.ts          # Storage helpers
│   ├── firebase/
│   │   └── config.ts           # Firebase app init
│   └── utils.ts                # Shared utilities (cn, formatDate, etc.)
│
├── types/
│   └── index.ts                # All shared TypeScript interfaces
│
├── styles/
│   └── animations.css          # Custom CSS animations (minimal)
│
└── public/
    ├── fonts/                  # Self-hosted fonts (if any)
    ├── images/
    │   └── og-image.jpg        # OpenGraph image
    └── models/                 # .glb / .gltf 3D models
```

## Key Architectural Notes

- **Route Groups** `(marketing)` and `(admin)` allow different layouts without affecting URL structure
- **`components/3d/`** is isolated from UI components — always dynamically imported
- **`lib/supabase/`** has separate client/server files because SSR requires different client configs
- **`types/index.ts`** is the single source of truth for all shared interfaces
- **`public/models/`** stores .glb files loaded by Three.js — optimize with gltf-pipeline
