# Supabase Schema Architecture v2 (Ghost System)

**Goal:** Realtime, cost-effective content management for the portfolio.
**Constraint:** Zero Deploy for content updates.

## 1. Core Tables

### `public.projects`

The main entity. Stores all portfolio work.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (Default: `gen_random_uuid()`) |
| `slug` | `text` | Unique URL identifier (Indexed) |
| `title` | `text` | Project Title |
| `client` | `text` | Client Name |
| `category` | `text` | Enum: `branding`, `web`, `motion` |
| `cover_image` | `text` | URL to optimized Supabase Storage asset |
| `layout_config` | `jsonb` | Grid spans, aspect ratio, responsive rules |
| `content` | `jsonb` | Rich text, gallery images, video URLs (The Project Detail) |
| `is_featured` | `boolean` | Featured on Home? |
| `status` | `text` | Enum: `draft`, `published`, `archived` |
| `published_at` | `timestamptz` | Date for sorting |
| `updated_at` | `timestamptz` | Date for cache validation |

### `public.experiences`

Work history and About Me data.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `role` | `text` | Job Title |
| `company` | `text` | Company Name |
| `period` | `text` | e.g. "2023 - Present" |
| `description` | `text` | Short summary |
| `order` | `integer` | Display order |

### `public.settings`

Global toggles and feature flags.

| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | `text` | PK (e.g. `maintenance_mode`, `hero_video_url`) |
| `value` | `jsonb` | Flexible value |

### `public.audit_logs` (Admin Only)

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `admin_email` | `text` | Who did it |
| `action` | `text` | `UPDATE_PROJECT`, `LOGIN`, etc. |
| `details` | `jsonb` | Diff or changes |
| `created_at` | `timestamptz` | Timestamp |

## 2. Realtime Strategy

> **Constraint:** Supabase Realtime has connection limits and costs.

### Channel: `global_sync`

- **Tables:** `projects`, `settings`.
- **Events:** `INSERT`, `UPDATE`, `DELETE`.
- **Filter:** `status=eq.published`.

### Optimization (Cost Control)

1. **Frontend Cache:**
    - Use `Zustand` store initialized with `SWR` or `getStaticProps` (ISR) data.
    - Realtime is *only* for the delta updates while the user is engaging.
2. **Debounce:**
    - The Admin Panel saves changes with a 1.5s debounce to avoid flooding `UPDATE` events.
3. **No `audit_logs` Subscription:**
    - Logs are write-only or fetch-on-demand. No Realtime needed.

## 3. Row Level Security (RLS)

- **Projects/Experiences/Settings:**
  - `SELECT`: Public (anon).
  - `INSERT/UPDATE/DELETE`: Authenticated Admin ONLY.
- **Audit Logs:**
  - `SELECT`: Authenticated Admin ONLY.
  - `INSERT`: Authenticated Admin OR Service Role (Server).

## 4. Storage Structure

Buckets:

- `portfolio-assets`: Public. images, videos.
- `ghost-assets`: System textures (optimized).
