---
name: expo-developer
description: Expert guidance for building high-performance, cross-platform mobile apps with Expo and React Native.
skills:
  - mobile-design
  - clean-code
  - api-patterns
---

# Expo Developer Skill

> **Context**: Use this skill when building mobile applications with Expo.

## 📱 Tech Stack & core Principles

1. **Framework**: Expo (latest SDK).
2. **Routing**: Expo Router (v3+) - File-based routing similar to Next.js.
3. **Styling**: NativeWind (Tailwind CSS for React Native).
4. **State**: Zustand for global state, React Query for server state.
5. **Language**: TypeScript (Strict Mode).

## 📂 Project Structure (Expo Router)

```text
/app
  _layout.tsx       # Root layout (Provider wrappers)
  index.tsx         # Home screen
  (tabs)/           # Tab navigation group
    _layout.tsx     # Tab navigator config
    home.tsx
    settings.tsx
  [id].tsx          # Dynamic routes
/components
  /ui               # Reusable UI primitives
/hooks              # Custom React hooks
/services           # API services
/assets             # Static assets
```

## 🛠️ Best Practices

### 1. Navigation & Routing

- Use `Stack` and `Tabs` from `expo-router`.
- Avoid React Navigation headers; use customized headers in `_layout.tsx`.
- Use the `<Link />` component or `router.push()` for navigation.

### 2. Styling (NativeWind)

- Use `className` prop for styling.
- Mobile-first approach: `flex-col` is default in RN, but use strictly to align with Tailwind mental model.
- **Safe Area**: Always wrap screen content in `<SafeAreaView>` or use safe-area insets from `react-native-safe-area-context`.

### 3. Performance

- **Images**: ALWAYS use `expo-image` for caching and performance.
- **Lists**: Use `@shopify/flash-list` instead of `FlatList` for large lists.
- **Reanimated**: Use `react-native-reanimated` for complex animations (60fps).
- **Blur**: Use `expo-blur` sparingly (can be expensive on Android).

### 4. Data Fetching

- Use TanStack Query (React Query) for all API calls.
- Handle offline states gracefully (e.g., `useNetInfo`).

## 🧪 Testing

- **Unit**: Jest + React Native Testing Library.
- **E2E**: Maestro (preferred) or Detox.
- **Snapshots**: capture UI states.

## 🚀 Deployment (EAS)

1. **Configure**: `eas.json` for build profiles (dev, preview, production).
2. **Update**: Use `eas update` for OTA updates.
3. **Secrets**: Manage environment variables in EAS Secrets.

## 🚨 Common Pitfalls

- **Web Compatibility**: If targeting Web, ensure libraries support both platforms.
- **Linking**: Ensure native dependencies are correctly linked (Prebuild logic).
- **Fonts**: Load fonts async in `_layout.tsx` using `useFonts` and `SplashScreen`.

---
**Remember to run `npx expo install` for new packages to ensure version compatibility.**
