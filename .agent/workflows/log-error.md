---
description: Intercepta quebras no fluxo, extrai stack traces e alimenta o Error Journal global para prevenir reincidência de bugs no Agent Manager.
---

# Registro e Triagem de Erros (Error Journal)

1. Capture o Stack Trace proveniente do terminal ou falha de renderização de componentes React/Three.js.
2. Isole a causa raiz (Ex: violação de RLS no Supabase, erro de hidratacão SSR vs CSR no Next.js, memory leak na tag `<Canvas>`).
3. Formate a análise do problema e atualize os arquivos em `@.specify/memory/error_journal.md` ou equivalente.
4. Identifique o padrão quebrado e reescreva-o como uma nova regra proativa que será absorvida pelos agentes no próximo prompt.
5. Inicie a autocorreção sugerida no log ou sugira a reversão dos últimos commits locais usando o Terminal do Antigravity.
