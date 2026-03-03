---
name: agent-project-guidelines-example
description: Project Guidelines Skill (Example)
author: affaan-m
version: 4.1.0-fractal
---

# Project Guidelines Skill (Example)

This is an example of a project-specific skill. Use this as a template for your own projects.

Based on a real production application: [Zenith](https://zenith.chat) - AI-powered customer discovery platform.

---

## When to Use

Reference this skill when working on the specific project it's designed for. Project skills contain:

- Architecture overview
- File structure
- Code patterns
- Testing requirements
- Deployment workflow

---

## Architecture Overview

**Tech Stack:**

- **Frontend**: Next.js 15 (App Router), TypeScript, React
- **Backend**: FastAPI (Python), Pydantic models
- **Database**: Supabase (PostgreSQL)
- **AI**: Agent API with tool calling and structured output
- **Deployment**: Google Cloud Run
- **Testing**: Playwright (E2E), pytest (backend), React Testing Library

**Services:**

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  Next.js 15 + TypeScript + TailwindCSS                     │
│  Deployed: Vercel / Cloud Run                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│  FastAPI + Python 3.11 + Pydantic                          │
│  Deployed: Cloud Run                                       │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Supabase │   │  Agent  │   │  Redis   │
        │ Database │   │   API    │   │  Cache   │
        └──────────┘   └──────────┘   └──────────┘
```

---

## File Structure

```
project/
├── frontend/
│   └── src/
│       ├── app/              # Next.js app router pages
│       │   ├── api/          # API routes
│       │   ├── (auth)/       # Auth-protected routes
│       │   └── workspace/    # Main app workspace
│       ├── components/       # React components
│       │   ├── ui/           # Base UI components
│       │   ├── forms/        # Form components
│       │   └── layouts/      # Layout components
│       ├── hooks/            # Custom React hooks
│       ├── lib/              # Utilities
│       ├── types/            # TypeScript definitions
│       └── config/           # Configuration
│
├── backend/
│   ├── routers/              # FastAPI route handlers
│   ├── models.py             # Pydantic models
│   ├── main.py               # FastAPI app entry
│   ├── auth_system.py        # Authentication
│   ├── database.py           # Database operations
│   ├── services/             # Business logic
│   └── tests/                # pytest tests
│
├── deploy/                   # Deployment configs
├── docs/                     # Documentation
└── scripts/                  # Utility scripts
```

---

## Code Patterns

## 🧠 Knowledge Modules (Fractal Skills)

### 1. [API Response Format (FastAPI)](./sub-skills/api-response-format-fastapi.md)

### 2. [Frontend API Calls (TypeScript)](./sub-skills/frontend-api-calls-typescript.md)

### 3. [Agent AI Integration (Structured Output)](./sub-skills/agent-ai-integration-structured-output.md)

### 4. [Custom Hooks (React)](./sub-skills/custom-hooks-react.md)

### 5. [Backend (pytest)](./sub-skills/backend-pytest.md)

### 6. [Frontend (React Testing Library)](./sub-skills/frontend-react-testing-library.md)

### 7. [Pre-Deployment Checklist](./sub-skills/pre-deployment-checklist.md)

### 8. [Deployment Commands](./sub-skills/deployment-commands.md)

### 9. [Environment Variables](./sub-skills/environment-variables.md)
