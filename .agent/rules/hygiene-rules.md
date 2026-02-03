# Deep Hygiene Protocol - Sacred Rules (Deny List)

This file defines the immutable rules for the Deep Cleaning Protocol.
Files matching these patterns MUST NEVER be moved, deleted, or quarantined,
regardless of their age or usage status.

## 🛡️ Infrastructure & Config (Critical)

- .env*
- .gitignore
- .npmrc
- firebase.json
- firestore.rules
- firestore.indexes.json
- storage.rules
- database.rules.json
- next.config.*
- tsconfig.json
- package.json
- pnpm-lock.yaml
- tailwind.config.*
- postcss.config.*
- .eslintrc*
- .prettierrc*
- jest.config.*
- playwright.config.*
- knip.json
- knip.ts

## 🐳 Docker & CI/CD

- Dockerfile*
- docker-compose*
- .github/**
- .gitlab-ci.yml

## 🤖 Agent System (The Brain)

- .agent/**
- _backup_clean/**
- scripts/**

## 💾 Data & Migrations

- migrations/**
- seed/**
- prisma/**

## 🎨 Global Assets & Critical UI

- src/app/globals.css
- src/styles/**
- public/manifest.json
- public/robots.txt
- public/sitemap.xml
- public/favicon.ico

# ⚠️ Special Exceptions

- **README.md**: Should always remain.
- **LICENSE**: Should always remain.
