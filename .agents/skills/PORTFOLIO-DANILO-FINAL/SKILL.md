---
name: PORTFOLIO-DANILO-FINAL
description: Development patterns, coding conventions, and workflows for the PORTFOLIO-DANILO-FINAL repository.
---

# PORTFOLIO-DANILO-FINAL Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the core development patterns, coding conventions, and workflows used in the `PORTFOLIO-DANILO-FINAL` repository. The project is a Python/Next.js portfolio application with a focus on modular React components, robust admin features, and modern DevOps practices. You will learn how to contribute features, update dependencies, manage database migrations, and enforce code health standards using the established conventions and workflows.

---

## Coding Conventions

**File Naming**

- Use **PascalCase** for component and module files.
  - Example: `UserProfile.tsx`, `AdminDashboard.tsx`

**Import Style**

- Use **aliases** for imports to improve clarity and maintainability.
  - Example:
    ```typescript
    import { Button } from '@/components/Button';
    import { getUser } from '@/lib/user-utils';
    ```

**Export Style**

- Use **named exports** for all modules and components.
  - Example:
    ```typescript
    // src/components/Button.tsx
    export const Button = () => {
      /* ... */
    };
    ```

**Commit Messages**

- Use prefixes: `feat`, `fix`, `chore`, `docs`
- Average commit message length: ~74 characters
  - Example: `feat: add accessibility support to ContactForm component`

---

## Workflows

### Feature Development with Component and Style Update

**Trigger:** When adding, improving, or refactoring a UI component or feature (e.g., accessibility, performance, design system alignment).  
**Command:** `/feature-ui`

1. Edit or create one or more component files in `src/components/...`
2. Optionally update related files (e.g., hooks, utils, or `lib/...`)
3. Update build info in `public/build-info.json`
4. Update configuration or lockfiles (`package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `jest.config.cjs`)
5. Optionally update documentation or context files

**Example:**

```typescript
// src/components/AccessibleButton.tsx
export const AccessibleButton = ({ label, ...props }) => (
  <button aria-label={label} {...props}>{label}</button>
);
```

---

### Admin Section Hardening or Feature Update

**Trigger:** When adding, fixing, or securing an admin panel feature (e.g., landing pages, scene generator, settings).  
**Command:** `/admin-feature`

1. Edit files in `src/app/admin/(protected)` and/or `src/lib/admin/...`
2. Update related components (e.g., `DeleteLandingPageButton`, validation, authz)
3. Update context documentation (`.context/DOCS-PORTFOLIO-PAGES/04-ADMIN/...`)
4. Optionally update audit docs (`docs/AUDIT_PENTEST.md`, `docs/AUDIT_EXECUTION_PLAN.md`)
5. Optionally update `package.json`, `pnpm-lock.yaml`

**Example:**

```typescript
// src/lib/admin/validateUser.ts
export const validateUser = (user) => user.role === 'admin';
```

---

### Dependency Update and Build Info Refresh

**Trigger:** When updating dependencies, refreshing build metadata, or regenerating audit reports.  
**Command:** `/update-deps`

1. Update `package.json` and `pnpm-lock.yaml`
2. Update `public/build-info.json`
3. Optionally update `next-env.d.ts` or `tsconfig.json`
4. Optionally update audit or report files (`reports/...`, `docs/...`)

**Example:**

```json
// public/build-info.json
{
  "version": "1.2.3",
  "buildDate": "2024-06-10T12:34:56Z"
}
```

---

### Database Table Addition with Edge Function Update

**Trigger:** When adding a new database table and updating corresponding serverless/edge logic.  
**Command:** `/new-table`

1. Create a new migration file in `supabase/examples/edge-functions/supabase/migrations/`
2. Update or create the corresponding edge function in `supabase/examples/edge-functions/supabase/functions/`
3. Optionally update types or documentation

**Example:**

```sql
-- supabase/examples/edge-functions/supabase/migrations/20240610_add_projects.sql
CREATE TABLE projects (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

---

### Code Health: Console.warn to Logger Refactor

**Trigger:** When standardizing logging practices and improving code health.  
**Command:** `/refactor-logger`

1. Create or update logger utility (`src/lib/logger.ts`)
2. Refactor files to use logger instead of `console.warn` (e.g., `src/lib/media-utils.ts`, `src/lib/admin/server-access.ts`, `src/config/ghostConfig.ts`)
3. Update or add related tests to spy on logger (`test/unit/*.test.ts`, `test/components/**/*.test.tsx`)

**Example:**

```typescript
// src/lib/logger.ts
export const logger = {
  warn: (msg: string) => {
    // Custom logging logic
    console.warn(`[WARN]: ${msg}`);
  },
};

// src/lib/media-utils.ts
import { logger } from './logger';
export const processMedia = (file) => {
  if (!file) {
    logger.warn('No file provided');
  }
  // ...
};
```

---

## Testing Patterns

- **Framework:** Playwright
- **Test File Pattern:** `*.test.ts`
- **Location:** Typically under `test/unit/` or `test/components/`
- **Example:**

  ```typescript
  // test/components/AccessibleButton.test.ts
  import { test, expect } from '@playwright/test';
  import { AccessibleButton } from '@/components/AccessibleButton';

  test('AccessibleButton renders with correct label', async () => {
    // ...test logic
  });
  ```

---

## Commands

| Command          | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| /feature-ui      | Start a new UI feature or component update workflow         |
| /admin-feature   | Add or update an admin section feature                      |
| /update-deps     | Update dependencies and refresh build/audit info            |
| /new-table       | Add a new database table and update edge/serverless logic   |
| /refactor-logger | Refactor code to use logger utility instead of console.warn |
