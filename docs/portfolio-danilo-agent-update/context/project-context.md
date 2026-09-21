# Project Context

Project: PORTFOLIO-DANILO-FINAL

Confirmed priorities:
1. Restore ADMIN reliability.
2. Improve HTML/video cards on Home and Portfolio.
3. Improve published project landing/case pages.
4. Apply general performance, accessibility and maintainability improvements.

Confirmed architecture signals:
- Next.js App Router
- protected Admin route group
- Supabase SSR/JS
- portfolio/project components
- Jest + Playwright
- existing agent ecosystem across several IDE/tool integrations

Context policy:
Load only domain files needed for the current task.
Do not inject the entire `.agents` catalog into every request.
