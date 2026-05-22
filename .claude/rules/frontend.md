---
trigger: glob
glob: '**/*.{js,jsx,ts,tsx,css,scss,html,vue,svelte,dart,swift,kt,xml}'
---

# FRONTEND.MD - Client-Side Mastery

> **Mục tiêu**: Quản lý thống nhất Giao diện Web & Mobile. Một nguồn chân lý cho trải nghiệm người dùng.

---

## 🎨 1. PREMIUM UX/UI (Ref: .shared/ui-ux-pro-max/AESTHETICS.md)

1. **Aesthetics**: Màu sắc HSL tinh chỉnh, Typography chuẩn (Inter/Roboto). Tuân thủ Glassmorphism 2.0.
2. **Spacing**: Hệ thống lưới 4px/8px. Whitespace là sang trọng.
3. **Feedback**: Mọi tương tác (Click, Tap) đều phải có phản hồi thị giác ngay lập tức (Framer Motion).

---

## 📱 2. MOBILE & RESPONSIVE

1. **Touch Targets**: Button tối thiểu 44x44px (Chuẩn ngón tay cái).
2. **Safe Areas**: Tôn trọng tai thỏ (Notch) và Home Indicator trên iOS/Android.
3. **Mobile-First**: Code CSS cho mobile trước, override cho PC sau.

---

## ⚡ 3. PERFORMANCE DOMAIN

1. **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, FID < 100ms.
2. **Optimistic UI**: Cập nhật giao diện TRƯỚC khi API trả về (Zalo/Facebook style).
3. **Asset Optimization**: Ảnh WebP, Video lazy-load.

---

## 🛡️ 4. STATE & COMPONENT

1. **Atomic Design**: Component nhỏ, tái sử dụng cao (`<Button />`, `<INPUT />`).
2. **State**: Server State (TanStack Query) !== Client State (Zustand/Context). Tách biệt rõ ràng.
