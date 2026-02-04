# Plan: Antigravity AI Implementation

## Context

Create a new "Antigravity Agents" section in the Admin panel to license creativity workflow tools using AI (OpenAI/Gemini).

## Objectives

1. Add new "Antigravity AI" section to Admin.
2. Implement **Portfolio Copy Agent** (Text Generation).
3. Implement **Ad Scene Generator** (Image Generation).
4. Ensure seamless integration with existing Admin Shell and Design System.

## Architecture & Tech Stack

- **Framework**: Next.js App Router (Server Components + Client Components).
- **Styling**: Tailwind CSS + Shadcn UI (match existing admin design).
- **AI**: OpenAI API (GPT-4o for text, DALL-E 3 for images).
- **State**: React Server Actions for API calls.

## Phase 1: Foundation & Navigation

- [ ] **Dependencies**: Install `openai`.
- [ ] **Config**: Add `antigravity` to `src/config/admin-navigation.ts`.
- [ ] **Shell**: Update `src/components/admin/AdminShell.tsx` with new navigation item (Icon: Sparkles/Bot).

## Phase 2: Feature Implementation

### 2.1 Dashboard (`/admin/antigravity`)

- [ ] Create page with 2 selection cards:
  - Portfolio Copy Agent
  - Ad Scene Generator

### 2.2 Portfolio Copy Agent (`/admin/antigravity/copy-agent`)

- [ ] **UI**: Form with:
  - Context input (Textarea).
  - Project Images (Upload/URL) - *Optional implementation first iteration*.
  - "Generate" button.
- [ ] **Action**: `generateProjectCopy(data)`
  - Inject "SYSTEM PROMPT — PORTFOLIO ART DIRECTION COPY AGENT".
  - Call OpenAI GPT-4o.
- [ ] **Display**: Markdown renderer for output.

### 2.3 Ad Scene Generator (`/admin/antigravity/scene-generator`)

- [ ] **UI**: Form with:
  - Original Art Upload.
  - Piece Type (Select).
  - Scene Description (Input).
  - "Generate" button.
- [ ] **Action**: `generateAdScenes(data)`
  - Inject "SYSTEM PROMPT — REALISTIC AD SCENE GENERATOR".
  - Call OpenAI DALL-E 3 (or compatible image gen).
  - *Constraint*: DALL-E 3 might not support direct "in-painting" of specific uploaded art perfectly in one go without editing API. We will implement the prompt generation logic to describe the scene as requested, and if possible use image editing endpoints or fallback to high-fidelity generation instructions.
- [ ] **Gallery**: Display generated images.

## Phase 3: Verification

- [ ] Verify Navigation.
- [ ] Test Server Actions (Mock first to save credits during dev).
- [ ] styling consistency.

## Environment Variables

- `OPENAI_API_KEY` (Required in `.env.local`)
