# Workflow: Portfolio Media Improvement

Trigger: Home/Portfolio card or preview-media issue.
Goal: consistent audiovisual card behavior across input modes and viewports.

Steps:
1. Inspect current card/media architecture.
2. Capture state matrix: default/loading/preview/error/reduced-motion.
3. Define delta behavior for pointer and touch.
4. Implement within shared card-frame geometry.
5. Add lazy/in-view/off-screen media policy where needed.
6. Verify fallback and failure.
7. Run responsive visual checks.
8. Run supported code/test/build gates.

Completion Criteria:
Primary project media is discoverable on desktop and touch, without layout jump or uncontrolled eager loading.
