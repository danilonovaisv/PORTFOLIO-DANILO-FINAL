# Loki Deep Clean Plan

## 1. Context & Motivation
The system was requested to perform `/deep-clean-project` under `/loki-execution-mode` (Autonomous). 
Given that there is a long-running deployment task (`firebase deploy`), this deep clean will purge all transient compilation files, lock files, and node module artifacts, re-install dependencies, and verify the build. This acts as a forensic scrub for the ghost system.

## 2. Simulation (Dry run candidates)
The following will be purged:
- `node_modules/`
- `.next/`
- `out/`
- `.eslintcache`
- `.firebase/`
- `dist/`
- `deploy-public/`
- `pnpm-lock.yaml`

## 3. Execution
- Run `pnpm run clean` (which touches next, out, etc).
- Run `python3 scripts/pnpm_deep_clean.py` (which targets `node_modules`, `pnpm-lock.yaml`, does a pnpm store prune, and reinstalls dependencies with `pnpm install`).
- Validate the process by running `pnpm run build-check`.

## 4. Verification
- Confirm that `build-check` (typecheck & lint) succeeds.

