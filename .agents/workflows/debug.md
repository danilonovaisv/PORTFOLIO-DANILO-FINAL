---
name: debug
description: Investigação científica e resolução sistemática de bugs, erros de runtime, falhas de WebGL ou quebras de build.
---

# /debug — Systematic Debugging Workflow

Workflow para reprodução, isolamento de causa raiz e correção cirúrgica de falhas no Ghost System.

---

## 🔍 FASE 1: Coleta Forense & Isolamento

1. **Captura da Evidência:**
   - Obtenha a mensagem exata do erro, stack trace e arquivo/linha de origem.
   - Identifique as condições de reprodução (Mobile touch, Safari iOS, SSR, WebGL context loss, etc.).
2. **Consulta a Incidentes Anteriores:**
   - Consulte o histórico em `.context/logs/adjustment_log.md` e no cofre Obsidian (`search_vault_simple`).

---

## 🧪 FASE 2: Formulação de Hipóteses & Diagnóstico (RCA)

1. Formule uma hipótese testável sobre a causa raiz:
   - Erro de hidratação Next.js / Server Component vs Client Component boundary?
   - Alocação indevida no render loop do R3F / vazamento de memória GPU?
   - Problema de autenticação / cookie `__session` ausente no SSR?
   - Regressão de layout no `.std-grid`?
2. Teste a hipótese de forma isolada antes de aplicar qualquer código.

---

## 🛠️ FASE 3: Correção Cirúrgica

1. **Toque Apenas no Necessário:** Aplique a menor alteração suficiente que resolva a causa raiz.
2. **Defensive Coding:** Trate edge cases, use fallback seguro para WebGL (`<Canvas>` boundary).
3. **Sem Efeitos Colaterais:** Não refatore código adjacente que não esteja quebrado.

---

## 🛡️ FASE 4: Verificação Empírica & Registro

1. Execute a reprodução exata para confirmar que a falha desapareceu.
2. Execute a suíte de verificação:
   ```bash
   pnpm run build-check
   pnpm test
   ```
3. Registre a resolução em `.context/logs/adjustment_log.md`.
