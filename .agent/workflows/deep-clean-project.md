---
description: 🧹 Protocolo de Limpeza Profunda (Deep Clean)
---

# 🧹 Protocolo de Limpeza Profunda do Projeto

Este workflow executa uma limpeza forense do projeto, removendo artefatos de build, cache, dependências instaladas e arquivos temporários.

**Ferramenta Principal**: `scripts/clean_project.py`
**Agente Responsável**: `@audit_sentinel`

## 🛡️ Pré-Requisitos e Segurança

1. Este script NÃO toca em código fonte (`src/`, `app/`, etc).
2. Este script NÃO toca em configurações críticas (`.env`, `package.json`, `.git`).
3. Modo padrão é `DRY-RUN` (simulação).
4. Requer Python 3 instalado.

## 🔄 Fluxo de Execução

### 1. Simulação (Dry-Run)

Execute para ver o que será deletado sem risco.

```bash
# Via npm/pnpm
npm run deep-clean

# Ou direto via Python
python3 scripts/clean_project.py
```

### 2. Execução (Destrutiva)

Confirme a remoção dos arquivos listados.

```bash
# Via npm/pnpm (requer passar argumentos extras se suportado, senão use python direto)
python3 scripts/clean_project.py --execute
```

### 3. Execução Forçada (Sem Confirmação)

Use apenas em CI/CD ou se souber o que está fazendo.

```bash
python3 scripts/clean_project.py --execute --force
```

### 4. Validação Pós-Limpeza (Reinstalação)

Após a limpeza total, é uma boa prática reinstalar dependências frescas.

```bash
# 1. Reinstalar
pnpm install

# 2. Reconstruir
npm run build
```

## 📋 O que é removido?

- **Dependências**: `node_modules`
- **Builds**: `.next`, `dist`, `build`, `out`
- **Cache**: `__pycache__`, `.cache`, `.turbo`, `.eslintcache`
- **Temporários**: `*.log`, `*.tmp`, `*.bak`
- **Firebase**: `.firebase`

## 🚫 O que é mantido (Whitelist)?

- Todo o código fonte (`src`, `pages`, `app`)
- Arquivos de configuração (`package.json`, `tsconfig.json`, `.env*`)
- Git (`.git`, `.gitignore`, `.github`)
- Scripts de automação (`scripts/`)
- Documentação (`docs/`)

---

## 🚨 Em caso de erro

Se acidentalmente algo for deletado, use o git para restaurar (já que `.git` é protegido):

```bash
git restore .
git clean -fd # Cuidado: isso remove arquivos untracked
```
