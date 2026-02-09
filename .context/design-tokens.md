# Ghost System Design Tokens

> **Source of Truth**: `src/app/globals.css`
> **Last Synced**: 2026-02-09

## 🎨 Colors

| Token                   | Value     | Role                                                  |
| :---------------------- | :-------- | :---------------------------------------------------- |
| `--color-bluePrimary`   | `#0048ff` | **Brand Core** (Ghost Blue)                           |
| `--color-blueAccent`    | `#4fe6ff` | Highlights / Energy                                   |
| `--color-background`    | `#040013` | **Void** (Main BG)                                    |
| `--color-text`          | `#fcffff` | Primary Text                                          |
| `--color-textInverse`   | `#0e0e0e` | Dark Text on Light                                    |
| `--color-purpleDetails` | `#8705f2` | **[FLAGGED]** Potential Violation of "No Purple" Rule |
| `--color-pinkDetails`   | `#f501d3` | Accents                                               |

## Typography

| Alias    | Font Family                 |
| :------- | :-------------------------- |
| `sans`   | `TT Norms Pro`, `system-ui` |
| `mono`   | `PPSupplyMono`, `monospace` |
| `outfit` | `Outfit`                    |

## Fluid Typography (Clamp)

- **Display**: `clamp(2.5rem, 5vw, 4.5rem)`
- **H1**: `clamp(2rem, 4vw, 3.5rem)`
- **H2**: `clamp(1.5rem, 3vw, 2.5rem)`
- **Body**: `clamp(1rem, 1.2vw, 1.125rem)`

## 📐 Layout

- **Container Padding**: `clamp(24px, 5vw, 96px)`
- **Grid Strategy**: `.std-grid` (Mobile: 24px, Tablet: 48px, Desktop: 96px)
- **Max Width**: `1680px`

## 🧩 Component Sizes

- **Ghost Card Height (Desktop)**: `480px`
- **Ghost Card Aspect (Mobile)**: `5 / 4`
- **Touch Target**: `min 48px`
