# Protocolo de Limpeza Profunda (Deep Clean Protocol)

**Versão:** 1.0.0  
**Responsável:** @audit_sentinel  
**Escopo:** Higienização de Projeto & CI/CD  
**Ferramenta:** `scripts/clean_project.py`

---

## 🎯 Objetivo

Eliminar estados inconsistentes, cache corrompido e artefatos obsoletos do ambiente de desenvolvimento ou produção, garantindo um "estado zero" limpo sem comprometer o código-fonte ou configurações críticas.

## 🛠️ Ferramenta: `clean_project.py`

Este script Python foi desenvolvido com foco em **segurança operacional**. Ele opera em camadas de proteção (Whitelist, Blacklist, Tamanho, Confirmação).

### 1. Camadas de Segurança

| Camada | Descrição |
| :--- | :--- |
| **1. Whitelist (Proteção)** | Caminhos críticos (`src`, `.git`, `.env`) são imunes à exclusão. |
| **2. Root Jail** | Impede operações fora do diretório raiz do projeto. |
| **3. Dry-Run Default** | O script sempre inicia em modo de simulação, listando o que seria feito. |
| **4. Size Check** | Exige confirmação explícita para deletar diretórios > 100MB (ex: `node_modules`). |
| **5. Confirmação** | Exige flag `--execute` para realizar qualquer deleção real. |

### 2. O que é removido (Blacklist)

- **Dependências**: `node_modules`
- **Build Artifacts**: `.next`, `dist`, `build`, `out`
- **Caches**: `__pycache__`, `.cache`, `.turbo`, `.eslintcache`, `.pytest_cache`
- **Temporários**: `tmp`, `*.tmp`, `*.bak`, `*.swp`
- **Logs**: `*.log` (npm-debug.log, yarn-error.log)
- **Firebase**: `.firebase`
- **Generated**: `dataconnect-generated`

### 3. Uso

#### Simulação (Padrão)

```bash
python3 scripts/clean_project.py
```

*Saída esperada:* Lista de arquivos e diretórios que SERIAM removidos.

#### Execução Real (Interativa)

```bash
python3 scripts/clean_project.py --execute
```

*Saída esperada:* Remoção de arquivos pequenos. Pergunta de confirmação para pastas grandes (`node_modules`).

#### Execução Forçada (CI/CD)

```bash
python3 scripts/clean_project.py --execute --force
```

*Saída esperada:* Remoção total sem perguntas. Ideal para pipelines de automação.

---

## 🔄 Workflow de Recuperação

Se a limpeza causar problemas (ex: deletou algo que não devia ter deletado, embora a whitelist previna isso), siga estes passos:

1. **Restaurar via Git**: Como `.git` é protegido, o histórico está seguro.

    ```bash
    git restore .
    ```

2. **Reinstalar Dependências**:

    ```bash
    pnpm install
    ```

3. **Reconstruir**:

    ```bash
    npm run build
    ```

## 🔍 Validação Pós-Execução

Para validar se a limpeza foi bem-sucedida:

1. Verifique se `node_modules` desapareceu.
2. Verifique se `.next` desapareceu.
3. Verifique se arquivos em `src/` permanecem intactos.
4. Verifique se `.env` permanece intacto.

---

## ⚠️ Riscos Conhecidos

- **Arquivos não trackeados fora da whitelist**: Se você tiver arquivos importantes que não estão no git E não estão na whitelist (`PROTECTED_PATHS` no script), mas estão em uma pasta da blacklist (incomum), eles serão perdidos.
- **Permissões**: Em alguns sistemas, o script pode falhar se não tiver permissão para deletar arquivos (ex: criados por root/docker). Use `sudo` com cautela extrema.

---
**Auditado por:** Agent-Safety-Guardian  
**Data:** 13/02/2026
