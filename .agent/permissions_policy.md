# Permissions Policy & Sandboxing — Ghost System

Esta política define a matriz de controle de acesso (RBAC) e as restrições de execução de comandos (Sandboxing) para agentes autônomos no Danilo Novais Portfolio.

## 1. Diretriz Principal (Permission-First)

- **Modo Auto (Restrito):** Por padrão, os agentes operam em sandbox para leitura e edições básicas de código.
- **Aprovação Obrigatória:** Qualquer comando classificado como "Destrutivo" ou "Modificador de Infraestrutura de Nuvem" **exige explicitamente** aprovação humana (Approval Gate) antes de ser proposto ou executado.

---

## 2. Matriz de Nível de Permissão (RBAC)

| Categoria | Comando / Operação | Nível de Risco | Ação Requerida |
| :--- | :--- | :--- | :--- |
| **Leitura Básica** | `cat`, `ls`, `grep`, leitura de arquivos | Mínimo | **Auto-run permitido** |
| **Edição Local** | Edição de arquivos em `src/`, configs locais | Médio | **Permitido (em planning)** |
| **Instalação** | `pnpm install`, `npm install` | Médio | **Permitido se planejado** |
| **Modificação DB** | Alteração de Schema Supabase, migrations | Alto | **Exige Aprovação Humana** |
| **Infraestrutura** | `firebase deploy`, `firebase hosting:disable` | Alto | **Exige Aprovação Humana** |
| **Destrutivo** | `rm -rf` (indiscriminado), `git reset --hard` | Crítico | **Exige Aprovação Humana** |

---

## 3. Sandboxing de Comandos Destrutivos

### Comandos Bloqueados para Execução Automática (Necessitam aprovação):

1. **Firebase CLI:**
   - `firebase hosting:disable`
   - `firebase projects:delete`
   - `firebase functions:delete`
2. **Supabase CLI / PostgreSQL:**
   - `supabase db reset`
   - `drop table`, `drop schema` (via SQL)
   - Deleção de buckets no Supabase Storage.
3. **Shell Geral:**
   - `rm -rf` em diretórios fora da pasta temporária (`/tmp` ou `.next`).
   - `git push -f` ou `git push origin main --force`.

---

## 4. Auditoria de Segurança

Após qualquer alteração em infraestrutura ou banco de dados, execute uma auditoria de Row Level Security (RLS) e chaves secretas:
```bash
pnpm run audit:fullstack-config
```
