# Implementation Plan — Auditoria Produção vs Spec

1. Levantar fontes obrigatórias (Ghost DS, Rules Structure, estrutura-site).
2. Verificar disponibilidade de specs por página e registrar ausências/conflitos.
3. Capturar evidências em produção nos breakpoints 375/768/1440.
4. Cruzar tokens/grid/motion/a11y/webgl com observação objetiva.
5. Gerar relatórios `AUDIT_*.md` por página com severidade e ações.
6. Consolidar achados críticos em `AUDIT_PENTEST.md`.
