chmod +x scripts/project-tools.sh
./scripts/project-tools.sh
./scripts/project-tools.sh check-env
./scripts/project-tools.sh install
./scripts/project-tools.sh deep-clean
./scripts/project-tools.sh update-aggressive
./scripts/project-tools.sh full
./scripts/project-tools.sh lint
./scripts/project-tools.sh test
./scripts/project-tools.sh build-check
./scripts/project-tools.sh report


# UPDATE:
(pnpm outdated || [ $? -eq 1 ]) && pnpm dlx npm-check-updates -u && pnpm install


# **DEPLOY OLY HOSTING**

chmod +x scripts/prep-deploy.ts
./scripts/prep-deploy.ts
chmod +x scripts/firebase-preflight.sh
./scripts/firebase-preflight.sh
pnpm run build && npx firebase-tools@latest  deploy --only hosting,functions --debug

