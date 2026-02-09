---
description: Master Protocol for project hygiene, structure cleanup, and deep cleaning.
---

# 🧹 Clean Architecture Protocol

**"The Janitor"**
Systematic cleaning and reorganization of the codebase.

## Scope

- Removing dead code.
- Organizing imports.
- Standardizing file names.
- Archiving old docs.

## Steps

1. **Dead File Detection**
   - Identify files not imported by any other file (excluding `app/` pages and `api/` routes).
   - Move suspect files to `_TRASH_BIN/` (create if needed) before deleting.

2. **Structure Enforcement**
   - **Components**: Ensure they are in `src/components/[feature]/`.
   - **Styles**: Ensure duplicate CSS is merged into Tailwind classes.
   - **Assets**: Check for unused images in `public/`.

3. **Import Audit**
   - Convert relative `../../` imports to absolute `@/` imports.

4. **Documentation Pruning**
   - Move completed plans to `docs/plans/archive/`.
   - Delete temporary logs.

5. **Final Polish**
   - Run `npm run format` (Prettier) to standardize code style.
