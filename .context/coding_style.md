# 🛠️ Coding Style & Standards

## 1. Core Principles

- **Functional Components**: Only use functional components with hooks.
- **Strict Typing**: TypeScript is mandatory. Use `interface` for props and explicit types for state.
- **Atomic Commits**: Use conventional commits (`feat:`, `fix:`, `docs:`, etc.).

## 2. Next.js Patterns

- **App Router**: Statically prefer the `app/` directory.
- **Server Components**: Use Server Components by default. Use `"use client"` only when necessary for interactivity or 3D.
- **Absolute Imports**: Use `@/` prefix for all imports.

## 3. Styling & Motion

- **Tailwind CSS**: Use utility classes. No inline styles (unless dynamic performance requires it).
- **Framer Motion**: Follow the "Ghost Easing" `[0.22, 1, 0.36, 1]`.
- **Z-Index**: Adhere to the defined hierarchy in `GHOST-DESIGN-SYSTEM.md`.

## 4. 3D & Performance

- **R3F**: Optimize loops. Avoid allocations in `useFrame`.
- **Asset Loading**: Always use `Suspense` and preloading for GLB/Textures.
