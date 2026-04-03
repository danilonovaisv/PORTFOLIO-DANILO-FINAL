# REPAIR REPORT — Prompt App menu-template binding incident

## Scope received

The requested intervention targets repository `danilonovaisv/PROMPT-APP` (`@main`) and specific files/services that are **not present** in the current checked-out workspace (`/workspace/PORTFOLIO-DANILO-FINAL`).

Requested targets:

- `src/db/database.ts` (Dexie)
- `src/components/editor/EditorDefinitionForm.tsx`
- `src/components/editor/EditorContextMenuSelector.tsx`
- `src/services/supabasePrompts.ts`
- `src/services/syncService.ts`
- `netlify/edge-functions/*`

## Mandatory-source compliance attempt

### 1) GitHub repository lookup

- The current repository has no configured git remote pointing to `danilonovaisv/PROMPT-APP`.
- Local filesystem search found no matching files or modules for the Prompt App structure.

### 2) Vector Store lookup

- No vector store tool/integration was available in this execution environment to query `vs_69520b1fb834819197e445db9aab8d69`.

### 3) Cross-check result

- With the current workspace content, a direct code fix for the Prompt App cannot be applied safely without fabricating files/architecture.

## Evidence commands executed

```bash
pwd
rg --files | head -n 40
git remote -v
git branch --show-current
rg --files | rg 'src/(db/database.ts|components/editor/EditorDefinitionForm.tsx|components/editor/EditorContextMenuSelector.tsx|services/supabasePrompts.ts|services/syncService.ts|netlify/edge-functions|REPAIR_REPORT.md|PROMPT|prompt|menu)'
rg -n "selected_menu|contextMenus|EditorDefinitionForm|EditorContextMenuSelector|supabasePrompts|syncService|Dexie|prompts" src supabase netlify .context docs
```

## Blocker summary (operational)

1. **Repository mismatch**: workspace is portfolio project, not Prompt App.
2. **No accessible Supabase credentials/context for safe migration execution** from this workspace.
3. **No Netlify site config for ID `2628e92e-47d5-40bb-abaa-be25612b2d56`** available locally.
4. **Vector store access unavailable** in the provided toolchain.

## Ready-to-apply repair blueprint (for the correct Prompt App repo)

> The items below are implementation-ready guidance to apply immediately once the correct repository is mounted.

### A) DB schema + RLS migration (Supabase)

```sql
-- 1) Add menu binding column
alter table public.prompts
add column if not exists selected_menu_ids integer[] not null default '{}';

-- 2) Backfill nulls (defensive)
update public.prompts
set selected_menu_ids = '{}'
where selected_menu_ids is null;

-- 3) Optional: index for containment queries
create index if not exists idx_prompts_selected_menu_ids_gin
on public.prompts
using gin (selected_menu_ids);
```

RLS checklist:

- Ensure policies for `select/insert/update` on `public.prompts` allow authenticated owner to read/write `selected_menu_ids`.
- Confirm no restrictive `with check` clause strips/blocks array writes.

### B) Dexie local schema patch

- Increment Dexie DB version by +1 in `src/db/database.ts`.
- Ensure `prompts` store schema includes `selectedMenuIds` and that mapper to/from Supabase maps:
  - local: `selectedMenuIds: number[]`
  - remote: `selected_menu_ids: number[]`

### C) UI rendering + selection state

In:

- `EditorDefinitionForm.tsx`
- `EditorContextMenuSelector.tsx`

Validate:

1. `contextMenus` list is loaded before render (no silent early-return).
2. Selector displays for edit/create modes.
3. Multi-select callback persists IDs into form state (`selectedMenuIds`).
4. Controlled component receives fallback empty array (`[]`) to avoid uncontrolled state.

### D) Persistence path

In:

- `src/services/supabasePrompts.ts`
- `src/services/syncService.ts`

Guarantee both directions:

- Save/update payload includes `selected_menu_ids`.
- Read path normalizes null/undefined to `[]`.
- Offline sync conflict resolution preserves merged menu IDs.

### E) Netlify + edge functions

- Verify env vars alignment:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - (if server-side) `SUPABASE_SERVICE_ROLE_KEY` (never expose to client bundle)
- Inspect edge functions for payload whitelists/serialization that may omit `selected_menu_ids`.

### F) AI-ready output formatter

Refactor final prompt copy to include only selected menu values in Markdown structure:

- `# ROLE`
- `## CONTEXT`
- `## CONSTRAINTS`
- `## OUTPUT FORMAT`

And dynamically skip sections for unselected menus to reduce token footprint.

## Next action required

Mount or switch to the actual `danilonovaisv/PROMPT-APP` repository in this environment and rerun the repair cycle. Once available, apply concrete code patches and rerun lint/tests/build.
