# 🚨 Emergency Rescue Plan: Fix Environment Permissions

**Date:** 2026-02-14
**Agent:** Ghost Commander (Loki Mode)
**Status:** BLOCKED_BY_ENVIRONMENT

## 1. Diagnostics (Symptom Analysis)

- **Error:** `EPERM: operation not permitted` on `node_modules`.
- **Context:** Occurs during `npm run test`, `pnpm run lint`, and `python3 scripts/clean_project.py`.
- **Root Cause:** The `node_modules` directory has restricted permissions (likely owned by `root` or locked by a crashed process), preventing the current user (`danilonovais`) from modifying or reading it.

## 2. Immediate Action Plan (User Intervention Required)

**Since the agent lacks `sudo` privileges, you must execute the following commands in your terminal:**

### Step 1: Claim Ownership & Clean

This forces ownership of all files to your user and nukes the corrupted dependency folder.

```bash
# 1. Claim ownership of the entire directory (prevents EPERM)
sudo chown -R $(whoami) .

# 2. Force remove the corrupted node_modules and lockfiles
rm -rf node_modules pnpm-lock.yaml .next
```

### Step 2: Reinstall Dependencies

Use `pnpm` as configured in `package.json`.

```bash
# 3. Reinstall fresh dependencies
pnpm install
```

### Step 3: Verify Fix

Run the test suite to confirm the environment is healthy.

```bash
# 4. Verify
npx jest test/components/portfolio/PortfolioHeroNew.test.tsx
```

## 3. Post-Fix Autonomous Plan (Loki)

Once the environment is unlocked, the Agent will resume:

1. **Execute Tests:** Validate `PortfolioHeroNew.test.tsx`.
2. **Lint Check:** Ensure no regressions in code style.
3. **Deploy:** Proceed with `firebase deploy` if all checks pass.

**Action Required:** specific manual execution of Step 2.
