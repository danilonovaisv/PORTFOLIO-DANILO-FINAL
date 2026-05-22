---
description: Portfolio Danilo Incremental Enhancement and 3D Feature Upgrade Workflow
---


## target_stack_summary

Next.js App Router under src/app, React components under src/components, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, @react-three/drei, Three.js, Supabase Storage for production media, and Firebase Hosting for deployment.

## antigravity_execution_steps

1. Inspect the repository at [https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL.git](https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL.git), then review package.json, existing scripts, Firebase configuration, Supabase media conventions, and all foundation documents and absolute visual references located at .context/DOCS-PORTFOLIO-PAGES. Map the blast radius to identify all affected components and services.
2. Formulate a strategic enhancement mini-plan in task.md. If the request involves a major UI overhaul, invoke /brainstorm first. Extract the documented layout, responsive behavior, 3D expectations, and animation rules from .context/DOCS-PORTFOLIO-PAGES before proceeding.
3. Execute surgical implementation by restricting all route-level file manipulation to src/app and all reusable UI or component work to src/components. Preserve strict Next.js App Router conventions and explicit server/client component boundaries.
4. Style the new elements using Tailwind CSS utilities and existing design tokens to ensure a consistent UI. Use Framer Motion for any required entrance, reveal, transition, or micro-interaction behaviors.
5. Isolate all React Three Fiber Canvas elements, @react-three/drei helpers, Three.js logic, and animation-heavy browser APIs in dedicated client components under src/components. Implement 3D content in a performance-aware manner that avoids unnecessary render loops, excessive geometry, and layout-blocking initialization.
6. Reference production media strictly through Supabase Storage conventions, ensuring no unmanaged local media assets are introduced into the repository unless explicitly mandated by the project documentation.
7. Use the Terminal Subagent to run the repository's validation scripts inferred from package.json, executing build, lint, and TypeScript checks to ensure non-destructive changes and regression prevention.
8. Group the project changes into logical, atomic git commits. Document the exact changes in walkthrough.md, then deploy the application to Firebase Hosting.

## verification_and_artifacts

1. Capture a browser screenshot of the enhanced UI and rigorously compare it against the absolute visual references stored in .context/DOCS-PORTFOLIO-PAGES to confirm perfect visual parity before marking the task complete.
2. Confirm through terminal logs that all route-level edits were strictly confined to src/app and reusable component edits to src/components.
3. Provide terminal logs and build output proving successful dependency verification, a passing build process, and zero unresolved TypeScript errors.
4. Provide terminal evidence and logs demonstrating a successful deployment to Firebase Hosting.
5. Generate a final Verification Artifact explicitly confirming that the implementation matches the visual references, respects the specified architecture, utilizes Supabase Storage correctly, passes all available validation scripts, meets accessibility and responsiveness standards, and maintains optimal 3D rendering performance.