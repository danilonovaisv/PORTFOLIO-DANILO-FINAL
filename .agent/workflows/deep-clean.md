---
description: Deep Code Hygiene Protocol - Identifies and safely quarantines unused code.
---

# Deep Clean Workflow

This workflow executes the Deep Code Hygiene Protocol to remove technical debt.
It identifies files that are both **OLD** (> 6 months) and **UNUSED** (per static analysis),
moves them to a quarantine folder, and verifies system integrity.

## Prerequisites

- `knip` must be installed (`pnpm add -D knip typescript`).
- Scripts in `.agent/scripts/` must be executable.

## Workflow Steps

1. **Safety Check: Git Status**
   Ensure the working directory is clean before proceeding.

   ```bash
   if [ -n "$(git status --porcelain)" ]; then
     echo "❌ Error: Working directory is not clean. Commit or stash changes first."
     exit 1
   fi
   ```

2. **Phase 1: Temporal Analysis (Git Aging)**
   Identify files that haven't been touched in 6 months.

   ```bash
   mkdir -p artifacts
   .agent/scripts/git-aging.sh 6 > artifacts/aging_candidates.txt
   echo "Found $(wc -l < artifacts/aging_candidates.txt) old files."
   ```

3. **Phase 2: Structural Analysis (Knip)**
   Identify files that are not referenced in the code graph.

   ```bash
   # Run knip and extract unused file paths from JSON output
   pnpm knip --reporter json > artifacts/knip_output.json
   # Extract file list using node (or jq if available, using node for portability)
   node -e "const fs = require('fs'); const report = JSON.parse(fs.readFileSync('artifacts/knip_output.json')); const files = report.files || []; console.log(files.join('\n'));" > artifacts/unused_candidates.txt
   echo "Found $(wc -l < artifacts/unused_candidates.txt) unused files."
   ```

4. **Phase 3: Intersection & Filtering**
   Calculate the intersection (Old AND Unused) and filter out Sacred Files.

   ```bash
   # Find common lines
   comm -12 <(sort artifacts/aging_candidates.txt) <(sort artifacts/unused_candidates.txt) > artifacts/intersection.txt
   
   # Filter against deny list rules
   # This is a simplified grep filter based on hygiene-rules.md concepts
   # In a real scenario, we might want a more robust python script for filtering
   # For now, we will exclude common patterns manually here + rules file check
   
   grep -vFf .agent/rules/hygiene-rules.md artifacts/intersection.txt > artifacts/target_files.txt || true
   
   echo "🎯 Target candidates for quarantine: $(wc -l < artifacts/target_files.txt)"
   ```

5. **Phase 4: Quarantine (Safe Move)**
   Move the targeted files to `_backup_clean/`.
   // turbo

   ```bash
   .agent/scripts/safe-move.sh artifacts/target_files.txt _backup_clean
   ```

6. **Phase 5: Verification & Auto-Rollback**
   Build the project. If it fails, UNDO everything immediately.
   // turbo

   ```bash
   echo "🧪 running build verification..."
   if pnpm run build; then
       echo "✅ CLEAN SUCCESSFUL!"
       echo "files are in _backup_clean/. review them before deleting."
   else
       echo "❌ BUILD FAILED. INITIATING AUTO-ROLLBACK."
       .agent/scripts/undo-move.sh _backup_clean
       echo "🔄 Rollback complete. Project restored to original state."
       exit 1
   fi
   ```

## Post-Workflow

- Review the contents of `_backup_clean/`.
- If satisfied, delete `_backup_clean/` and `artifacts/`.
- Commit the removal.
