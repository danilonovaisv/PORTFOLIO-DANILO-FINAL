# Architecture Guidelines

## Next.js App Router

### Estrutura de Rotas

```
app/
├── (routes)/           # Rotas públicas
│   ├── page.tsx       # Homepage
│   ├── sobre/         # Página sobre
│   └── portfolio/     # Portfolio
├── admin/             # Área administrativa
│   ├── layout.tsx     # Layout do admin
│   └── ...
└── api/               # API Routes
```

### Server vs Client Components

**Server Components (padrão)**

- Buscar dados
- Acessar recursos do backend
- Manter informações sensíveis no servidor
- Reduzir JavaScript no cliente

**Client Components ('use client')**

- Interatividade (onClick, onChange, etc)
- Hooks do React (useState, useEffect, etc)
- Hooks do navegador (usePathname, useSearchParams)
- Bibliotecas que dependem do navegador

## State Management

### Zustand (Global State)

```typescript
// Para estado global compartilhado
import { create } from 'zustand';

interface Store {
  user: User | null;
  setUser: (user: User) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### React Hooks (Local State)

```typescript
// Para estado local de componentes
const [isOpen, setIsOpen] = useState(false);
```

## Data Fetching

### Server Components

```typescript
// Fetch direto no Server Component
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Cache por 1 hora
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### Client Components

```typescript
// Usar hooks ou SWR/React Query
'use client';

import { useEffect, useState } from 'react';

export function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data?.title}</div>;
}
```

## Firebase & Supabase

### Firebase

- Hosting
- Functions (backend serverless)
- Authentication (se necessário)

### Supabase

- Storage de assets (imagens, vídeos)
- Database (PostgreSQL)
- Real-time subscriptions

## 3D e Animações

### Three.js / React Three Fiber

```typescript
// Sempre em Client Components
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function Scene3D() {
  return (
    <Canvas>
      <OrbitControls />
      {/* 3D content */}
    </Canvas>
  );
}
```

### GSAP / Framer Motion

```typescript
// Client Components para animações
'use client';

import { motion } from 'framer-motion';

export function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

## Performance

### Image Optimization

```typescript
import Image from 'next/image';

// Sempre usar next/image para otimização
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Para imagens above-the-fold
/>
```

### Code Splitting

```typescript
// Lazy loading de componentes pesados
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Desabilitar SSR se necessário
});
```

### Fonts

```typescript
// Usar next/font para otimização
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```
