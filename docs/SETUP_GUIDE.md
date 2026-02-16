# 🚀 Portfolio Setup Guide

## Quick Start (5 minutes)

This guide will help you set up the Danilo Novais Portfolio project and avoid common macOS security issues.

---

## Prerequisites

- **Node.js**: v20.x (check with `node -v`)
- **pnpm**: Latest version (install with `npm install -g pnpm`)
- **Git**: Latest version
- **Supabase Account**: [Create one here](https://supabase.com)

---

## Step 1: Clone & Remove Quarantine Flags

After cloning the repository, macOS may quarantine files downloaded from the internet. This causes `EPERM: operation not permitted` errors.

```bash
# Clone the repository
git clone <repository-url>
cd PORTFOLIO-DANILO-FINAL

# CRITICAL: Remove macOS quarantine flags
xattr -cr .

# Verify quarantine is removed
xattr -l .env.example  # Should show no output
```

**Why this is needed:**
- macOS Gatekeeper quarantines files from untrusted sources
- This blocks Node.js from reading `.env.local`, `.github/`, and `.agent/` directories
- The `xattr -cr .` command recursively removes all quarantine flags

---

## Step 2: Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm run lint        # Should pass with 0 errors
pnpm run typecheck   # Should pass (may take 30-60 seconds)
```

**Troubleshooting:**
- If `typecheck` fails with "heap out of memory", it's already fixed in `package.json`
- If you see EPERM errors, go back to Step 1 and run `xattr -cr .`

---

## Step 3: Configure Environment Variables

### 3.1 Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`, keep this secret!)

### 3.2 Create `.env.local`

**Option A: Copy from backup template**
```bash
cp .env.local.backup .env.local
```

**Option B: Copy from example**
```bash
cp .env.example .env.local
```

### 3.3 Fill in Your Values

Edit `.env.local` and replace the placeholder values:

```bash
# Required for the app to work
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional (if using Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
# ... (see .env.example for full list)
```

### 3.4 Verify Environment Setup

```bash
# This script validates all required variables
pnpm run validate-env

# Should output: "✅ All required environment variables are set"
```

---

## Step 4: Run Development Server

```bash
# Start the dev server
pnpm run dev

# Open in browser
open http://localhost:3000
```

**Expected behavior:**
- Server starts on port 3000
- No EPERM errors
- No "Missing environment variable" errors
- Homepage loads with Ghost animation

---

## Step 5: Verify Build (Optional)

```bash
# Build for production
pnpm run build

# Should complete without errors
# Build output will be in .next/
```

---

## Common Issues & Solutions

### Issue 1: `EPERM: operation not permitted`

**Cause:** macOS quarantine flags on files/directories

**Solution:**
```bash
# Remove all quarantine flags
xattr -cr .

# Verify specific files
xattr -l .env.local  # Should show no output
```

---

### Issue 2: `FATAL ERROR: Reached heap limit`

**Cause:** TypeScript compiler running out of memory

**Solution:** Already fixed in `package.json`. If you still see this:
```bash
# Manually increase heap size
NODE_OPTIONS='--max-old-space-size=8192' pnpm run typecheck
```

---

### Issue 3: `Missing environment variable: NEXT_PUBLIC_SUPABASE_URL`

**Cause:** `.env.local` not created or missing values

**Solution:**
```bash
# Check if file exists
ls -la .env.local

# If missing, create from template
cp .env.local.backup .env.local

# Fill in actual values (see Step 3)
```

---

### Issue 4: Build fails with "Cannot find module"

**Cause:** Dependencies not installed or corrupted

**Solution:**
```bash
# Clean install
rm -rf node_modules .next
pnpm install
pnpm run build
```

---

## Project Structure

```
PORTFOLIO-DANILO-FINAL/
├── .agent/              # AI agent configuration (may be quarantined)
├── .github/             # GitHub workflows (may be quarantined)
├── docs/                # Documentation
│   ├── SETUP_GUIDE.md   # This file
│   └── PORTFOLIO/       # Design system docs
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js 15 App Router
│   ├── components/      # React components
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── .env.local           # Your secrets (DO NOT COMMIT)
├── .env.example         # Template
└── package.json         # Dependencies
```

---

## Development Workflow

### Daily Development
```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
pnpm install

# 3. Start dev server
pnpm run dev
```

### Before Committing
```bash
# 1. Run linting
pnpm run lint

# 2. Run type checking
pnpm run typecheck

# 3. Run tests (if available)
pnpm run test

# 4. Format code
pnpm run format
```

### Deploying to Production
```bash
# 1. Build locally to verify
pnpm run build

# 2. Test production build
pnpm run start

# 3. Deploy (Firebase/Vercel/etc.)
pnpm run deploy
```

---

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Use environment variables for all secrets
- Run `xattr -cr .` after cloning
- Use `pnpm` instead of `npm` for consistency
- Keep dependencies updated

### ❌ DON'T:
- Commit `.env.local` to git
- Share your `SUPABASE_SERVICE_ROLE_KEY` publicly
- Disable TypeScript strict mode
- Skip the quarantine removal step
- Use `npm` (project uses `pnpm`)

---

## Performance Tips

### TypeScript Type Checking
- Current setup: 8GB heap allocation (handles 341 files)
- If you add 100+ more files, consider increasing to 12GB
- Incremental compilation is disabled due to quarantine issues

### Build Optimization
- Production builds are optimized automatically
- WebGL assets are lazy-loaded
- Images use Next.js Image optimization

---

## Getting Help

### Check Documentation
1. `docs/PORTFOLIO/GHOST-DESIGN-SYSTEM.md` - Design system
2. `.agent/rules/` - Development rules (if accessible)
3. `README.md` - Project overview

### Debug Mode
```bash
# Run with verbose logging
DEBUG=* pnpm run dev

# Check build info
cat public/build-info.json
```

### Common Commands
```bash
pnpm run dev           # Start dev server
pnpm run build         # Build for production
pnpm run lint          # Run ESLint
pnpm run typecheck     # Run TypeScript compiler
pnpm run format        # Format code with Prettier
pnpm run analyze       # Run lint + typecheck
```

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Ran `xattr -cr .` to remove quarantine flags
- [ ] Installed dependencies with `pnpm install`
- [ ] Created `.env.local` with actual Supabase values
- [ ] Ran `pnpm run validate-env` successfully
- [ ] Node.js version is 20.x (`node -v`)
- [ ] Using `pnpm` not `npm`
- [ ] No EPERM errors when running commands
- [ ] `.env.local` is NOT committed to git

---

## Next Steps

After setup is complete:

1. **Explore the codebase**: Start with `src/app/page.tsx`
2. **Read the design system**: `docs/PORTFOLIO/GHOST-DESIGN-SYSTEM.md`
3. **Check the rules**: `.agent/rules/GEMINI.md` (if accessible)
4. **Run the dev server**: `pnpm run dev`
5. **Make your first change**: Edit a component and see hot reload

---

## Support

For issues specific to this project:
- Check `docs/` directory for documentation
- Review `.context/logs/adjustment_log.md` for recent changes
- Run `/debug` workflow if using AI assistant

For general Next.js/React issues:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)

---

**Last Updated:** 2026-02-11  
**Version:** 1.0.0  
**Maintainer:** Ghost Commander
