# Hosting incident correction plan — portfoliodanilo.com

## Confirmed facts

- `https://portfoliodanilo.com` returns `HTTP/2 503`.
- The response passes through Cloudflare, but includes Firebase Hosting/Fastly evidence: `fastly-restarts`, `x-served-by`, and `vary: x-fh-requested-host`.
- `https://portfolio-danilo-novais.web.app` also returns `HTTP/2 503`, confirming that the Firebase origin is unhealthy independently of the custom domain.
- `https://www.portfoliodanilo.com` redirects to `https://portfoliodanilo.com/portfoliodanilo.com/`, which is a separate bad redirect rule.
- Firebase MCP sees active project `portfolio-danilo-novais`, billing enabled, and authenticated user, but reports no `firebase.json` in the current project directory.
- The project source of truth says the active hosting target is Cloudflare Workers with OpenNext.
- Root `wrangler.toml` exists and points to `.open-next/worker.js` with assets in `.open-next/assets`.
- Root `firebase.json` and `.firebaserc` are not active; archived copies exist in `scripts/archive/firebase/`.
- `.github/workflows/cloudflare-deploy.yml` exists locally with the correct Worker deployment shape, but was ignored by `.gitignore` and not versioned in `HEAD`.
- `.github/workflows/firebase-deploy.yml` was still active on `push` even though Firebase configuration was archived.
- `.github/workflows/firebase-hosting-pull-request.yml` exists locally but is ignored and not versioned in `HEAD`; it is not treated as an active GitHub workflow until explicitly tracked.

## Root cause

The production incident is not caused by React, Next.js page code, or the mobile menu fix. The live domain is still effectively backed by a failing Firebase Hosting origin while the repository has moved its intended production target to Cloudflare Workers/OpenNext.

The CI/CD state was split:

1. Cloudflare is the intended target, but its workflow was not tracked by Git.
2. The only tracked production hosting workflow still tried to deploy Firebase from a root that no longer contains active Firebase Hosting config.
3. DNS/custom domain routing still reaches a Firebase-style origin path for the apex domain.

## Correction already applied in repository config

1. `.github/workflows/cloudflare-deploy.yml`
   - Align Node with project runtime: `22`.
   - Align pnpm with the existing Firebase workflow baseline: `10.33.0`.
   - Use Wrangler action command `deploy`.
   - Allow this specific workflow through `.gitignore` so it can be tracked.

2. `.github/workflows/firebase-deploy.yml`
   - Remove automatic deploy on `push` to `main`.
   - Keep `workflow_dispatch` for manual recovery only.

## Manual Cloudflare account correction required

These steps require Cloudflare account access and must not be executed blindly from the repo:

1. Confirm the Worker name `portfolio-danilo-final` exists in Cloudflare Workers & Pages.
2. Confirm the latest GitHub Actions Cloudflare deploy has run successfully after the workflow fix.
3. In the Worker triggers/custom domains, bind:
   - `portfoliodanilo.com`
   - `www.portfoliodanilo.com`
4. Remove or correct any Cloudflare redirect/page rule that sends `www.portfoliodanilo.com` to `/portfoliodanilo.com/`.
5. Confirm DNS records no longer route apex/www to the old Firebase Hosting target.
6. Keep SSL/TLS mode compatible with Cloudflare-managed Worker custom domains.

## Firebase/GCloud recovery path

Use this only if the desired production target is Firebase again:

1. Restore `scripts/archive/firebase/firebase.json` to root `firebase.json`.
2. Restore `scripts/archive/firebase/.firebaserc` to root `.firebaserc`.
3. Restore or replace the missing `firebase:preflight` script referenced by `.github/workflows/firebase-deploy.yml`.
4. Run `pnpm run build-check`.
5. Run `pnpm run build`.
6. Deploy with `FIREBASE_CLI_EXPERIMENTS=webframeworks firebase deploy --only hosting --project portfolio-danilo-novais`.
7. Repoint Cloudflare DNS/custom domain intentionally to Firebase Hosting.

This path is not recommended while `.context/active_state.md` declares Cloudflare Workers as the active target.

## Validation plan

After the Cloudflare workflow runs:

```bash
curl -I -L --max-time 20 https://portfoliodanilo.com
curl -I -L --max-time 20 https://www.portfoliodanilo.com
curl -I -L --max-time 20 https://portfolio-danilo-final.<account-subdomain>.workers.dev
```

Expected:

- Apex returns `HTTP 200` or intentional `3xx` to a valid canonical URL.
- `www` redirects only to `https://portfoliodanilo.com/`.
- No response includes the Firebase 503 body.
- No route redirects to `/portfoliodanilo.com/`.

## Rollback

- Revert the workflow changes if Cloudflare is not the selected hosting target.
- If returning to Firebase, restore `firebase.json`, `.firebaserc`, and a valid Firebase preflight script before re-enabling automatic Firebase deploys.
- Do not change DNS until a deploy target is confirmed healthy by direct provider URL.

## Open risks

- Cloudflare MCP/account tools were not available in this Codex session; DNS/custom domain state was inferred from HTTP/DNS evidence and local config.
- Firebase MCP confirms project context, but not Hosting release health.
- The working tree had unrelated local changes before this correction; they were preserved.
