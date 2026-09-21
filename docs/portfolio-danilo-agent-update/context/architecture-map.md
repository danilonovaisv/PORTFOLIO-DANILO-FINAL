# Architecture Map — Relevant Areas

## Public portfolio
Home / Portfolio -> project-card components -> media resolver/renderers -> project navigation

## Project detail
`/projects/[slug]` -> project data lookup -> case/body renderer -> media/content blocks

## Admin
`/admin/(auth)` -> authenticated session
`/admin/(protected)` -> config, landing pages, media, settings, tags, works and related tools

## Data boundary
Supabase authentication/data/storage. RLS/schema/storage-policy changes require dedicated review.

## Quality boundary
Jest/Testing Library for code behavior where appropriate; Playwright for critical user flows and responsive/visual interaction.

## Agent boundary
Orchestrator routes; specialists implement; Quality Verification independently verifies.
